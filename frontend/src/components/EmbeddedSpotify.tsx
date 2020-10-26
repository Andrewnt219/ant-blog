import React, { ReactElement } from "react";
import { styled } from "twin.macro";

type Props = {
	spotifyShareLink: string;
	spotifyUri?: string;
};

function EmbeddedSpotify({
	spotifyShareLink,
	spotifyUri,
}: Props): ReactElement {
	const embeddedLink = spotifyShareLink.replace(
		"https://open.spotify.com/",
		"https://open.spotify.com/embed/"
	);

	return (
		<>
			<SpotifyPlayer
				title="embedded-spotify"
				src={embeddedLink}
				allow="encrypted-media"
				higher={
					spotifyShareLink.includes("playlist") ||
					spotifyShareLink.includes("show")
				}
			/>
			{spotifyUri && <a href={spotifyUri}>Open in spotify</a>}
		</>
	);
}

type SpotifyPlayerProps = {
	higher: boolean;
};
const SpotifyPlayer = styled.iframe<SpotifyPlayerProps>`
	width: 100%;
	height: ${(p) => (p.higher ? "300px" : "80px")};
`;

export default EmbeddedSpotify;
