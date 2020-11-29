import React, { ReactElement, useRef, useState } from "react";
import tw, { styled, theme } from "twin.macro";
import { PostComment, useClickOutside } from "@src/hooks";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaReply } from "react-icons/fa";
import CommentWriter, {
	CommentFormValues,
} from "@src/components/CommentWriter";
import CenteredElementWithLine from "../CenteredElementWithLine";
import { padZero } from "@src/utils";
import { toFireStoreComment } from "@src/utils/dbUtils";
import { FORMAT_CONSTANTS } from "@src/assets/constants/StyleConstants";
import { CommentModel } from "@src/model/firebase/CommentModel";
import { FireBaseDataService } from "@src/service/firebase/firebase.data-service";

dayjs.extend(relativeTime);

type CommentSetProps = {
	comments: PostComment[];
	_postId: string;
};

function CommentSet({ comments, _postId }: CommentSetProps): ReactElement {
	const handleSubmit = (data: CommentFormValues) => {
		const submittedData: CommentModel = toFireStoreComment({
			data,
			_postId,
			replies: [],
		});

		FireBaseDataService.getInstance()
			.then((instance) => instance.addComment(submittedData))
			.catch(() => console.error("Fail to add comments"));
	};

	return (
		<>
			<CommentWriter submitHandler={handleSubmit} />

			{comments.length > 0 && (
				<>
					<CenteredElementWithLine>
						<Header>
							<span tw="text-accent">{padZero(comments.length)}</span>{" "}
							{comments.length > 1 ? "Comments" : "Comment"}
						</Header>
					</CenteredElementWithLine>

					<StyledCommentSet>
						{comments.map((comment) => (
							<li key={comment.id}>
								<Comment data={comment} _postId={_postId} />
							</li>
						))}
					</StyledCommentSet>
				</>
			)}
		</>
	);
}

type StyledCommentSetProps = {};
const StyledCommentSet = styled.ul<StyledCommentSetProps>`
	&& {
		${tw`mt-0`}
	}

	& > li:last-child > * {
		${tw`border-none`}
	}
`;

type HeaderProps = {};
const Header = styled.span<HeaderProps>`
	${tw`text-xl font-600`}
`;

/* -------------------------------------------------------------------------- */
/*                                   Comment                                  */
/* -------------------------------------------------------------------------- */
type CommentProps = {
	data: PostComment;
	_postId: string;
};
function Comment({ data, _postId }: CommentProps) {
	const { _createdAt, username, text, id, replies } = data;

	const [showCommentEditor, setShowCommentEditor] = useState(false);
	const [showAllReplies, setShowAllReplies] = useState<null | boolean>(null);

	const containerRef = useRef<HTMLDivElement | null>(null);

	const handleClickOutside = () => {
		if (containerRef.current) {
			const textAreaValue = containerRef.current
				.querySelector("textarea")
				?.value.trim();

			if (textAreaValue?.length === 0) {
				setShowCommentEditor(false);
			}
		}
	};

	useClickOutside(containerRef, handleClickOutside);

	const handleSubmit = (data: CommentFormValues) => {
		setShowCommentEditor(false);

		const submittedData: CommentModel = toFireStoreComment({
			data,
			_postId,
			replies: [],
		});

		FireBaseDataService.getInstance()
			.then((instance) =>
				instance.addReply(id, submittedData, () => setShowCommentEditor(true))
			)
			.catch(() => console.error("Fail to add reply"));
	};

	const handleReplyClick = () => {
		setShowCommentEditor((prev) => !prev);
	};

	const handleShowRepliesClick = () => {
		setShowAllReplies((prev) => !prev);
	};

	let repliesEndIndex: number | undefined;
	let showAllReplyButtonText: string;
	switch (showAllReplies) {
		case null:
			repliesEndIndex = 3;
			showAllReplyButtonText = `Show ${replies.length - 3} more`;
			break;
		case false:
			repliesEndIndex = 0;
			showAllReplyButtonText = `Show ${replies.length} replies`;
			break;
		case true:
			repliesEndIndex = undefined;
			showAllReplyButtonText = "Collapse all";
			break;
		default:
			throw new Error("Invalid options");
	}

	const displayedReplies = replies
		.sort((a, b) => b._createdAt - a._createdAt)
		.slice(0, repliesEndIndex);

	return (
		<StyledComment ref={containerRef}>
			<CommentContainer>
				<Avatar src="/svg/user-avatar.svg" />

				<Name>{username}</Name>

				{/* TODO style hover insteade of title */}
				<StyledDate
					title={dayjs(_createdAt).format(FORMAT_CONSTANTS.dateTimeFormat)}
				>
					{dayjs(_createdAt).fromNow()}
				</StyledDate>

				<Body>{text}</Body>

				<Button onClick={handleReplyClick}>
					<FaReply /> {showCommentEditor ? "Close" : "Reply"}
				</Button>
			</CommentContainer>

			{replies.length > 3 && (
				<ReplyButton onClick={handleShowRepliesClick}>
					{showAllReplyButtonText}
				</ReplyButton>
			)}

			<SubCommentContainer>
				{showCommentEditor && (
					<CommentWriter
						submitHandler={handleSubmit}
						config={{
							headerText: `Reply to ${username.split(" ")[0]}`,
							buttonText: "Reply",
						}}
					/>
				)}

				<StyledCommentSet>
					{displayedReplies.map((reply) => (
						<li key={reply._createdAt}>
							<Comment data={{ ...reply, id }} _postId={_postId} />
						</li>
					))}
				</StyledCommentSet>
			</SubCommentContainer>
		</StyledComment>
	);
}

type StyledCommentProps = {};
const StyledComment = styled.div<StyledCommentProps>`
	${tw`text-sm`}
	${tw`py-8 border-b border-lborderColor border-solid`}
`;

type CommentContainerProps = {};
const CommentContainer = styled.article<CommentContainerProps>`
	display: grid;
	grid-template-columns: 3rem 1fr auto;
	grid-template-areas:
		"avatar name reply"
		"avatar date ..."
		"... body body";
	gap: 0 1rem;
`;

type AvatarProps = {};
const Avatar = styled.img<AvatarProps>`
	grid-area: avatar;
`;

type NameProps = {};
const Name = styled.span<NameProps>`
	${tw`font-500`}
	grid-area: name;
	font-size: 1.1em;
`;

type StyledDateProps = {};
const StyledDate = styled.time<StyledDateProps>`
	${tw`uppercase font-500 tracking-widest text-ltextColor`}
	grid-area: date;
	font-size: 0.75em;
`;

type BodyProps = {};
const Body = styled.p<BodyProps>`
	${tw`mt-2`}
	grid-area: body;
`;

type ButtonProps = {};
const Button = styled.button<ButtonProps>`
	${tw`uppercase text-accent font-500 tracking-widest`}
	${tw`flex items-center`}
	${tw`border-b  border-solid border-white`}
	grid-area: reply;
	font-size: 0.75em;

	transition: border-color 200ms;
	:hover,
	:focus {
		outline: none;
		${tw`border-current`}
	}

	svg {
		height: 0.5em;
		${tw`text-xs text-ltextColor mr-1`}
	}
`;

const ReplyButton = styled(Button)`
	${tw`mx-auto my-3`}
`;

type SubCommentContainerProps = {};
const SubCommentContainer = styled.div<SubCommentContainerProps>`
	${tw`ml-5`}

	@media screen and (min-width: ${theme`screens.smDesktop`}) {
		${tw`ml-10`}
	}
`;

export default CommentSet;
