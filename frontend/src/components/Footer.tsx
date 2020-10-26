import React, { ReactElement } from "react";
import { styled } from "twin.macro";
import Loading from "./Loading";

type Props = {};

function Footer(): ReactElement {
	return (
		<Container>
			<Loading />
			&copy; 2020
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.footer<ContainerProps>``;

export default Footer;
