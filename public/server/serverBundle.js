/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 25);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var API_URL = exports.API_URL = 'http://excurrate.com:8080/ec/api';
var ACCESS_TOKEN = exports.ACCESS_TOKEN = 'accessToken';

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = exports.TEXT_RES_TYPE = exports.JSON_RES_TYPE = undefined;
exports.getCurrentUser = getCurrentUser;
exports.login = login;

var _AppConstance = __webpack_require__(3);

var JSON_RES_TYPE = exports.JSON_RES_TYPE = "json";
var TEXT_RES_TYPE = exports.TEXT_RES_TYPE = "text";

var request = exports.request = function request(options) {
  var resType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON_RES_TYPE;

  var headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  });

  if (localStorage.getItem(_AppConstance.ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer ' + localStorage.getItem(_AppConstance.ACCESS_TOKEN));
  }

  var defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(function (response) {
    if (resType === TEXT_RES_TYPE) {
      return response.text().then(function (text) {
        if (!response.ok) {
          return Promise.reject(text);
        }
        return text;
      });
    }
    return response.json().then(function (json) {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
  });
};

function getCurrentUser() {
  if (!localStorage.getItem(_AppConstance.ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return request({
    url: _AppConstance.API_URL + '/user/me',
    method: 'GET'
  });
}

function login(loginRequest) {
  return request({
    url: _AppConstance.API_URL + '/auth/signin',
    method: 'POST',
    body: JSON.stringify(loginRequest)
  });
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("antd/lib/index");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCompanyById = deleteCompanyById;
exports.getAllCompanies = getAllCompanies;

var _admin = __webpack_require__(14);

var _APIUtil = __webpack_require__(5);

var _AppConstance = __webpack_require__(3);

function deleteCompanyById(companyId) {
  return function (dispatch) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/company/" + companyId,
      method: 'DELETE'
    }).then(function () {
      dispatch({
        type: _admin.DELETE_COMPANY_BY_ID,
        companyId: companyId
      });
    });
  };
}

function getAllCompanies() {
  return function (dispatch) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/company",
      method: 'GET'
    }).then(function (companies) {
      dispatch({
        type: _admin.GET_ALL_COMPANIES,
        companies: companies
      });
    });
  };
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockData = exports.companyColumnConfig = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _Actions = __webpack_require__(44);

var _Actions2 = _interopRequireDefault(_Actions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var companyColumnConfig = exports.companyColumnConfig = function companyColumnConfig(dispatch) {
  return [{
    key: "name",
    title: "Company name",
    dataIndex: "name",
    render: function render(text, record) {
      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/admin/company/" + record.id },
        text
      );
    }
  }, {
    key: "address",
    title: "Address",
    dataIndex: "address"
  }, {
    key: "createdAt",
    title: "Created at",
    dataIndex: "createdAt"
  }, {
    key: "updatedAt",
    title: "Updated at",
    dataIndex: "updatedAt"
  }, {
    title: "Actions",
    dataIndex: "actions",
    render: function render(text, record) {
      return _react2.default.createElement(_Actions2.default, { record: record, dispatch: dispatch });
    }
  }];
};

var mockData = exports.mockData = [{
  "id": 1,
  "key": "f08f61b2-bc76-4919-ab04-1a033eeb6b8e",
  "uniqueId": "f08f61b2-bc76-4919-ab04-1a033eeb6b8e",
  "name": "company test 1",
  "coordinateX": "111111.111",
  "coordinateY": "111111.111",
  "address": "address",
  "rating": 3.5,
  "createdAt": "2018-07-08T14:55:28Z",
  "updatedAt": "2018-07-08T14:55:28Z",
  "exchangeCompanyDetail": {
    "description": "long long description",
    "phone": "234234234",
    "website": "some.com",
    "email": "some@gmail.com",
    "exchangeCompany": null
  },
  "workingTime": {
    "mnFrom": "12:00:00",
    "mnTo": "18:00:00",
    "tuFrom": "12:00:00",
    "tuTo": "18:00:00",
    "weFrom": "12:00:00",
    "weTo": "18:00:00",
    "thFrom": "12:00:00",
    "thTo": "18:00:00",
    "frFrom": "12:00:00",
    "frTo": "18:00:00",
    "stFrom": "12:00:00",
    "stTo": "18:00:00",
    "snFrom": "12:00:00",
    "snTo": "18:00:00"
  },
  "comments": [{
    "id": 1,
    "name": "name 1",
    "title": "title 1",
    "text": "Long long comment",
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z",
    "dislike": true,
    "liked": false
  }, {
    "id": 2,
    "name": "name 1",
    "title": "title 1",
    "text": "Long long comment",
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z",
    "dislike": false,
    "liked": true
  }, {
    "id": 3,
    "name": "name 1",
    "title": "title 1",
    "text": "Long long comment",
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z",
    "dislike": false,
    "liked": true
  }, {
    "id": 4,
    "name": "name 1",
    "title": "title 1",
    "text": "Long long comment Long long comment Long long comment Long long comment Long long comment",
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z",
    "dislike": false,
    "liked": true
  }],
  "currencyRates": [{
    "id": 1,
    "currencyName": "Euro",
    "currencyType": "EUR",
    "buyPrice": 123.23,
    "sellPrice": 133.23,
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z"
  }, {
    "id": 2,
    "currencyName": "Dollar",
    "currencyType": "USD",
    "buyPrice": 123.23,
    "sellPrice": 133.23,
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z"
  }, {
    "id": 3,
    "currencyName": "Funt",
    "currencyType": "GBR",
    "buyPrice": 123.23,
    "sellPrice": 133.23,
    "createdAt": "2018-07-08T14:55:28Z",
    "updatedAt": "2018-07-08T14:55:28Z"
  }],
  "exchangeCompanyParseData": {
    "url": "someCompany.com",
    "parameters": "parameters",
    "rowSelector": "rowSelector",
    "currencyAmountSelector": "currencyAmountSelector",
    "currencyTypeSelector": "currencyTypeSelector",
    "buySelector": "buySelector",
    "sellSelector": "sellSelector",
    "active": false
  }
}];

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeCompanyMainInfoValue = changeCompanyMainInfoValue;
exports.setInitialCompanyMainInfoState = setInitialCompanyMainInfoState;
exports.changeWorkingTimeValue = changeWorkingTimeValue;

var _companyMainInfo = __webpack_require__(16);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function changeCompanyMainInfoValue(companyId, fieldName, value) {
  var isNewCompany = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  return {
    type: _companyMainInfo.CHANGE_COMPANY_MAIN_INFO_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value,
    isNewCompany: isNewCompany
  };
}

function setInitialCompanyMainInfoState(companyId, companyMainInfo) {
  var _ref;

  var isNewCompany = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  return _ref = {
    type: _companyMainInfo.SET_INITIAL_COMPANY_MAIN_INFO_STATE,
    companyId: companyId }, _defineProperty(_ref, "companyId", companyId), _defineProperty(_ref, "companyMainInfo", companyMainInfo), _defineProperty(_ref, "isNewCompany", isNewCompany), _ref;
}

function changeWorkingTimeValue(companyId, fieldName, value) {
  var isNewCompany = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  return {
    type: _companyMainInfo.CHANGE_WORKING_TIME_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value,
    isNewCompany: isNewCompany
  };
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullValidator = nullValidator;
function nullValidator(field, subField) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  return field !== null && field !== undefined ? field[subField] : defaultValue;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(64);

var _validationRules = __webpack_require__(65);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ValidatorInput = function (_React$Component) {
  _inherits(ValidatorInput, _React$Component);

  function ValidatorInput(props) {
    _classCallCheck(this, ValidatorInput);

    var _this = _possibleConstructorReturn(this, (ValidatorInput.__proto__ || Object.getPrototypeOf(ValidatorInput)).call(this, props));

    _this.state = {
      isError: false
    };

    _this.handleValueOnChange = _this.handleValueOnChange.bind(_this);
    _this.handleValueOnBlur = _this.handleValueOnBlur.bind(_this);
    return _this;
  }

  _createClass(ValidatorInput, [{
    key: 'handleValueOnChange',
    value: function handleValueOnChange(event) {
      var _event$target = event.target,
          name = _event$target.name,
          value = _event$target.value;
      var _props = this.props,
          onChange = _props.onChange,
          validationOption = _props.validationOption;


      if (typeof onChange === "function") {
        if (validationOption && (0, _validationRules.validatorForOnChange)(value, validationOption)) {
          onChange(name, value);
        } else if (!validationOption) {
          onChange(name, value);
        }
      }
    }
  }, {
    key: 'handleValueOnBlur',
    value: function handleValueOnBlur(event) {
      var _event$target2 = event.target,
          value = _event$target2.value,
          name = _event$target2.name;
      var validationOption = this.props.validationOption;
      var isError = this.state.isError;

      var invalidFileds = (0, _validationRules.validationForOnBlur)(value, validationOption);

      if (validationOption && !isError && invalidFileds.length !== 0) {
        this.setState({ isError: true });
        validationOption.validateInput(name, true);
      } else if (validationOption && isError && invalidFileds.length === 0) {
        this.setState({ isError: false });
        validationOption.validateInput(name, false);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          InputComponent = _props2.InputComponent,
          value = _props2.value,
          placeholder = _props2.placeholder,
          name = _props2.name,
          rows = _props2.rows;
      var isError = this.state.isError;


      return InputComponent && _react2.default.createElement(
        'div',
        { className: 'validatorInput validatorInput_isError--' + isError },
        _react2.default.createElement(InputComponent, {
          value: value,
          placeholder: placeholder,
          name: name,
          onChange: this.handleValueOnChange,
          onBlur: this.handleValueOnBlur,
          rows: rows
        })
      );
    }
  }]);

  return ValidatorInput;
}(_react2.default.Component);

exports.default = ValidatorInput;


ValidatorInput.defaultProps = { validationOption: {} };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _antd = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
  return _react2.default.createElement(
    'div',
    { className: 'page-not-found' },
    _react2.default.createElement(
      'h1',
      { className: 'title' },
      '404'
    ),
    _react2.default.createElement(
      'div',
      { className: 'desc' },
      'The Page you\'re looking for was not found.'
    ),
    _react2.default.createElement(
      _reactRouterDom.Link,
      { to: '/' },
      _react2.default.createElement(
        _antd.Button,
        { className: 'go-back-btn', type: 'primary', size: 'large' },
        'Go Back'
      )
    )
  );
};

exports.default = NotFound;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DELETE_COMPANY_BY_ID = exports.DELETE_COMPANY_BY_ID = 'DELETE_COMPANY_BY_ID';
var GET_ALL_COMPANIES = exports.GET_ALL_COMPANIES = 'GET_ALL_COMPANIES';

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _companyMainInfo = __webpack_require__(10);

__webpack_require__(59);

var _WorkingTime = __webpack_require__(60);

var _WorkingTime2 = _interopRequireDefault(_WorkingTime);

var _valueValidator = __webpack_require__(11);

var _ValidatorInput = __webpack_require__(12);

var _ValidatorInput2 = _interopRequireDefault(_ValidatorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompanyMainInfo = function (_React$Component) {
  _inherits(CompanyMainInfo, _React$Component);

  function CompanyMainInfo(props) {
    _classCallCheck(this, CompanyMainInfo);

    var _this = _possibleConstructorReturn(this, (CompanyMainInfo.__proto__ || Object.getPrototypeOf(CompanyMainInfo)).call(this, props));

    _this.handleValueOnChange = _this.handleValueOnChange.bind(_this);
    _this.handleOnChangeForRate = _this.handleOnChangeForRate.bind(_this);
    return _this;
  }

  _createClass(CompanyMainInfo, [{
    key: "handleValueOnChange",
    value: function handleValueOnChange(name, value) {
      var _props = this.props,
          dispatch = _props.dispatch,
          companyId = _props.companyId,
          isNewCompany = _props.isNewCompany;

      dispatch((0, _companyMainInfo.changeCompanyMainInfoValue)(companyId, name, value, isNewCompany));
    }
  }, {
    key: "handleOnChangeForRate",
    value: function handleOnChangeForRate(value) {
      var NAME = "rating";
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          companyId = _props2.companyId,
          isNewCompany = _props2.isNewCompany;

      dispatch((0, _companyMainInfo.changeCompanyMainInfoValue)(companyId, NAME, value, isNewCompany));
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props,
          company = _props3.company,
          dispatch = _props3.dispatch,
          isNewCompany = _props3.isNewCompany,
          validateInput = _props3.validateInput;


      return _react2.default.createElement(
        "div",
        { className: "companyMainInfo" },
        _react2.default.createElement(
          _antd.Row,
          { type: "flex", justify: "space-between", align: "middle" },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            "Name*:"
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(company, "name"),
              placeholder: "Company name",
              name: "name",
              onChange: this.handleValueOnChange,
              validationOption: { isRequired: true, length: 120, validateInput: validateInput }
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            "Address:"
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(company, "address"),
              placeholder: "Address company",
              name: "address",
              onChange: this.handleValueOnChange,
              validationOption: { length: 120 }
            })
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          { type: "flex", justify: "space-between", align: "middle" },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            "Coordinate X:"
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(company, "coordinateX"),
              placeholder: "Coordinate X",
              name: "coordinateX",
              onChange: this.handleValueOnChange,
              validationOption: { length: 20, isNumeric: true }
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            "Coordinate Y:"
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(company, "coordinateY"),
              placeholder: "Coordinate Y",
              name: "coordinateY",
              onChange: this.handleValueOnChange,
              validationOption: { length: 20, isNumeric: true }
            })
          )
        ),
        _react2.default.createElement(
          _antd.Row,
          null,
          _react2.default.createElement(_antd.Rate, {
            allowHalf: true,
            value: (0, _valueValidator.nullValidator)(company, "rating", 0),
            onChange: this.handleOnChangeForRate })
        ),
        _react2.default.createElement(_WorkingTime2.default, {
          companyId: company.id,
          dispatch: dispatch,
          isNewCompany: isNewCompany,
          workingTime: (0, _valueValidator.nullValidator)(company, "workingTime")
        })
      );
    }
  }]);

  return CompanyMainInfo;
}(_react2.default.Component);

