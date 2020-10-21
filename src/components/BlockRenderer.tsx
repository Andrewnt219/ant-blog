import React from "react";
import BlockContent from "@sanity/block-content-to-react";

export const BlockRenderer = (props: any) => {
  const { style = "normal" } = props.node;

  //   if (/^h\d/.test(style)) {
  //     const level = style.replace(/[^\d]/g, "");
  //     return React.createElement(
  //       style,
  //       { className: `heading-${level}` },
  //       props.children
  //     );
  //   }

  //   if (style === "h2") {
  //     return <h2 style={{ fontSize: "em" }}>{props.children}</h2>;
  //   }

  if (style === "blockquote") {
    return (
      <blockquote
        style={{ borderLeft: "0.15em solid #ccc", padding: "0.1em 1em" }}
      >
        {props.children}
      </blockquote>
    );
  }

  // Fall back to default handling
  return (BlockContent as any).defaultSerializers.types.block(props);
};
