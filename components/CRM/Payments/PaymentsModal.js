import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import PaymentList from "./PaymentList";

const PaymentsModal = ({ isOpen, onClose, donation }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent maxW="56rem">
        <ModalHeader>
          <div className="flex flex-col gap-2">
            <div>Payments list ({donation.campaign.campaignName})</div>
            <div className="flex flex-col justify-center gap-1">
              <Text size="sm" className="text-[14px] p-1">
                Campaign Id:
                <span className=" bg-primary text-white p-1 rounded">
                  {donation.campaign._id}
                </span>
              </Text>
              <Text size="sm" className="text-[14px]">
                recurring Id:{" "}
                <span className=" bg-primary text-white p-1 rounded">
                  {donation._id}
                </span>
              </Text>
            </div>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PaymentList donation={donation} />
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

export default PaymentsModal;