exports.default = CompanyMainInfo;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_COMPANY_MAIN_INFO_VALUE = exports.CHANGE_COMPANY_MAIN_INFO_VALUE = "CHANGE_COMPANY_MAIN_INFO_VALUE";
var SET_INITIAL_COMPANY_MAIN_INFO_STATE = exports.SET_INITIAL_COMPANY_MAIN_INFO_STATE = "SET_INITIAL_COMPANY_MAIN_INFO_STATE";
var CHANGE_WORKING_TIME_VALUE = exports.CHANGE_WORKING_TIME_VALUE = "CHANGE_WORKING_TIME_VALUE";

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(66);

var _companyDataInfo = __webpack_require__(67);

var _valueValidator = __webpack_require__(11);

var _ValidatorInput = __webpack_require__(12);

var _ValidatorInput2 = _interopRequireDefault(_ValidatorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextArea = _antd.Input.TextArea;

var CompanyDataInfo = function (_React$Component) {
  _inherits(CompanyDataInfo, _React$Component);

  function CompanyDataInfo(props) {
    _classCallCheck(this, CompanyDataInfo);

    var _this = _possibleConstructorReturn(this, (CompanyDataInfo.__proto__ || Object.getPrototypeOf(CompanyDataInfo)).call(this, props));

    _this.handleValueOnChange = _this.handleValueOnChange.bind(_this);
    return _this;
  }

  _createClass(CompanyDataInfo, [{
    key: 'handleValueOnChange',
    value: function handleValueOnChange(name, value) {
      var _props = this.props,
          dispatch = _props.dispatch,
          companyId = _props.companyId,
          isNewCompany = _props.isNewCompany;

      dispatch((0, _companyDataInfo.changeCompanyDataInfoValue)(companyId, name, value, isNewCompany));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          exchangeCompanyDetail = _props2.exchangeCompanyDetail,
          validateInput = _props2.validateInput;


      return _react2.default.createElement(
        'div',
        { className: 'companyDataInfo' },
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', justify: 'space-between', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            'Email:'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(exchangeCompanyDetail, "email"),
              placeholder: 'Email',
              name: 'email',
              validationOption: { length: 50, email: true, validateInput: validateInput },
              onChange: this.handleValueOnChange
            })
          ),
          _react2.default.createElement(_antd.Col, { span: 4 }),
          _react2.default.createElement(_antd.Col, { span: 7 })
        ),
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', justify: 'space-between', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            'Phone:'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(exchangeCompanyDetail, "phone"),
              placeholder: 'Phone',
              name: 'phone',
              validationOption: { length: 20, isNumeric: true },
              onChange: this.handleValueOnChange
            })
          ),
          _react2.default.createElement(_antd.Col, { span: 4 }),
          _react2.default.createElement(_antd.Col, { span: 7 })
        ),
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', justify: 'space-between', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            'Website:'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: _antd.Input,
              value: (0, _valueValidator.nullValidator)(exchangeCompanyDetail, "website"),
              placeholder: 'Website',
              name: 'website',
              validationOption: { length: 50 },
              onChange: this.handleValueOnChange
            })
          ),
          _react2.default.createElement(_antd.Col, { span: 4 }),
          _react2.default.createElement(_antd.Col, { span: 7 })
        ),
        _react2.default.createElement(
          _antd.Row,
          { type: 'flex', justify: 'space-between', align: 'middle' },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            'Description:'
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_ValidatorInput2.default, {
              InputComponent: TextArea,
              value: (0, _valueValidator.nullValidator)(exchangeCompanyDetail, "description"),
              rows: 6,
              name: 'description',
              placeholder: 'Description',
              validationOption: { length: 50 },
              onChange: this.handleValueOnChange
            })
          ),
          _react2.default.createElement(_antd.Col, { span: 4 }),
          _react2.default.createElement(_antd.Col, { span: 7 })
        )
      );
    }
  }]);

  return CompanyDataInfo;
}(_react2.default.Component);

exports.default = CompanyDataInfo;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_COMPANY_DATA_INFO_VALUE = exports.CHANGE_COMPANY_DATA_INFO_VALUE = "CHANGE_COMPANY_DATA_INFO_VALUE";
var SET_INITIAL_COMPANY_DATA_INFO_STATE = exports.SET_INITIAL_COMPANY_DATA_INFO_STATE = "SET_INITIAL_COMPANY_DATA_INFO_STATE";

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectUnselectCurrency = selectUnselectCurrency;
exports.changeCurrencyValue = changeCurrencyValue;
exports.setInitialCurrencyState = setInitialCurrencyState;

var _currencyRate = __webpack_require__(20);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function selectUnselectCurrency(companyId, selectedCurrency) {
  return {
    type: _currencyRate.SELECT_UNSELECT_CURRENCY,
    companyId: companyId,
    currency: selectedCurrency
  };
}

function changeCurrencyValue(companyId, currencyType, fieldName, value) {
  return {
    type: _currencyRate.CHANGE_CURRENCY_VALUE,
    companyId: companyId,
    currencyType: currencyType,
    fieldName: fieldName,
    value: value
  };
}

function setInitialCurrencyState(companyId, initialCurrencyRate) {
  var _ref;

  return _ref = {
    type: _currencyRate.SET_INITIAL_CURRENCY_STATE,
    companyId: companyId }, _defineProperty(_ref, "companyId", companyId), _defineProperty(_ref, "initialCurrencyRate", initialCurrencyRate), _ref;
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var SELECT_UNSELECT_CURRENCY = exports.SELECT_UNSELECT_CURRENCY = "SELECT_UNSELECT_CURRENCY";
var CHANGE_CURRENCY_VALUE = exports.CHANGE_CURRENCY_VALUE = "CHANGE_CURRENCY_VALUE";
var SET_INITIAL_CURRENCY_STATE = exports.SET_INITIAL_CURRENCY_STATE = "SET_INITIAL_CURRENCY_STATE";

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeParserValue = changeParserValue;
exports.setInitialParserState = setInitialParserState;

var _parser = __webpack_require__(22);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function changeParserValue(companyId, fieldName, value) {
  return {
    type: _parser.CHANGE_PARSER_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value
  };
}

function setInitialParserState(companyId, initialParserData) {
  var _ref;

  return _ref = {
    type: _parser.SET_INITIAL_PARSER_STATE,
    companyId: companyId }, _defineProperty(_ref, "companyId", companyId), _defineProperty(_ref, "initialParserData", initialParserData), _ref;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var CHANGE_PARSER_VALUE = exports.CHANGE_PARSER_VALUE = "CHANGE_PARSER_VALUE";
var SET_INITIAL_PARSER_STATE = exports.SET_INITIAL_PARSER_STATE = "SET_INITIAL_PARSER_STATE";

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var DELETE_COMMENTARY_BY_ID = exports.DELETE_COMMENTARY_BY_ID = "DELETE_COMMENTARY_BY_ID";

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(26);

var _path2 = _interopRequireDefault(_path);

var _fs = __webpack_require__(27);

var _fs2 = _interopRequireDefault(_fs);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _express = __webpack_require__(28);

var _express2 = _interopRequireDefault(_express);

var _server = __webpack_require__(29);

var _server2 = _interopRequireDefault(_server);

var _App = __webpack_require__(30);

var _App2 = _interopRequireDefault(_App);

var _reactRouterDom = __webpack_require__(2);

var _configureStore = __webpack_require__(103);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _reactRedux = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 3000;
var store = (0, _configureStore2.default)();

var appDirectory = _fs2.default.realpathSync(process.cwd());
var resolveApp = function resolveApp(relativePath) {
    return _path2.default.resolve(appDirectory, relativePath);
};
var sourceDirectory = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

app.use(_express2.default.static(resolveApp('./public/' + sourceDirectory)));

app.get('/*', function (req, res) {
    console.log(sourceDirectory);
    var context = {};
    var app = _server2.default.renderToString(_react2.default.createElement(
        _reactRedux.Provider,
        { store: store },
        _react2.default.createElement(
            _reactRouterDom.StaticRouter,
            { location: req.url, context: context },
            _react2.default.createElement(_App2.default, null)
        )
    ));
    var indexFile = resolveApp('./public/' + sourceDirectory + '/index.html');
    _fs2.default.readFile(indexFile, 'utf8', function (err, data) {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }

        return res.send(data.replace('<div id="root"></div>', '<div id="root">' + app + '</div>'));
    });
});

app.listen(PORT, function () {
    console.log('\uD83D\uDE0E Server is listening on port ' + PORT);
});

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(2);

var _antd = __webpack_require__(1);

var _ExchangeCompany = __webpack_require__(31);

var _ExchangeCompany2 = _interopRequireDefault(_ExchangeCompany);

var _Login = __webpack_require__(36);

var _Login2 = _interopRequireDefault(_Login);

var _Admin = __webpack_require__(38);

var _Admin2 = _interopRequireDefault(_Admin);

var _PrivateRoute = __webpack_require__(101);

var _PrivateRoute2 = _interopRequireDefault(_PrivateRoute);

var _NotFound = __webpack_require__(13);

var _NotFound2 = _interopRequireDefault(_NotFound);

var _APIUtil = __webpack_require__(5);

var _LoadingIndicator = __webpack_require__(102);

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _AppConstance = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      isAuthenticated: true,
      isLoading: false,
      currentUser: null
    };

    _antd.notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3
    });

    _this.loadCurrentUser = _this.loadCurrentUser.bind(_this);
    _this.handleLogin = _this.handleLogin.bind(_this);
    _this.handleLogout = _this.handleLogout.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: 'loadCurrentUser',
    value: function loadCurrentUser(resolve, reject) {
      var _this2 = this;

      this.setState({
        isLoading: true
      });
      (0, _APIUtil.getCurrentUser)().then(function (response) {
        resolve && resolve();
        _this2.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false
        });
      }).catch(function () {
        reject && reject();
        _this2.setState({
          isLoading: false
        });
      });
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin() {
      var _this3 = this;

      this.loadCurrentUser(function () {
        _antd.notification.success({
          message: 'EC App',
          description: 'You\'re successfully logged in.'
        });
        _this3.props.history.push('/admin');
      });
    }
  }, {
    key: 'handleLogout',
    value: function handleLogout() {
      var redirectTo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '/';
      var notificationType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
      var description = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'You\'re successfully logged out.';

      localStorage.removeItem(_AppConstance.ACCESS_TOKEN);

      this.setState({
        currentUser: null,
        isAuthenticated: false
      });

      this.props.history.push(redirectTo);

      _antd.notification[notificationType]({
        message: 'EC App',
        description: description
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          isAuthenticated = _state.isAuthenticated,
          isLoading = _state.isLoading;


      if (isLoading) {
        return _react2.default.createElement(_LoadingIndicator2.default, null);
      }
      return _react2.default.createElement(
        _reactRouterDom.Switch,
        null,
        _react2.default.createElement(_reactRouterDom.Route, { path: '/', exact: true, component: _ExchangeCompany2.default }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/login',
          render: function render(props) {
            return _react2.default.createElement(_Login2.default, _extends({ onLogin: _this4.handleLogin }, props));
          }
        }),
        _react2.default.createElement(_PrivateRoute2.default, { path: '/admin', authenticated: isAuthenticated, component: _Admin2.default,
          onLogout: this.handleLogout }),
        _react2.default.createElement(_reactRouterDom.Route, { component: _NotFound2.default })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

App.propTypes = {
  history: _propTypes2.default.object
};

exports.default = (0, _reactRouterDom.withRouter)(App);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _NotFound = __webpack_require__(13);

var _NotFound2 = _interopRequireDefault(_NotFound);

var _EcHomePage = __webpack_require__(32);

var _EcHomePage2 = _interopRequireDefault(_EcHomePage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExchangeCompany = function (_React$Component) {
  _inherits(ExchangeCompany, _React$Component);

  function ExchangeCompany() {
    _classCallCheck(this, ExchangeCompany);

    return _possibleConstructorReturn(this, (ExchangeCompany.__proto__ || Object.getPrototypeOf(ExchangeCompany)).apply(this, arguments));
  }

  _createClass(ExchangeCompany, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "exchangeCompany" },
        _react2.default.createElement(
          _reactRouterDom.Switch,
          null,
          _react2.default.createElement(_reactRouterDom.Route, { path: "/", exact: true, component: _EcHomePage2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { component: _NotFound2.default })
        )
      );
    }
  }]);

  return ExchangeCompany;
}(_react2.default.Component);

exports.default = ExchangeCompany;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _EcHeader = __webpack_require__(33);

var _EcHeader2 = _interopRequireDefault(_EcHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EcHomePage = function (_React$Component) {
  _inherits(EcHomePage, _React$Component);

  function EcHomePage() {
    _classCallCheck(this, EcHomePage);

    return _possibleConstructorReturn(this, (EcHomePage.__proto__ || Object.getPrototypeOf(EcHomePage)).apply(this, arguments));
  }

  _createClass(EcHomePage, [{
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_EcHeader2.default, null)
      );
    }
  }]);

  return EcHomePage;
}(_react2.default.Component);

