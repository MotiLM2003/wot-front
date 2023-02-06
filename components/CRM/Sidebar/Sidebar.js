import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import status from "../../../images/icons/white/status.svg";
import heart from "../../../images/icons/white/hand-heart.svg";
import docs from "../../../images/icons/white/docs.svg";
import partners from "../../../images/icons/white/partners.svg";
import sound from "../../../images/icons/white/sound.svg";
import creditcard from "../../../images/icons/white/creditcard.svg";
import money from "../../../images/icons/white/money.svg";
import global from "../../../images/icons/white/global.svg";
import analytics from "../../../images/icons/white/analytics.svg";
import account from "../../../images/bigger-account.svg";
import CRMMenuItem from "./CRMMenuItem";
const Sidebar = () => {
  const { CRMMenuId } = useSelector((state) => state.menuReducer);
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div className="basis-1/6 bg-shades-600 py-10  rounded min-w-[160px] transition duration-500 ">
      <div className="sidebarMenu flex flex-col justify-center gap-4">
        <CRMMenuItem
          icon={status}
          text="Status & Balance"
          id={0}
          menuId={CRMMenuId}
          path="/dashboard/"
        />
        <CRMMenuItem
          icon={heart}
          text="Donations"
          id={1}
          menuId={CRMMenuId}
          path="/donations/"
        />

        <CRMMenuItem
          icon={partners}
          text="Partners"
          id={3}
          menuId={CRMMenuId}
          path="/partners/"
        />
        <CRMMenuItem
          icon={sound}
          text="Campaigns"
          id={4}
          menuId={CRMMenuId}
          path="/crm/campaigns/"
        />
        <CRMMenuItem
          icon={creditcard}
          text="Payments"
          id={5}
          menuId={CRMMenuId}
          path="/payments/"
        />
        <CRMMenuItem
          icon={money}
          text="Withdrawals"
          id={6}
          menuId={CRMMenuId}
          path="/withdrawals/"
        />
        <CRMMenuItem
          icon={global}
          text="UTM Link"
          id={7}
          menuId={CRMMenuId}
          path="/utm-link/"
        />
        <CRMMenuItem
          icon={analytics}
          text="Analytics"
          id={8}
          menuId={CRMMenuId}
          path="/analytics/"
        />
        <CRMMenuItem
          icon={analytics}
          text="User Manager"
          id={9}
          menuId={CRMMenuId}
          path="/crm/user-manager/"
        />
      </div>
      <div className="flex flex-col items-center mt-20">
        <div>
          <Image src={account} />
        </div>
        <p className="text-white">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-primary">Campaign Manager</p>
        <div>
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
