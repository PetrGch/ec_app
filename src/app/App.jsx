import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import EcCompany from "../exchangeCompany/EcCompany/ecCompanyContainer";
import NotFound from "../common/404/NotFound";
import EcHomePage from "../exchangeCompany/EcHomePage/ecHomePageContainer";
import EcHeader from "../exchangeCompany/EcHeader/EcHeaderContainer";
import EcFooter from "../exchangeCompany/EcFooter/EcFooter";

import './app.less';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.contentRef = React.createRef();
  }

  render() {
    return (
      <div className="app">
        <EcHeader contentRef={this.contentRef}/>
        <div className="app__content" ref={this.contentRef}>
          <Switch>
            <Route exact path="/" component={EcHomePage} />
            <Route path="/company/:branch_name" exact component={EcCompany} />
            <Route component={NotFound}/>
          </Switch>
        </div>
        <EcFooter contentRef={this.contentRef}/>
      </div>
    );
  }
}

export default withRouter(App);
