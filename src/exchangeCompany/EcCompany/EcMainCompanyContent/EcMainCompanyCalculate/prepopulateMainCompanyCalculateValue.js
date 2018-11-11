import {nullValidator} from "../../../../common/util/valueValidator";

export function calculateFinalResultValue(sum, company, isBuyStatus) {
  const buy_price = nullValidator(company, 'buy_price');
  const sell_price = nullValidator(company, 'sell_price');

  if (sum) {
    if (isBuyStatus && buy_price) {
      return sum * buy_price;
    } else if (!isBuyStatus && sell_price) {
      return sum * sell_price;
    }
  }
  return 0;
}

export function calculateSumValue(finalResult, company, isBuyStatus) {
  const buyPrice = nullValidator(company, 'buy_price');
  const sellPrice = nullValidator(company, 'sell_price');

  if (finalResult) {
    if (isBuyStatus && buyPrice) {
      return finalResult / buyPrice;
    } else if (!isBuyStatus && sellPrice) {
      return finalResult / sellPrice;
    }
  }
  return 0;
}