exports.default = EcHomePage;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _fa = __webpack_require__(34);

__webpack_require__(35);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EcHeader = function (_React$Component) {
  _inherits(EcHeader, _React$Component);

  function EcHeader() {
    _classCallCheck(this, EcHeader);

    return _possibleConstructorReturn(this, (EcHeader.__proto__ || Object.getPrototypeOf(EcHeader)).apply(this, arguments));
  }

  _createClass(EcHeader, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'ecHeader' },
        _react2.default.createElement(
          'div',
          { className: 'ecHeader__nextBtn' },
          _react2.default.createElement(
            'div',
            { className: 'nextBtn' },
            _react2.default.createElement(_fa.FaAngleDoubleDown, null)
          )
        )
      );
    }
  }]);

  return EcHeader;
}(_react2.default.Component);

exports.default = EcHeader;

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("react-icons/fa");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/ecHeader.less";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = __webpack_require__(1);

var _APIUtil = __webpack_require__(5);

var _AppConstance = __webpack_require__(3);

__webpack_require__(37);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _antd.Form.Item;

var LoginForm = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(LoginForm, [{
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this2 = this;

      event.preventDefault();

      this.props.form.validateFields(function (err, values) {
        if (!err) {
          var loginRequest = Object.assign({}, values);
          (0, _APIUtil.login)(loginRequest).then(function (response) {
            localStorage.setItem(_AppConstance.ACCESS_TOKEN, response.accessToken);
            _this2.props.onLogin();
          }).catch(function (error) {
            _this2.props.onLogin();
            if (error.status === 401) {
              _antd.notification.error({
                message: 'EC',
                description: 'Your Username or Password is incorrect. Please try again!'
              });
            } else {
              _antd.notification.error({
                message: 'EC',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
              });
            }
          });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var getFieldDecorator = this.props.form.getFieldDecorator;


      return _react2.default.createElement(
        _antd.Form,
        { onSubmit: this.handleSubmit, className: 'login-form' },
        _react2.default.createElement(
          FormItem,
          null,
          getFieldDecorator('usernameOrEmail', {
            rules: [{ required: true, max: 40, message: 'Please input your username or email!' }]
          })(_react2.default.createElement(_antd.Input, {
            prefix: _react2.default.createElement(_antd.Icon, { type: 'user' }),
            size: 'large',
            name: 'usernameOrEmail',
            placeholder: 'Username or Email' }))
        ),
        _react2.default.createElement(
          FormItem,
          null,
          getFieldDecorator('password', {
            rules: [{ required: true, max: 100, min: 2, message: 'Please input your Password!' }]
          })(_react2.default.createElement(_antd.Input, {
            prefix: _react2.default.createElement(_antd.Icon, { type: 'lock' }),
            size: 'large',
            name: 'password',
            type: 'password',
            placeholder: 'Password' }))
        ),
        _react2.default.createElement(
          FormItem,
          null,
          _react2.default.createElement(
            _antd.Button,
            { type: 'primary', htmlType: 'submit', size: 'large', className: 'login-form-button' },
            'Login'
          )
        )
      );
    }
  }]);

  return LoginForm;
}(_react2.default.Component);

LoginForm.propTypes = {
  form: _propTypes2.default.object,
  onLogin: _propTypes2.default.func
};

var Login = function Login(props) {
  var onLogin = props.onLogin;

  var AntWrappedLoginForm = _antd.Form.create()(LoginForm);
  return _react2.default.createElement(
    _antd.Row,
    {
      type: 'flex',
      justify: 'center',
      align: 'middle',
      className: 'loginPage'
    },
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Login'
      ),
      _react2.default.createElement(AntWrappedLoginForm, { onLogin: onLogin })
    )
  );
};

Login.propTypes = {
  onLogin: _propTypes2.default.func
};

exports.default = Login;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/login.less";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _Sidebar = __webpack_require__(39);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _PreviewAdminPage = __webpack_require__(41);

var _PreviewAdminPage2 = _interopRequireDefault(_PreviewAdminPage);

var _CompanyContainer = __webpack_require__(42);

var _CompanyContainer2 = _interopRequireDefault(_CompanyContainer);

var _CurrencyContainer = __webpack_require__(47);

var _CurrencyContainer2 = _interopRequireDefault(_CurrencyContainer);

var _ParserContainer = __webpack_require__(50);

var _ParserContainer2 = _interopRequireDefault(_ParserContainer);

var _CommentaryContainer = __webpack_require__(53);

var _CommentaryContainer2 = _interopRequireDefault(_CommentaryContainer);

var _EditedCompanyContainer = __webpack_require__(56);

var _EditedCompanyContainer2 = _interopRequireDefault(_EditedCompanyContainer);

var _EditedCurrencyContainer = __webpack_require__(69);

var _EditedCurrencyContainer2 = _interopRequireDefault(_EditedCurrencyContainer);

var _EditedParserContainer = __webpack_require__(82);

var _EditedParserContainer2 = _interopRequireDefault(_EditedParserContainer);

var _EditedCommentaryContainer = __webpack_require__(89);

var _EditedCommentaryContainer2 = _interopRequireDefault(_EditedCommentaryContainer);

var _NewCompanyContainer = __webpack_require__(95);

var _NewCompanyContainer2 = _interopRequireDefault(_NewCompanyContainer);

var _NotFound = __webpack_require__(13);

var _NotFound2 = _interopRequireDefault(_NotFound);

__webpack_require__(100);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Content = _antd.Layout.Content;

var Admin = function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin() {
    _classCallCheck(this, Admin);

    return _possibleConstructorReturn(this, (Admin.__proto__ || Object.getPrototypeOf(Admin)).apply(this, arguments));
  }

  _createClass(Admin, [{
    key: 'render',
    value: function render() {
      var onLogout = this.props.onLogout;


      return _react2.default.createElement(
        _antd.Layout,
        { className: 'adminPage' },
        _react2.default.createElement(_Sidebar2.default, { onLogout: onLogout }),
        _react2.default.createElement(
          Content,
          { className: 'adminPage__content' },
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin', exact: true, component: _PreviewAdminPage2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/company', exact: true, component: _CompanyContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/company/:id', exact: true, component: _EditedCompanyContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/newcompany', exact: true, component: _NewCompanyContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/currency', exact: true, component: _CurrencyContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/currency/:id', exact: true, component: _EditedCurrencyContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/parser', exact: true, component: _ParserContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/parser/:id', exact: true, component: _EditedParserContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/commentary', exact: true, component: _CommentaryContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/admin/commentary/:id', exact: true, component: _EditedCommentaryContainer2.default }),
            _react2.default.createElement(_reactRouterDom.Route, { component: _NotFound2.default })
          )
        )
      );
    }
  }]);

  return Admin;
}(_react2.default.Component);

Admin.propTypes = {
  onLogout: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRouterDom.withRouter)(Admin);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _reactRouterDom = __webpack_require__(2);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

__webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubMenu = _antd.Menu.SubMenu,
    Item = _antd.Menu.Item;
var Sider = _antd.Layout.Sider;

var Sidebar = function (_React$Component) {
  _inherits(Sidebar, _React$Component);

  function Sidebar(props) {
    _classCallCheck(this, Sidebar);

    var _this = _possibleConstructorReturn(this, (Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call(this, props));

    _this.handleOnSelect = _this.handleOnSelect.bind(_this);
    return _this;
  }

  _createClass(Sidebar, [{
    key: "handleOnSelect",
    value: function handleOnSelect(_ref) {
      var key = _ref.key;
      var _props = this.props,
          history = _props.history,
          onLogout = _props.onLogout;

      switch (key) {
        case "company":
        case "currency":
        case "parser":
        case "commentary":
          history.push("/admin/" + key);
          break;
        case "logout":
          onLogout('/');
          break;
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        Sider,
        { width: 260, className: "adminSideBar" },
        _react2.default.createElement(
          _antd.Menu,
          {
            theme: "dark",
            mode: "inline",
            onSelect: this.handleOnSelect
          },
          _react2.default.createElement(
            SubMenu,
            {
              key: "sub1",
              title: _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(_antd.Icon, { type: "credit-card" }),
                "Exchange Company"
              )
            },
            _react2.default.createElement(
              Item,
              { key: "company" },
              "Company"
            ),
            _react2.default.createElement(
              Item,
              { key: "currency" },
              "Currency"
            ),
            _react2.default.createElement(
              Item,
              { key: "parser" },
              "Parser"
            ),
            _react2.default.createElement(
              Item,
              { key: "commentary" },
              "Commentaries"
            )
          ),
          _react2.default.createElement(
            Item,
            { key: "logout" },
            "Log out"
          )
        )
      );
    }
  }]);

  return Sidebar;
}(_react2.default.Component);

Sidebar.propTypes = {
  history: _propTypes2.default.object,
  onLogout: _propTypes2.default.func.isRequired
};

exports.default = (0, _reactRouterDom.withRouter)(Sidebar);

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/sidebar.less";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PreviewAdminPage;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PreviewAdminPage() {
  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "h1",
      null,
      _react2.default.createElement(_antd.Icon, { type: "form" }),
      " Exchange company admin page"
    )
  );
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _Company = __webpack_require__(43);

var _Company2 = _interopRequireDefault(_Company);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Company2.default);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _companyColumnConfig = __webpack_require__(9);

__webpack_require__(46);

var _admin = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Company = function (_React$Component) {
  _inherits(Company, _React$Component);

  function Company(props) {
    _classCallCheck(this, Company);

    var _this = _possibleConstructorReturn(this, (Company.__proto__ || Object.getPrototypeOf(Company)).call(this, props));

    _this.columnConfig = (0, _companyColumnConfig.companyColumnConfig)(props.dispatch);

    _this.addNewCompany = _this.addNewCompany.bind(_this);
    return _this;
  }

  _createClass(Company, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _admin.getAllCompanies)());
    }
  }, {
    key: 'addNewCompany',
    value: function addNewCompany() {
      var history = this.props.history;

      history.push('/admin/newcompany');
    }
  }, {
    key: 'render',
    value: function render() {
      var companies = this.props.companies;


      return _react2.default.createElement(
        'div',
        { className: 'companyAdmin' },
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'table' }),
          ' Exchange Companies'
        ),
        _react2.default.createElement(
          _antd.Button,
          {
            className: 'companyAdmin__newCompany',
            size: 'small',
            onClick: this.addNewCompany
          },
          'Add new company'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_antd.Table, {
            className: 'companyAdmin__table',
            dataSource: companies,
            columns: this.columnConfig,
            size: 'small'
          })
        )
      );
    }
  }]);

  return Company;
}(_react2.default.Component);

