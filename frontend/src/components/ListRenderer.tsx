import React, { ReactNode } from 'react';
import { css } from 'styled-components';
import tw, { styled } from 'twin.macro';

type Props = {
	type: "bullet" | "number";
	children: ReactNode;
};

function ListRenderer({ type, children }: Props): ReactNode {
	let List: any;

	switch (type) {
		case "bullet":
			List = Bullet;
			break;

		case "number":
			List = Number;
			break;

		default:
			throw new Error("Invalid type");
	}

	return <List>{children}</List>;
}

const listCss = css`
	${tw`ml-8 my-6 space-y-3`}

	li::marker {
		${tw`font-body`}
	}
`;

type BulletProps = {};
const Bullet = styled.ul<BulletProps>`
	${listCss}

	li {
		list-style: disc;
		${tw`pl-2`}

		::marker {
			${tw`text-ltextColor`}
		}
	}
`;

type NumberProps = {};
const Number = styled.ol<NumberProps>`
	${listCss}

	li {
		list-style: decimal;
	}
`;

export default ListRenderer;
