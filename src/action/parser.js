import {CHANGE_PARSER_VALUE, SET_INITIAL_PARSER_STATE} from "../constant/parser";

export function changeParserValue(companyId, fieldName, value) {
  return {
    type: CHANGE_PARSER_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value
  }
}

export function setInitialParserState(companyId, initialParserData) {
  return {
    type: SET_INITIAL_PARSER_STATE,
    companyId, companyId,
    initialParserData: initialParserData
  }
}
