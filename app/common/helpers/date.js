import formatFn from 'date-fns/format';
import parseFn from 'date-fns/parse';

export const format = (date, format = 'DD.MM.YYYY') => formatFn(parseFn(date), format);
