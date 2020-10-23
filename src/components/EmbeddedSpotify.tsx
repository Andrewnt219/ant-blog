import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

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
				allowTransparency
				allow="encrypted-media"
				isPlaylist={spotifyShareLink.includes("playlist")}
			/>
			{spotifyUri && <a href={spotifyUri}>Open in spotify</a>}
		</>
	);
}

type SpotifyPlayerProps = {
	isPlaylist: boolean;
};
const SpotifyPlayer = styled.iframe<SpotifyPlayerProps>`
	width: 100%;
	height: ${(p) => (p.isPlaylist ? "300px" : "80px")};
`;

export default EmbeddedSpotify;
