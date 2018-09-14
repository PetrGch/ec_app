import React from 'react';

import ExpandCollapseWrapper from "../ExpandCollapseWrapper/ExpandCollapseWrapper";

import './ecMainCompanyMap.less';

export default class EcMainCompanyMap extends React.PureComponent {
  get address() {
    const { company } = this.props;
    return (company && company.address) || '--//--';
  }

  render() {
    return (
      <div className="ecMainCompanyMap">
        <div className="ecMainCompanyMap__address">
          <span>Address: {this.address}</span>
        </div>
        <div className="ecMainCompanyMap__map">
          <ExpandCollapseWrapper name="Map">

          </ExpandCollapseWrapper>
        </div>
      </div>
    );
  }
}