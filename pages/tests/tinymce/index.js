import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const TinyMCEEditor = () => {
  const editorRef = useRef();

  const onClickHandler = () => {
    console.log(editorRef.current.getContent());
  };
  return (
    <div>
      <Editor
        apiKey="pncsizcpp6ff387u1m648ue9dsnjcqfsvmpd9p8jtwy2lra5"
        initialValue="Hello world!"
        onInit={(evt, editor) => {
          console.log("onInit", editor);
          editorRef.current = editor;
        }}
        init={{
          menubar: false,
          plugins: "link image code emoticons",
          fontSizeFormat: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          toolbar:
            "undo redo | styleselect | fontselect |  fontsizeselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link image | emoticons",
        }}
      />
      <button onClick={onClickHandler}>Submit</button>
    </div>
  );
};

export default TinyMCEEditor;
