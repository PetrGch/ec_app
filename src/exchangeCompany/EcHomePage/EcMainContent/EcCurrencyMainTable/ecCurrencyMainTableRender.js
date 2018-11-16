import React from 'react';
import moment from 'moment';
import Button from "../../../../common/controlLib/Button/Button";

function CompanyInfo({company_name, branch_name, address}) {
  return (
    <div className="ecCurrencyMainTable__companyName">
      {company_name && <strong>{company_name}</strong>}
      {branch_name && <span>{branch_name}</span>}
      {address && <span>{address}</span>}
    </div>
  );
}

export function renderCompanyName(record) {
  let company_name = null;
  let branch_name = null;
  let address = null;
  if (record) {
    if (record.company_name) {
      company_name = record.company_name;
    }
    if (record.branch_name) {
      branch_name = record.branch_name;
    }
    if (record.address) {
      address = record.address;
    }
  }
  return <CompanyInfo company_name={company_name} branch_name={branch_name} address={address}/>
}

export function renderBuyTitle(sumAmount, config, translate) {
  return (
    <div className="ecCurrencyMainTable__titleSumAmount">
      <span>{translate("companies.buy")} {sumAmount || 0}</span>
      {config.subTitle && <span>{config.subTitle}</span>}
    </div>
  );
}

export function renderSellTitle(sumAmount, config, translate) {
  return (
    <div className="ecCurrencyMainTable__titleSumAmount">
      <span>{translate("companies.sell")} {sumAmount || 0}</span>
      {config.subTitle && <span>{config.subTitle}</span>}
    </div>
  );
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

export function renderKnowMore(id, name, knowMore, translate) {
  const knowMoreFunction = () => {
    knowMore(id, name);
  };
  return (<Button
    className="ecCurrencyMainTable__knowMore"
    onClick={knowMoreFunction}
  >
    {translate("companies.knowMore")}
  </Button>)
}

export function renderClass(isHeader, config) {
  if (isHeader) {
    return `${config.className} ${config.className}--isHeader-true`;
  }
  return config.className;
}

export function renderTitle(record, config, clickNameEvent) {
  return (
    <div
      className="ecCurrencyMainTable__titleName"
      onClick={clickNameEvent}
    >
      <span>{config.title || ''}</span>
      {config.subTitle && <span>{config.subTitle}</span>}
    </div>);
}