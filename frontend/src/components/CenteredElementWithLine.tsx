import React, { ReactElement, ReactNode } from "react";
import tw, { styled } from "twin.macro";

type Props = {
	children: ReactNode;
};

function CenteredElementWithLine({ children }: Props): ReactElement {
	return (
		<Container>
			<SubContainer>{children}</SubContainer>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`relative flex items-center justify-center`}
	::before {
		content: "";
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		height: 1px;
		width: 100%;
		background-color: #e1e1e1;
	}
`;

type SubContainerProps = {};
const SubContainer = styled.div<SubContainerProps>`
	${tw`px-5 relative bg-primary`}
`;

export default CenteredElementWithLine;
