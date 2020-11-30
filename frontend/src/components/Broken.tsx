import React from 'react';
import Lottie from 'react-lottie';
import tw, { styled } from 'twin.macro';

import animationData from '@src/assets/lottie/Dog news paper.json';

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
