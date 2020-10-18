import React, { Component } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("../components/Editor"), {
  ssr: false,
});

const Index = () => {
  return (
    <div style={{ width: "70%", margin: "0 auto" }}>
      <Editor />
    </div>
  );
};

export default Index;
