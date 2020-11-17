import Link from "next/link";
import React, { ReactElement } from "react";

import tw, { styled } from "twin.macro";

type Props = {
	height?: string;
	width?: string;
};

function Logo({ ...style }: Props): ReactElement {
	return (
		<Link href="/" passHref>
			<LogoContainer style={style}>
				<LogoImage src="/svg/Logo.svg" />
			</LogoContainer>
		</Link>
	);
}

type LogoContainerProps = {};
const LogoContainer = styled.a<LogoContainerProps>`
	${tw`flex items-center justify-center`}
`;

type LogoImageProps = {};
const LogoImage = styled.img<LogoImageProps>`
	height: 100%;
`;

export default Logo;
