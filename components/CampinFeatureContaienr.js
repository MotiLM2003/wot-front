import React from "react";
import { CloudFog } from "tabler-icons-react";
import CampaignFeature from "./Camaigns/CreateCamaigns/CampaignFeature";
import { Switch, Box, FormControlLabel } from "@chakra-ui/react";

const CampinFeatureContaienr = ({
  campaign,
  toggleFeatures,
  name,
  color = "red",
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Description</div>
        <Box>
          <Switch
            checked={campaign.isDescription}
            onChange={toggleFeatures}
            name={"isDescription"}
            colorScheme={color}
            isChecked={campaign.isDescription}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>End Date</div>
        <Box>
          <Switch
            checked={campaign.isEndDate}
            onChange={toggleFeatures}
            name={"isEndDate"}
            colorScheme={color}
            isChecked={campaign.isEndDate}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Donor List</div>
        <Box>
          <Switch
            checked={campaign.isDonorList}
            onChange={toggleFeatures}
            name={"isDonorList"}
            colorScheme={color}
            isChecked={campaign.isDonorList}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Certificate</div>
        <Box>
          <Switch
            checked={campaign.isCertificate}
            onChange={toggleFeatures}
            name={"isCertificate"}
            colorScheme={color}
            isChecked={campaign.isCertificate}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Main Banner</div>
        <Box>
          <Switch
            checked={campaign.isMainBanner}
            onChange={toggleFeatures}
            name={"isMainBanner"}
            colorScheme={color}
            isChecked={campaign.isMainBanner}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Presrt Donation</div>
        <Box>
          <Switch
            checked={campaign.isPresrDontaion}
            onChange={toggleFeatures}
            name={"isPresrDontaion"}
            colorScheme={color}
            isChecked={campaign.isPresrDontaion}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Is Goal</div>
        <Box>
          <Switch
            checked={campaign.isGoal}
            onChange={toggleFeatures}
            name={"isGoal"}
            colorScheme={color}
            isChecked={campaign.isGoal}
          />
        </Box>
      </div>
      <div className="flex gap-2 items-center border border-primary p-2 rounded bg-white">
        <div>Image Video Slider</div>
        <Box>
          <Switch
            checked={campaign.isImgVideoSlider}
            onChange={toggleFeatures}
            name={"isImgVideoSlider"}
            colorScheme={color}
            isChecked={campaign.isImgVideoSlider}
          />
        </Box>
      </div>
    </div>
  );
};

export default CampinFeatureContaienr;
