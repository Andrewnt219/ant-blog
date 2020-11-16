import React, { InputHTMLAttributes, ReactElement } from "react";
import { UseFormMethods } from "react-hook-form";
import * as FormBuilder from "@src/components/form/FormBuilder";
import tw, { styled } from "twin.macro";

type Props<FormKeys extends Record<string, any>> = InputHTMLAttributes<
	HTMLInputElement
> & {
	id: string;
	type?: void;
	name: keyof FormKeys;
	register: (instance: HTMLInputElement | null) => void;
	labelText: string;
	errors: UseFormMethods["errors"];
	showCheckbox: boolean;
};

function Checkbox<FormKeys extends Record<string, any>>({
	id,
	name,
	register,
	labelText,
	errors,
	showCheckbox,
	...inputProps
}: Props<FormKeys>): ReactElement {
	return (
		<Container>
			<InputContainer>
				<FakeInput tabIndex={0}>{showCheckbox && <Tick />}</FakeInput>
				<Input
					hidden
					aria-hidden
					{...inputProps}
					type="checkbox"
					name={name}
					id={id}
					ref={register}
				/>
				<Label htmlFor={id}>{labelText}</Label>
			</InputContainer>

			{errors[name] && (
				<FormBuilder.ErrorMessage>
					{errors[name]?.message}
				</FormBuilder.ErrorMessage>
			)}
		</Container>
	);
}

type ContainerProps = {};
const Container = styled.div<ContainerProps>`
	width: max-content;
`;

type InputContainerProps = {};
const InputContainer = styled.div<InputContainerProps>`
	${tw`flex items-center space-x-2`}

	:focus-within, :hover {
		${tw`text-accent`}
	}
`;

type InputProps = {};
const Input = styled.input<InputProps>``;

type LabelProps = {};
const Label = styled.label<LabelProps>`
	transition: color 200ms ease;
`;

type FakeInputProps = {};
const FakeInput = styled.div<FakeInputProps>`
	${tw`relative border border-solid border-borderColor rounded-sm`}
	${tw`flex items-center justify-center`}

	width: 1em;
	height: 1em;

	transition: border 200ms ease, outline 200ms ease;

	:hover,
	:focus {
		${tw`border-accent`}
		outline-color: var(--accent-color);
	}

	& > * {
		width: 100%;
		height: 100%;
	}
`;

type TickProps = {};
const Tick = styled.div<TickProps>`
	background-image: url("/svg/checkbox-icon.svg");
	background-size: contain;
	background-position: center center;
`;

export default Checkbox;
