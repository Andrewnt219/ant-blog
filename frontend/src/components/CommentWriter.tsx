import db from "@src/lib/firebase/db";
import { AxiosError } from "axios";
import React, { ReactElement, useEffect } from "react";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import CenteredElementWithLine from "./CenteredElementWithLine";
import TextArea from "./form/TextArea";
import TextField from "./form/TextField";
import omit from "lodash/omit";
import { LOCAL_STORAGE } from "@src/assets/constants/StyleConstants";
import Checkbox from "./form/Checkbox";
import * as FormBuilder from "@src/components/form/FormBuilder";

type FormValues = {
	username: string;
	text: string;
	isSaved: boolean;
};

export type FirestoreComment = Omit<FormValues, "isSaved"> & {
	_postId: string;
	_createdAt: number;
};

type Props = {
	_postId: string;
	submitHandler?: (data: FirestoreComment) => void;
};

function Comment({ _postId, submitHandler }: Props): ReactElement {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		errors,
		formState: { isValid },
		setValue,
	} = useForm<FormValues>({
		mode: "onChange",
	});

	const onSubmit = handleSubmit(async (data) => {
		reset();

		const submittedData: FirestoreComment = {
			...omit(data, ["isSaved"]),
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

		try {
			if (data.isSaved) {
				localStorage.setItem(LOCAL_STORAGE.commentName, data.username);
				setValue("username", data.username);
			} else {
				localStorage.removeItem(LOCAL_STORAGE.commentName);
			}
		} catch (error) {
			console.warn("Fail to save to local storage");
		}
	});

	useEffect(() => {
		try {
			const localName = localStorage.getItem(LOCAL_STORAGE.commentName);

			if (localName) {
				setValue("username", localName);
				setValue("isSaved", true);
			}
		} catch (error) {
			console.warn("Fail to get item from local storage");
		}
	}, []);

	return (
		<Container onSubmit={onSubmit}>
			<CenteredElementWithLine>
				<Header>Write A Comment</Header>
			</CenteredElementWithLine>

			<TextField<FormValues>
				id="comment-name"
				type="text"
				name="username"
				register={register({ required: "Name is required" })}
				errors={errors}
				labelText="Name"
				autoComplete="name"
			/>

			<TextArea<FormValues>
				name="text"
				id="comment-text"
				register={register({
					required: "Comment is required",
				})}
				labelText="Comment"
				errors={errors}
				placeholder="Enter your comment here.."
			/>

			<Checkbox
				id="save-user-checkbox"
				name="isSaved"
				register={register}
				labelText="Save my name in this browser for the next time."
				errors={errors}
				showCheckbox={watch("isSaved")}
			/>
			<FormBuilder.SubmitButton type="submit">
				Post comment
			</FormBuilder.SubmitButton>
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.form<ContainerProps>`
	${tw`space-y-5 text-sm`}
`;

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`font-600 text-xl capitalize`}
`;

type ButtonProps = {};
const Button = styled.button<ButtonProps>``;

export default Comment;
