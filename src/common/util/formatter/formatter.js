var numeral = require('numeral');

export function cashFormatter(value) {
  return value !== null && value !== undefined && typeof value !== 'string'
    ? numeral(value).format('0,0') : '';
}

export function cashReformatter(value) {
  return value !== null && value !== undefined ? numeral(value).value() : '';
}