import React, { useState, useEffect } from "react";
import {
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Radio,
  Stack,
  RadioGroup,
  Text,
  Button,
  Switch,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, PhoneIcon } from "@chakra-ui/icons";
import AccountIcon from "@components/Icons/AccountIcon";
import DonateOptions from "./DonateOptions";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CloudFog } from "tabler-icons-react";
import NumberFormat from "react-number-format";
import api from "../../../../apis/userAPI";
const Stage1 = ({
  campaign,
  setStage,
  recurring,
  onRecurringUpdate,
  currencies,
  currentCurrencySymbol,
}) => {
  const [isPublic, setIsPublic] = useState(false);

  const { campaignName } = campaign;
  const { displayName, sum, currency, donationNote } = recurring;

  useEffect(() => {}, []);
  return (
    <motion.div
      initial={{ y: -500 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className=""
      style={{ overflow: "hidden" }}
    >
      <div className="flex flex-col items-center gap-2">
        <Heading as="div" size="md" className="text-red font-bold">
          Donation for:
        </Heading>
        <Text className="text-black"> {campaignName} </Text>

        <div className="w-[550px] flex flex-col gap-3 mt-5">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<AccountIcon color="gray.100" />}
            />

            <Input
              placeholder="Display Name"
              name="displayName"
              value={displayName}
              onChange={(e) => onRecurringUpdate(e.target.name, e.target.value)}
            />
          </InputGroup>
          <div className="relative">
            <NumberFormat
              thousandSeparator={true}
              prefix={currentCurrencySymbol}
              value={sum}
              customInput={Input}
              onValueChange={(values) => {
                const { formattedValue, value } = values;
                onRecurringUpdate("sum", value);
              }}
            />
            <div className="absolute top-[0] right-0">
              <Select
                icon={<ChevronDownIcon />}
                bg="tomato"
                borderColor="tomato"
                color="white"
                className="max-w-[80px] text-center"
                value={currency}
                onChange={(e) => {
                  const value = e.target.value;
                  onRecurringUpdate("currency", value);
                  onRecurringUpdate("currency", value);
                }}
              >
                {currencies.map((item) => (
                  <option
                    className="text-black"
                    value={item._id}
                    key={item._id}
                  >
                    {item.symbol}
                  </option>
                ))}
              </Select>
            </div>
            <Text className="text-red text-center text-sm mt-4">
              The name that will appear in the names of the donors in the fund
            </Text>
            <DonateOptions
              recurring={recurring}
              onRecurringUpdate={onRecurringUpdate}
            />
            <div className="mt-5">
              <Stack direction="column" gap={1}>
                <div className="flex items-center gap-3">
                  <Switch
                    colorScheme="red"
                    isChecked={recurring.isAnonymous}
                    onChange={(e) => {
                      onRecurringUpdate("isAnonymous", e.target.checked);
                    }}
                  />
                  <Text className="font-bold">
                    I prefer to remain anonymous
                  </Text>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    colorScheme="red"
                    isChecked={recurring.isAddPublicNote}
                    onChange={(e) => {
                      setIsPublic(e.target.checked);
                      onRecurringUpdate("isAddPublicNote", e.target.checked);
                    }}
                  />
                  <div>
                    <Text className="font-bold">
                      Add a public donation Note
                    </Text>
                    <AnimatePresence>
                      {recurring.isAddPublicNote && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-4"
                        >
                          <Input
                            placeholder="Donation note..."
                            name="donationNote"
                            value={donationNote}
                            onChange={(e) =>
                              onRecurringUpdate("donationNote", e.target.value)
                            }
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    colorScheme="red"
                    isChecked={recurring.isCompleteFee}
                    onChange={(e) => {
                      onRecurringUpdate("isCompleteFee", e.target.checked);
                    }}
                  />
                  <Text className="font-bold text-primary">
                    Complete Help offset the cost fees of this transaction.
                  </Text>
                </div>
              </Stack>
            </div>
          </div>
        </div>
        <div className="flex justify-start items-end mt-12 cursor-pointer hover:scale(200) pb-4">
          <div className="grow" onClick={() => setStage(1)}>
            <FontAwesomeIcon
              className="text-slate-700 hover:text-red transition duration-500 hover:scale-[1.1] "
              icon={faCircleArrowRight}
              size="3x"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Stage1;
