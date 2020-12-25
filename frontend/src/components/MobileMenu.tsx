import { ENDPOINTS } from "@src/assets/constants/StyleConstants";
import { RouteProps } from "@src/assets/data/routesData";
import { useRouteMatch, useRoutesData } from "@src/hooks";
import NextLink from "next/link";
import React, { ReactElement, useState } from "react";
import tw, { css, styled } from "twin.macro";
import Logo from "./Logo";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AnimatePresence, motion, Variant } from "framer-motion";
import {
	backdropVariants,
	sliderVariants,
	dropDownButtonVariants,
	dropDownVariants,
} from "@src/assets/variants";
type Props = {
	isOpen: boolean;
	handleBackdropClicked(): void;
};

function MobileMenu({ isOpen, handleBackdropClicked }: Props): ReactElement {
	const routesData = useRoutesData();

	const handleEnter = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === "ENTER") {
			handleBackdropClicked();
		}
	};

	return (
		<>
			<Backdrop
				onKeyDown={handleEnter}
				onClick={handleBackdropClicked}
				tabIndex={0}
				//
				variants={backdropVariants}
				animate="visible"
				initial="hidden"
				exit="hidden"
			/>
			<Container
				variants={sliderVariants}
				animate="visible"
				initial="hidden"
				exit="hidden"
			>
				<Logo width="90%" />
				<Menu>
					{routesData.map((route) => (
						<MenuItem
							handleClick={handleBackdropClicked}
							data={route}
							key={route.href.toString()}
						/>
					))}
				</Menu>
			</Container>
		</>
	);
}

type ContainerProps = {};
const Container = styled(motion.nav)<ContainerProps>`
	position: fixed;
	top: 0;
	left: 0;
	height: 100%;
	width: 70%;
	${tw`z-40 bg-primary shadow`}
	${tw`px-6 pb-6`}
  overflow-y: scroll;
`;

type MenuProps = {};
const Menu = styled.ul<MenuProps>`
	${tw` font-500`}
`;

type BackdropProps = {};
const Backdrop = styled(motion.div)<BackdropProps>`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	${tw`z-20`}
	background-color: rgba(0,0,0,.6);
`;

/* -------------------------------------------------------------------------- */
/*                                  MENUITEM                                  */
/* -------------------------------------------------------------------------- */
type MenuItemProps = {
	data: RouteProps;
	isDropDown?: boolean;
	handleClick(): void;
	variants?: Variant;
};
function MenuItem({ data, isDropDown = false, handleClick }: MenuItemProps) {
	const isActive = useRouteMatch(data.href.toString(), data.exact);
	const [showDropDown, setShowDropDown] = useState<boolean>(false);

	const renderedIcon = showDropDown ? <IoIosArrowUp /> : <IoIosArrowDown />;

	return (
		<MenuItemContainer variants={dropDownVariants.item}>
			<StyledMenuItem isDropDown={isDropDown}>
				<NextLink href={data.href} passHref>
					<MenuLink onClick={handleClick} isActive={isActive}>
						{data.text}
					</MenuLink>
				</NextLink>

				{data.dropdown && (
					<DropDownButton
						whileHover={dropDownButtonVariants}
						whileFocus={dropDownButtonVariants}
						onClick={() => setShowDropDown((prev) => !prev)}
					>
						{renderedIcon}
					</DropDownButton>
				)}
			</StyledMenuItem>

			<AnimatePresence>
				{data.dropdown && showDropDown && (
					<DropDown
						variants={dropDownVariants.container}
						animate="visible"
						initial="initial"
						exit="exit"
					>
						{data.dropdown.map((item) => (
							<MenuItem
								isDropDown
								key={item.href.toString()}
								data={item}
								handleClick={handleClick}
								variants={dropDownVariants.item}
							/>
						))}
					</DropDown>
				)}
			</AnimatePresence>
		</MenuItemContainer>
	);
}

type MenuItemContainerProps = {};
const MenuItemContainer = styled(motion.div)<MenuItemContainerProps>``;

type StyledMenuItemProps = {
	isDropDown: boolean;
};
const StyledMenuItem = styled.li<StyledMenuItemProps>`
	${tw`py-4 pr-5  border-b border-solid border-borderColor`}
	${tw`flex justify-between items-center`}

	${(p) =>
		p.isDropDown &&
		css`
			font-size: smaller;
		`}
`;

type DropDownProps = {};
const DropDown = styled(motion.ul)<DropDownProps>`
	${tw`pl-2`}
`;

type MenuLinkProps = {
	isActive: boolean;
};
const MenuLink = styled.a<MenuLinkProps>`
	${(p) =>
		p.isActive &&
		css`
			${tw`text-accent`}
		`}
`;

type DropDownButtonProps = {};
const DropDownButton = styled(motion.button)<DropDownButtonProps>`
	${tw`hocus:outline-none`}
`;

export default MobileMenu;
