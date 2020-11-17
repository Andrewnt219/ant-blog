import React, { ReactElement, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import tw, { styled } from "twin.macro";
import CenteredElementWithLine from "./CenteredElementWithLine";
import TextArea from "./form/TextArea";
import TextField from "./form/TextField";
import { LOCAL_STORAGE } from "@src/assets/constants/StyleConstants";
import Checkbox from "./form/Checkbox";
import * as FormBuilder from "@src/components/form/FormBuilder";
import { getRandomNumberInclusive } from "@src/utils";

export type CommentFormValues = {
	username: string;
	text: string;
	isSaved: boolean;
};

type Props = {
	submitHandler?: (data: CommentFormValues) => void;
	className?: string;
	config?: {
		headerText?: string;
		buttonText?: string;
	};
};

type Ref = HTMLFormElement;

const CommentWriter = React.forwardRef<Ref, Props>(
	(props, ref): ReactElement => {
		const { submitHandler, className, config } = props;

		const { register, handleSubmit, reset, watch, errors, setValue } = useForm<
			CommentFormValues
		>({
			mode: "onChange",
		});

		const WRITER_ID = useMemo(
			() => getRandomNumberInclusive(0, 10) * Date.now(),
			[]
		);

		const onSubmit = handleSubmit(async (data) => {
			reset();
			submitHandler && submitHandler(data);

			try {
				if (data.isSaved) {
					localStorage.setItem(LOCAL_STORAGE.commentName, data.username);
					setValue("username", data.username);
					setValue("isSaved", true);
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
		}, [setValue]);

		return (
			<Container onSubmit={onSubmit} className={className} noValidate ref={ref}>
				<CenteredElementWithLine>
					<Header>{config?.headerText ?? "Write A Comment"}</Header>
				</CenteredElementWithLine>

				<TextField<CommentFormValues>
					id={`comment-name-${WRITER_ID}`}
					type="text"
					name="username"
					aria-required
					register={register({ required: "Name is required" })}
					errors={errors}
					labelText="Name"
					autoComplete="name"
				/>

				<TextArea<CommentFormValues>
					name="text"
					aria-required
					id={`comment-text-${WRITER_ID}`}
					register={register({
						required: "Comment is required",
					})}
					labelText="Comment"
					errors={errors}
					placeholder="Enter your comment here.."
				/>

				<Checkbox
					id={`save-user-checkbox-${WRITER_ID}`}
					name="isSaved"
					register={register}
					labelText="Save my name in this browser for the next time."
					errors={errors}
					showCheckbox={watch("isSaved")}
				/>

				<FormBuilder.SubmitButton type="submit">
					{config?.buttonText ?? "Post comment"}
				</FormBuilder.SubmitButton>
			</Container>
		);
	}
);

type ContainerProps = {};
const Container = styled.form<ContainerProps>`
	${tw`space-y-5 text-sm`}
`;

type HeaderProps = {};
const Header = styled.header<HeaderProps>`
	${tw`font-600 text-xl capitalize`}
`;

export default CommentWriter;
