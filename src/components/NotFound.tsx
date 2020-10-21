import Lottie from "react-lottie";
import React from "react";
import animationData from "@src/assets/lottie/Dog smell.json";

const NotFound = () => {
  return (
    <Lottie
      width={300}
      height={300}
      options={{
        loop: true,
        autoplay: true,
        animationData,
      }}
    />
  );
};

export default NotFound;
