import React from 'react';
import moment from 'moment';
import {Col, Row, TimePicker} from 'antd';

import {changeWorkingTimeValue} from '../../../../../action/companyMainInfo';
import {workingTimeDays} from './workingTimeDays';

import './workingTime.less';

function nullValidator(field, subField) {
  if (field && field[subField]) {
    return moment(field[subField], 'HH:mm:ss');
  }
  return null;
}

export default class WorkingTime extends React.Component {
  constructor(props) {
    super(props);

    this.handleWorkingTimeChange = this.handleWorkingTimeChange.bind(this);
  }

  handleWorkingTimeChange(timeMoment, time, fieldName) {
    const { dispatch, companyId, isNewCompany } = this.props;
    dispatch(changeWorkingTimeValue(companyId, fieldName, time, isNewCompany));
  }

  get getWorkingTimeRow() {
    const { workingTime } = this.props;

    return workingTimeDays.map((day, index) => {
      const valueFrom = nullValidator(workingTime, day.typeFrom);
      const valueTo = nullValidator(workingTime, day.typeTo);
      return (
        <Row key={index} type="flex" justify="space-between" align="middle">
          <Col span={4}>{day.titleFrom}{day.isRequired ? '*' : ''}:</Col>
          <Col span={7}>
            <TimePicker
              value={valueFrom}
              minuteStep={15}
              secondStep={10}
              onChange={(moment, time) => {this.handleWorkingTimeChange(moment, time, day.typeFrom);}}
            />
          </Col>
          <Col span={4}>{day.titleTo}{day.isRequired ? '*' : ''}:</Col>
          <Col span={7}>
            <TimePicker
              value={valueTo}
              minuteStep={15}
              secondStep={10}
              onChange={(moment, time) => {this.handleWorkingTimeChange(moment, time, day.typeTo);}}
            />
          </Col>
        </Row>
      );
    });
  }

  render() {
    return (
      <div className="workingTime">
        {this.getWorkingTimeRow}
      </div>
    );
  }
}