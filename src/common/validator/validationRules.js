const onChangeRules = {
  length: function (value, params) {
    return value.length <= params;
  },
  isNumeric: function (value) {
    return /^$|^[0-9]+((\.)|(\.[0-9]+)?)$/.test(value);
  }
};

const onBlurRules = {
  isRequired: function (value) {
    return {status: value !== '', message: 'This field is required'};
  },
  email: function (value) {
    return {status: /^$|^.*@.*\..*$/.test(value), message: 'Incorrect email format'};
  }
};


export function validatorForOnChange(value, validationOption) {
  const rulesName = Object.keys(validationOption);
  return rulesName.every(rule => {
    return onChangeRules[rule] ? onChangeRules[rule](value, validationOption[rule]) : true;
  });
}

export function validationForOnBlur(value, validationOprion) {
  const rulesName = Object.keys(validationOprion);
  return rulesName.reduce((ruleAcc, rule) => {
    const validationResult = onBlurRules[rule]
      ? onBlurRules[rule](value, validationOprion[rule])
      : false;
    if (validationResult && !validationResult.status) {
      return [...ruleAcc, validationResult];
    }

    return ruleAcc;
  }, []);
}