import { combineReducers } from 'redux';

import companies from './companies';
import company from './company';
import rout from './rout';
import load from './load';

const rootReducer = combineReducers({
  companies,
  company,
  rout,
  load
});

export default rootReducer;