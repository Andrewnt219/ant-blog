import React, { ReactElement } from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import tw, { styled } from "twin.macro";

type Props = {
	variants: "facebook" | "instagram" | "linkedin";
};

function SocialMediaIcon({ variants }: Props): ReactElement {
	let Icon = FaFacebookF;
	let linkToProfile = "";

	switch (variants) {
		case "facebook":
			Icon = FaFacebookF;
			linkToProfile = "facebook.com";
			break;

		case "instagram":
			Icon = AiFillInstagram;
			linkToProfile = "instagram.com";
			break;

		case "linkedin":
			Icon = FaLinkedinIn;
			linkToProfile = "linkedin.com";
			break;

		default:
			throw new Error("variants does not exist");
	}
	return (
		<Container href={linkToProfile} target="_blank" rel="noopener noreferrer">
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
