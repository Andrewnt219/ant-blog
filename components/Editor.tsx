import React, { useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

const Editor = () => {
  const [data, setData] = useState("");

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onInit={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(_, editor) => {
          
          setData(editor.getData());
        }}
      />
      <div dangerouslySetInnerHTML={{__html: data}} />
    </div>
  );
};

export default Editor;
