import React from 'react';
import moment from 'moment';
import Button from "../../../../common/controlLib/Button/Button";

function CompanyInfo({name, address}) {
  return (<div className="ecCurrencyMainTable__companyName">
    <span>{name}</span>
    <span>{address}</span>
  </div>);
}

export function renderCompanyName(record) {
  let name = null;
  let address = null;
  if (record && record.name) {
    name = record.name;
  }
  if (record && record.address) {
    address = record.address;
  }
  return <CompanyInfo name={name} address={address}/>
}

export function renderBuyTitle(sumAmount) {
  return `Buy ${sumAmount || 0}`;
}

export function renderSellTitle(sumAmount) {
  return `Sell ${sumAmount || 0}`;
}

export function renderBuyPrice(buyPrice, sumAmount) {
  return buyPrice && sumAmount ? (buyPrice * sumAmount).toFixed(2) : ''
}

export function renderSellPrice(sellPrice, sumAmount) {
  return sellPrice && sumAmount ? (sellPrice * sumAmount).toFixed(2) : ''
}

function TimeCell({time, date}) {
  return (<div className="ecCurrencyMainTable__updateTime">
    <span>{time}</span>
    <span>{date}</span>
  </div>)
}

export function renderLastUpdateTime(record, key) {
  if (key && record[key]) {
    const time = moment(record[key]).format('LT');
    const date = moment(record[key]).format('L');
    return <TimeCell time={time} date={date}/>
  }
  return "-//-"
}

export function renderKnowMore(id, name, knowMore) {
  const knowMoreFunction = () => {
    knowMore(id, name);
  };
  return (<Button
    // size={sizeType.LG}
    className="ecCurrencyMainTable__knowMore"
    onClick={knowMoreFunction}
  >
    Know more
  </Button>)
}

export function renderClass(isHeader, config) {
  if (isHeader) {
    return `${config.className} ${config.className}--isHeader-true`;
  }
  return config.className;
}

export function renderTitle(record, config, clickNameEvent) {
  return (<div
    className="ecCurrencyMainTable__titleName"
    onClick={clickNameEvent}
  >{config.title || ''}</div>);
}