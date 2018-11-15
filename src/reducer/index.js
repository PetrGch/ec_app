import { combineReducers } from 'redux';

import companies from './companies';
import company from './company';
import rout from './rout';

const rootReducer = combineReducers({
  companies,
  company,
  rout
});

export default rootReducer;