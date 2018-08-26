import React from 'react';
import EcMainContent from './EcMainContent/EcMainContent';
import EcSideBar from './EcSideBar/EcSideBar';

import './ecContent.less';

export default class EcContent extends React.PureComponent {
  render() {
    return (
      <content className="ecContent">
        <EcMainContent/>
        <EcSideBar/>
      </content>
    );
  }
}