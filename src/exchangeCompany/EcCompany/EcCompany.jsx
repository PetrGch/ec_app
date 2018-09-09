import React from 'react';

export default class EcCompany extends React.PureComponent {
  render() {
    const { match: { params } } = this.props;

    return (
      <div>
        <h2>Company {params.name}</h2>
      </div>
    );
  }
}
