import React from 'react';
import PropTypes from 'prop-types';
import {Layout} from 'antd';
import {Route, Switch, withRouter} from 'react-router-dom';

import PreviewAdminPage from './content/PreviewAdminPage';
import CompanyContainer from './content/company/CompanyContainer';
import CurrencyContainer from './content/currency/CurrencyContainer';
import ParserContainer from './content/parser/ParserContainer';
import CommentaryContainer from './content/commentary/CommentaryContainer';
import EditedCompanyContainer from './content/editedCompany/EditedCompanyContainer';
import EditedCurrencyContainer from './content/editedCurrency/EditedCurrencyContainer';
import EditedParserContainer from './content/editedParser/EditedParserContainer';
import EditedCommentaryContainer from './content/editedCommentary/EditedCommentaryContainer';
import NewCompanyContainer from './content/newCompany/NewCompanyContainer';
import NotFound from '../common/404/NotFound';
import Sidebar from "./sidebar/Sidebar";

import './admin.less';

const { Content } = Layout;

class Admin extends React.PureComponent {
  render() {
    const { onLogout } = this.props;

    return (
      <Layout className="adminPage">
        <Sidebar onLogout={onLogout} />
        <Content className="adminPage__content">
          <Switch>
            <Route path="/admin" exact component={PreviewAdminPage} />
            <Route path="/admin/company" exact component={CompanyContainer} />
            <Route path="/admin/company/:id" exact component={EditedCompanyContainer} />
            <Route path="/admin/newcompany" exact component={NewCompanyContainer} />
            <Route path="/admin/currency" exact component={CurrencyContainer} />
            <Route path="/admin/currency/:id" exact component={EditedCurrencyContainer} />
            <Route path="/admin/parser" exact component={ParserContainer} />
            <Route path="/admin/parser/:id" exact component={EditedParserContainer} />
            <Route path="/admin/commentary" exact component={CommentaryContainer} />
            <Route path="/admin/commentary/:id" exact component={EditedCommentaryContainer} />
            <Route component={NotFound}/>
          </Switch>
        </Content>
      </Layout>
    );
  }
}

Admin.propTypes = {
  onLogout: PropTypes.func.isRequired
};

export default withRouter(Admin);