import React from 'react';
import moment from "moment";

import {nullValidator} from "../../../../common/util/valueValidator";

import './ecMainCompanyDetail.less';

const thaiUTCDiff = 7;

function checkWorkingDays(from, to, translate) {
  if (from && to) {
    return `${moment(from, "HH:mm").add(thaiUTCDiff, "hour").format("HH:mm")} - ${moment(to, "HH:mm").add(thaiUTCDiff, "hour").local().format("HH:mm")}`;
  }

  return translate("warning.notWorkingDay");
}

function DayOfWeek({ workingTime, day, isActive }) {
  return (
    <div
      className={`ecMainCompanyRightDetailColumn__item ecMainCompanyRightDetailColumn__item--active-${isActive}`}
    >
      <span>{day}: </span>
      {workingTime}
    </div>
  );
}

/**
 * @return {null}
 */
function EcMainCompanyLeftDetailColumn({ workingTime, translate}) {
  const dayOfWeek = moment().format("e");

  return workingTime ? (
    <div className="ecMainCompanyRightDetailColumn">
        <span className="ecMainCompanyRightDetailColumn__title">
          {translate("company.workingTime")}:
        </span>
      <div className="ecMainCompanyRightDetailColumn__items">
        <DayOfWeek
          day={translate(`company.mn`)}
          workingTime={checkWorkingDays(workingTime.mn_from, workingTime.mn_to, translate)}
          isActive={dayOfWeek === '1'}
        />
        <DayOfWeek
          day={translate(`company.tu`)}
          workingTime={checkWorkingDays(workingTime.tu_from, workingTime.tu_to, translate)}
          isActive={dayOfWeek === '2'}
        />
        <DayOfWeek
          day={translate(`company.we`)}
          workingTime={checkWorkingDays(workingTime.we_from, workingTime.we_to, translate)}
          isActive={dayOfWeek === '3'}
        />
        <DayOfWeek
          day={translate(`company.th`)}
          workingTime={checkWorkingDays(workingTime.th_from, workingTime.th_to, translate)}
          isActive={dayOfWeek === '4'}
        />
        <DayOfWeek
          day={translate(`company.fr`)}
          workingTime={checkWorkingDays(workingTime.fr_from, workingTime.fr_to, translate)}
          isActive={dayOfWeek === '5'}
        />
        <DayOfWeek
          day={translate(`company.st`)}
          workingTime={checkWorkingDays(workingTime.st_from, workingTime.st_to, translate)}
          isActive={dayOfWeek === '6'}
        />
        <DayOfWeek
          day={translate(`company.sn`)}
          workingTime={checkWorkingDays(workingTime.sn_from, workingTime.sn_to, translate)}
          isActive={dayOfWeek === '0'}
        />
      </div>
    </div>
  ) : null;
}

function EcMainCompanyRightDetailColumn({company = {}, translate}) {
  const websiteLink = nullValidator(company.exchange_company_detail, 'website', null);
  return (
    <div className="ecMainCompanyRightDetailColumn">
      <div className="ecMainCompanyRightDetailColumn__phone">
        <span>{translate("company.phone")}: </span>{nullValidator(company.exchange_company_detail, 'phone', '--//--')}
      </div>
      <div className="ecMainCompanyRightDetailColumn__website">
        <span>{translate("company.website")}: </span>
        {websiteLink ? <a href={websiteLink} target="_blank">{websiteLink}</a> : '--//--'}
      </div>
    </div>
  );
}

export default function EcMainCompanyDetail({ filteredCurrency, company, translate }) {
  return (
    <div className="ecMainCompanyDetail">
      <div className="ecMainCompanyDetail__column ecMainCompanyDetail__column--left">
        <EcMainCompanyLeftDetailColumn
          workingTime={nullValidator(company, 'exchange_company_working_time', {})}
          translate={translate}
        />
      </div>
      <div className="ecMainCompanyDetail__column ecMainCompanyDetail__column--right">
        <EcMainCompanyRightDetailColumn
          company={company}
          translate={translate}
        />
      </div>
    </div>
  );
}