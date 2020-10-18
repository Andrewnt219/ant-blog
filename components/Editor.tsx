import React, { useEffect, useState } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";

const Editor = () => {
  const [data, setData] = useState("");
  const [source, setSource] = useState(null);

  const onClick = () => {
    const video = document.querySelector(".media oembed");

    if (video) {
      setSource(
        video.getAttribute("url").replace("youtu.be", "www.youtube.com/embed")
      );
    }
  };

  return (
    <div className="App">
      <h2>Welcome to my blog</h2>
      <div>
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
      </div>
      <h2>How it will display on the website</h2>

      <button
        onClick={onClick}
        style={{ display: "block", marginBottom: "1em" }}
      >
        Update
      </button>
      <div dangerouslySetInnerHTML={{ __html: data }} />
      {source && (
        <iframe
          style={{ width: "50em", height: "30em" }}
          src={source}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Editor;
