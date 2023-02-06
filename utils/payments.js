import { v4 as uuidv4 } from "uuid";
import { donationOptions } from "../json-data/donationOptions";
import moment from "moment";

import { initialPayment } from "../json-data/initialPayment";

export const getNewPayment = (r) => {
  //   creating new payment object.
  const id = uuidv4();

  const payment = {
    isPrivateDonation: r.isPrivateDonation,
    currency: r.currency,
    sum: r.sum,
    fee: r.fee,
    isRecurring: r.isRecurring,
    recurringCount: r.currentRecurringCount,
    isAnonymous: r.isAnonymous,
    createdDate: Date.now(),
    reference_id: r.reference,
    isCompleteFee: r.isCompleteFee,
    status: 0,
    paymentType: r.paymentType,
    campaign: r.campaign,
    recurring: r._id,
    reference_id: uuidv4(),
    isAdmin: false,
  };

  return payment;
};

export const getLastRoundPayment = (list) => {
  const newList = list.sort(compare);
  const last = newList[list.length - 1];
  return last;
};

function compare(a, b) {
  if (a.recurringCount < b.recurringCount) {
    return -1;
  }
  if (a.recurringCount > b.recurringCount) {
    return 1;
  }
  return 0;
}

export const createFuturePayments = (r, startDate, list) => {
  let currentDate = moment(startDate.createdDate);
  const max =
    r.recurringCount === 0 || r.recurringCount > 10
      ? 10
      : r.recurringCount - list.length;

  const futurePayments = [...Array(max).keys()].map((item, index) => {
    currentDate = moment(currentDate).add(
      donationOptions[r.recurringType].days,
      "days"
    );
    return {
      isPrivateDonation: r.isPrivateDonation,
      currency: 0,
      sum: r.sum,
      fee: r.fee,
      isRecurring: r.isRecurring,
      createdDate: currentDate,
      recurringCount: r.currentRecurringCount,
      isAnonymous: r.isAnonymous,
      isCompleteFee: r.isCompleteFee,
      paymentType: r.paymentType,
      status: 3,
      campaign: r.campaign,
      recurring: r._id,
      reference_id: uuidv4(),
      createdAt: Date.now(),
      isAdmin: false,
    };
  });

  return futurePayments;
};

export const paymentStatus = {
  0: { text: "Success" },
  3: { text: "Uncompleted" },
};
