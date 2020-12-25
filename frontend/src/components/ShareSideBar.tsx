import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
} from "react-share";
import { iconData } from "@src/assets/data/iconData";
type Props = {
	sharingUrl: string;
};

function ShareToolbar({ sharingUrl }: Props): ReactElement {
	return (
		<Container>
			<span>Share</span>

			<IconSetContainer>
				<IconContainer shadowColor={iconData.facebook.shadowColor}>
					<FacebookShareButton url={sharingUrl}>
						<img src={iconData.facebook.src} alt={iconData.facebook.alt} />
					</FacebookShareButton>
				</IconContainer>

				<IconContainer shadowColor={iconData.linkedin.shadowColor}>
					<LinkedinShareButton url={sharingUrl}>
						<img src={iconData.linkedin.src} alt={iconData.linkedin.alt} />
					</LinkedinShareButton>
				</IconContainer>
				<IconContainer shadowColor={iconData.twitter.shadowColor}>
					<TwitterShareButton url={sharingUrl}>
						<img src={iconData.twitter.src} alt={iconData.twitter.alt} />
					</TwitterShareButton>
				</IconContainer>
			</IconSetContainer>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.aside<ContainerProps>`
	${tw`uppercase flex flex-col items-center font-500 text-xs text-ltextColor sticky`}
	top: 0;
	padding: 5rem 0;
	height: min-content;
`;

type IconSetContainerProps = {};
const IconSetContainer = styled.ul<IconSetContainerProps>`
	${tw`flex flex-col space-y-4 mt-6`}
`;

type IconContainerProps = {
	shadowColor: string;
};
const IconContainer = styled.li<IconContainerProps>`
	${tw`flex items-center justify-center w-10 h-10 rounded-full`}

	box-shadow: -1px -1px 2px 0px rgba(0, 0, 0, 0.05),
		1px 3px 5px -1px rgba(${(p) => p.shadowColor}, 0.18);

	& > * {
		width: 40%;
	}

	transition: transform 300ms ease;

	:hover,
	:focus {
		transform: translateY(-0.1rem);
	}
`;

export default ShareToolbar;
