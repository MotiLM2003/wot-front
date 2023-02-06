import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import moment from "moment";
// since wysiwyg need to use the DOM we import it without SSR
const DraftEditor = dynamic(
  () => import("@components/Tests/react-draft-wysiwyg/DraftEditor"),
  {
    ssr: false,
  }
);
import {
  ConvertToRawJson,
  ConvertToContent,
} from "@components/Tests/react-draft-wysiwyg/DraftEditor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import Input from "@components/Input/Input";
import CampinFeatureContaienr from "@components/CampinFeatureContaienr";
import api from "../../../apis/userAPI";
import Confirmation from "@components/Confirmation/Confirmation";
import Link from "next/link";
import ScreenDetails from "./ScreenDetails";
import Loader from "@components/Loader/Loader";
import { Editor } from "@tinymce/tinymce-react";
const initialCampaign = {
  isDescription: true,
  isGoal: true,
  isEndDate: true,
  isDonorList: true,
  isPresrDontaion: true,
  isCertificate: true,
  isMainBanner: true,
  isImgVideoSlider: true,
  campaignName: "",
  goal: 0,
  bonusGoal: 0,
  shortDescription: "",
  campaignContent: "",
  endDate: "",
  charityButtons: [],
};

const format = (val) => `$` + val;
const parse = (val) => val.replace(/^\$/, "");

const CreateCampaign = ({ campingData = null }) => {
  const { user } = useSelector((state) => state.userReducer);
  const router = useRouter();
  const [campaign, setCampaign] = useState(campingData || initialCampaign);
  const [endDate, setEndDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [didCompleteCampaign, setCompletedCampaign] = useState(false);
  const editorRef = useRef();
  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCampaign({ ...campaign, [name]: value });
  };

  const toggleFeatures = (e) => {
    const checked = e.target.checked;
    const name = e.target.name;
    setCampaign({ ...campaign, [name]: checked });
  };

  const setBannerList = (newList) => {
    setCampaign({ ...campaign, bannerItems: newList });
  };

  const setCharityButtons = (newButtons) => {
    setCampaign({ ...campaign, charityButtons: newButtons });
  };
  useEffect(() => {
    if (campingData) {
      setEndDate(new Date(moment(campingData.endDate)));
      setCampaign(campingData);
    }
  }, [campingData]);
  useEffect(() => {
    campaign = { ...campaign, endDate: moment(endDate) };
  }, [endDate]);

  const createNewCampaign = async () => {
    campaign.owner = user._id;
    campaign.endDate = endDate;
    campaign.campaignContent = editorRef.current.getContent();
    console.log("object", editorRef.current);
    campaign._id ? updateCampaign() : createCampaign();
  };

  const createCampaign = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.post("/campaigns/", campaign);
      setCompletedCampaign(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateCampaign = async () => {
    try {
      setIsLoading(true);

      const { data } = await api.put("/campaigns/update", campaign);
      setCompletedCampaign(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-default-background p-2qq md:p-4 rounded">
      <div>
        <CampinFeatureContaienr
          campaign={campaign}
          toggleFeatures={toggleFeatures}
        />
        <div className="mt-5">
          <div>
            <Tabs isLazy={true} variant="enclosed">
              <TabList>
                <Tab> Campaign Details </Tab>
                <Tab className="font-bold"> Screen Details </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col md:flex-row  md:2 md:gap-8 "
                  >
                    <div className="basis-1/2 flex flex-col  gap-2">
                      <h3 className="text-black text-xl font-bold mt-3">
                        Campaign Name
                      </h3>
                      <div>
                        <Input
                          placeholder="Campaign"
                          className="w-[100%] font-bold text-[1.1em]"
                          name="campaignName"
                          onChange={onChange}
                          value={campaign.campaignName}
                        />
                      </div>
                      {campaign.isEndDate && (
                        <div>
                          <h3 className="text-black text-xl font-bold mb-2 mt-3">
                            Campaign end date
                          </h3>
                          <div>
                            <DatePicker
                              selected={endDate}
                              onChange={(date) => setEndDate(date)}
                            />
                          </div>
                        </div>
                      )}
                      <h3 className="mt-4 text-black text-xl font-bold">
                        Enter a Goal
                      </h3>
                      <div className="bg-white">
                        <NumberInput
                          onChange={(valueString) => {
                            setCampaign({ ...campaign, goal: valueString });
                          }}
                          value={format(campaign.goal)}
                          max={100000000}
                          step={500}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>
                      <h3 className="mt-4 text-black text-xl font-bold">
                        Bonus goal
                      </h3>
                      <div className="bg-white">
                        <NumberInput
                          onChange={(valueString) => {
                            setCampaign({
                              ...campaign,
                              bonusGoal: valueString,
                            });
                          }}
                          value={format(campaign.bonusGoal)}
                          max={100000000}
                          step={500}
                        >
                          <NumberInputField />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </div>
                    </div>
                    <div className="basis-[70%]">
                      {campaign.isDescription && (
                        <div>
                          <h3 className="mt-4 mb-2 text-black text-xl font-bold">
                            Short description
                          </h3>
                          <div className="bg-white ">
                            <Input
                              className="w-[100%] text-[1.3rem] font-bold"
                              name="shortDescription"
                              onChange={onChange}
                              value={campaign.shortDescription}
                            />
                          </div>
                        </div>
                      )}
                      <h3 className="mt-4 mb-2  text-black text-xl font-bold">
                        About the campaign
                      </h3>
                      <div className="bg-white min-h-[300px]">
                        <Editor
                          apiKey="pncsizcpp6ff387u1m648ue9dsnjcqfsvmpd9p8jtwy2lra5"
                          initialValue={campaign.campaignContent}
                          onInit={(evt, editor) => {
                            console.log("onInit", editor);
                            editorRef.current = editor;
                          }}
                          init={{
                            menubar: false,
                            plugins: "link image code emoticons",
                            fontSizeFormat: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
                            toolbar:
                              "undo  |   forecolor backcolor | bold italic | emoticons | alignleft aligncenter alignright alignjustify | outdent indent | link image | ",
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                </TabPanel>
                <TabPanel>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col md:flex-row  md:2 md:gap-8 "
                  >
                    <div className="default-container">
                      <ScreenDetails
                        campaign={campaign}
                        setCharityButtons={setCharityButtons}
                        setBannerList={setBannerList}
                      />
                    </div>
                  </motion.div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-5">
        <div className="button bg-red" onClick={createNewCampaign}>
          {campaign._id ? "Update campaign" : "Create Campaign"}
        </div>
        {didCompleteCampaign && (
          <Confirmation
            visible={didCompleteCampaign}
            title="Campaign successfully created."
          >
            <div className="mt-2 font-bold">
              Your campaign is being review and will bla bla
              <p className="text-red">
                <Link href="/crm/campaigns/">
                  Please press Here to return to the list
                </Link>
              </p>
            </div>
          </Confirmation>
        )}
      </div>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default CreateCampaign;
