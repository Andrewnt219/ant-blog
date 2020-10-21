import React, { useState } from "react";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import client from "../client";
import Head from "next/head";
import NotFound from "@src/components/NotFound";

const Index = ({
  posts: fetchedPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [posts, setPosts] = useState(fetchedPosts);

  return (
    <>
      <Head>
        <title>Welcome to my blog</title>
      </Head>

      <div style={{ width: "80%", margin: "0  auto" }}>
        <h1>
          To start writing articles, go to{" "}
          <a
            href="http://rosedang.sanity.studio/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            studio
          </a>
        </h1>

        <h2>This site is not mobile-friendly, yet</h2>

        <Link href="/guu">
          <a style={{ textDecoration: "underline" }}>
            Checkout your Guu.vn&apos;s feed
          </a>
        </Link>
        <br />
        <br />
        <Link href="/not-exist">
          <a style={{ textDecoration: "underline" }}>Whoops...</a>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {posts.map((post) => (
            <article key={post.slug.current} style={{ margin: "2rem" }}>
              <img
                alt={post.title}
                src={post.mainImage.asset.url}
                style={{
                  height: "200px",
                  width: "auto",
                }}
              />

              <h2>
                <Link href={"/" + post.slug.current}>
                  <a>{post.title}</a>
                </Link>
              </h2>
            </article>
          ))}
        </div>
      </div>
      <NotFound />
    </>
  );
};

type Post = {
  title: string;
  slug: {
    _type: "slug";
    current: string;
  };
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
  };
};

export const getStaticProps: GetStaticProps<{
  posts: Post[];
}> = async () => {
  const posts = await client.fetch<Post[]>(
    `*[_type == "post"]{title, slug, mainImage {asset -> {_id, url}}}`
  );

  return {
    props: { posts },
    revalidate: 1,
  };
};

export default Index;