exports.default = Company;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

var _antd = __webpack_require__(1);

var _admin = __webpack_require__(8);

__webpack_require__(45);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ButtonGroup = _antd.Button.Group;

function Actions(_ref) {
  var history = _ref.history,
      record = _ref.record,
      dispatch = _ref.dispatch;


  function editCompany() {
    history.push("/admin/company/" + record.id);
  }

  function deleteCompany() {
    dispatch((0, _admin.deleteCompanyById)(record.id));
  }

  return _react2.default.createElement(
    ButtonGroup,
    { className: "actionsCompanyTable" },
    _react2.default.createElement(_antd.Button, {
      className: "actionsCompanyTable__edit",
      type: "primary",
      size: "small",
      icon: "edit",
      onClick: editCompany
    }),
    _react2.default.createElement(_antd.Button, {
      className: "actionsCompanyTable__delete",
      type: "primary",
      size: "small",
      icon: "delete",
      onClick: deleteCompany
    })
  );
}

exports.default = (0, _reactRouterDom.withRouter)(Actions);

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/actions.less";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/company.less";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _Currency = __webpack_require__(48);

var _Currency2 = _interopRequireDefault(_Currency);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Currency2.default);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _companyColumnConfig = __webpack_require__(9);

var _currencyColumnConfig = __webpack_require__(49);

var _admin = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Currency = function (_React$Component) {
  _inherits(Currency, _React$Component);

  function Currency(props) {
    _classCallCheck(this, Currency);

    var _this = _possibleConstructorReturn(this, (Currency.__proto__ || Object.getPrototypeOf(Currency)).call(this, props));

    _this.columnConfig = (0, _currencyColumnConfig.currencyColumnConfig)(props.dispatch);
    return _this;
  }

  _createClass(Currency, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _admin.getAllCompanies)());
    }
  }, {
    key: 'render',
    value: function render() {
      var companies = this.props.companies;


      return _react2.default.createElement(
        'div',
        { className: 'currencyAdmin' },
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'table' }),
          ' Currency'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_antd.Table, {
            className: 'companyAdmin__table',
            dataSource: companies,
            columns: this.columnConfig,
            size: 'small'
          })
        )
      );
    }
  }]);

  return Currency;
}(_react2.default.Component);

exports.default = Currency;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currencyColumnConfig = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var currencyColumnConfig = exports.currencyColumnConfig = function currencyColumnConfig(dispatch) {
  return [{
    key: "name",
    title: "Company name",
    dataIndex: "name",
    render: function render(text, record) {
      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/admin/currency/" + record.id },
        text
      );
    }
  }, {
    key: "address",
    title: "Address",
    dataIndex: "address"
  }, {
    key: "createdAt",
    title: "Created at",
    dataIndex: "createdAt"
  }, {
    key: "updatedAt",
    title: "Updated at",
    dataIndex: "updatedAt"
  }];
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _Parser = __webpack_require__(51);

var _Parser2 = _interopRequireDefault(_Parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Parser2.default);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _companyColumnConfig = __webpack_require__(9);

var _admin = __webpack_require__(8);

var _parserColumnConfig = __webpack_require__(52);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Parser = function (_React$Component) {
  _inherits(Parser, _React$Component);

  function Parser(props) {
    _classCallCheck(this, Parser);

    var _this = _possibleConstructorReturn(this, (Parser.__proto__ || Object.getPrototypeOf(Parser)).call(this, props));

    _this.columnConfig = (0, _parserColumnConfig.parserColumnConfig)(props.dispatch);
    return _this;
  }

  _createClass(Parser, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _admin.getAllCompanies)());
    }
  }, {
    key: 'render',
    value: function render() {
      var companies = this.props.companies;


      return _react2.default.createElement(
        'div',
        { className: 'companyAdmin' },
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'table' }),
          ' Parser'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_antd.Table, {
            className: 'companyAdmin__table',
            dataSource: companies,
            columns: this.columnConfig,
            size: 'small'
          })
        )
      );
    }
  }]);

  return Parser;
}(_react2.default.Component);

exports.default = Parser;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parserColumnConfig = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parserColumnConfig = exports.parserColumnConfig = function parserColumnConfig(dispatch) {
  return [{
    key: "name",
    title: "Company name",
    dataIndex: "name",
    render: function render(text, record) {
      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/admin/parser/" + record.id },
        text
      );
    }
  }, {
    key: "address",
    title: "Address",
    dataIndex: "address"
  }, {
    key: "createdAt",
    title: "Created at",
    dataIndex: "createdAt"
  }, {
    key: "updatedAt",
    title: "Updated at",
    dataIndex: "updatedAt"
  }];
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _Commentary = __webpack_require__(54);

var _Commentary2 = _interopRequireDefault(_Commentary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Commentary2.default);

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _commentaryColumnConfig = __webpack_require__(55);

var _admin = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Commentary = function (_React$Component) {
  _inherits(Commentary, _React$Component);

  function Commentary(props) {
    _classCallCheck(this, Commentary);

    var _this = _possibleConstructorReturn(this, (Commentary.__proto__ || Object.getPrototypeOf(Commentary)).call(this, props));

    _this.columnConfig = (0, _commentaryColumnConfig.commentaryColumnConfig)(props.dispatch);
    return _this;
  }

  _createClass(Commentary, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var dispatch = this.props.dispatch;

      dispatch((0, _admin.getAllCompanies)());
    }
  }, {
    key: 'render',
    value: function render() {
      var companies = this.props.companies;


      return _react2.default.createElement(
        'div',
        { className: 'companyAdmin' },
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'table' }),
          ' Commentaries'
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_antd.Table, {
            className: 'companyAdmin__table',
            dataSource: companies,
            columns: this.columnConfig,
            size: 'small'
          })
        )
      );
    }
  }]);

  return Commentary;
}(_react2.default.Component);

exports.default = Commentary;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commentaryColumnConfig = undefined;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commentaryColumnConfig = exports.commentaryColumnConfig = function commentaryColumnConfig() {
  return [{
    key: "name",
    title: "Company name",
    dataIndex: "name",
    render: function render(text, record) {
      return _react2.default.createElement(
        _reactRouterDom.Link,
        { to: "/admin/commentary/" + record.id },
        text
      );
    }
  }, {
    key: "address",
    title: "Address",
    dataIndex: "address"
  }, {
    key: "createdAt",
    title: "Created at",
    dataIndex: "createdAt"
  }, {
    key: "updatedAt",
    title: "Updated at",
    dataIndex: "updatedAt"
  }];
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _EditedCompanyForm = __webpack_require__(57);

var _EditedCompanyForm2 = _interopRequireDefault(_EditedCompanyForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_EditedCompanyForm2.default);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _editCompanyService = __webpack_require__(58);

var _CompanyMainInfo = __webpack_require__(15);

var _CompanyMainInfo2 = _interopRequireDefault(_CompanyMainInfo);

var _CompanyDataInfo = __webpack_require__(17);

var _CompanyDataInfo2 = _interopRequireDefault(_CompanyDataInfo);

__webpack_require__(68);

var _companyMainInfo = __webpack_require__(10);

var _valueValidator = __webpack_require__(11);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditedCompanyForm = function (_React$Component) {
  _inherits(EditedCompanyForm, _React$Component);

  function EditedCompanyForm(props) {
    _classCallCheck(this, EditedCompanyForm);

    var _this = _possibleConstructorReturn(this, (EditedCompanyForm.__proto__ || Object.getPrototypeOf(EditedCompanyForm)).call(this, props));

    _this.state = {
      isUpdateButtonDisable: true,
      initialCompanyInfo: [],
      invalidFields: []
    };

    _this.handleUpdateButtonClick = _this.handleUpdateButtonClick.bind(_this);
    _this.handleInitialStateClick = _this.handleInitialStateClick.bind(_this);
    _this.validateInput = _this.validateInput.bind(_this);
    return _this;
  }

  _createClass(EditedCompanyForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var company = this.getCompanyById;
      this.setState({ initialCompanyInfo: JSON.stringify(company) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          params = _props.match.params;
      var initialCompanyInfo = this.state.initialCompanyInfo;

      dispatch((0, _companyMainInfo.setInitialCompanyMainInfoState)(params.id, initialCompanyInfo));
    }
  }, {
    key: 'handleUpdateButtonClick',
    value: function handleUpdateButtonClick() {
      var params = this.props.match.params;

      var company = this.getCompanyById;
      this.editCompanyService.updateCompanyInfo(params.id, company);
    }
  }, {
    key: 'handleInitialStateClick',
    value: function handleInitialStateClick() {
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          params = _props2.match.params;
      var initialCompanyInfo = this.state.initialCompanyInfo;

      dispatch((0, _companyMainInfo.setInitialCompanyMainInfoState)(params.id, initialCompanyInfo));
    }
  }, {
    key: 'validateInput',
    value: function validateInput(fieldName, isNotValid) {
      var invalidFields = this.state.invalidFields;

      if (isNotValid && invalidFields.indexOf(fieldName) === -1) {
        this.setState({ invalidFields: [].concat(_toConsumableArray(invalidFields), [fieldName]) });
      } else if (!isNotValid && invalidFields.indexOf(fieldName) !== -1) {
        var newInvalidFields = invalidFields.filter(function (r) {
          return r !== fieldName;
        });
        this.setState({ invalidFields: newInvalidFields });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          params = _props3.match.params,
          dispatch = _props3.dispatch;
      var _state = this.state,
          isUpdateButtonDisable = _state.isUpdateButtonDisable,
          invalidFields = _state.invalidFields;

      var company = this.getCompanyById;
      var isInvalid = invalidFields.length !== 0;

      return company ? _react2.default.createElement(
        'div',
        { className: 'editedCompanyForm' },
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'profile' }),
          ' ',
          'Company ' + company.name
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_CompanyMainInfo2.default, {
            companyId: params.id,
            company: company,
            dispatch: dispatch,
            validateInput: this.validateInput
          }),
          _react2.default.createElement(_CompanyDataInfo2.default, {
            companyId: params.id,
            exchangeCompanyDetail: (0, _valueValidator.nullValidator)(company, "exchangeCompanyDetail"),
            dispatch: dispatch,
            validateInput: this.validateInput
          }),
          _react2.default.createElement(
            _antd.Row,
            { className: 'editedCompanyForm__actions' },
            _react2.default.createElement(
              _antd.Col,
              { span: 6 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: isUpdateButtonDisable || isInvalid,
                  onClick: this.handleUpdateButtonClick
                },
                'Update company information'
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: isUpdateButtonDisable || isInvalid,
                  onClick: this.handleInitialStateClick
                },
                'Initial state'
              )
            )
          )
        )
      ) : _react2.default.createElement(_antd.Alert, { message: 'This company doesn\'t exist', type: 'error' });
    }
  }, {
    key: 'editCompanyService',
    get: function get() {
      return _editCompanyService.editCompanyService;
    }
  }, {
    key: 'getCompanyById',
    get: function get() {
      var _props4 = this.props,
          params = _props4.match.params,
          companies = _props4.companies;


      return this.editCompanyService.selectCompanyById(companies, params.id);
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var params = props.match.params,
          companies = props.companies;

      var company = _editCompanyService.editCompanyService.selectCompanyById(companies, params.id);
      if (JSON.stringify(company) !== state.initialCompanyInfo) {
        return { isUpdateButtonDisable: false };
      } else {
        return { isUpdateButtonDisable: true };
      }
    }
  }]);

  return EditedCompanyForm;
}(_react2.default.Component);

exports.default = EditedCompanyForm;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCompanyService = undefined;

var _index = __webpack_require__(6);

var _AppConstance = __webpack_require__(3);

var _APIUtil = __webpack_require__(5);

