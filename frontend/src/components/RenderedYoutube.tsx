import React, { ReactElement } from "react";
import { styled } from "twin.macro";
import Youtube from "react-youtube";

type Props = {
	youtubeVideoId: string;
};

function RenderedYoutube({ youtubeVideoId }: Props): ReactElement {
	return (
		<VideoContainer>
			<StyledYoutube videoId={youtubeVideoId} />
		</VideoContainer>
	);
}

const VideoContainer = styled.div`
	width: 100%;
	padding-bottom: 56.25%;
	position: relative;
`;

const StyledYoutube = styled(Youtube)`
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
`;

export default RenderedYoutube;
