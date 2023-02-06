import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  ContentState,
} from "draft-js";
import api from "../../apis/userAPI";
// const DraftEditor = dynamic(
//   () => import('@components/Tests/react-draft-wysiwyg/DraftEditor'),
//   {
//     ssr: false,
//   }
// );

const DraftEditorPage = () => {
  useEffect(() => {}, []);
  const [content, setContent] = useState(EditorState.createEmpty());
  useEffect(() => {
    const getCamping = async () => {
      const { data } = await api.post("/campaigns/getOne", {
        _id: "627e355dd490ff04709bdef2",
      });
      setContent(data.campaignContent);
    };
    getCamping();
  }, []);
  return (
    <div>
      <DraftEditor state={content} setState={setContent} />{" "}
    </div>
  );
};

export default DraftEditorPage;
