import { ApiError } from "api";
import Axios from "axios";
import { GuuArticle } from "guu";
import React, { useEffect, useState } from "react";

const Index = () => {
  const [guuFeeds, setGuuFeeds] = useState<GuuArticle[]>([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    Axios.get<GuuArticle[]>("/api/guu")
      .then((res) => setGuuFeeds(res.data))
      .catch((error) => console.log((error as ApiError).message));
  }, []);

  const onArticleClicked = (url: string) => {
    setUrl(url);
  };

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
              onClick={() => onArticleClicked(guu.link)}
              dangerouslySetInnerHTML={{
                __html: trimAdvertisement(guu.content, "<br>"),
              }}
              href="#"
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

      {url && (
        <iframe
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "90%",
            boxShadow:
              "0 0.2rem 0.4rem rgba(0,0,0,0.4), -0.2rem 0 0.4rem rgba(0,0,0,0.4)",
          }}
          src={url}
        ></iframe>
      )}
    </>
  );
};

function trimAdvertisement(string: string, token) {
  return string.substr(0, string.indexOf(token));
}

export default Index;
