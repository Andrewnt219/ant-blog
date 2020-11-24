import Link from "next/link";
import React, { ReactElement } from "react";
import tw, { css, styled } from "twin.macro";

type Props = {
	data: BreadCrumbProps[];
};

type BreadCrumbProps = {
	text: string;
	href: string;
};

function Breadcrumb({ data }: Props): ReactElement {
	return (
		<BreadcrumbItemSet>
			{data.map(({ href, text }, index) => (
				<React.Fragment key={href}>
					<BreadCrumbItem lastItem={index === data.length - 1} title={text}>
						<Link href={href}>
							<a>{text}</a>
						</Link>
					</BreadCrumbItem>
					{index !== data.length - 1 && <span>&raquo;</span>}
				</React.Fragment>
			))}
		</BreadcrumbItemSet>
	);
}
type BreadcrumbItemSetProps = {};
const BreadcrumbItemSet = styled.ul<BreadcrumbItemSetProps>`
	${tw`flex space-x-5  font-500 uppercase text-xs items-center`}

	& > :not(:last-child) {
		${tw`text-ltextColor`}
	}
`;

type BreadCrumbItemProps = {
	lastItem: boolean;
};
const BreadCrumbItem = styled.li<BreadCrumbItemProps>`
	transition: color 200ms ease;
	${tw`hover:text-textColor hover:underline`}

	${(p) =>
		p.lastItem &&
		css`
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		`}
`;

export default Breadcrumb;
