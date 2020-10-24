import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type Props = {};

function Music({}: Props): ReactElement {
	return <Container>Music</Container>;
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default Music;
