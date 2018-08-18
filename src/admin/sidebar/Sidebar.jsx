import React from 'react';
import {Layout, Menu, Icon, Button} from "antd";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";

import './sidebar.less';

const {SubMenu, Item} = Menu;
const {Sider} = Layout;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  handleOnSelect({key}) {
    const {history, onLogout} = this.props;
    switch (key) {
      case "company":
      case "currency":
      case "parser":
      case "commentary":
        history.push(`/admin/${key}`);
        break;
      case "logout":
        onLogout('/');
        break;
    }
  }

  render() {
    return (
      <Sider width={260} className="adminSideBar">
        <Menu
          theme="dark"
          mode="inline"
          onSelect={this.handleOnSelect}
        >
          <SubMenu
            key="sub1"
            title={<span><Icon type="credit-card"/>Exchange Company</span>}
          >
            <Item key="company">Company</Item>
            <Item key="currency">Currency</Item>
            <Item key="parser">Parser</Item>
            <Item key="commentary">Commentaries</Item>
          </SubMenu>
          <Item key="logout">Log out</Item>
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  history: PropTypes.object,
  onLogout: PropTypes.func.isRequired
};

export default withRouter(Sidebar);