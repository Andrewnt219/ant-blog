import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	spotifyShareLink: string;
};

function EmbeddedSpotify({ spotifyShareLink }: Props): ReactElement {
	const embeddedLink = spotifyShareLink.replace(
		"https://open.spotify.com/",
		"https://open.spotify.com/embed/"
	);

	return (
		<SpotifyPlayer
			title="embedded-spotify"
			src={embeddedLink}
			allowTransparency
			allow="encrypted-media"
		/>
	);
}

type SpotifyPlayerProps = {};
const SpotifyPlayer = styled.iframe<SpotifyPlayerProps>`
	width: 100%;
	height: 10rem;
`;

export default EmbeddedSpotify;
