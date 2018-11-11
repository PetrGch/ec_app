import React from 'react';
import {withRouter} from "react-router-dom";

import {ecCurrencyMainTableConfig} from "./ecCurrencyMainTableConfig";
import {Button, Checkbox, Grid, Input} from "../../../../common/controlLib";
import {
  filterByCurrency,
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

    if (filteredCurrencies && (prevState.isIncreasePriceSort || isBuyStatus !== prevState.isBuyStatus)) {
      return {
        ...prevState,
        isBuyStatus,
        records: filterByName(sortedByPrice(filteredCurrencies, true, isBuyStatus), prevState.companyFilterName)
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
    this.knowMore = this.knowMore.bind(this);
  }

  knowMore(id, name) {
    const { history } = this.props;
    history.push(`/company/${name}`);
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
    const { records, isBuyStatus } = this.props;
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
    const { records } = this.props;

    this.setState({
      records: filterByName(records, value),
      companyFilterName: value
    });
  }

  render() {
    const { currencyAmount, selectedCurrency } = this.props;
    const {
      records,
      isIncreasePriceSort,
      isIncreaseRecommendedSort,
      isIncreaseGeolocationSort,
      companyFilterName,
      isBuyStatus
    } = this.state;

    return (
      <div className="ecCurrencyMainTable">
        <div className="ecCurrencyMainTable__gridPanel ecCurrencyMainTableGridPanel">
          <div className="ecCurrencyMainTableGridPanel--position-left">
            <Button
              isActive={isIncreaseRecommendedSort}
              onClick={this.sortRowsByRecommended}
            >Recommended</Button>
            <Button
              isActive={isIncreasePriceSort}
              onClick={this.sortRowsByPriceOnlyBest}
            >Best rate</Button>
            <Checkbox
              checked={isIncreaseGeolocationSort}
              onChange={this.sortRowsByGeolocation}
            >Close to me</Checkbox>
          </div>
          <div className="ecCurrencyMainTableGridPanel--position-right">
            <Input
              type="text"
              value={companyFilterName}
              placeholder="Filter by name"
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
            this.knowMore,
            this.sortRowsByName,
            this.sortRowsByPrice
          )}
        />
      </div>
    );
  }
}

export default withRouter(EcCurrencyMainTable);