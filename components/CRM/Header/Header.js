import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import { setUser, setCampagin } from "store/selectedSwitcherSlice";
import logo from "../../../images/logo-white.svg";
import question from "../../../images/question.svg";
import settings from "../../../images/settings.svg";
import bell from "../../../images/bell.svg";
import Link from "next/link";
import UserSwitcher from "../UserSwitcher/UserSwitcher";
import UserCampaignList from "./UserCampaignList";
import { Text } from "@chakra-ui/react";

const Header = () => {
  const dispatch = useDispatch();

  const { selectedUser, selectedCampagin } = useSelector(
    (state) => state.switcherReducer
  );
  const { user } = useSelector((state) => state.userReducer);

  const [localUser, setLocalUser] = useState(selectedUser);
  const [switcherInitialValue, setSwitcherInitialValue] = useState("");

  const onUserSwitch = (user) => {
    dispatch(setUser(user));
    setLocalUser({ ...user });
  };

  const onCampaignSwitch = (campaign) => {
    dispatch(setCampagin(campaign));
    // setLocalUser({ ...user });
    console.log(campaign);
  };

  useEffect(() => {
    console.log("user", user);
  }, []);

  useEffect(() => {
    if (localUser) {
      console.log(" local user", localUser);
      setSwitcherInitialValue(`${localUser.firstName} ${localUser.lastName}`);
    }
    console.log("switcherInitialValue", switcherInitialValue);
  }, [localUser]);
  return (
    <header className="bg-primary min-h-[98px] p-4 `>">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div className="ml-[1rem] flex gap-3 items-center">
            {user && user.role.type === "admin" && (
              <Link className="cursor-pointer" href="/crm/settings/">
                <Image src={settings} className="cursor-pointer" />
              </Link>
            )}
            <Image src={bell} />
            <Image src={question} />
          </div>

          <div className="">
            <Image src={logo} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex  items-center gap-4">
            {user.role.type === "admin" && (
              <div>
                <UserSwitcher
                  onSelected={onUserSwitch}
                  initialValue={switcherInitialValue}
                />
              </div>
            )}
            <div>
              {localUser || user.role.type === "user" ? (
                <UserCampaignList
                  localUser={
                    user.role.type === "admin" ? localUser : { _id: user._id }
                  }
                  onCampaignSwitch={onCampaignSwitch}
                  user={user}
                />
              ) : (
                <div>
                  <div className="bg-white  w-[200px] h-[30px] rounded flex justify-center items-center">
                    <Text>All campaigns</Text>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
