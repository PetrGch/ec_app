export function nullValidator(field, subField, defaultValue = "") {
  return field !== null && field !== undefined ? field[subField] : defaultValue;
}