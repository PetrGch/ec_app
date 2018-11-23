import React from 'react';
import {withRouter} from "react-router-dom";
import {translate} from "react-i18next";

import {ecCurrencyMainTableConfig} from "./ecCurrencyMainTableConfig";
import {Button, Checkbox, Grid, Input} from "../../../../common/controlLib";
import {
  filterByName,
  sortByGeolocation,
  sortedByPrice,
  sortedWithField
} from "./ecCurrencyMainTableUtil";
import {defineLocation} from "../../../../common/util/geolocation";

import './ecCurrencyMainTable.less';

class EcCurrencyMainTable extends React.PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { isBuyStatus, filteredCurrencies } = nextProps;

    if (prevState.companyFilterName === ''
      && ((isBuyStatus !== prevState.isBuyStatus) || JSON.stringify(filteredCurrencies) !== JSON.stringify(prevState.records))) {
      return {
        isBuyStatus,
        records: sortedByPrice(filteredCurrencies, true, isBuyStatus)
      }
    }
    return null;
  }

  constructor(props) {
    super(props);

    this.state = {
      isIncreaseNameSort: false,
      isIncreasePriceSort: true,
      isIncreaseRecommendedSort: false,
      isIncreaseGeolocationSort: false,
      companyFilterName: "",
      isBuyStatus: true,
      records: []
    };

    this.sortRowsByName = this.sortRowsByName.bind(this);
    this.sortRowsByPrice = this.sortRowsByPrice.bind(this);
    this.sortRowsByPriceOnlyBest = this.sortRowsByPriceOnlyBest.bind(this);
    this.sortRowsByRecommended = this.sortRowsByRecommended.bind(this);
    this.sortRowsByGeolocation = this.sortRowsByGeolocation.bind(this);
    this.filterRowsByName = this.filterRowsByName.bind(this);
    this.onNameClick = this.onNameClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { companyFilterName } = this.state;
    const { isBuyStatus, filteredCurrencies } = this.props;

    if (companyFilterName !== prevState.companyFilterName) {
      this.setState({
        records: filterByName(sortedByPrice(filteredCurrencies, true, isBuyStatus), prevState.companyFilterName)
      });
    }
  }

  sortRowsByName() {
    const { isIncreaseNameSort, records } = this.state;
    this.setState({
      isIncreasePriceSort: false,
      isIncreaseRecommendedSort: false,
      isIncreaseGeolocationSort: false,
      isIncreaseNameSort: !isIncreaseNameSort,
      records: sortedWithField(records, !isIncreaseNameSort, "company_name")
    });
  }

  sortRowsByPrice() {
    const { isIncreasePriceSort, records } = this.state;
    const { isBuyStatus } = this.props;
    this.setState({
      isIncreaseNameSort: false,
      isIncreaseRecommendedSort: false,
      isIncreaseGeolocationSort: false,
      isIncreasePriceSort: !isIncreasePriceSort,
      records: sortedByPrice(records, !isIncreasePriceSort, isBuyStatus)
    });
  }

  sortRowsByPriceOnlyBest() {
    const { records } = this.state;
    const { isBuyStatus } = this.props;
    this.setState({
      isIncreaseNameSort: false,
      isIncreaseRecommendedSort: false,
      isIncreaseGeolocationSort: false,
      isIncreasePriceSort: true,
      records: sortedByPrice(records, true, isBuyStatus)
    });
  }

  sortRowsByRecommended() {
    const { records } = this.state;
    this.setState({
      isIncreasePriceSort: false,
      isIncreaseNameSort: false,
      isIncreaseGeolocationSort: false,
      isIncreaseRecommendedSort: true,
      records: sortedWithField(records, false, "rating")
    });
  }

  sortRowsByGeolocation(event) {
    const { checked } = event.target;
    const { isBuyStatus } = this.props;
    const { records } = this.state;
    if (checked) {
      const location = defineLocation();
      location
        .then((position) => {
          this.setState({
            isIncreasePriceSort: false,
            isIncreaseNameSort: false,
            isIncreaseRecommendedSort: false,
            isIncreaseGeolocationSort: true,
            records: sortByGeolocation(records, position.coords.latitude, position.coords.longitude)
          });
        }, (error) => {
          console.error(error)
        });
      return location
    } else {
      this.setState({
        isIncreaseNameSort: false,
        isIncreaseRecommendedSort: false,
        isIncreaseGeolocationSort: false,
        isIncreasePriceSort: true,
        records: sortedByPrice(records, true, isBuyStatus)
      });
    }
  }

  filterRowsByName(event) {
    const { value } = event.target;
    const { records } = this.state;

    this.setState({
      records: filterByName(records, value),
      companyFilterName: value
    });
  }

  onNameClick(record) {
    const { onNameClick } = this.props;
    onNameClick(record)
  }

  render() {
    const { currencyAmount, selectedCurrency, t } = this.props;
    const {
      records,
      isIncreasePriceSort,
      isIncreaseGeolocationSort,
      companyFilterName,
      isBuyStatus
    } = this.state;

    return (
      <div className="ecCurrencyMainTable">
        <div className="ecCurrencyMainTable__gridPanel ecCurrencyMainTableGridPanel">
          <div className="ecCurrencyMainTableGridPanel--position-left">
            {/*<Button*/}
              {/*isActive={isIncreaseRecommendedSort}*/}
              {/*onClick={this.sortRowsByRecommended}*/}
            {/*>Recommended</Button>*/}
            <Button
              isActive={isIncreasePriceSort}
              onClick={this.sortRowsByPriceOnlyBest}
            >{t("companies.bestRate")}</Button>
            <Checkbox
              checked={isIncreaseGeolocationSort}
              onChange={this.sortRowsByGeolocation}
            >{t("companies.closeToMe")}</Checkbox>
          </div>
          <div className="ecCurrencyMainTableGridPanel--position-right">
            <Input
              type="text"
              value={companyFilterName}
              placeholder={t("companies.filterBuyName")}
              onChange={this.filterRowsByName}
            />
          </div>
        </div>
        <Grid
          isHeader
          stripe
          records={records}
          config={ecCurrencyMainTableConfig(
            isBuyStatus,
            currencyAmount,
            selectedCurrency,
            this.sortRowsByName,
            this.sortRowsByPrice,
            this.onNameClick,
            t
          )}
        />
      </div>
    );
  }
}

export default translate('common')(withRouter(EcCurrencyMainTable));