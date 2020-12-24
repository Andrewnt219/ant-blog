import React, { ReactElement } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { styled } from "twin.macro";

import { SocialMedia } from "@src/assets/enums/IconEnum";

type Props = {
	variants: SocialMedia;
	className?: string;
};

function SocialMediaIcon({ variants, className }: Props): ReactElement {
	let Icon = FaFacebookF;
	let linkToProfile = "";

	switch (variants) {
		case SocialMedia.FACEBOOK:
			Icon = FaFacebookF;
			linkToProfile = "facebook.com";
			break;

		case SocialMedia.INSTAGRAM:
			Icon = AiFillInstagram;
			linkToProfile = "instagram.com";
			break;

		case SocialMedia.LINKEDIN:
			Icon = FaLinkedinIn;
			linkToProfile = "linkedin.com";
			break;

		default:
			throw new Error(variants + " does not exist");
	}
	return (
		<Container
			className={className}
			href={linkToProfile}
			target="_blank"
			rel="noopener noreferrer"
		>
			<Icon />
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.a<ContainerProps>`
	svg {
		transition: fill 200ms ease;
	}

	:hover,
	:focus {
		svg {
			fill: var(--accent-color);
		}
	}
`;

export default SocialMediaIcon;
