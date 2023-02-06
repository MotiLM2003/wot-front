import React from "react";
import ReactPlayer from "react-player";
import Vimeo from "@u-wave/react-vimeo";

const index = () => {
  //   return <ReactPlayer url="https://vimeo.com/channels/staffpicks/731378604" />;
  return (
    <div>
      <Vimeo video="x2to0hs" autoplay />
    </div>
  );
};

export default index;
