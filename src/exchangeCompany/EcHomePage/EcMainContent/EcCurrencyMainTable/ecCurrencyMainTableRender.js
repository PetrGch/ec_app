import React from 'react';
import moment from 'moment';
import Button from "../../../../common/controlLib/Button/Button";
import {Link} from "react-router-dom";

function CompanyInfo({companyName, branchName, googleMapUrl, onNameClickEvent}) {
  return (
    <div className="ecCurrencyMainTable__companyDetail">
      <div
        onClick={onNameClickEvent}
        className="ecCurrencyMainTable__companyName"
      >
        {companyName && <strong>{companyName}</strong>}
        {branchName && <span>{branchName}</span>}
      </div>
      <a
        className="ecCurrencyMainTable__googleMapUrl"
        href={googleMapUrl}
        target="_blank"
      >
        GOOGLE MAP
      </a>
    </div>
  );
}

export function renderCompanyName(record, onNameClick) {
  let companyName = null;
  let branchName = null;
  let googleMapUrl = null;
  if (record) {
    if (record.company_name) {
      companyName = record.company_name;
    }
    if (record.branch_name) {
      branchName = record.branch_name;
    }
    if (record.google_map_url) {
      googleMapUrl = record.google_map_url;
    }
  }
  const onNameClickEvent = () => {
    onNameClick(record)
  };

  return <CompanyInfo
    companyName={companyName}
    branchName={branchName}
    googleMapUrl={googleMapUrl}
    onNameClickEvent={onNameClickEvent}
  />
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
  return (
    <Button>
      <Link to={`/company/${name}`}>
        <span className="ecCurrencyMainTable__knowMore">
          {translate("companies.knowMore")}
        </span>
      </Link>
    </Button>
  )
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