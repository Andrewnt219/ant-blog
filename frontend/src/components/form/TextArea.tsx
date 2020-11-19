import React, { ReactElement, TextareaHTMLAttributes } from "react";
import { UseFormMethods } from "react-hook-form";
import * as FormBuilder from "@src/components/form/FormBuilder";

type Props<FormKeys extends Record<string, any>> = TextareaHTMLAttributes<
	HTMLTextAreaElement
> & {
	id: string;
	name: keyof FormKeys;
	register: (instance: HTMLTextAreaElement | null) => void;
	labelText: string;
	errors: UseFormMethods["errors"];
};

function TextArea<FormKeys extends Record<string, any>>({
	id,
	name,
	register,
	labelText,
	errors,
	...inputProps
}: Props<FormKeys>): ReactElement {
	const hasError = !!errors[name];

	return (
		<FormBuilder.Container>
			<FormBuilder.InputContainer hasError={hasError}>
				<FormBuilder.Textarea
					aria-invalid={hasError}
					name={name}
					id={id}
					ref={register}
					{...inputProps}
				/>
				<FormBuilder.Label htmlFor={id}>{labelText}</FormBuilder.Label>
			</FormBuilder.InputContainer>

			{hasError && (
				<FormBuilder.ErrorMessage>
					{errors[name]?.message}
				</FormBuilder.ErrorMessage>
			)}
		</FormBuilder.Container>
	);
}

export default TextArea;
