import React from 'react';

import {nullValidator} from "../../../../common/util/valueValidator";

import './ecMainCompanyDetail.less';
import moment from "moment";

function checkWorkingDays(from, to) {
  if (from && to) {
    return `${moment(from).format("HH:mm")} - ${moment(to).format("HH:mm")}`;
  }

  return "not working day";
}

/**
 * @return {null}
 */
function EcMainCompanyLeftDetailColumn({workingTime}) {
  const dayOfWeek = moment().format("e");

  return workingTime ? (
    <div className="ecMainCompanyRightDetailColumn">
        <span className="ecMainCompanyRightDetailColumn__title">
          Working time:
        </span>
      <div className="ecMainCompanyRightDetailColumn__items">
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '1'}`}
        >
          <span>Mn:</span> {checkWorkingDays(workingTime.mn_from, workingTime.mn_to)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '2'}`}
        >
          <span>Tu:</span> {checkWorkingDays(workingTime.tu_from, workingTime.tu_to)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '3'}`}
        >
          <span>We:</span> {checkWorkingDays(workingTime.we_from, workingTime.we_to)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '4'}`}
        >
          <span>Th:</span> {checkWorkingDays(workingTime.th_from, workingTime.th_to)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '5'}`}
        >
          <span>Fr:</span> {checkWorkingDays(workingTime.fr_from, workingTime.fr_to)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '6'}`}
        >
          <span>St:</span> {checkWorkingDays(workingTime.st_from, workingTime.st_to)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '0'}`}
        >
          <span>Sn:</span> {checkWorkingDays(workingTime.sn_from, workingTime.sn_to)}</div>
      </div>
    </div>
  ) : null;
}

function EcMainCompanyRightDetailColumn({company = {}}) {
  return (
    <div className="ecMainCompanyRightDetailColumn">
      <div className="ecMainCompanyRightDetailColumn__phone">
        <span>Phone: </span>{nullValidator(company.exchange_company_detail, 'phone', '--//--')}
      </div>
      <div className="ecMainCompanyRightDetailColumn__website">
        <span>Website: </span>{nullValidator(company.exchange_company_detail, 'website', '--//--')}
      </div>
    </div>
  );
}

export default function EcMainCompanyDetail({ filteredCurrency, company }) {
  return (
    <div className="ecMainCompanyDetail">
      <div className="ecMainCompanyDetail__column ecMainCompanyDetail__column--left">
        <EcMainCompanyLeftDetailColumn workingTime={nullValidator(company, 'exchange_company_working_time', {})}/>
      </div>
      <div className="ecMainCompanyDetail__column ecMainCompanyDetail__column--right">
        <EcMainCompanyRightDetailColumn company={company}/>
      </div>
    </div>
  );
}