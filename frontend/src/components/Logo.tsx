import Link from "next/link";
import React, { ReactElement } from "react";
import { icons } from "react-icons";
import tw, { styled } from "twin.macro";

type Props = {
	withText?: boolean;
	height?: string;
	width?: string;
};

function Logo({ withText, ...style }: Props): ReactElement {
	return (
		<Link href="/" passHref>
			<LogoContainer>
				<LogoImage
					src={withText ? "/svg/TextLogo.svg" : "/svg/Logo.svg"}
					style={style}
				/>
			</LogoContainer>
		</Link>
	);
}

type LogoContainerProps = {};
const LogoContainer = styled.div<LogoContainerProps>`
	${tw`mr-6 flex items-center justify-center`}
`;

type LogoImageProps = {};
const LogoImage = styled.img<LogoImageProps>``;

export default Logo;
