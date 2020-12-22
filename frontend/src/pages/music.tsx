import React, { ReactElement, useState } from "react";
import { styled } from "twin.macro";

import EmbeddedSpotify from "@src/components/EmbeddedSpotify";

function Music(): ReactElement {
	const [spotifyLink, setSpotifyLink] = useState(
		"https://open.spotify.com/playlist/2AwCV9pHpQHFjn2UOeClsy?si=iQVkTAM1RS6F_p5P3ZHLTg"
	);
	return (
		<Container>
			<label htmlFor="spotify-link">Enter spotify share link</label>

			<input
				id="spotify-link"
				type="text"
				value={spotifyLink}
				onChange={(e) => setSpotifyLink(e.target.value)}
				style={{
					border: "1px solid black",
					padding: "0.25rem",
					margin: "0.25rem 0",
					display: "block",
					width: "100%",
				}}
			/>
			<EmbeddedSpotify spotifyShareLink={spotifyLink} />
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>``;

export default Music;