var editCompanyService = exports.editCompanyService = {
  selectCompanyById: function selectCompanyById(companies, id) {
    var foundCompany = null;
    companies.some(function (company) {
      if (company.id.toString() === id) {
        foundCompany = company;
        return true;
      }
      return false;
    });
    return foundCompany;
  },
  updateCompanyInfo: function updateCompanyInfo(companyId, companyData) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/company/" + companyId,
      method: 'PUT',
      body: JSON.stringify(companyData)
    }).then(function (response) {
      _index.notification.success({
        message: 'EC',
        description: 'Company data was updated successfully!'
      });
    }).catch(function (error) {
      _index.notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/companyMainInfo.less";

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _moment = __webpack_require__(61);

var _moment2 = _interopRequireDefault(_moment);

var _antd = __webpack_require__(1);

var _companyMainInfo = __webpack_require__(10);

var _workingTimeDays = __webpack_require__(62);

__webpack_require__(63);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function nullValidator(field, subField) {
  if (field && field[subField]) {
    return (0, _moment2.default)(field[subField], "HH:mm:ss");
  }
  return null;
}

var WorkingTime = function (_React$Component) {
  _inherits(WorkingTime, _React$Component);

  function WorkingTime(props) {
    _classCallCheck(this, WorkingTime);

    var _this = _possibleConstructorReturn(this, (WorkingTime.__proto__ || Object.getPrototypeOf(WorkingTime)).call(this, props));

    _this.handleWorkingTimeChange = _this.handleWorkingTimeChange.bind(_this);
    return _this;
  }

  _createClass(WorkingTime, [{
    key: "handleWorkingTimeChange",
    value: function handleWorkingTimeChange(timeMoment, time, fieldName) {
      var _props = this.props,
          dispatch = _props.dispatch,
          companyId = _props.companyId,
          isNewCompany = _props.isNewCompany;

      dispatch((0, _companyMainInfo.changeWorkingTimeValue)(companyId, fieldName, time, isNewCompany));
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        { className: "workingTime" },
        this.getWorkingTimeRow
      );
    }
  }, {
    key: "getWorkingTimeRow",
    get: function get() {
      var _this2 = this;

      var workingTime = this.props.workingTime;


      return _workingTimeDays.workingTimeDays.map(function (day, index) {
        var valueFrom = nullValidator(workingTime, day.typeFrom);
        var valueTo = nullValidator(workingTime, day.typeTo);
        return _react2.default.createElement(
          _antd.Row,
          { key: index, type: "flex", justify: "space-between", align: "middle" },
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            day.titleFrom,
            day.isRequired ? "*" : "",
            ":"
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_antd.TimePicker, {
              value: valueFrom,
              minuteStep: 15,
              secondStep: 10,
              onChange: function onChange(moment, time) {
                _this2.handleWorkingTimeChange(moment, time, day.typeFrom);
              }
            })
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 4 },
            day.titleTo,
            day.isRequired ? "*" : "",
            ":"
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 7 },
            _react2.default.createElement(_antd.TimePicker, {
              value: valueTo,
              minuteStep: 15,
              secondStep: 10,
              onChange: function onChange(moment, time) {
                _this2.handleWorkingTimeChange(moment, time, day.typeTo);
              }
            })
          )
        );
      });
    }
  }]);

  return WorkingTime;
}(_react2.default.Component);

exports.default = WorkingTime;

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var workingTimeDays = exports.workingTimeDays = [{
  typeFrom: "mnFrom",
  titleFrom: "Monday from",
  typeTo: "mnTo",
  titleTo: "Monday To",
  isRequired: true
}, {
  typeFrom: "tuFrom",
  titleFrom: "Tuesday from",
  typeTo: "tuTo",
  titleTo: "Tuesday To",
  isRequired: true
}, {
  typeFrom: "weFrom",
  titleFrom: "Wednesday from",
  typeTo: "weTo",
  titleTo: "Wednesday To",
  isRequired: true
}, {
  typeFrom: "thFrom",
  titleFrom: "Thursday from",
  typeTo: "thTo",
  titleTo: "Thursday To",
  isRequired: true
}, {
  typeFrom: "frFrom",
  titleFrom: "Friday from",
  typeTo: "frTo",
  titleTo: "Friday To",
  isRequired: true
}, {
  typeFrom: "stFrom",
  titleFrom: "Saturday from",
  typeTo: "stTo",
  titleTo: "Saturday To",
  isRequired: false
}, {
  typeFrom: "snFrom",
  titleFrom: "Sunday from",
  typeTo: "snTo",
  titleTo: "Sunday To",
  isRequired: false
}];

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/workingTime.less";

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/validatorInput.less";

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatorForOnChange = validatorForOnChange;
exports.validationForOnBlur = validationForOnBlur;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var onChangeRules = {
  length: function length(value, params) {
    return value.length <= params;
  },
  isNumeric: function isNumeric(value) {
    return (/^$|^[0-9]+((\.)|(\.[0-9]+)?)$/.test(value)
    );
  }
};

var onBlurRules = {
  isRequired: function isRequired(value) {
    return { status: value !== "", message: "This field is required" };
  },
  email: function email(value) {
    return { status: /^$|^.*@.*\..*$/.test(value), message: "Incorrect email format" };
  }
};

function validatorForOnChange(value, validationOption) {
  var rulesName = Object.keys(validationOption);
  return rulesName.every(function (rule) {
    return onChangeRules[rule] ? onChangeRules[rule](value, validationOption[rule]) : true;
  });
}

function validationForOnBlur(value, validationOprion) {
  var rulesName = Object.keys(validationOprion);
  return rulesName.reduce(function (ruleAcc, rule) {
    var validationResult = onBlurRules[rule] ? onBlurRules[rule](value, validationOprion[rule]) : false;
    if (validationResult && !validationResult.status) {
      return [].concat(_toConsumableArray(ruleAcc), [validationResult]);
    }

    return ruleAcc;
  }, []);
}

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/companyDataInfo.less";

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeCompanyDataInfoValue = changeCompanyDataInfoValue;
exports.setInitialCompanyDataInfoState = setInitialCompanyDataInfoState;

var _companyDataInfo = __webpack_require__(18);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function changeCompanyDataInfoValue(companyId, fieldName, value, isNewCompany) {
  return {
    type: _companyDataInfo.CHANGE_COMPANY_DATA_INFO_VALUE,
    companyId: companyId,
    fieldName: fieldName,
    value: value,
    isNewCompany: isNewCompany
  };
}

function setInitialCompanyDataInfoState(companyId, companyMainInfo, isNewCompany) {
  var _ref;

  return _ref = {
    type: _companyDataInfo.SET_INITIAL_COMPANY_DATA_INFO_STATE,
    companyId: companyId }, _defineProperty(_ref, "companyId", companyId), _defineProperty(_ref, "companyMainInfo", companyMainInfo), _defineProperty(_ref, "isNewCompany", isNewCompany), _ref;
}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/editedCompanyForm.less";

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _EditedCurrencyForm = __webpack_require__(70);

var _EditedCurrencyForm2 = _interopRequireDefault(_EditedCurrencyForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_EditedCurrencyForm2.default);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _editCurrencyService = __webpack_require__(71);

var _CurrencyRate = __webpack_require__(72);

var _CurrencyRate2 = _interopRequireDefault(_CurrencyRate);

var _currencyRate = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditedCurrencyForm = function (_React$Component) {
  _inherits(EditedCurrencyForm, _React$Component);

  function EditedCurrencyForm(props) {
    _classCallCheck(this, EditedCurrencyForm);

    var _this = _possibleConstructorReturn(this, (EditedCurrencyForm.__proto__ || Object.getPrototypeOf(EditedCurrencyForm)).call(this, props));

    _this.state = {
      isUpdateButtonDisable: true,
      initialCurrencyData: []
    };

    _this.handleUpdateButtonClick = _this.handleUpdateButtonClick.bind(_this);
    _this.handleInitialStateClick = _this.handleInitialStateClick.bind(_this);
    return _this;
  }

  _createClass(EditedCurrencyForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var company = this.getCompanyById;
      this.setState({ initialCurrencyData: JSON.stringify(company.currencyRates) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          params = _props.match.params;
      var initialCurrencyData = this.state.initialCurrencyData;

      dispatch((0, _currencyRate.setInitialCurrencyState)(params.id, initialCurrencyData));
    }
  }, {
    key: 'handleUpdateButtonClick',
    value: function handleUpdateButtonClick() {
      var params = this.props.match.params;

      var company = this.getCompanyById;
      this.editCurrencyService.updateCurrencyRate(params.id, company.currencyRates);
    }
  }, {
    key: 'handleInitialStateClick',
    value: function handleInitialStateClick() {
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          params = _props2.match.params;
      var initialCurrencyData = this.state.initialCurrencyData;

      dispatch((0, _currencyRate.setInitialCurrencyState)(params.id, initialCurrencyData));
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          dispatch = _props3.dispatch,
          params = _props3.match.params;
      var isUpdateButtonDisable = this.state.isUpdateButtonDisable;

      var company = this.getCompanyById;

      return company ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'profile' }),
          ' ',
          'Company ' + params.id
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_CurrencyRate2.default, {
            companyId: params.id,
            dispatch: dispatch,
            currencyRate: company.currencyRates
          }),
          _react2.default.createElement(
            _antd.Row,
            { className: 'currencyForm__actions' },
            _react2.default.createElement(
              _antd.Col,
              { span: 5 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: isUpdateButtonDisable,
                  onClick: this.handleUpdateButtonClick
                },
                'Update currency rate'
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: isUpdateButtonDisable,
                  onClick: this.handleInitialStateClick
                },
                'Initial state'
              )
            )
          )
        )
      ) : _react2.default.createElement(_antd.Alert, { message: 'Currency information doesn\'t exist', type: 'error' });
    }
  }, {
    key: 'editCurrencyService',
    get: function get() {
      return _editCurrencyService.editCurrencyService;
    }
  }, {
    key: 'getCompanyById',
    get: function get() {
      var _props4 = this.props,
          params = _props4.match.params,
          companies = _props4.companies;

      return this.editCurrencyService.selectCompanyById(companies, params.id);
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var params = props.match.params,
          companies = props.companies;

      var company = _editCurrencyService.editCurrencyService.selectCompanyById(companies, params.id);
      if (JSON.stringify(company.currencyRates) !== state.initialCurrencyData) {
        return { isUpdateButtonDisable: false };
      } else {
        return { isUpdateButtonDisable: true };
      }
    }
  }]);

  return EditedCurrencyForm;
}(_react2.default.Component);

exports.default = EditedCurrencyForm;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCurrencyService = undefined;

var _index = __webpack_require__(6);

var _AppConstance = __webpack_require__(3);

var _APIUtil = __webpack_require__(5);

var editCurrencyService = exports.editCurrencyService = {
  selectCompanyById: function selectCompanyById(companies, id) {
    var foundCompany = null;
    companies.some(function (company) {
      if (company.id.toString() === id) {
        foundCompany = company;
        return true;
      }
      return false;
    });
    return foundCompany;
  },
  updateCurrencyRate: function updateCurrencyRate(companyId, currencyRate) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/currency?companyId=" + companyId,
      method: 'PUT',
      body: JSON.stringify(currencyRate)
    }).then(function (response) {
      _index.notification.success({
        message: 'EC',
        description: 'Currency data was updated successfully!'
      });
    }).catch(function (error) {
      _index.notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _CurrencyFlag = __webpack_require__(73);

var _CurrencyFlag2 = _interopRequireDefault(_CurrencyFlag);

var _CurrencyContent = __webpack_require__(80);

var _CurrencyContent2 = _interopRequireDefault(_CurrencyContent);

__webpack_require__(81);

var _currencyRate = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CurrencyRate = function (_React$Component) {
  _inherits(CurrencyRate, _React$Component);

  function CurrencyRate(props) {
    _classCallCheck(this, CurrencyRate);

    var _this = _possibleConstructorReturn(this, (CurrencyRate.__proto__ || Object.getPrototypeOf(CurrencyRate)).call(this, props));

    _this.handleFlagOnClick = _this.handleFlagOnClick.bind(_this);
    _this.handleValueOnChange = _this.handleValueOnChange.bind(_this);
    return _this;
  }

  _createClass(CurrencyRate, [{
    key: 'handleFlagOnClick',
    value: function handleFlagOnClick(currency) {
      var _props = this.props,
          dispatch = _props.dispatch,
          companyId = _props.companyId;


      dispatch((0, _currencyRate.selectUnselectCurrency)(companyId, currency));
    }
  }, {
    key: 'handleValueOnChange',
    value: function handleValueOnChange(currencyType, fieldName, value) {
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          companyId = _props2.companyId;

      dispatch((0, _currencyRate.changeCurrencyValue)(companyId, currencyType, fieldName, value));
    }
  }, {
    key: 'render',
    value: function render() {
      var currencyRate = this.props.currencyRate;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'currencyRate__title' },
          _react2.default.createElement(
            'h2',
            null,
            'Currency'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'currencyRate__form currencyForm' },
          _react2.default.createElement(
            'div',
            { className: 'currencyForm__header' },
            _react2.default.createElement(_CurrencyFlag2.default, {
              handleFlagOnClick: this.handleFlagOnClick,
              currencyRate: currencyRate
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'currencyForm__content' },
            _react2.default.createElement(_CurrencyContent2.default, {
              currencyRate: currencyRate,
              handleValueOnChange: this.handleValueOnChange
            })
          )
        )
      );
    }
  }]);

  return CurrencyRate;
}(_react2.default.Component);

