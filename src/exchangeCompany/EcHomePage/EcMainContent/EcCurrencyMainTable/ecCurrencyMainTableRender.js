import React from 'react';
import moment from 'moment';
import {Link} from "react-router-dom";

function findWorkingDay(workingTimeList) {
  const dayOfWeek = moment().format("e");
  if (!workingTimeList) {
    return null
  }

  switch (dayOfWeek) {
    case "0":
      return { from: workingTimeList.sn_from, to: workingTimeList.sn_to };
    case "1":
      return { from: workingTimeList.mn_from, to: workingTimeList.mn_to };
    case "2":
      return { from: workingTimeList.tu_from, to: workingTimeList.tu_to };
    case "3":
      return { from: workingTimeList.we_from, to: workingTimeList.we_to };
    case "4":
      return { from: workingTimeList.th_from, to: workingTimeList.th_to };
    case "5":
      return { from: workingTimeList.fr_from, to: workingTimeList.fr_to };
    case "6":
      return { from: workingTimeList.st_from, to: workingTimeList.st_to };
    default:
      return null;
  }
}

function findWorkingTimeOfCurrentDay(workingTime) {
  const workingDayTime = findWorkingDay(workingTime);
  return isWorkingNow(workingDayTime);
}

function isWorkingNow(workingDayTime) {
  if (!workingDayTime
    || !moment(workingDayTime.from, "HH:mm").isValid()
    || !moment(workingDayTime.to, "HH:mm").isValid()) {
    return null;
  }
  const utcFrom = moment.utc(workingDayTime.from, "HH:mm");
  const utcTo = moment.utc(workingDayTime.to, "HH:mm");

  const startTime = moment(utcFrom).local().valueOf();
  const endTime = moment(utcTo).local().valueOf();
  const currentTime = moment().local().valueOf();

  return startTime <= currentTime && currentTime < endTime;
}

function CompanyInfo({companyName, branchName, googleMapUrl, workingTime, onNameClickEvent}) {
  const isWorkingNow = findWorkingTimeOfCurrentDay(workingTime);


  return (
    <div className="ecCurrencyMainTable__companyDetail">
      {
        isWorkingNow !== null &&
        <div className={`ecCurrencyMainTable__workingTime ecCurrencyMainTable__workingTime--isWorking-${isWorkingNow}`}>
          <span>{isWorkingNow ? "Open" : "Close"}</span>
        </div>
      }
      <div
        onClick={onNameClickEvent}
        className="ecCurrencyMainTable__companyName"
      >
        {companyName && <strong>{companyName}</strong>}
        {branchName && <span>{branchName}</span>}
      </div>
      <div className="ecCurrencyMainTable__companyAction">
        <Link
          rel="nofollow"
          to={`/company/${branchName}`}
        >
          KNOW MORE
        </Link>
        <a
          className="ecCurrencyMainTable__googleMapUrl"
          href={googleMapUrl}
          target="_blank"
          rel="nofollow"
        >
          GOOGLE MAP
        </a>
      </div>
    </div>
  );
}

export function renderCompanyName(record, onNameClick) {
  let companyName = null;
  let branchName = null;
  let googleMapUrl = null;
  let workingTime = null;

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
    if (record.workingTime) {
      workingTime = record.workingTime;
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
    workingTime={workingTime}
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

export function renderSumPrice(price, sumAmount, currencyMark) {
  const sumPrice = price && sumAmount ? (price * sumAmount).toFixed(2) : 0;
  return `${sumPrice} ${currencyMark}`
}

export function renderPrice(price, currencyMark, trend) {
  let trendRow = null;
  if (trend !== 0) {
    if (trend > 0) {
      trendRow = (
        <span className="ecCurrencyMainTable__trendDirection ecCurrencyMainTable__trendDirection--up">
          +{trend}
        </span>)
    } else {
      trendRow = (
        <span className="ecCurrencyMainTable__trendDirection ecCurrencyMainTable__trendDirection--down">
          {trend}
        </span>
      )
    }
  }

  return (
    <div className="ecCurrencyMainTable__priceTrend">
      <span>
        {`${price} ${currencyMark}`}
      </span>
      {trendRow}
    </div>
  );
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