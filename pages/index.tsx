import React from "react";
import Link from "next/link";
const Index = () => {
  return (
    <>
      <h1>
        To start writing articles, go to{" "}
        <a
          href="http://rosedang.sanity.studio/"
          target="_blank"
          rel="noopener"
          style={{ textDecoration: "underline" }}
        >
          studio
        </a>
      </h1>
      <Link href="/guu">
        <a style={{ textDecoration: "underline" }}>
          Checkout your Guu.vn's feed
        </a>
      </Link>
    </>
  );
};

export default Index;
