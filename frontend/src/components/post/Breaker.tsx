import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

// Breaker is not centered on mobile
function Breaker(): ReactElement {
	return <Container />;
}

type ContainerProps = {};
const Container = styled.hr<ContainerProps>`
	border: none;
	${tw`my-8`}
	${tw`flex justify-center items-center`}
	height: auto; // need for before

	::before {
		content: "\\00b7 \\00b7 \\00b7";
		${tw`font-700 text-ltextColor text-2xl`}
		letter-spacing: 21px;
		margin-left: -21px; // account for the letter spacing
	}
`;

export default Breaker;
