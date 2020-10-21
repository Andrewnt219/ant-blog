import Lottie from "react-lottie";
import React from "react";

type Props = {
  animationData: any;
};
const NotFound = ({ animationData }: Props) => {
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
