import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import tw, { styled } from "twin.macro";
import Broken from "../Broken";

type Props = {
	errorText?: string;
};

function BrokenPage({
	errorText = "Wow, such empty, much space. My dog has eaten the page.",
}: Props): ReactElement {
	const { back, push } = useRouter();
	return (
		<Container>
			<Broken height="20rem" errorText={errorText} />

			<ButtonGroup>
				<SecondaryButton onClick={back}>Go back</SecondaryButton>
				<PrimaryButton onClick={() => push("/")}>Homepage</PrimaryButton>
			</ButtonGroup>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	${tw`flex flex-col items-center space-y-5`}
	font-size: smaller;
`;

type ButtonGroupProps = {};
const ButtonGroup = styled.div<ButtonGroupProps>`
	${tw`space-x-2`}
`;

type PrimaryButtonProps = {};
const PrimaryButton = styled.button<PrimaryButtonProps>`
	${tw`px-2 py-1 text-white bg-accent rounded-sm border border-accent shadow-sm`}
	transition: background-color 200ms ease;

	:hover,
	:focus {
		background-color: hsl(240 99% 59% / 1);
	}
`;

type SecondaryButtonProps = {};
const SecondaryButton = styled.button<SecondaryButtonProps>`
	${tw`px-2 py-1 border border-accent text-accent rounded-sm`}
	transition: background-color 200ms ease, text 200ms ease;

	:hover,
	:focus {
		${tw`bg-accent text-white`}
	}
`;

export default BrokenPage;
