import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, withRouter} from 'react-router-dom';
import {notification} from 'antd';

import ExchangeCompany from '../exchangeCompany/ExchangeCompany';
import Login from '../common/AA/Login';
import Admin from '../admin/Admin';
import PrivateRoute from '../router/PrivateRoute';
import NotFound from '../common/404/NotFound';
import {getCurrentUser} from '../common/util/APIUtil';
import LoadingIndicator from '../common/LoadingIndicator';
import {ACCESS_TOKEN} from '../common/util/AppConstance';

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: true,
      isLoading: false,
      currentUser: null
    };

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });

    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentUser(resolve, reject) {
    this.setState({
      isLoading: true
    });
    getCurrentUser()
      .then(response => {
        resolve && resolve();
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      })
      .catch(() => {
        reject && reject();
        this.setState({
          isLoading: false
        });
    });
  }

  handleLogin() {
    this.loadCurrentUser(() => {
      notification.success({
        message: 'EC App',
        description: 'You\'re successfully logged in.',
      });
      this.props.history.push('/admin');
    });
  }

  handleLogout(redirectTo = '/', notificationType = 'success', description = 'You\'re successfully logged out.') {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'EC App',
      description: description,
    });
  }

  render() {
    const {isAuthenticated, isLoading} = this.state;

    if (isLoading) {
      return <LoadingIndicator />;
    }
    return (
      <Switch>
        <Route path="/" exact component={ExchangeCompany} />
        <Route path="/admin/login"
               render={(props) => <Login onLogin={this.handleLogin} {...props} />}
        />
        <PrivateRoute path="/admin" authenticated={isAuthenticated} component={Admin}
                      onLogout={this.handleLogout} />
        <Route component={NotFound} />
      </Switch>
    );  }
}

App.propTypes = {
  history: PropTypes.object
};

export default withRouter(App);
