import { Button, Input } from "@chakra-ui/react";

import Image from "next/image";
import React, { useState, useEffect } from "react";

import campaignBanner from "../../../images/temp/temp-banner.svg";
import print from "../../../images/icons/white/print.svg";
import CharityButtons from "./CharityButtons";
import CampaignBanner from "../CampaignBanner";

const ScreenDetails = ({ campaign, setCharityButtons, setBannerList }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h4 className="text-black font-bold">Campaign Banner</h4>
        <div className="self-center">
          <Image src={campaignBanner} width="810" height="110" />
        </div>
        <div className="flex items-center gap-6">
          <div className="flex-grow">
            <Input
              className="w-[100%]"
              placeholder="Select logo file"
              errorBorderColor="red.400"
              _placeholder={{ opacity: 0.4, color: "gray.600" }}
              isReadOnly={true}
            />
          </div>

          <div>
            <div className="bg-primary p-[8px] rounded text-white min-w-[100px] text-center flex justify-center items-center">
              <Image src={print} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-black font-bold">Banner Slide</h4>
        <div className="">
          <CampaignBanner
            bannerList={campaign.bannerItems}
            setBannerList={setBannerList}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="text-black font-bold">Charity buttons</h4>
        <CharityButtons
          buttonsList={campaign.charityButtons}
          setButtonsState={setCharityButtons}
        />
      </div>
    </div>
  );
};

export default ScreenDetails;
