import React from 'react';
import {translate} from "react-i18next";

import EcBaseCurrency from "./EcBaseCurrency/EcBaseCurrency";

import './ecSideBar.less';

function EcSideBar(props) {
  const {isBuyStatus, centralBankEurUsd, isLoading, t} = props;

  return (
    <aside className="ecSideBar">
      <EcBaseCurrency
        isBuyStatus={isBuyStatus}
        centralBankEurUsd={centralBankEurUsd}
        isLoading={isLoading}
        translate={t}
      />
    </aside>
  );
};

export default translate('common')(EcSideBar);
