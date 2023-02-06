import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Stack,
  FormLabel,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Select,
  Input,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { v4 as uid } from "uuid";

import attach from "../../../images/icons/attach.svg";
import charityIcon from "../../../images/temp/charity-button-temp.png";
import Image from "next/image";

const format = (val) => `$` + val;
const parse = (val) => val.replace(/^\$/, "");
const initialCharityButton = {
  banner: "",
  sum: 50,
  title: "",
  description: "",
};
const CharityButtons = ({ buttonsList, setButtonsState }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [lstButtons, setButtonsState ] = useState()
  const firstField = React.useRef();
  const [charityButton, setCharityButton] = useState(initialCharityButton);
  const toast = useToast();
  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCharityButton({ ...charityButton, [name]: value });
  };

  const handleCharityButtonUpdate = (item) => {
    setCharityButton(item);
    onOpen();
  };

  const handleCharityButtonDelete = (item) => {
    setButtonsState(buttonsList.filter((x) => x.id !== item.id));
  };

  useEffect(() => {}, [buttonsList]);

  return (
    <div>
      <div>
        <Button size="xs" colorScheme="blue" onClick={onOpen}>
          Create a new Charity Button
        </Button>
      </div>
      <div className="mt-5 mb-12">
        <div className="flex flex-col gap-3">
          {buttonsList.map((button, index) => {
            const rowBg = index % 2 === 0 ? "bg-shades-100" : "bg-white";
            const cellBg = index % 2 !== 0 ? "bg-shades-100" : "bg-white";
            return (
              <div
                className={`flex p-2 gap-4 rounded justify-even max-w-[700px] items-center border border-primary ${rowBg}`}
              >
                <div className="basis-[50px] ">
                  <Image src={charityIcon} width="50" height="50" />
                </div>
                <div
                  className={`basis-[100px] text-center bg-white rounded  px-5 py-2  ${cellBg}`}
                >
                  ${button.sum}
                </div>
                <div
                  className={`basis-[150px]  bg-white rounded px-5 py-2 ${cellBg} text-center`}
                >
                  {button.title}
                </div>
                <div
                  className={`basis-[200px]  bg-white rounded  px-5 py-2  ${cellBg}`}
                >
                  {button.description}
                </div>
                <div
                  onClick={() => {
                    handleCharityButtonUpdate(button);
                  }}
                  className={`basis-[30px]  bg-tertiary rounded  px-4 py-2  cursor-pointer hover:scale-[1.1] transition duration-500 `}
                >
                  <EditIcon />
                </div>
                <div
                  onClick={() => {
                    handleCharityButtonDelete(button);
                  }}
                  className={`basis-[30px]  bg-red rounded  px-4 py-2 cursor-pointer hover:scale-[1.1] transition duration-500  `}
                >
                  <DeleteIcon />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="11px">
            Create new Charity button
          </DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col mt-7  gap-5">
              <div className="cursor-pointer shadow py-2 flex flex-col rounded items-center">
                <Image src={attach} width={80} height={80} />
                <h3>Upload Banner</h3>
              </div>
              <div>
                <p className="text-black">Sum</p>
                <div>
                  <NumberInput
                    onChange={(valueString) => {
                      setCharityButton({ ...charityButton, sum: valueString });
                    }}
                    value={format(charityButton.sum)}
                    max={100000000}
                    step={250}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
              </div>
              <div>
                <p className="text-black">Title</p>
                <div>
                  <Input
                    placeholder="Please add title"
                    name="title"
                    onChange={onChange}
                    value={charityButton.title}
                  />
                </div>
              </div>
              <div>
                <p className="text-black">Description</p>
                <div>
                  <Textarea
                    placeholder="Please add description"
                    name="description"
                    onChange={onChange}
                    value={charityButton.description}
                  />
                </div>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={() => {
                const isUpdating = false;
                if (!charityButton.id) {
                  setButtonsState([
                    ...buttonsList,
                    { ...charityButton, id: uid() },
                  ]);
                } else {
                  isUpdating = true;
                  setButtonsState(
                    buttonsList.map((item) =>
                      item.id === charityButton.id ? charityButton : item
                    )
                  );
                }
                onClose();
                toast({
                  position: "top",
                  title: isUpdating
                    ? "Charity button button successfully updated"
                    : "Charity button button successfully created",
                  status: isUpdating ? "info" : "success",
                  variant: "top-accent",
                  isClosable: true,
                });
                setCharityButton(initialCharityButton);
              }}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CharityButtons;