exports.default = CurrencyRate;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CurrencyFlag;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _currencyType = __webpack_require__(74);

__webpack_require__(79);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CurrencyFlag(_ref) {
  var currencyRate = _ref.currencyRate,
      handleFlagOnClick = _ref.handleFlagOnClick;

  var currenciesByType = _currencyType.currencyType.map(function (currency, index) {
    var isCurrencyExist = currencyRate.some(function (c) {
      return c.currencyType === currency.currencyType;
    });
    var flagOnClick = function flagOnClick() {
      handleFlagOnClick({
        currencyType: currency.currencyType,
        currencyName: currency.currencyName
      });
    };

    return _react2.default.createElement(
      'div',
      {
        key: index,
        className: 'currencyHeaderFlag__item currencyHeaderFlag__item_active--' + isCurrencyExist,
        onClick: flagOnClick
      },
      _react2.default.createElement('img', {
        src: currency.flagImg,
        alt: currency.currencyName
      })
    );
  });

  return _react2.default.createElement(
    'div',
    { className: 'currencyHeaderFlag' },
    currenciesByType
  );
}

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.currencyType = exports.CHF = exports.GBR = exports.USD = exports.EUR = undefined;

var _flagUe = __webpack_require__(75);

var _flagUe2 = _interopRequireDefault(_flagUe);

var _flagUs = __webpack_require__(76);

var _flagUs2 = _interopRequireDefault(_flagUs);

var _flagUk = __webpack_require__(77);

var _flagUk2 = _interopRequireDefault(_flagUk);

var _flagCh = __webpack_require__(78);

var _flagCh2 = _interopRequireDefault(_flagCh);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EUR = exports.EUR = "EUR";
var USD = exports.USD = "USD";
var GBR = exports.GBR = "GBR";
var CHF = exports.CHF = "CHF";

var currencyType = exports.currencyType = [{
  currencyType: EUR,
  currencyName: "European Union",
  flagImg: _flagUe2.default

}, {
  currencyType: USD,
  currencyName: "United States of America",
  flagImg: _flagUs2.default
}, {
  currencyType: GBR,
  currencyName: "Great Britain",
  flagImg: _flagUk2.default
}, {
  currencyType: CHF,
  currencyName: "Switzerland",
  flagImg: _flagCh2.default
}];

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QDgRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAcAAAAcgAAADIBAgAaAAAAjgAAAGmHBAABAAAAqAAAAAAAAAAA4gQAECcAAADiBAAQJwAAQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzADIwMTQtMTAtMjdUMTE6MTY6NDgrMDE6MDAAAwAAkAcABAAAADAyMjACoAQAAQAAACADAAADoAQAAQAAAFgCAAAAAAAAWAIAAAAA/+wAEUR1Y2t5AAEABAAAAFAAAP/hBiRodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcDpDcmVhdGVEYXRlPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE0LTEwLTI3VDExOjE2OjQ4KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNC0xMC0yN1QxMToxNjo0OCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVDM0VGQ0EwNURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVDM0VGQ0ExNURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NkM5NDg4NDNCRDVERTQxMTlGMDNEQkM3QjBDNDQ4MTUiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDExOjA4OjU4KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRh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"

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QDgRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAcAAAAcgAAADIBAgAaAAAAjgAAAGmHBAABAAAAqAAAAAAAAAAA4gQAECcAAADiBAAQJwAAQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzADIwMTQtMTAtMjdUMTE6MTY6NDgrMDE6MDAAAwAAkAcABAAAADAyMjACoAQAAQAAACADAAADoAQAAQAAAFgCAAAAAAAAWAIAAAAA/+wAEUR1Y2t5AAEABAAAAFAAAP/hBiRodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcDpDcmVhdGVEYXRlPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE0LTEwLTI3VDExOjE2OjQ4KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNC0xMC0yN1QxMToxNjo0OCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVDM0VGQ0E0NURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVDM0VGQ0E1NURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NkM5NDg4NDNCRDVERTQxMTlGMDNEQkM3QjBDNDQ4MTUiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDExOjA4OjU4KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRh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6X3I+n1XXvIsPiNf2zp3p+F63kjPgKN++l9yH1XXvIsPiNf2zp3p+F63kh4Cjfvpfch9V17yLD4jX9s6d6fhet5IeAo376X3IfVde8iw+I1/bOnen4XreSHgKN++l9yH1XXvIsPiNf2zp3p+F63kh4Cjfvpfch9V17yLD4jX9s6d6fhet5IeAo376X3IfVde8iw+I1/bOnen4XreSHgKN++l9yH1XXvIsPiNf2zp3p+F63kh4Cjfvpfch9V17yLD4jX9s6d6fhet5IeAo376X3IfVde8iw+I1/bOnen4XreSHgKN++l9yH1XXvIsPiNf2zp3p+F63kh4Cjfvpfch9V17yLD4jX9s6d6fhet5IeAo376X3Io07w75Nk64SbOXqopKqLox/H/7euIcIvezMfT2/wDo3Z9B/wBtnPojj+Tnk55N3v3R/a9Y6nvezMZ8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59EPk55OeTd790f2vTqe97Mw8Ruz29s59Efpy6+lR+JYdIQ6Qh0hDpCHSEOkIdIQ6Qh0hDpCHSEOkI//2Q=="

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QDgRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAcAAAAcgAAADIBAgAaAAAAjgAAAGmHBAABAAAAqAAAAAAAAAAA4gQAECcAAADiBAAQJwAAQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzADIwMTQtMTAtMjdUMTE6MTY6NDgrMDE6MDAAAwAAkAcABAAAADAyMjACoAQAAQAAACADAAADoAQAAQAAAFgCAAAAAAAAWAIAAAAA/+wAEUR1Y2t5AAEABAAAAFAAAP/hBiRodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcDpDcmVhdGVEYXRlPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE0LTEwLTI3VDExOjE2OjQ4KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNC0xMC0yN1QxMToxNjo0OCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVDNjI2MzlDNURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVDNjI2MzlENURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NkM5NDg4NDNCRDVERTQxMTlGMDNEQkM3QjBDNDQ4MTUiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDExOjA4OjU4KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRh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"

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4QDgRXhpZgAASUkqAAgAAAAHABIBAwABAAAAAQAAABoBBQABAAAAYgAAABsBBQABAAAAagAAACgBAwABAAAAAgAAADEBAgAcAAAAcgAAADIBAgAaAAAAjgAAAGmHBAABAAAAqAAAAAAAAAAA4gQAECcAAADiBAAQJwAAQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzADIwMTQtMTAtMjdUMTE6MTY6NDgrMDE6MDAAAwAAkAcABAAAADAyMjACoAQAAQAAACADAAADoAQAAQAAAFgCAAAAAAAAWAIAAAAA/+wAEUR1Y2t5AAEABAAAAFAAAP/hBiRodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcDpDcmVhdGVEYXRlPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE0LTEwLTI3VDExOjE2OjQ4KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNC0xMC0yN1QxMToxNjo0OCswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVDNjI2M0EwNURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVDNjI2M0ExNURDMjExRTRBNjgzRDNFODMyOTA1MDdBIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6NkM5NDg4NDNCRDVERTQxMTlGMDNEQkM3QjBDNDQ4MTUiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDEwOjQwOjE5KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdEV2dDp3aGVuPSIyMDE0LTEwLTI3VDExOjA4OjU4KzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZEOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjZDOTQ4ODQzQkQ1REU0MTE5RjAzREJDN0IwQzQ0ODE1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRh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"

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/CurrencyFlag.less";

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CurrencyContent;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _valueValidator = __webpack_require__(11);

var _ValidatorInput = __webpack_require__(12);

var _ValidatorInput2 = _interopRequireDefault(_ValidatorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CurrencyContent(_ref) {
  var currencyRate = _ref.currencyRate,
      handleValueOnChange = _ref.handleValueOnChange;

  var mapedCurrency = currencyRate.map(function (currency, index) {
    var handleOnChange = function handleOnChange(name, value) {
      handleValueOnChange(currency.currencyType, name, value);
    };

    return _react2.default.createElement(
      _antd.Row,
      { key: (0, _valueValidator.nullValidator)(currency, "currencyType", index) },
      _react2.default.createElement(
        _antd.Col,
        { span: 8 },
        _react2.default.createElement(_antd.Input, {
          defaultValue: (0, _valueValidator.nullValidator)(currency, "currencyName"),
          disabled: true
        })
      ),
      _react2.default.createElement(
        _antd.Col,
        { span: 3 },
        _react2.default.createElement(_antd.Input, {
          defaultValue: (0, _valueValidator.nullValidator)(currency, "currencyType"),
          disabled: true
        })
      ),
      _react2.default.createElement(
        _antd.Col,
        { span: 4 },
        _react2.default.createElement(_ValidatorInput2.default, {
          InputComponent: _antd.Input,
          value: (0, _valueValidator.nullValidator)(currency, "buyPrice"),
          placeholder: 'Buy price',
          name: 'buyPrice',
          validationOption: { length: 7, isNumeric: true },
          onChange: handleOnChange
        })
      ),
      _react2.default.createElement(
        _antd.Col,
        { span: 4 },
        _react2.default.createElement(_ValidatorInput2.default, {
          InputComponent: _antd.Input,
          value: (0, _valueValidator.nullValidator)(currency, "sellPrice"),
          placeholder: 'Sell price',
          name: 'sellPrice',
          validationOption: { length: 7, isNumeric: true },
          onChange: handleOnChange
        })
      )
    );
  });

  return _react2.default.createElement(
    'div',
    null,
    mapedCurrency
  );
}

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/currencyRate.less";

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _EditedParserForm = __webpack_require__(83);

var _EditedParserForm2 = _interopRequireDefault(_EditedParserForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_EditedParserForm2.default);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _ParserData = __webpack_require__(84);

var _ParserData2 = _interopRequireDefault(_ParserData);

var _parser = __webpack_require__(21);

var _editCurrencyService = __webpack_require__(87);

__webpack_require__(88);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditedParserForm = function (_React$Component) {
  _inherits(EditedParserForm, _React$Component);

  function EditedParserForm(props) {
    _classCallCheck(this, EditedParserForm);

    var _this = _possibleConstructorReturn(this, (EditedParserForm.__proto__ || Object.getPrototypeOf(EditedParserForm)).call(this, props));

    _this.state = {
      isUpdateButtonDisable: true,
      initialParserData: null,
      parseSuccessResult: null,
      parseFailResult: null
    };

    _this.handleUpdateButtonClick = _this.handleUpdateButtonClick.bind(_this);
    _this.handleInitialStateClick = _this.handleInitialStateClick.bind(_this);
    _this.handleResultCheck = _this.handleResultCheck.bind(_this);
    return _this;
  }

  _createClass(EditedParserForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var company = this.getCompanyById;
      this.setState({ initialParserData: JSON.stringify(company.exchangeCompanyParseData) });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var _props = this.props,
          dispatch = _props.dispatch,
          params = _props.match.params;
      var initialParserData = this.state.initialParserData;

      dispatch((0, _parser.setInitialParserState)(params.id, initialParserData));
    }
  }, {
    key: 'handleUpdateButtonClick',
    value: function handleUpdateButtonClick() {
      var params = this.props.match.params;

      var company = this.getCompanyById;
      this.editParserService.updateParserData(params.id, company.exchangeCompanyParseData);
    }
  }, {
    key: 'handleInitialStateClick',
    value: function handleInitialStateClick() {
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          params = _props2.match.params;
      var initialParserData = this.state.initialParserData;

      dispatch((0, _parser.setInitialParserState)(params.id, initialParserData));
    }
  }, {
    key: 'handleResultCheck',
    value: function handleResultCheck() {
      var _this2 = this;

      var params = this.props.match.params;

      this.editParserService.checkParseResult(params.id).then(function (response) {
        _this2.setState({ parseSuccessResult: response });
        _antd.notification.success({
          message: 'EC',
          description: 'Parsing process run successfully!'
        });
      }).catch(function (error) {
        _this2.setState({ parseFailResult: error.message });
        _antd.notification.error({
          message: 'EC',
          description: error.message || 'Sorry! Something went wrong. Please try again!'
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          dispatch = _props3.dispatch,
          params = _props3.match.params;
      var _state = this.state,
          isUpdateButtonDisable = _state.isUpdateButtonDisable,
          parseSuccessResult = _state.parseSuccessResult,
          parseFailResult = _state.parseFailResult;

      var company = this.getCompanyById;

      return company ? _react2.default.createElement(
        'div',
        { className: 'editedParserForm' },
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'profile' }),
          ' ',
          'Company ' + params.id
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_ParserData2.default, {
              companyId: params.id,
              dispatch: dispatch,
              parserData: company.exchangeCompanyParseData
            })
          ),
          (parseSuccessResult || parseFailResult) && _react2.default.createElement(
            'div',
            { className: 'editedParserForm__parsedResult' },
            _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Parsed result:'
              )
            ),
            parseSuccessResult && _react2.default.createElement(_antd.Alert, { message: parseSuccessResult, type: 'success' }),
            parseFailResult && _react2.default.createElement(_antd.Alert, { message: parseFailResult, type: 'error' })
          ),
          _react2.default.createElement(
            _antd.Row,
            { className: 'editedParserForm__actions' },
            _react2.default.createElement(
              _antd.Col,
              { span: 5 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: isUpdateButtonDisable,
                  onClick: this.handleUpdateButtonClick
                },
                'Update parser data'
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: isUpdateButtonDisable,
                  onClick: this.handleInitialStateClick
                },
                'Initial state'
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              _react2.default.createElement(
                _antd.Button,
                {
                  disabled: !isUpdateButtonDisable,
                  onClick: this.handleResultCheck
                },
                'Check result'
              )
            )
          )
        )
      ) : _react2.default.createElement(_antd.Alert, { message: 'Parser information doesn\'t exist', type: 'error' });
    }
  }, {
    key: 'editParserService',
    get: function get() {
      return _editCurrencyService.editParserService;
    }
  }, {
    key: 'getCompanyById',
    get: function get() {
      var _props4 = this.props,
          params = _props4.match.params,
          companies = _props4.companies;

      return this.editParserService.selectCompanyById(companies, params.id);
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props, state) {
      var params = props.match.params,
          companies = props.companies;

      var company = _editCurrencyService.editParserService.selectCompanyById(companies, params.id);
      if (company.exchangeCompanyParseData && JSON.stringify(company.exchangeCompanyParseData) !== state.initialParserData) {
        return { isUpdateButtonDisable: false };
      } else {
        return { isUpdateButtonDisable: true };
      }
    }
  }]);

  return EditedParserForm;
}(_react2.default.Component);

