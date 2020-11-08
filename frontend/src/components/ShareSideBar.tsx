import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	sharingUrl: string;
};

type iconData = {
	shadowColor: string;
	src: string;
	alt: string;
	href: string;
};

const data: iconData[] = [
	{
		shadowColor: "19, 92, 182",
		alt: "facebook-logo",
		src: "/svg/facebook.svg",
		href: "https://www.facebook.com/sharer/sharer.php?u=",
	},
	{
		shadowColor: "8, 159, 197",
		alt: "twitter-logo",
		src: "/svg/twitter.svg",
		href: "https://www.facebook.com/sharer/sharer.php?u=",
	},
	{
		shadowColor: "40, 103, 178",
		alt: "linkedIn-logo",
		src: "/svg/linkedin.svg",
		href: "https://www.facebook.com/sharer/sharer.php?u=",
	},
];

function ShareToolbar({ sharingUrl }: Props): ReactElement {
	return (
		<Container>
			<span>Share</span>

			<IconSetContainer>
				{data.map((icon) => (
					<IconContainer key={icon.href} shadowColor={icon.shadowColor}>
						<a href={icon.href + encodeURIComponent(sharingUrl)}>
							<img src={icon.src} alt={icon.alt} />
						</a>
					</IconContainer>
				))}
			</IconSetContainer>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.aside<ContainerProps>`
	${tw`uppercase flex flex-col items-center font-500 text-xs text-ltextColor sticky`}
	top: 2rem;
	padding-bottom: 5rem;
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
