import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useGenericOnChange } from "../../../../hooks/useGenericOnChange";
import Stage1 from "./Stage1";
import Stage2 from "./Stage2";
import Stage3 from "./Stage3";
import Stage4 from "./Stage4";
import api from "../../../../apis/userAPI";

import { initialRecurringData } from "../../../../json-data/initialRecurring";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ChevronsDownLeft } from "tabler-icons-react";
const Donate = ({
  campaign,
  donation = null,
  customCompleteDonation = null,
  goToStage = 0,
}) => {
  const [currencies, setCurrencies] = useState([]);
  let isAdmin = null;
  let isUpdatedByAdmin = null;
  if (donation && !donation._id) {
    isAdmin = true;
  } else {
    isAdmin = false;
  }

  if (donation && donation._id) {
    isUpdatedByAdmin = true;
  } else {
    isUpdatedByAdmin = false;
  }

  const initialRecurring = { ...initialRecurringData };
  if (donation) {
    initialRecurring = { ...donation };
  }
  const [recurring, setRecurring] = useState(
    donation
      ? { ...donation, isAdmin: isAdmin, isUpdatedByAdmin: isUpdatedByAdmin }
      : {
          ...initialRecurring,
          isAdmin: isAdmin,
          isUpdatedByAdmin: isUpdatedByAdmin,
        }
  );

  const [interfaceList, setInterfaceList] = useState([]);
  const [privateRecurring, setPrivateRecurring] = useState({
    ...initialRecurring,
    isPrivateDonation: true,
    sum: 0,
    isAdmin: isAdmin,
    isUpdatedByAdmin: isUpdatedByAdmin,
  });
  const onRecurringUpdate = (name, value) => {
    setRecurring((prev) => ({ ...prev, [name]: value }));
  };

  const [currentCurrencySymbol, setCurrentCurrencySymbol] = useState("$");

  const onUpdate = (e) => {
    const name = e.target.name;
    const value = e.target.checked ? e.target.checked : e.target.value;

    setPrivateRecurring({ ...privateRecurring, [name]: value });
  };
  const onUpdateWithValues = (name, value) => {
    setPrivateRecurring((prev) => ({ ...prev, [name]: value }));
  };
  const onCreditcardChange = (inputName, value) => {
    const updates = useGenericOnChange(inputName, value);
    onUpdate(useGenericOnChange(inputName, value));
  };

  const onDonateAmountSumChanged = (inputName, value, isPrivate) => {
    if (!isPrivate) {
      onRecurringUpdate(useGenericOnChange(inputName, value));
    } else {
      onUpdate(useGenericOnChange(inputName, value));
    }
  };

  const onACHChange = (inputName, value) => {
    const updates = useGenericOnChange(inputName, value);
    onUpdate(useGenericOnChange(inputName, value));
    onRecurringUpdate(useGenericOnChange(inputName, value));
  };

  const [stage, setStage] = useState(goToStage);

  const completeDonation = async () => {
    let result = null;
    // adding new donation.
    if (customCompleteDonation === null) {
      try {
        //  adding new recurring  data
        const paymentInterface = interfaceList.find(
          (x) => x.id.toString() === recurring.paymentType.toString()
        );

        const finalRecurring = {
          ...recurring,
          campaign: campaign._id,
          paymentInterface: paymentInterface._id,
          lastPaymentDate: new Date(),
        };
        const finalPrivateRecurring = {
          ...privateRecurring,
          campaign: campaign._id,
          paymentInterface: paymentInterface._id,
          lastPaymentDate: new Date(),
        };
        result = await api.post("/recurring/", {
          recurring: finalRecurring,
          privateRecurring: finalPrivateRecurring,
        });

        goToStage(4);
      } catch (e) {}
    } else {
      const result = customCompleteDonation({ recurring, privateRecurring });
    }
    // creating new payment
  };
  useEffect(() => {}, [privateRecurring]);

  useEffect(() => {
    setPrivateRecurring({
      ...privateRecurring,
      ["currency"]: recurring.currency,
    });
    let newCurrency = currencies.find((x) => x._id === recurring.currency);
    newCurrency = newCurrency ? newCurrency.symbol : "$";
    setCurrentCurrencySymbol(newCurrency);
  }, [recurring.currency]);
  useEffect(() => {
    onRecurringUpdate("firstName", privateRecurring.firstName);
    onRecurringUpdate("lastName", privateRecurring.lastName);
    onRecurringUpdate("cellphone", privateRecurring.cellphone);
    onRecurringUpdate("email", privateRecurring.email);
    onRecurringUpdate("creditCardNumber", privateRecurring.creditCardNumber);
    onRecurringUpdate("CVC", privateRecurring.CVC);
    onRecurringUpdate("creditCardExpire", privateRecurring.creditCardExpire);
    onRecurringUpdate("isAgreeToTerms ", privateRecurring.isAgreeToTerms);
    onRecurringUpdate("isMarketingEmail", privateRecurring.isMarketingEmail);
  }, [
    privateRecurring.firstName,
    privateRecurring.lastName,
    privateRecurring.firstName,
    privateRecurring.cellphone,
    privateRecurring.email,
    privateRecurring.creditCardNumber,
    privateRecurring.CVC,
    privateRecurring.creditCardExpire,
  ]);

  useEffect(() => {
    onRecurringUpdate("routing_number", privateRecurring.routing_number);
    onRecurringUpdate("account_number", privateRecurring.account_number);
    onRecurringUpdate("name", privateRecurring.name);
  }, [
    privateRecurring.routing_number,
    privateRecurring.account_number,
    privateRecurring.name,
  ]);

  const getCurrencies = async () => {
    const { data } = await api.post("/currencies/get");
    if (recurring.currency === 0) {
      setRecurring({ ...recurring, currency: data[0]._id });
    }
    setCurrencies(data);
  };

  const getInterfaceList = async () => {
    const { data } = await api.post("/payments-interface/", {});
    setInterfaceList(data);
  };

  useEffect(() => {
    onUpdate(useGenericOnChange("campaign", campaign._id));
    onRecurringUpdate("campaign", campaign._id);
    getCurrencies();
    getInterfaceList();
  }, []);

  useEffect(() => {}, [recurring.campaign]);
  const renderStage = () => {
    switch (stage) {
      case 0: {
        return (
          <Stage1
            campaign={campaign}
            setStage={setStage}
            renderStage={renderStage}
            onRecurringUpdate={onRecurringUpdate}
            recurring={recurring}
            currencies={currencies}
            currency={recurring.currency}
            currentCurrencySymbol={currentCurrencySymbol}
          />
        );
      }
      case 1: {
        return (
          <Stage2
            campaign={campaign}
            setStage={setStage}
            onRecurringUpdate={onCreditcardChange}
            recurring={privateRecurring}
            donation={donation}
            currencies={currencies}
            currentCurrencySymbol={currentCurrencySymbol}
          />
        );
      }
      case 2: {
        return (
          <Stage3
            campaign={campaign}
            setStage={setStage}
            recurring={recurring}
            privateRecurring={privateRecurring}
            onCreditcardChange={onCreditcardChange}
            onUpdate={onUpdate}
            completeDonation={completeDonation}
            onRecurringUpdate={onRecurringUpdate}
            onUpdateWithValues={onUpdateWithValues}
            currentCurrencySymbol={currentCurrencySymbol}
          />
        );
      }
      case 3: {
        return <Stage4 campaign={campaign} />;
      }
    }
  };

  useEffect(() => {}, [recurring]);
  useEffect(() => {}, [privateRecurring]);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ scale: 0, opacity: 0 }}
        className="mt-4"
      >
        {renderStage()}
      </motion.div>
    </AnimatePresence>
  );
};

export default Donate;
