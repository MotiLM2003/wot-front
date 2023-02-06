import Balance from "@components/Icons/Balance";
import DonationMoneyInHand from "@components/Icons/DonationMoneyInHand";
import HeartInHands from "@components/Icons/HeartInHands";
import Sound from "@components/Icons/Sound";
import WithdrawMoney from "@components/Icons/WithdrawMoney";
import React from "react";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="flex flex-col">
        <div>
          <div className="flex items-center ">
            <div>test</div>
            <div>test</div>
          </div>
        </div>
        <div>Available</div>
        <div className="flex">
          <div>Recent donation</div>
          <div>Recent Recurring</div>
        </div>
        <div>campaign</div>
      </div>
      <Balance />
      <Sound />
      <WithdrawMoney />
      <HeartInHands />
      <DonationMoneyInHand />
    </div>
  );
};

export default Dashboard;
