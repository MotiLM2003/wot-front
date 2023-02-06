"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialRecurringFakeData = exports.initialRecurringData = void 0;

var _initialRecurringData, _initialRecurringFake;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialRecurringData = (_initialRecurringData = {
  isPrivateDonation: false,
  displayName: "",
  currency: 0,
  sum: 0,
  recurringType: 0,
  currentRecurringCount: 0,
  recurringCount: 0,
  isRecurring: "1",
  isAnonymous: false,
  isAddPublicNote: false,
  isCompleteFee: false,
  publicNote: "",
  privateNote: "",
  firstName: "",
  lastName: "",
  paymentType: 0,
  cellphone: "",
  email: "",
  donationNote: "",
  fee: 5.25,
  creditCardNumber: "",
  creditCardExpire: "",
  CVC: "",
  isMarketingEmail: false,
  campaign: "",
  isAdmin: false,
  isUpdatedByAdmin: false,
  isImmediatePayment: true,
  routing_number: "",
  account_number: "",
  name: "",
  sec_code: "PPD",
  isAgreeToTerms: true
}, _defineProperty(_initialRecurringData, "isMarketingEmail", true), _defineProperty(_initialRecurringData, "paymentInterface", 0), _initialRecurringData);
exports.initialRecurringData = initialRecurringData;
var initialRecurringFakeData = (_initialRecurringFake = {
  isPrivateDonation: false,
  displayName: "Moti elmakayes",
  currency: 0,
  sum: 1243.43,
  recurringType: 0,
  currentRecurringCount: 0,
  recurringCount: 0,
  isRecurring: "1",
  isAnonymous: false,
  isAddPublicNote: false,
  isCompleteFee: false,
  publicNote: "",
  privateNote: "",
  firstName: "motiu",
  lastName: "asdsa",
  paymentType: 0,
  cellphone: "sadsa",
  email: "sadsad",
  donationNote: "dsadsa",
  fee: 5.25,
  creditCardNumber: "",
  creditCardExpire: "",
  CVC: "",
  isMarketingEmail: false,
  campaign: "",
  isAdmin: false,
  isUpdatedByAdmin: false,
  isImmediatePayment: true,
  routing_number: "",
  account_number: "",
  name: "",
  sec_code: "PPD",
  isAgreeToTerms: true
}, _defineProperty(_initialRecurringFake, "isMarketingEmail", true), _defineProperty(_initialRecurringFake, "paymentInterface", 0), _initialRecurringFake);
exports.initialRecurringFakeData = initialRecurringFakeData;