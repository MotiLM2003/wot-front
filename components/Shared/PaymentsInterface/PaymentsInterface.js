import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "@chakra-ui/react";
import Ach from "@components/Icons/Ach";
import Creditcard from "@components/Icons/Creditcard";
import Donors from "@components/Icons/Donors";
import OJC from "@components/Icons/OJC";
import Paypal from "@components/Icons/Paypal";
import googlePay from "../../../images/icons/dark/google-pay.png";
import Image from "next/image";
import { CloudFog } from "tabler-icons-react";
const PaymentsInterface = ({
  list,
  paymentType = 0,
  paymentInterfaceChanged,
  currency,
}) => {
  const [iList, setIList] = useState(list);
  const getIcon = (id) => {
    switch (id) {
      case 0: {
        return <Creditcard />;
      }
      case 1: {
        return <Ach />;
      }
      case 2: {
        return <Paypal />;
      }
      case 3: {
        return <OJC />;
      }
      case 4: {
        return <Donors />;
      }
      case 5: {
        return (
          <div>
            <Image src={googlePay} width={33} height={33} />
          </div>
        );
      }
    }
  };
  useEffect(() => {
    setIList(list.filter((x) => x.allowedCurrencies.includes(currency)));
  }, [list]);
  return (
    <RadioGroup
      onChange={(e) => {
        paymentInterfaceChanged(e);
      }}
      value={paymentType.toString()}
      name="rbPaymentType"
    >
      <div className="flex flex-wrap gap-3 mt-5 pb-2">
        {iList &&
          iList.map((item) => {
            return (
              <div
                className={`flex items-center gap-2 border p-3 rounded-xl border-gray-500 w-[195px] transition duration-1000 text-sm  ${
                  parseInt(paymentType) === item.id ? "bg-shades-500" : ""
                } `}
              >
                <div className="flex items-center justify-center ">
                  <Radio value={item.id.toString()}></Radio>
                </div>
                <div>{getIcon(item.id)}</div>
                <div>{item.paymentName}</div>
              </div>
            );
          })}
      </div>
    </RadioGroup>
  );
};

export default PaymentsInterface;
