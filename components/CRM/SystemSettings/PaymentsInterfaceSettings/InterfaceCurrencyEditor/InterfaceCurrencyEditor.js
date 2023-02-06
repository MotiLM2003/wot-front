import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import api from "apis/userAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InterfaceCurrencyItem from "./InterfaceCurrencyItem";

const InterfaceCurrencyEditor = ({
  item,
  isOpen,
  onClose,
  updateInterfaceAllowedCurrencies,
  onCurrenciesUpdated,
}) => {
  const [allowedCurrencies, setAllowedCurrencies] = useState(
    item.allowedCurrencies
  );
  const [currencyList, setCurrencyList] = useState([]);
  const getItems = async () => {
    const { data } = await api.post("/currencies/get", {});
    setCurrencyList(data);
  };

  const onChange = (e, curr) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setAllowedCurrencies([...allowedCurrencies, curr._id]);
    } else {
      setAllowedCurrencies(allowedCurrencies.filter((x) => x !== curr._id));
    }
  };

  const onUpdate = () => {
    onCurrenciesUpdated(allowedCurrencies);
  };

  useEffect(() => {}, [allowedCurrencies]);
  useEffect(() => {
    getItems();
  }, []);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {item.paymentName}
          interface supported currency list
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <div class="flex gap-5">
              <div className="l-input"> Currencies </div>
            </div>
            <div class="flex   gap-5">
              <div>
                {currencyList &&
                  currencyList.map((item) => (
                    <InterfaceCurrencyItem
                      key={item._id}
                      item={item}
                      isChecked={allowedCurrencies.includes(item._id)}
                      onClose={onClose}
                      onChange={onChange}
                    />
                  ))}
              </div>
            </div>
            <div className="mt-8">
              <Button
                size="sm"
                colorScheme="red"
                onClick={() => {
                  onUpdate();
                  onClose();
                }}
              >
                Update
              </Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default InterfaceCurrencyEditor;
