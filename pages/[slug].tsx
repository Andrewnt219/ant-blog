import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";
import client from "../client";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import { BlockRenderer } from "../components/BlockRenderer";
import Head from "next/head";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const serializers = {
  types: {
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeID(url);
      return <YouTube videoId={id} opts={{ width: "100%" }} />;
    },
    image: (props) => {
      const { node } = props;

      return (
        <figure style={{ margin: 0, width: "100%" }}>
          <img
            src={urlFor(node.asset)
              .withOptions(props.options.imageOptions)
              .url()}
            style={{ width: "100%" }}
            alt={node.alt}
          />
          <figcaption style={{ color: "#aaa", fontStyle: "italic" }}>
            {node.caption}
          </figcaption>
        </figure>
      );
    },
    block: BlockRenderer,
  },
};

const Post = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>

      <div style={{ width: "80ch", maxWidth: "80%", margin: "2rem auto" }}>
        <img
          style={{ width: "100%", height: "30rem", objectFit: "cover" }}
          alt="hero-post-image"
          src={urlFor(post.mainImage).url()}
        />
        <h1 style={{ fontSize: "3em" }}>{post.title}</h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <img
            style={{ borderRadius: "50%", marginRight: "1em" }}
            alt={post.name}
            src={urlFor(post.authorImage).width(50).url()}
          />
          <span>{post.name}</span>
        </div>
        <BlockContent
          blocks={post.body}
          projectId={client.config().projectId}
          dataset={client.config().dataset}
          serializers={serializers}
          imageOptions={{ fit: "clip", w: 300, auto: "format" }}
        />
      </div>
    </>
  );
};

type Post = {
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  mainImage: {
    asset: {
      url: string;
      _id: string;
    };
  };
  body: any;
  name: string;
  authorImage: string;
};

export const getStaticProps: GetStaticProps<
  { post: Post },
  { slug: string }
> = async ({ params }) => {
  const posts = await client.fetch<Post[]>(
    `
        *[slug.current == $slug] {
            title,
            slug,
            mainImage {
                asset -> {
                    _id,
                    url
                }
            },
            body,
            "name": author->name,
            "authorImage": author->image
        }
    `,
    {
      slug: params.slug,
    }
  );

  return {
    props: { post: posts[0] },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "post"]{slug{current}}`
  );

  const paths = posts.map((post) => ({ params: { slug: post.slug.current } }));

  return {
    paths,
    fallback: false,
  };
};

export default Post;
