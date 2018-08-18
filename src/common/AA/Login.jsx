import React from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Button, Icon, notification, Row, Col} from 'antd';

import {login} from '../util/APIUtil';
import {ACCESS_TOKEN} from '../util/AppConstance';

import './login.less';

const FormItem = Form.Item;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            this.props.onLogin();
          })
          .catch(error => {
            this.props.onLogin();
            if (error.status === 401) {
              notification.error({
                message: 'EC',
                description: 'Your Username or Password is incorrect. Please try again!'
              });
            } else {
              notification.error({
                message: 'EC',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
              });
            }
          });
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('usernameOrEmail', {
            rules: [{required: true, max: 40, message: 'Please input your username or email!'}],
          })(
            <Input
              prefix={<Icon type="user"/>}
              size="large"
              name="usernameOrEmail"
              placeholder="Username or Email"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, max: 100, min: 2, message: 'Please input your Password!'}],
          })(
            <Input
              prefix={<Icon type="lock"/>}
              size="large"
              name="password"
              type="password"
              placeholder="Password"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
        </FormItem>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  form: PropTypes.object,
  onLogin: PropTypes.func
};


const Login = (props) => {
  const {onLogin} = props;
  const AntWrappedLoginForm = Form.create()(LoginForm);
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      className="loginPage"
    >
      <div>
        <h1>Login</h1>
        <AntWrappedLoginForm onLogin={onLogin}/>
      </div>
    </Row>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func
};

export default Login;

