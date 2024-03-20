// src/components/TextEditor.js

import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the editor

function TextEditor() {
  const [editorHtml, setEditorHtml] = useState("");

  // Handle changes in the editor content
  const handleEditorChange = (content) => {
    setEditorHtml(content);
  };

  return (
    <div>
      <ReactQuill
        onChange={handleEditorChange}
        modules={TextEditor.modules}
        formats={TextEditor.formats}
        placeholder="Write your response here..."
        theme="snow"
      />
    </div>
  );
}

// Define modules and formats for the editor
TextEditor.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    ["clean"],
  ],
};

TextEditor.formats = [
  "header",
  "font",
  "list",
  "bold",
  "italic",
  "underline",
  "link",
  "image",
  
];

export default TextEditor;
