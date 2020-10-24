import Axios, { AxiosError } from "axios";
import React, { ReactElement } from "react";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";

type FormValues = {
	name: string;
	text: string;
};

type Comment = FormValues & {
	_postId: string;
};

type Props = {
	_postId: string;
	submitHandler?: (data: Comment) => void;
};

function Comment({ _postId, submitHandler }: Props): ReactElement {
	const { register, handleSubmit, errors } = useForm<FormValues>();
	const onSubmit = handleSubmit(async (data) => {
		const submittedData = { ...data, _postId };

		try {
			await Axios.post("/api/create-comment", submittedData);
			submitHandler && submitHandler(submittedData);
		} catch (error) {
			console.log((error as AxiosError).message);
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
