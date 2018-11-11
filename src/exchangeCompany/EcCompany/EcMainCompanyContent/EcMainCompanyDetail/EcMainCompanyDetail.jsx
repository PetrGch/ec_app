import React from 'react';

import {nullValidator} from "../../../../common/util/valueValidator";

import './ecMainCompanyDetail.less';
import moment from "moment";

function checkWorkingDays(from, to) {
  if (from && to) {
    return `${from} - ${to}`;
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
          <span>Mn:</span> {checkWorkingDays(workingTime.mnFrom, workingTime.mnTo)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '2'}`}
        >
          <span>Tu:</span> {checkWorkingDays(workingTime.tuFrom, workingTime.tuTo)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '3'}`}
        >
          <span>We:</span> {checkWorkingDays(workingTime.weFrom, workingTime.weTo)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '4'}`}
        >
          <span>Th:</span> {checkWorkingDays(workingTime.thFrom, workingTime.thTo)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '5'}`}
        >
          <span>Fr:</span> {checkWorkingDays(workingTime.frFrom, workingTime.frTo)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '6'}`}
        >
          <span>St:</span> {checkWorkingDays(workingTime.stFrom, workingTime.stTo)}</div>
        <div
          className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${dayOfWeek === '0'}`}
        >
          <span>Sn:</span> {checkWorkingDays(workingTime.snFrom, workingTime.snTo)}</div>
      </div>
    </div>
  ) : null;
}

function EcMainCompanyRightDetailColumn({company}) {
  return (
    <div className="ecMainCompanyRightDetailColumn">
      <div className="ecMainCompanyRightDetailColumn__phone">
        <span>Phone: </span>{nullValidator(company, 'phone', '--//--')}
      </div>
      <div className="ecMainCompanyRightDetailColumn__website">
        <span>Website: </span>{nullValidator(company, 'website', '--//--')}
      </div>
    </div>
  );
}

export default function EcMainCompanyDetail({ filteredCurrency }) {
  return (
    <div className="ecMainCompanyDetail">
      <div className="ecMainCompanyDetail__column ecMainCompanyDetail__column--left">
        <EcMainCompanyLeftDetailColumn workingTime={nullValidator(filteredCurrency, 'workingTime')}/>
      </div>
      <div className="ecMainCompanyDetail__column ecMainCompanyDetail__column--right">
        <EcMainCompanyRightDetailColumn company={filteredCurrency}/>
      </div>
    </div>
  );
}