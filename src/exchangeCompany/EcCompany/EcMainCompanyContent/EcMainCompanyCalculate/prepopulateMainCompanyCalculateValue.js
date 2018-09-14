import {nullValidator} from "../../../../common/util/valueValidator";

export function calculateFinalResultValue(sum, company, isBuyStatus) {
  const buyPrice = nullValidator(company, 'buyPrice');
  const sellPrice = nullValidator(company, 'sellPrice');

  if (sum) {
    if (isBuyStatus && buyPrice) {
      return sum * buyPrice;
    } else if (!isBuyStatus && sellPrice) {
      return sum * sellPrice;
    }
  }
  return 0;
}

export function calculateSumValue(finalResult, company, isBuyStatus) {
  const buyPrice = nullValidator(company, 'buyPrice');
  const sellPrice = nullValidator(company, 'sellPrice');

  if (finalResult) {
    if (isBuyStatus && buyPrice) {
      return finalResult / buyPrice;
    } else if (!isBuyStatus && sellPrice) {
      return finalResult / sellPrice;
    }
  }
  return 0;
}