exports.default = EditedParserForm;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _parser = __webpack_require__(21);

__webpack_require__(85);

var _moment = __webpack_require__(86);

var _moment2 = _interopRequireDefault(_moment);

var _ValidatorInput = __webpack_require__(12);

var _ValidatorInput2 = _interopRequireDefault(_ValidatorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function nullValidator(field, subField) {
  var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

  if (field && field[subField]) {
    return field[subField];
  }
  return defaultValue;
}

var ParserData = function (_React$Component) {
  _inherits(ParserData, _React$Component);

  function ParserData(props) {
    _classCallCheck(this, ParserData);

    var _this = _possibleConstructorReturn(this, (ParserData.__proto__ || Object.getPrototypeOf(ParserData)).call(this, props));

    _this.handleValueOnChange = _this.handleValueOnChange.bind(_this);
    return _this;
  }

  _createClass(ParserData, [{
    key: "handleValueOnChange",
    value: function handleValueOnChange(name, value) {
      var _props = this.props,
          dispatch = _props.dispatch,
          companyId = _props.companyId;

      dispatch((0, _parser.changeParserValue)(companyId, name, value || checked));
    }
  }, {
    key: "render",
    value: function render() {
      var parserData = this.props.parserData;


      return _react2.default.createElement(
        "div",
        { className: "parserData" },
        _react2.default.createElement(
          "div",
          { className: "parserData__title" },
          _react2.default.createElement(
            "h2",
            null,
            "Parser"
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "parserData__form parserDataForm" },
          _react2.default.createElement(
            _antd.Row,
            { type: "flex", justify: "space-between", align: "middle" },
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Url*:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "url"),
                placeholder: "URL",
                name: "url",
                validationOption: { length: 120 },
                onChange: this.handleValueOnChange
              })
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Parameters:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "parameters"),
                placeholder: "Parameters",
                name: "parameters",
                validationOption: { length: 120 },
                onChange: this.handleValueOnChange
              })
            )
          ),
          _react2.default.createElement(
            _antd.Row,
            { type: "flex", justify: "space-between", align: "middle" },
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Row selector:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "rowSelector"),
                placeholder: "Row selector",
                name: "rowSelector",
                validationOption: { length: 60 },
                onChange: this.handleValueOnChange
              })
            ),
            _react2.default.createElement(_antd.Col, { span: 4 }),
            _react2.default.createElement(_antd.Col, { span: 7 })
          ),
          _react2.default.createElement(
            _antd.Row,
            { type: "flex", justify: "space-between", align: "middle" },
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Currency amount:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "currencyAmountSelector"),
                placeholder: "Currency amount",
                name: "currencyAmountSelector",
                validationOption: { length: 60 },
                onChange: this.handleValueOnChange
              })
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Currency type:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "currencyTypeSelector"),
                placeholder: "Currency type",
                name: "currencyTypeSelector",
                validationOption: { length: 60 },
                onChange: this.handleValueOnChange
              })
            )
          ),
          _react2.default.createElement(
            _antd.Row,
            { type: "flex", justify: "space-between", align: "middle" },
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Buy selector:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "buySelector"),
                placeholder: "Buy selector",
                name: "buySelector",
                validationOption: { length: 60 },
                onChange: this.handleValueOnChange
              })
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              "Sell selector:"
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 7 },
              _react2.default.createElement(_ValidatorInput2.default, {
                InputComponent: _antd.Input,
                value: nullValidator(parserData, "sellSelector"),
                placeholder: "Sell selector",
                name: "sellSelector",
                validationOption: { length: 60 },
                onChange: this.handleValueOnChange
              })
            )
          ),
          _react2.default.createElement(
            _antd.Checkbox,
            {
              name: "active",
              onChange: this.handleValueOnChange,
              checked: nullValidator(parserData, "active", false)
            },
            "Active"
          )
        )
      );
    }
  }]);

  return ParserData;
}(_react2.default.Component);

exports.default = ParserData;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/ParserData.less";

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = require("moment/moment");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editParserService = undefined;

var _index = __webpack_require__(6);

var _AppConstance = __webpack_require__(3);

var _APIUtil = __webpack_require__(5);

var editParserService = exports.editParserService = {
  selectCompanyById: function selectCompanyById(companies, id) {
    var foundCompany = null;
    companies.some(function (company) {
      if (company.id.toString() === id) {
        foundCompany = company;
        return true;
      }
      return false;
    });
    return foundCompany;
  },
  updateParserData: function updateParserData(companyId, initialParserData) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/parser?companyId=" + companyId,
      method: 'PUT',
      body: JSON.stringify(initialParserData)
    }).then(function (response) {
      _index.notification.success({
        message: 'EC',
        description: 'Parser data was updated successfully!'
      });
    }).catch(function (error) {
      _index.notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  },
  checkParseResult: function checkParseResult(companyId) {
    return (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/parser/checkParser?companyId=" + companyId,
      method: 'GET'
    }, _APIUtil.TEXT_RES_TYPE);
  }
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/editedParserForm.less";

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _EditedCommentaryForm = __webpack_require__(90);

var _EditedCommentaryForm2 = _interopRequireDefault(_EditedCommentaryForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    companies: state.admin.companies
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_EditedCommentaryForm2.default);

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _editCommentaryService = __webpack_require__(91);

var _CommentaryData = __webpack_require__(92);

var _CommentaryData2 = _interopRequireDefault(_CommentaryData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EditedCommentaryForm = function (_React$Component) {
  _inherits(EditedCommentaryForm, _React$Component);

  function EditedCommentaryForm() {
    _classCallCheck(this, EditedCommentaryForm);

    return _possibleConstructorReturn(this, (EditedCommentaryForm.__proto__ || Object.getPrototypeOf(EditedCommentaryForm)).apply(this, arguments));
  }

  _createClass(EditedCommentaryForm, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          params = _props.match.params;

      var company = this.getCompanyById;

      return company ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(_antd.Icon, { type: 'profile' }),
          ' ',
          'Company ' + params.id
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_CommentaryData2.default, {
            companyId: params.id,
            dispatch: dispatch,
            commentaries: company.comments
          })
        )
      ) : _react2.default.createElement(Alert, { message: 'Commentaries don\'t exist', type: 'error' });
    }
  }, {
    key: 'editCommentaryService',
    get: function get() {
      return _editCommentaryService.editCommentaryService;
    }
  }, {
    key: 'getCompanyById',
    get: function get() {
      var _props2 = this.props,
          params = _props2.match.params,
          companies = _props2.companies;

      return this.editCommentaryService.selectCompanyById(companies, params.id);
    }
  }]);

  return EditedCommentaryForm;
}(_react2.default.Component);

exports.default = EditedCommentaryForm;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editCommentaryService = undefined;

var _index = __webpack_require__(6);

var _AppConstance = __webpack_require__(3);

var _APIUtil = __webpack_require__(5);

var editCommentaryService = exports.editCommentaryService = {
  selectCompanyById: function selectCompanyById(companies, id) {
    var foundCompany = null;
    companies.some(function (company) {
      if (company.id.toString() === id) {
        foundCompany = company;
        return true;
      }
      return false;
    });
    return foundCompany;
  },
  updateCommentaryData: function updateCommentaryData(companyId, currencyRate) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/currency/" + companyId,
      method: 'PUT',
      body: JSON.stringify(currencyRate)
    }).then(function (response) {
      _index.notification.success({
        message: 'EC',
        description: 'Currency data was updated successfully!'
      });
    }).catch(function (error) {
      _index.notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = CommentaryData;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

__webpack_require__(93);

var _commentary = __webpack_require__(94);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meta = _antd.Card.Meta;


function Like(_ref) {
  var isLiked = _ref.isLiked,
      isDisliked = _ref.isDisliked;

  if (isLiked) {
    return _react2.default.createElement(_antd.Icon, { type: 'like' });
  } else if (isDisliked) {
    return _react2.default.createElement(_antd.Icon, { type: 'dislike' });
  }
  return null;
}

function CommentaryData(_ref2) {
  var companyId = _ref2.companyId,
      dispatch = _ref2.dispatch,
      commentaries = _ref2.commentaries;


  var mapedCommentaries = commentaries && commentaries.map(function (commentary) {
    var handleDeleteCommentary = function handleDeleteCommentary() {
      dispatch((0, _commentary.deleteCommentaryById)(companyId, commentary.id));
    };

    return _react2.default.createElement(
      'div',
      { key: commentary.id, className: 'commentaryData__item' },
      _react2.default.createElement(
        _antd.Card,
        {
          style: { width: 300 },
          title: commentary.name,
          actions: [_react2.default.createElement(_antd.Icon, { type: 'delete', onClick: handleDeleteCommentary })],
          extra: _react2.default.createElement(Like, { isLiked: commentary.liked, isDisliked: commentary.dislike })
        },
        _react2.default.createElement(Meta, {
          title: commentary.title,
          description: commentary.text
        })
      )
    );
  });

  return _react2.default.createElement(
    'div',
    { className: 'commentaryData' },
    commentaries.length !== 0 ? mapedCommentaries : _react2.default.createElement(_antd.Alert, { message: 'There are no commentaries', type: 'info' })
  );
}

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/CommentaryData.less";

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteCommentaryById = deleteCommentaryById;

var _commentary = __webpack_require__(23);

var _index = __webpack_require__(6);

var _APIUtil = __webpack_require__(5);

var _AppConstance = __webpack_require__(3);

function deleteCommentaryById(companyId, commentaryId) {
  return function (dispatch) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/commentary/" + commentaryId,
      method: 'DELETE'
    }).then(function (response) {
      dispatch({
        type: _commentary.DELETE_COMMENTARY_BY_ID,
        commentaryId: commentaryId,
        companyId: companyId
      });
      _index.notification.success({
        message: 'EC',
        description: 'Commentary was deleted successfully!'
      });
    }).catch(function (error) {
      _index.notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  };
}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactRedux = __webpack_require__(4);

var _NewCompany = __webpack_require__(96);

var _NewCompany2 = _interopRequireDefault(_NewCompany);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    newCompany: state.admin.newCompany
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_NewCompany2.default);

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

var _NewCompanyData = __webpack_require__(97);

