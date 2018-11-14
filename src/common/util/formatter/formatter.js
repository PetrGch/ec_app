const numeral = require('numeral');

export function cashFormatter(value) {
  return value !== null && value !== undefined
    ? numeral(value).format('0,0.00') : '';
}

export function numberFormatter(value) {
  return value !== null && value !== undefined
    ? numeral(value).format("0,0") : '';
}

export function cashReformatter(value) {
  return value !== null && value !== undefined && value !== ''
    ? numeral(value).value() : '';
}
