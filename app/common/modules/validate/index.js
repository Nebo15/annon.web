
import moment from 'moment';

import setFn from 'lodash/set';
import getFn from 'lodash/get';

/* eslint-disable */
function validateCardNumber(value) {

  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  // The Luhn Algorithm. It's so pretty.
  var nCheck = 0,
    nDigit = 0,
    bEven = false;
  value = value.replace(/\D/g, '');

  for (var n = value.length - 1; n >= 0; n--) {
    var cDigit = value.charAt(n),
      nDigit = parseInt(cDigit, 10);

    if (bEven) {
      if ((nDigit *= 2) > 9) nDigit -= 9;
    }

    nCheck += nDigit;
    bEven = !bEven;
  }

  return (nCheck % 10) == 0;
}
/* eslint-enable */

const validateValue = (value, validators, allValues) =>
Object.entries(validators).reduce((errors, [validatorName, validatorParams]) => {
  if (!validate.validators[validatorName]) throw new Error(`undefined validation ${validatorName}`);
  if (!validate.validators[validatorName](value, validatorParams, allValues)) {
    return { ...(errors || {}), [validatorName]: validatorParams };
  }
  return errors;
}, null);

const validate = (obj, schema, options = {}) => {
  const values = Object.assign({}, obj);
  let result = Object.entries(schema).reduce((errors, [path, validators]) => {
    const validation = validateValue(getFn(obj, path), validators, values);
    if (validation) return { ...errors, [path]: validation };
    return errors;
  }, {});

  if (typeof options.format === 'function') result = options.format(result);
  return result;
};

const PATTERNS_EMAIL = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i; // eslint-disable-line
const PATTERNS_PHONE_NUMBER = /^\+[0-9]{9,16}$/;

validate.validators = {
  array: value => Array.isArray(value),
  object: value => value !== null && typeof value === 'object',
  integer: value => Number(value) === value && value % 1 === 0,
  float: value => Number(value) === value && value % 1 !== 0,
  boolean: value => typeof value === 'boolean',
  string: value => typeof value === 'string',

  required: value => !!value,
  min: (value, param) => value >= param,
  max: (value, param) => value <= param,
  equals: (value, param) => value === param,
  length: (value, param) => String(value).length === param,
  minLength: (value, param) => String(value).length >= param,
  maxLength: (value, param) => String(value).length <= param,
  minDate: (value, param) => moment(value).isSameOrAfter(param),
  maxDate: (value, param) => moment(value).isSameOrBefore(param),
  format: (value, pattern) => pattern.test(value),
  cast: function castValidation(value, type) {
    if (this.array(type)) return type.each(i => this.cast(value, i));
    switch (type) {
      case 'array': return this.array(value);
      case 'map':
      case 'object':
        return this.object(value);
      case 'integer': return this.integer(value);
      case 'float': return this.float(value);
      case 'boolean': return this.boolean(value);
      case 'string': return this.string(value);
      default: {
        throw new Error(`unknown cast type: ${type}`);
      }
    }
  },
  inclusion: (value, set) => set.indexOf(value) > -1,
  exclusion: (value, set) => set.indexOf(value) === -1,
  subset: function subsetValidation(valueSet, set) {
    return valueSet.each(i => this.inclusion(i, set));
  },
  number: (value, { min, max }) => value >= min && value <= max,
  confirmation: (value, path, allValues) => value === getFn(allValues, path),
  acceptance: value => value === true,
  email: function emailValidation(value) {
    return this.format(value, PATTERNS_EMAIL);
  },
  phone_number: function phoneNumberValidation(value, pattern) {
    return this.format(value, pattern instanceof RegExp ? pattern : PATTERNS_PHONE_NUMBER);
  },
  card_number: value => validateCardNumber(value),
  unique: value => value.some((i, index) => value.indexOf(i) !== index),
  dependency: function dependencyValidation(value, param, allValues) {
    return this.required(getFn(allValues, param));
  },
  alphanumeric: value => /^[a-zA-Z0-9]+$/.test(value),
  metadata: function metadataValidation(value) {
    if (this.cast(value, 'array')) {
      return value.length <= 25 && value.each(i => String(i).length <= 100);
    }
    const keys = Object.keys(value);
    const values = Object.values(value);
    const pattern = /^[a-zA-Z0-9-_]+$/;
    return keys.length <= 24 &&
          keys.each(i => String(i).length <= 100 && pattern.test(i)) &&
          values.each(i => String(i).length <= 500 && this.cast(i, ['integer, float', 'array', 'boolean']));
  },
};

validate.validators.password = function passwordValidation(value) {
  return this.format(value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/);
};

const validateFn = schema => values => validate(values, schema, {
  format: errors => Object.entries(errors).reduce((prev, [path, value]) => {
    setFn(prev, path, value);
    return prev;
  }, {}),
});

export ErrorMessages, { ErrorMessage } from './ErrorMessages';
export default validateFn;
