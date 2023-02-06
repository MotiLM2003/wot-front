import React, { useState } from "react";

import ReactQuill, { Quill, Mixin, Toolbar } from "react-quill"; // ES6
import "react-quill/dist/quill.snow.css"; // ES6

const QuillEditor = () => {
  var options = {
    debug: "info",
    modules: {
      toolbar: "#toolbar",
    },
    placeholder: "Compose an epic...",
    readOnly: true,
    theme: "snow",
  };

  const [state, setState] = useState({ text: "" });

  const handleChange = (e) => {
    // console.log(e);
  };
  return (
    <div>
      <ReactQuill
        options={options}
        value={state.text}
        onChange={handleChange}
        theme="snow"
      />
    </div>
  );
};

export default QuillEditor;
