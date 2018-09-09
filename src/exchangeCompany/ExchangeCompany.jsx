import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NotFound from '../common/404/NotFound';
import EcHomePage from './EcHomePage/ecHomePageContainer';
import EcHeader from "./EcHeader/EcHeader";
import EcFooter from "./EcFooter/EcFooter";
import EcCompany from "./EcCompany/EcCompany";

import './ecExchangeCompany.less';

export default class ExchangeCompany extends React.PureComponent {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
  }
  render() {
    return (
      <div className="ecExchangeCompany">
        <EcHeader contentRef={this.contentRef}/>
        <div className="ecExchangeCompany__content" ref={this.contentRef}>
          <Switch>
            <Route path="/" exact component={EcHomePage} />
            <Route path="/company/:name" component={EcCompany} />
            <Route component={NotFound}/>
          </Switch>
        </div>
        <EcFooter contentRef={this.contentRef}/>
      </div>
    );
  }
}