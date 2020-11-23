import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type Props = {};

function ListRenderer(props: Props): ReactElement {
	if (props.type === "bullet") {
		return <ul>{props.children}</ul>;
	}

	if (props.type === "number") {
		return <ol>{props.children}</ol>;
	}
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default ListRenderer;
