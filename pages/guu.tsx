import { ApiError } from "api";
import Axios from "axios";
import { GuuArticle } from "guu";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [guuFeeds, setGuuFeeds] = useState<GuuArticle[]>([]);

  useEffect(() => {
    Axios.get<GuuArticle[]>("/api/guu")
      .then((res) => setGuuFeeds(res.data))
      .catch((error) => console.log((error as ApiError).message));
  }, []);

  return (
    <>
      <h1>
        These articles are{" "}
        <span style={{ textDecoration: "underline" }}>automatically</span>{" "}
        generated!
      </h1>
      <h2>
        Post an article on Guu.vn and checkback after 24 hours (and no, it's not
        because I have to code it)
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
      >
        {guuFeeds.map((guu) => (
          <article key={guu.guid}>
            <a
              dangerouslySetInnerHTML={{
                __html: trimAdvertisement(guu.content, "<br>"),
              }}
              href={guu.link}
            />
            <h2>{guu.title}</h2>
            <p>{trimAdvertisement(guu.contentSnippet, "\n")}</p>
          </article>
        ))}
        <a
          href="https://guu.vn/user/080220009910"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more on Guu.vn
        </a>
      </div>
    </>
  );
};

function trimAdvertisement(string: string, token) {
  return string.substr(0, string.indexOf(token));
}

export default Index;
