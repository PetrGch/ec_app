import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, authenticated, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...rest} {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/admin/login',
            state: {from: props.location}
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func,
  authenticated: PropTypes.bool,
  location: PropTypes.object
};

export default PrivateRoute;