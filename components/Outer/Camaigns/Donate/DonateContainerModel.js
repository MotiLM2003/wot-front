import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
} from "@chakra-ui/react";
import Donate from "./Donate";
const DonateContainerModel = ({
  isOpen,
  onClose,
  donation,
  customCompleteDonation,
  goToStage,
}) => {
  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      lockScrollOnMount={false}
    >
      <ModalOverlay
        bg="none"
        backdropFilter="auto"
        backdropInvert="0%"
        backdropBlur="4px"
      />
      <ModalContent>
        <ModalHeader>
          <div className="flex gap-8 justify-center items-center border-b border-b-primary">
            <Text className="text-primary font-bold">DONATE AMOUNT</Text>
          </div>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ overflow: "hidden" }}>
            <Donate
              campaign={donation.campaign}
              donation={donation}
              customCompleteDonation={customCompleteDonation}
              goToStage={goToStage}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <i class="fa-solid fa-circle-arrow-right"></i>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DonateContainerModel;
