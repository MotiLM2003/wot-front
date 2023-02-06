import Image from "next/image";
import React from "react";
import Vimeo from "@u-wave/react-vimeo";
import test from "../../images/temp/test.jpg";
import ReactPlayer from "react-player";

const RenderSliderContent = (banner) => {
  switch (parseInt(banner.banner.type)) {
    case 0: {
      return (
        <Image
          src={test}
          alt={banner.banner.description}
          width={500}
          height={500}
          objectFit="cover"
        />
      );
    }
    case 1: {
      return <ReactPlayer url={banner.banner.youtubeDesc} />;
    }
    case 2: {
      const desc = banner.banner.vimeoDesc.split("/")[3];
      return <Vimeo video={desc} width="500" height="500" />;
    }
  }
};
export default RenderSliderContent;
