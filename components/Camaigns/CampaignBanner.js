import React, { useState, useEffect, useRef } from "react";
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
  Fade,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faYoutube, faVimeo } from "@fortawesome/free-brands-svg-icons";
import { v4 as uid } from "uuid";
import attach from "../../images/icons/attach.svg";
import Image from "next/image";
import Close from "@components/Icons/Close";

const initialBanner = {
  type: 0,
  youtubeDesc: "",
  vimeoDesc: "",
  description: "",
};
const CampaignBanner = ({ bannerList, setBannerList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bannerItem, setBannerItem] = useState(initialBanner);
  const firstField = React.useRef();

  const handleBannerItemUpdate = (item) => {
    setBannerItem(item);
    onOpen();
  };

  const handleBannerItemDelete = (item) => {
    setBannerList(bannerList.filter((x) => x.id !== item.id));
  };
  const renderContent = () => {
    switch (bannerItem.type) {
      case 0: {
        return (
          <div className="mr-5  cursor-pointer shadow py-2 min-w-[220px] mb-5 px-2 flex flex-col rounded items-center">
            <Image src={attach} width={80} height={80} />
            <h3 className="text-">Upload Banner</h3>
          </div>
        );
      }
      case 1: {
        return (
          <div className="cursor-pointer shadow py-2 flex flex-col rounded items-center p-2">
            <Textarea
              placeholder="Add Youtube link"
              resize="none"
              size="lg"
              value={bannerItem.youtubeDesc}
              onChange={(e) => {
                setBannerItem({ ...bannerItem, youtubeDesc: e.target.value });
              }}
              variant="filled"
            />
          </div>
        );
      }
      case 2: {
        return (
          <div className="cursor-pointer shadow py-2 flex flex-col rounded items-center p-2">
            <Textarea
              placeholder="Add Vimeo link"
              resize="none"
              size="lg"
              variant="filled"
              value={bannerItem.vimeoDesc}
              onChange={(e) => {
                setBannerItem({ ...bannerItem, vimeoDesc: e.target.value });
              }}
            />
          </div>
        );
      }
    }
  };

  const renderBannerItem = (bannerItem) => {
    const image = null;
    switch (bannerItem.type) {
      case 0: {
        return (
          <FontAwesomeIcon
            icon={faImage}
            size="5x"
            className="text-slate-700"
          />
        );
        break;
      }
      case 1: {
        return (
          <FontAwesomeIcon
            icon={faYoutube}
            size="5x"
            className="text-slate-700"
          />
        );
        break;
      }
      case 2: {
        return (
          <FontAwesomeIcon
            icon={faVimeo}
            size="5x"
            className="text-slate-700"
          />
        );
      }
    }

    return (
      <FontAwesomeIcon icon={faYoutube} size="5x" className="text-slate-700" />
    );
  };
  const toast = useToast();
  return (
    <div>
      <Button size="xs" colorScheme="blue" onClick={onOpen}>
        Create a new Banner item
      </Button>
      <div className="flex gap-5 mt-5 mb-8 flex-wrap justify-center ">
        {bannerList &&
          bannerList.map((item) => {
            return (
              <div className="flex flex-col items-center gap-2">
                <div
                  className="cursor-pointer flex flex-col items-center"
                  onClick={() => {
                    handleBannerItemUpdate(item);
                  }}
                >
                  {renderBannerItem(item)}
                  <div className="max-w-[250px] bg-black text-white p-1 rounded opacity-75">
                    {item.description.length > 0
                      ? item.description
                      : "No description"}
                  </div>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleBannerItemDelete(item);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    size="1x"
                    className="text-slate-700"
                  />
                </div>
              </div>
            );
          })}
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
            Create new banner item
          </DrawerHeader>

          <DrawerBody>
            <div className="flex flex-col item-center justify-center mt-7  gap-5">
              <div className="shadow py-2 flex flex-col rounded  pl-5">
                <h3>Create Banner</h3>
                <div className="flex flex-col gap-1 my-8">
                  <div
                    onClick={() => setBannerItem({ ...bannerItem, type: 0 })}
                    className={`flex items-center gap-4  select-none  p-3 rounded mr-5 transition duration-300 cursor-pointer ${
                      bannerItem.type === 0 ? "bg-red" : "hover:bg-slate-300"
                    }`}
                  >
                    <div className="basis-[40px]">
                      <FontAwesomeIcon
                        icon={faImage}
                        size="2x"
                        className="text-slate-700"
                      />
                    </div>
                    <div className="select-none">Image</div>
                  </div>
                  <div
                    onClick={() => setBannerItem({ ...bannerItem, type: 1 })}
                    className={`flex items-center gap-4select-none  p-3 rounded mr-5 transition duration-300 cursor-pointer ${
                      bannerItem.type === 1 ? "bg-red" : "hover:bg-slate-300"
                    } `}
                  >
                    <div className="basis-[40px]">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        size="2x"
                        className="text-slate-700"
                      />
                    </div>
                    <div className="select-none">YouTube</div>
                  </div>
                  <div
                    onClick={() => setBannerItem({ ...bannerItem, type: 2 })}
                    className={`flex items-center gap-4  p-3 rounded mr-5 transition duration-300 cursor-pointer ${
                      bannerItem.type === 2 ? "bg-red" : "hover:bg-slate-300"
                    }`}
                  >
                    <di className="basis-[40px]">
                      <FontAwesomeIcon
                        icon={faVimeo}
                        size="2x"
                        className="text-slate-700"
                      />
                    </di>
                    <div className="flex-grow select-none">Vimeo</div>
                  </div>
                </div>
                <div className="flex flex-col  gap-4 justify-center items-center">
                  <Input
                    placeholder="Description"
                    value={bannerItem.description}
                    onChange={(e) => {
                      setBannerItem({
                        ...bannerItem,
                        description: e.target.value,
                      });
                    }}
                  />
                  {renderContent()}
                </div>
              </div>
            </div>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <div>
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  const isUpdating = false;
                  if (!bannerItem.id) {
                    setBannerList([
                      ...bannerList,
                      { ...bannerItem, id: uid() },
                    ]);
                  } else {
                    isUpdating = true;
                    setBannerList(
                      bannerList.map((item) =>
                        item.id === bannerItem.id ? bannerItem : item
                      )
                    );
                  }
                  onClose();
                  toast({
                    position: "top",
                    title: isUpdating
                      ? "Banner item successfully updated"
                      : "Banner item button successfully created",
                    status: isUpdating ? "info" : "success",
                    variant: "top-accent",
                    isClosable: true,
                  });
                  setBannerItem(initialBanner);
                }}
              >
                Submit
              </Button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CampaignBanner;
