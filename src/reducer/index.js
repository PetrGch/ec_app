import {combineReducers} from 'redux';
import admin from './admin';
import ecHomePage from "./ecHomePage";

const rootReducer = combineReducers({
  admin,
  ecHomePage
});

export default rootReducer;