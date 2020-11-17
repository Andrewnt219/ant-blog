import { css } from "styled-components";
import tw, { styled } from "twin.macro";

const inputCss = css`
	/* Side padding = label[left] + label[py] */
	padding: 0.5rem calc(0.8rem + 0.5rem);

	width: 100%;
	height: 100%;

	:hover,
	:focus {
		outline: none;

		& + label {
			${tw`text-accent`}
		}
	}
`;

type InputProps = {};
export const Input = styled.input<InputProps>`
	${inputCss}
`;

type TextareaProps = {};
export const Textarea = styled.textarea<TextareaProps>`
	${inputCss}
`;

type LabelProps = {};
export const Label = styled.label<LabelProps>`
	/* Position the label */
	left: 0.8rem;
	position: absolute;
	top: 0;
	padding: 0 0.5rem;
	font-size: smaller;

	/* Hide it by default */
	opacity: 0;
	transition: transform 200ms ease, background 200ms ease, opacity 200ms ease,
		color 200ms ease;

	/* Others */
	${tw`font-500 text-ltextColor`}
`;

type InputContainerProps = {
	hasError: boolean;
};
export const InputContainer = styled.div<InputContainerProps>`
	${tw`relative border border-solid border-borderColor rounded-sm`}
	transition: border-color 200ms ease;

	input:not(:placeholder-shown) + label,
	textarea:not(:placeholder-shown) + label {
		transform: translate(0, -50%);
		${tw` bg-primary opacity-100`}
	}

	:hover,
	:focus-within {
		${tw`border-accent`}
	}

	${(p) =>
		p.hasError &&
		css`
			${tw`border-red-error`}
		`}
`;

type ContainerProps = {};
export const Container = styled.div<ContainerProps>`
	${tw`space-y-1`}
`;

type ErrorMessageProps = {};
export const ErrorMessage = styled.span<ErrorMessageProps>`
	${tw` text-red-error text-sm inline-block`}
`;

type SubmitButtonProps = {};
export const SubmitButton = styled.button<SubmitButtonProps>`
	${tw`font-500 uppercase tracking-widest rounded-sm`}
	font-size: smaller;

	${tw`py-2 px-5 bg-black text-white`}

	transition: transform 200ms ease, box-shadow 200ms ease;

	:hover,
	:focus {
		transform: translateY(-0.1rem);
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.07);
	}

	:active {
		transform: translateY(0);
		box-shadow: none;
	}
`;
