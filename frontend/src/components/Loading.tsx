import Lottie from "react-lottie";
import React from "react";
import animationData from "@src/assets/lottie/Dog smell.json";

const Loading = () => {
	return (
		<Lottie
			width={300}
			height={300}
			options={{
				loop: true,
				autoplay: true,
				animationData,
			}}
		/>
	);
};

export default Loading;
