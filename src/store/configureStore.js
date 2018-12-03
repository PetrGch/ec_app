import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  if (NODE_ENV === "development") {
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
      )
    );
  }
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware
    )
  );
}

export const initialStore = {
  companies: {
    currencyAmount: 100,
    isBuyStatus: true,
    companies: [],
    currencyTypes: [],
    selectedCurrency: 'EUR',
    filteredCurrencies: [],
    currencyMark: "€"
  },
  company: {
    currencyAmount: 100,
    isBuyStatus: true,
    company: null,
    selectedCompanyCurrency: null,
    filteredCurrency: null
  },
  rout: {
    homeRout: '/',
    branchRout: null
  },
  load: {
    isCompaniesLoading: false,
    isCompanyLoading: false,
    isCentralBankLoading: false
  }
};
