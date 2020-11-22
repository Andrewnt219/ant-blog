import Lottie from "react-lottie";
import React from "react";
import animationData from "@src/assets/lottie/Dog smell.json";
import tw, { styled } from "twin.macro";

type Props = {
	width?: string;
	height: string;
	loadingText?: string;
};

const Loading = ({ width, height, loadingText }: Props) => {
	return (
		<Container>
			<Lottie
				width={width}
				height={height}
				options={{
					loop: true,
					autoplay: true,
					animationData,
				}}
			/>
			<span>{loadingText}</span>
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`flex flex-col items-center italic pointer-events-none`}
	font-size: smaller;
`;

export default Loading;
