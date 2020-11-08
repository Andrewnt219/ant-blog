import Lottie from "react-lottie";
import React from "react";
import animationData from "@src/assets/lottie/Dog news paper.json";
import tw, { styled } from "twin.macro";

type Props = {
	height: string;
	errorText?: string;
};

const Broken = ({ height, errorText }: Props) => {
	return (
		<Container>
			<Lottie
				height={height}
				options={{
					loop: true,
					autoplay: true,
					animationData,
				}}
			/>
			<span>{errorText}</span>
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`flex flex-col items-center italic pointer-events-none`}
	font-size: smaller;
`;

export default Broken;
