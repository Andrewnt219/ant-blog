import React from "react";
import Lottie from "@src/components/Lottie";
import animationData from "@src/assets/lottie/Dog news paper.json";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div>
      <Lottie animationData={animationData} />
      <h1 style={{ textAlign: "center" }}>Oops... My dog ate the page</h1>
      <Link href="/">
        <a style={{ textAlign: "center", display: "block" }}>Go back</a>
      </Link>
    </div>
  );
};

export default PageNotFound;
