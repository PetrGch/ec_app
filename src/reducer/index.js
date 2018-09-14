import {combineReducers} from 'redux';
import admin from './admin';
import companies from './companies';
import company from './company';

const rootReducer = combineReducers({
  admin,
  companies,
  company
});

export default rootReducer;