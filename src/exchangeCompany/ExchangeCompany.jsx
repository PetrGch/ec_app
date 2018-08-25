import React from 'react';
import {Route, Switch} from "react-router-dom";

import NotFound from "../common/404/NotFound";
import EcHomePage from "./EcHomePage/EcHomePage";

export default class ExchangeCompany extends React.PureComponent {
  render() {
    return (
      <div className="exchangeCompany">
        <Switch>
          <Route path="/" exact component={EcHomePage} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    );
  }
}