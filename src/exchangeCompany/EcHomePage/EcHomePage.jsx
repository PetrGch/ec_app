import React from 'react';
import EcHeader from './EcHeader/EcHeader';
import EcContent from './EcContent/ecContentContainer';

export default class EcHomePage extends React.PureComponent {
  render() {
    return (
      <div>
        <EcHeader/>
        <EcContent/>
      </div>
    );
  }
}