import React from "react";
import Lottie from "react-lottie";
import tw, { styled } from "twin.macro";

import animationData from "@src/assets/lottie/Dog smell.json";
import { useLoadingDots } from "@src/hooks";

type Props = {
	width?: string;
	height?: string;
	loadingText?: string;
	className?: string;
};

const Loading = ({ width, height, loadingText, className }: Props) => {
	const dots = useLoadingDots({ intervalInMs: 500 });

	return (
		<Container className={className}>
			<Lottie
				width={width}
				height={height}
				options={{
					loop: true,
					autoplay: true,
					animationData,
				}}
			/>
			<span>{loadingText?.concat(dots)}</span>
		</Container>
	);
};

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`flex flex-col items-center italic pointer-events-none`}
	font-size: smaller;
`;

export default Loading;
