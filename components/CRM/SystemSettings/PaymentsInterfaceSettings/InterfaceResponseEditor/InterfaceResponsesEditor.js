import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import InterfaceResponseItem from "./InterfaceResponseItem";
import InterfaceResponseHeader from "./InterfaceResponseHeader";

const InterfaceResponsesEditor = ({ item, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{item.paymentName} interface response list</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div>
            <InterfaceResponseHeader />
            <InterfaceResponseItem />
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

export default InterfaceResponsesEditor;