var _NewCompanyData2 = _interopRequireDefault(_NewCompanyData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewCompany = function (_React$Component) {
  _inherits(NewCompany, _React$Component);

  function NewCompany() {
    _classCallCheck(this, NewCompany);

    return _possibleConstructorReturn(this, (NewCompany.__proto__ || Object.getPrototypeOf(NewCompany)).apply(this, arguments));
  }

  _createClass(NewCompany, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          dispatch = _props.dispatch,
          newCompany = _props.newCompany;


      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "h1",
          null,
          _react2.default.createElement(_antd.Icon, { type: "table" }),
          " Currency"
        ),
        _react2.default.createElement(_NewCompanyData2.default, {
          dispatch: dispatch,
          newCompany: newCompany
        })
      );
    }
  }]);

  return NewCompany;
}(_react2.default.Component);

exports.default = NewCompany;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _CompanyMainInfo = __webpack_require__(15);

var _CompanyMainInfo2 = _interopRequireDefault(_CompanyMainInfo);

var _antd = __webpack_require__(1);

var _companyMainInfo = __webpack_require__(10);

var _editNewCompanyService = __webpack_require__(98);

__webpack_require__(99);

var _CompanyDataInfo = __webpack_require__(17);

var _CompanyDataInfo2 = _interopRequireDefault(_CompanyDataInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewCompanyData = function (_React$Component) {
  _inherits(NewCompanyData, _React$Component);

  function NewCompanyData(props) {
    _classCallCheck(this, NewCompanyData);

    var _this = _possibleConstructorReturn(this, (NewCompanyData.__proto__ || Object.getPrototypeOf(NewCompanyData)).call(this, props));

    _this.state = {
      isUpdateButtonDisable: true,
      initialCompanyMainInfo: {}
    };

    _this.handleCreateButtonClick = _this.handleCreateButtonClick.bind(_this);
    return _this;
  }

  _createClass(NewCompanyData, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var newCompany = this.props.newCompany;

      this.setState({ initialCompanyMainInfo: JSON.stringify(newCompany) });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var dispatch = this.props.dispatch;
      var initialCompanyMainInfo = this.state.initialCompanyMainInfo;

      dispatch((0, _companyMainInfo.setInitialCompanyMainInfoState)(null, initialCompanyMainInfo, true));
    }
  }, {
    key: "handleCreateButtonClick",
    value: function handleCreateButtonClick() {
      var newCompany = this.props.newCompany;

      this.editNewCompanyService.createNewCompany(newCompany);
    }
  }, {
    key: "render",
    value: function render() {
      var isUpdateButtonDisable = this.state.isUpdateButtonDisable;
      var _props = this.props,
          newCompany = _props.newCompany,
          dispatch = _props.dispatch;


      return _react2.default.createElement(
        "div",
        { className: "newCompanyData" },
        _react2.default.createElement(_CompanyMainInfo2.default, {
          company: newCompany,
          isNewCompany: true,
          dispatch: dispatch
        }),
        _react2.default.createElement(_CompanyDataInfo2.default, {
          exchangeCompanyDetail: newCompany.exchangeCompanyDetail,
          isNewCompany: true,
          dispatch: dispatch
        }),
        _react2.default.createElement(
          "div",
          { className: "newCompanyData__actions" },
          _react2.default.createElement(
            _antd.Button,
            {
              type: "primary",
              disabled: isUpdateButtonDisable,
              onClick: this.handleCreateButtonClick
            },
            "Create new company"
          )
        )
      );
    }
  }, {
    key: "editNewCompanyService",
    get: function get() {
      return _editNewCompanyService.editNewCompanyService;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var newCompany = props.newCompany;

      if (JSON.stringify(newCompany) !== state.initialCompanyMainInfo) {
        return { isUpdateButtonDisable: false };
      }
      return { isUpdateButtonDisable: true };
    }
  }]);

  return NewCompanyData;
}(_react2.default.Component);

exports.default = NewCompanyData;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editNewCompanyService = undefined;

var _index = __webpack_require__(6);

var _AppConstance = __webpack_require__(3);

var _APIUtil = __webpack_require__(5);

var editNewCompanyService = exports.editNewCompanyService = {
  createNewCompany: function createNewCompany(newCompany) {
    (0, _APIUtil.request)({
      url: _AppConstance.API_URL + "/company",
      method: 'POST',
      body: JSON.stringify(newCompany)
    }).then(function (response) {
      _index.notification.success({
        message: 'EC',
        description: 'New company created successfully!'
      });
    }).catch(function (error) {
      _index.notification.error({
        message: 'EC',
        description: error.message || 'Sorry! Something went wrong. Please try again!'
      });
    });
  }
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/newCompanyData.less";

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/admin.less";

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(7);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var PrivateRoute = function PrivateRoute(_ref) {
  var Component = _ref.component,
      authenticated = _ref.authenticated,
      rest = _objectWithoutProperties(_ref, ['component', 'authenticated']);

  return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, {
    render: function render(props) {
      return authenticated ? _react2.default.createElement(Component, _extends({}, rest, props)) : _react2.default.createElement(_reactRouterDom.Redirect, {
        to: {
          pathname: '/admin/login',
          state: { from: props.location }
        }
      });
    }
  }));
};

PrivateRoute.propTypes = {
  component: _propTypes2.default.func,
  authenticated: _propTypes2.default.bool,
  location: _propTypes2.default.object
};

exports.default = PrivateRoute;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = LoadingIndicator;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _antd = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LoadingIndicator(props) {
    var antIcon = _react2.default.createElement(_antd.Icon, { type: 'loading-3-quarters', style: { fontSize: 30 }, spin: true });
    return _react2.default.createElement(_antd.Spin, { indicator: antIcon, style: { display: 'block', textAlign: 'center', marginTop: 30 } });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = configureStore;

var _redux = __webpack_require__(24);

var _reduxThunk = __webpack_require__(104);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducer = __webpack_require__(105);

var _reducer2 = _interopRequireDefault(_reducer);

var _reduxLogger = __webpack_require__(108);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loggerMiddleware = (0, _reduxLogger.createLogger)();

function configureStore(preloadedState) {
    return (0, _redux.createStore)(_reducer2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default, loggerMiddleware));
}

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = __webpack_require__(24);

var _admin = __webpack_require__(106);

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducer = (0, _redux.combineReducers)({
    admin: _admin2.default
});

exports.default = rootReducer;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = admin;

var _admin = __webpack_require__(14);

var _companyColumnConfig = __webpack_require__(9);

var _currencyRate = __webpack_require__(20);

var _dataProcessors = __webpack_require__(107);

var _parser = __webpack_require__(22);

var _commentary = __webpack_require__(23);

var _companyMainInfo = __webpack_require__(16);

var _companyDataInfo = __webpack_require__(18);

var initialState = {
  companies: [],
  newCompany: {
    workingTime: {},
    exchangeCompanyDetail: {}
  }
};

function admin() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _admin.GET_ALL_COMPANIES:
      action.companies.forEach(function (company) {
        return company.key = company.uniqueId;
      });
      return _extends({}, state, { companies: action.companies });
    case _admin.DELETE_COMPANY_BY_ID:
      var companies = state.companies.filter(function (company) {
        return company.id !== action.companyId;
      });
      return _extends({}, state, { companies: companies });
    case _currencyRate.CHANGE_CURRENCY_VALUE:
      return _extends({}, state, { companies: (0, _dataProcessors.changeCurrencyValue)(state.companies, action) });
    case _currencyRate.SELECT_UNSELECT_CURRENCY:
      return _extends({}, state, { companies: (0, _dataProcessors.selectUnselectCurrency)(state.companies, action) });
    case _currencyRate.SET_INITIAL_CURRENCY_STATE:
      return _extends({}, state, { companies: (0, _dataProcessors.setInitialCurrencyState)(state.companies, action) });
    case _parser.CHANGE_PARSER_VALUE:
      return _extends({}, state, { companies: (0, _dataProcessors.changeParserValue)(state.companies, action) });
    case _parser.SET_INITIAL_PARSER_STATE:
      return _extends({}, state, { companies: (0, _dataProcessors.setInitialParserState)(state.companies, action) });
    case _commentary.DELETE_COMMENTARY_BY_ID:
      return _extends({}, state, { companies: (0, _dataProcessors.deleteCommentaryById)(state.companies, action) });
    case _companyMainInfo.SET_INITIAL_COMPANY_MAIN_INFO_STATE:
      if (action.isNewCompany) {
        return _extends({}, state, { newCompany: action.companyMainInfo });
      }
      return _extends({}, state, { companies: (0, _dataProcessors.setInitialCompanyMainInfoState)(state.companies, action) });
    case _companyMainInfo.CHANGE_COMPANY_MAIN_INFO_VALUE:
      if (action.isNewCompany) {
        var newCompany = _extends({}, state.newCompany);
        if (!!action.value) {
          newCompany[action.fieldName] = action.value;
        } else {
          delete newCompany[action.fieldName];
        }
        return _extends({}, state, { newCompany: newCompany });
      }
      return _extends({}, state, { companies: (0, _dataProcessors.changeCompanyMainInfoValue)(state.companies, action) });
    case _companyMainInfo.CHANGE_WORKING_TIME_VALUE:
      if (action.isNewCompany) {
        var _newCompany = _extends({}, state.newCompany);
        if (!!action.value) {
          _newCompany.workingTime[action.fieldName] = action.value;
        } else {
          delete _newCompany.workingTime[action.fieldName];
        }
        return _extends({}, state, { newCompany: _newCompany });
      }
      return _extends({}, state, { companies: (0, _dataProcessors.changeWorkingTimeValue)(state.companies, action) });
    case _companyDataInfo.CHANGE_COMPANY_DATA_INFO_VALUE:
      if (action.isNewCompany) {
        var _newCompany2 = _extends({}, state.newCompany);
        if (!!action.value) {
          _newCompany2.exchangeCompanyDetail[action.fieldName] = action.value;
        } else {
          delete _newCompany2.exchangeCompanyDetail[action.fieldName];
        }
        return _extends({}, state, { newCompany: _newCompany2 });
      }
      return _extends({}, state, { companies: (0, _dataProcessors.changeCompanyDataInfoValue)(state.companies, action) });
    default:
      return state;
  }
}

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.selectUnselectCurrency = selectUnselectCurrency;
exports.changeCurrencyValue = changeCurrencyValue;
exports.changeParserValue = changeParserValue;
exports.setInitialCurrencyState = setInitialCurrencyState;
exports.setInitialParserState = setInitialParserState;
exports.deleteCommentaryById = deleteCommentaryById;
exports.changeCompanyMainInfoValue = changeCompanyMainInfoValue;
exports.setInitialCompanyMainInfoState = setInitialCompanyMainInfoState;
exports.changeWorkingTimeValue = changeWorkingTimeValue;
exports.changeCompanyDataInfoValue = changeCompanyDataInfoValue;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function selectUnselectCurrency(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      var tempCurrencies = [].concat(_toConsumableArray(company.currencyRates));
      if (company.currencyRates.every(function (c) {
        return c.currencyType !== action.currency.currencyType;
      })) {
        tempCurrencies.push({
          currencyName: action.currency.currencyName,
          currencyType: action.currency.currencyType
        });
      } else {
        tempCurrencies = tempCurrencies.filter(function (c) {
          return c.currencyType !== action.currency.currencyType;
        });
      }
      company.currencyRates = tempCurrencies;
    }
    return company;
  });
}

function changeCurrencyValue(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company.currencyRates.forEach(function (c) {
        if (c.currencyType === action.currencyType) {
          c[action.fieldName] = Number(action.value);
        }
      });
    }
    return company;
  });
}

function changeParserValue(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      if (!company.exchangeCompanyParseData) {
        company.exchangeCompanyParseData = {};
      }
      company.exchangeCompanyParseData[action.fieldName] = action.value;
    }
    return company;
  });
}

function setInitialCurrencyState(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company.currencyRates = JSON.parse(action.initialCurrencyRate);
    }
    return company;
  });
}

function setInitialParserState(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company.exchangeCompanyParseData = JSON.parse(action.initialParserData);
    }
    return company;
  });
}

function deleteCommentaryById(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company.comments = company.comments.filter(function (comment) {
        return comment.id !== action.commentaryId;
      });
    }
    return company;
  });
}

function changeCompanyMainInfoValue(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company[action.fieldName] = action.value;
    }
    return company;
  });
}

function setInitialCompanyMainInfoState(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      return _extends({}, company, JSON.parse(action.companyMainInfo));
    }
    return company;
  });
}

function changeWorkingTimeValue(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company.workingTime[action.fieldName] = action.value;
    }
    return company;
  });
}

function changeCompanyDataInfoValue(companies, action) {
  return companies.map(function (company) {
    if (company.id === Number(action.companyId)) {
      company.exchangeCompanyDetail[action.fieldName] = action.value;
    }
    return company;
  });
}

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ })
/******/ ]);