import Lottie from "react-lottie";
import React from "react";
import animationData from "@src/assets/lottie/Dog news paper.json";

const Broken = () => {
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

export default Broken;
