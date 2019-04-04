import React from 'react';
import {withRouter} from "react-router-dom";
import {translate} from "react-i18next";

import {ecCurrencyMainTableConfig} from "./ecCurrencyMainTableConfig";
import {Button, Checkbox, Grid, Input} from "../../../../common/controlLib";
import {changePage, filterCompanyByName, setSortingType} from "../../../../action/companies";
import {sortingType} from "../../../../constant/companies";
import {defineLocation} from "../../../../common/util/geolocation";

import './ecCurrencyMainTable.less';

function PaginationItems({ currentPage, amountOfPage, changePage }) {
  const pageItems = [];

  for (let i = 1; i <= amountOfPage; i++) {
    const changeSelectedPage = () => {
      changePage(i);
    };
    pageItems.push((
      <li
        key={i}
        className={`pagination__item ${currentPage === i ? "pagination__item--active" : ""}`}
        onClick={changeSelectedPage}
      >
        {i}
      </li>
    ))
  }

  return pageItems;
}

function Pagination({ currentPage, amountOfPage, changePage }) {
  if (!amountOfPage || amountOfPage === 1) {
    return null;
  }

  return (
    <ul className="pagination">
      <PaginationItems
        currentPage={currentPage}
        amountOfPage={amountOfPage}
        changePage={changePage}
      />
    </ul>
  )
}

class EcCurrencyMainTable extends React.PureComponent {
  constructor(props) {
    super(props);

    this.sortRowsByName = this.sortRowsByName.bind(this);
    this.sortRowsByPrice = this.sortRowsByPrice.bind(this);
    this.sortRowsByPriceOnlyBest = this.sortRowsByPriceOnlyBest.bind(this);
    this.sortRowsByGeolocation = this.sortRowsByGeolocation.bind(this);
    this.filterRowsByName = this.filterRowsByName.bind(this);
    this.onNameClick = this.onNameClick.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  sortRowsByName() {
    const { dispatch, sortType } = this.props;
    const currentNameSorting = sortType === sortingType.NAME
      ? sortingType.HIGH_PRICE : sortingType.NAME;

    dispatch(setSortingType(currentNameSorting));
  }

  sortRowsByPrice() {
    const { dispatch, sortType } = this.props;
    const currentPriceSorting = sortType === sortingType.HIGH_PRICE
      ? sortingType.LOW_PRICE : sortingType.HIGH_PRICE;

    dispatch(setSortingType(currentPriceSorting));
  }

  sortRowsByPriceOnlyBest() {
    const { dispatch, sortType } = this.props;

    if (sortType !== sortingType.HIGH_PRICE) {
      dispatch(setSortingType(sortingType.HIGH_PRICE));
    }
  }

  sortRowsByGeolocation(event) {
    const { checked } = event.target;
    const { dispatch } = this.props;

    if (checked) {
      return defineLocation()
        .then((position) => {
          dispatch(setSortingType(sortingType.GEOLOCATION, { position }));
        }, (error) => {
          console.error(error)
        });
    }

    dispatch(setSortingType(sortingType.HIGH_PRICE));
  }

  filterRowsByName(event) {
    const { value } = event.target;
    const { dispatch } = this.props;

    dispatch(filterCompanyByName(value));
  }

  onNameClick(record) {
    const { onNameClick } = this.props;
    onNameClick(record)
  }

  changePage(selectedPageNumber) {
    const { dispatch, currentPage } = this.props;

    if (currentPage !== selectedPageNumber) {
      dispatch(changePage(selectedPageNumber));
    }
  }

  render() {
    const {
      currencyAmount,
      selectedCurrency,
      records,
      isBuyStatus,
      sortType,
      filteringNameValue,
      currentPage,
      amountOfPage,
      t
    } = this.props;

    return (
      <div className="ecCurrencyMainTable">
        <div className="ecCurrencyMainTable__gridPanel ecCurrencyMainTableGridPanel">
          <div className="ecCurrencyMainTableGridPanel--position-left">
            <Button
              isActive={sortType === sortingType.HIGH_PRICE}
              onClick={this.sortRowsByPriceOnlyBest}
            >{t("companies.bestRate")}</Button>
            <Checkbox
              checked={sortType === sortingType.GEOLOCATION}
              onChange={this.sortRowsByGeolocation}
            >{t("companies.closeToMe")}</Checkbox>
          </div>
          <div className="ecCurrencyMainTableGridPanel--position-right">
            <Input
              type="text"
              value={filteringNameValue}
              placeholder={t("companies.filterBuyName")}
              onChange={this.filterRowsByName}
            />
          </div>
        </div>
        <Grid
          isHeader
          stripe
          records={records}
          primaryKey="uuid"
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
        <div className="ecCurrencyMainTable__pagination">
          <Pagination
            currentPage={currentPage}
            amountOfPage={amountOfPage}
            changePage={this.changePage}
          />
        </div>
      </div>
    );
  }
}

export default translate('common')(withRouter(EcCurrencyMainTable));