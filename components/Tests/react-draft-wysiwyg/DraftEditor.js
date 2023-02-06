import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  ContentState,
} from "draft-js";

const DraftEditor = ({ state, setState }) => {
  useEffect(() => {
    if (state) {
      try {
        const storeContent = ConvertToContent(state);

        // // console.log(' editor content', state);
        setState(EditorState.createWithContent(storeContent));
      } catch (error) {
        // setState(EditorState.createEmpty());
      }
    }
  }, []);
  return (
    <div>
      {" "}
      {state && (
        <Editor
          editorState={state}
          onEditorStateChange={(e) => {
            setState(e);
          }}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />
      )}{" "}
    </div>
  );
};

export default DraftEditor;

export const ConvertToRawJson = (content) => {
  return JSON.stringify(convertToRaw(content.getCurrentContent()));
};

export const ConvertToContent = (content) => {
  return convertFromRaw(JSON.parse(content));
};
