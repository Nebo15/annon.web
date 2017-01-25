
class ValidateArray {
  constructor(schema) {
    this.schema = schema;
  }
}

export { ValidateArray };
export default validators => new ValidateArray(validators);
