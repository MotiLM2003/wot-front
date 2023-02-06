import React, { useState, useEffect } from "react";
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

// project imports
import donate from "../../../../images/icons/white/donate.svg";
import donateBlue from "../../../../images/icons/donate-blue.svg";
import Image from "next/image";
import Donate from "./Donate";

const DonateModel = ({ campaign }) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="0%"
      backdropBlur="4px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayTwo />);

  return (
    <>
      <div
        onClick={() => {
          onOpen();
        }}
        className="flex gap-3 bg-gradient-to-b from-prime-default to-prime-300 hover:from-prime-150 hover:prime-default opacity-70 hover:shadow-2xl hover:opacity-100 hover:scale-[1.02] cursor-pointer transition duration-500 min-w-[220px] rounded justify-center items-center"
      >
        <div>
          <Image src={donate} width={42} height={41} />
        </div>
        <Text className="font-bold text-white">DONATE</Text>
      </div>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size="2xl"
        lockScrollOnMount={false}
      >
        {overlay}
        <ModalContent>
          <ModalHeader>
            <div className="flex gap-8 justify-center items-center border-b border-b-primary">
              <Image src={donateBlue} width={54} height={67} />
              <Text className="text-primary font-bold">DONATE AMOUNT</Text>
            </div>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div style={{ overflow: "hidden" }}>
              <Donate campaign={campaign} />
            </div>
            '
          </ModalBody>
          <ModalFooter>
            <i class="fa-solid fa-circle-arrow-right"></i>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DonateModel;
