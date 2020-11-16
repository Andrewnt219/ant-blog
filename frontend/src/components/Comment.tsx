import db from "@src/lib/firebase/db";
import { AxiosError } from "axios";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { styled } from "twin.macro";

type FormValues = {
	name: string;
	text: string;
};

export type FirestoreComment = FormValues & {
	_postId: string;
	_createdAt: number;
};

type Props = {
	_postId: string;
	submitHandler?: (data: FirestoreComment) => void;
};

function Comment({ _postId, submitHandler }: Props): ReactElement {
	const { register, handleSubmit, reset } = useForm<FormValues>();

	const onSubmit = handleSubmit(async (data) => {
		reset();

		const submittedData: FirestoreComment = {
			...data,
			_postId,
			_createdAt: Date.now(),
		};

		try {
			db.collection("comments").add(submittedData);
			submitHandler && submitHandler(submittedData);
		} catch (error) {
			console.log((error as AxiosError).message);
			console.log(error);
		}
	});

	return (
		<Container onSubmit={onSubmit}>
			<label htmlFor="comment-name">Username</label>
			<Input
				type="text"
				name="name"
				id="comment-name"
				ref={register({ required: true })}
			/>
			<label htmlFor="comment-name">Comment</label>
			<TextArea
				name="text"
				id="comment-text"
				ref={register({ required: true })}
			></TextArea>
			<input type="submit" value="Submit" />
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.form<ContainerProps>``;

type InputProps = {};
const Input = styled.input<InputProps>`
	border-bottom: 1px solid #000;
`;

type TextAreaProps = {};
const TextArea = styled.textarea<TextAreaProps>`
	border: 1px solid #000;
`;

export default Comment;
