import React, { InputHTMLAttributes, ReactElement } from "react";
import { UseFormMethods } from "react-hook-form";
import * as FormBuilder from "@src/components/form/FormBuilder";

type Props<FormKeys extends Record<string, any>> = InputHTMLAttributes<
	HTMLInputElement
> & {
	id: string;
	type: string;
	name: keyof FormKeys;
	register: (instance: HTMLInputElement | null) => void;
	labelText: string;
	errors: UseFormMethods["errors"];
};

function TextField<FormKeys extends Record<string, any>>({
	id,
	type,
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
				<FormBuilder.Input
					{...inputProps}
					type={type}
					placeholder={labelText}
					name={name}
					id={id}
					ref={register}
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

export default TextField;
