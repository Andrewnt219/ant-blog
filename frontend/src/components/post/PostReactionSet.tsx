import React, { ReactElement, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import tw, { css, styled, theme } from 'twin.macro';

import angryAnimation from '@src/assets/lottie/angry-dog.json';
import coolAnimation from '@src/assets/lottie/cool-dog.json';
import likeAnimation from '@src/assets/lottie/like-dog.json';
import wowAnimation from '@src/assets/lottie/wow-dog.json';

type PostReactionSetProps = {
	itemHeight: PostReactionProps["height"];
};

const reactionSet: PostReactionProps["variant"][] = [
	"angry",
	"wow",
	"like",
	"cool",
];

function PostReactionSet({ itemHeight }: PostReactionSetProps): ReactElement {
	const [selectedReaction, setSelectedReaction] = useState<
		PostReactionProps["variant"]
	>();

	// Manage active (selected) reaction
	const handleItemClick = (reaction: PostReactionProps["variant"]) => {
		if (reaction === selectedReaction) {
			setSelectedReaction(undefined);
		} else {
			setSelectedReaction(reaction);
		}
	};

	return (
		<PostReactionSetContainer>
			{reactionSet.map((reaction, index) => (
				<li key={reaction}>
					<PostReaction
						handleClick={handleItemClick}
						height={itemHeight}
						variant={reaction}
						isSelected={selectedReaction === reaction}
					/>
				</li>
			))}
		</PostReactionSetContainer>
	);
}

type PostReactionSetContainerProps = {};
const PostReactionSetContainer = styled.ul<PostReactionSetContainerProps>`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		grid-template-columns: repeat(4, 1fr);
	}
`;

/* -------------------------------------------------------------------------- */
/*                                PostReaction                                */
/* -------------------------------------------------------------------------- */

type PostReactionProps = {
	isSelected: PostReactionContainerProps["isSelected"];
	variant: "angry" | "like" | "wow" | "cool";
	height: string;
	handleClick?(selectedReaction: PostReactionProps["variant"]): void;
};

const PostReaction = ({
	variant,
	height,
	handleClick,
	isSelected,
}: PostReactionProps) => {
	// If true, play animation
	const [pauseAnimation, setPauseAnimation] = useState(true);

	// Pass clicked reaction to parent
	const onClick = () => {
		handleClick && handleClick(variant);
		// TODO: send to database
	};

	// Pause animation on mouse out
	const handleMouseOut = () => {
		if (!isSelected) {
			setPauseAnimation(true);
		}
	};

	// Play animation on mouse enter
	const handleMouseEnter = () => {
		setPauseAnimation(false);
	};

	// Stop animation if another reaction is selected
	useEffect(() => {
		if (!isSelected) {
			setPauseAnimation(true);
		}
	}, [isSelected]);

	/* Switch data */
	let animationData: any, caption: string;
	switch (variant) {
		case "angry":
			animationData = angryAnimation;
			caption = "Angry";
			break;
		case "cool":
			animationData = coolAnimation;
			caption = "Cool";
			break;
		case "like":
			animationData = likeAnimation;
			caption = "Like";
			break;
		case "wow":
			animationData = wowAnimation;
			caption = "Wow";
			break;

		default:
			throw new Error("Invalid variant");
	}

	return (
		<PostReactionContainer
			onMouseLeave={handleMouseOut}
			onMouseEnter={handleMouseEnter}
			onClick={onClick}
			isSelected={isSelected}
		>
			<Lottie
				height={height}
				isPaused={pauseAnimation}
				options={{
					loop: true,
					autoplay: false,
					animationData,
				}}
			/>
			<Caption>{caption}</Caption>
		</PostReactionContainer>
	);
};

type PostReactionContainerProps = {
	isSelected: boolean;
};
const PostReactionContainer = styled.button<PostReactionContainerProps>`
	${tw`p-2 flex flex-col space-y-2 items-center justify-center w-full`}
	${tw`border border-solid border-lborderColor`}

	div {
		${tw`pointer-events-none`}
	}

	transition: border-color 200ms ease, background-color 200ms ease,
		color 200ms ease;

	:hover,
	:focus {
		outline-color: var(--accent-color);
		${tw`border-accent bg-lprimary`}
	}

	${(p) =>
		p.isSelected &&
		css`
			${tw`bg-lprimary text-accent`}
		`}
`;

type CaptionProps = {};
const Caption = styled.span<CaptionProps>`
	${tw`capitalize font-500`}
	font-size: smaller;
`;

export default PostReaction;
export { PostReactionSet };
