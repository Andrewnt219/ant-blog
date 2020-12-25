import { TargetAndTransition, Variants } from "framer-motion";

export const headerVariants: Variants = {
	hidden: {
		scale: 1.5,
		opacity: 0,
	},

	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			type: "tween",
			duration: 0.5,
			delay: 0.5,
		},
	},
};

export const pinnedPostsVariants: Record<"post" | "postSet", Variants> = {
	post: {
		hidden: {
			x: "50%",
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				duration: 1,
			},
		},
	},

	postSet: {
		hidden: {},
		visible: {
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.5,
			},
		},
	},
};

export const recentPostsVariants: Record<"post" | "postSet", Variants> = {
	post: {
		hidden: {
			x: "50%",
			opacity: 0,
		},
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				type: "spring",
				duration: 1,
			},
		},
		exit: {},
	},

	postSet: {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.5,
			},
		},
		exit: { x: "50%", opacity: 0 },
	},
};

export const categoriesVariants: Record<"item" | "container", Variants> = {
	item: {
		hidden: {
			opacity: 0.1,
		},
		visible: {
			opacity: 1,
			transition: {
				type: "tween",
				duration: 1,
			},
		},
	},
	container: {
		hidden: {},
		visible: {
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.25,
			},
		},
	},
};

export const sliderVariants: Variants = {
	hidden: {
		x: "-100%",
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
		transition: {
			type: "tween",
			duration: 0.5,
		},
	},
};

export const backdropVariants: Variants = {
	hidden: {
		opacity: 0,
	},
	visible: {
		opacity: 1,
		transition: {
			type: "tween",
			duration: 0.55,
		},
	},
};

export const dropDownButtonVariants: TargetAndTransition = {
	y: ["0%", "15%"],
	transition: {
		type: "spring",
		repeat: Infinity,
		repeatType: "reverse",
	},
};

export const dropDownVariants: Record<"container" | "item", Variants> = {
	container: {
		initial: {},
		visible: {
			transition: {
				staggerChildren: 0.1,
			},
		},
		exit: {
			transition: {
				staggerChildren: 0.1,
			},
		},
	},
	item: {
		initial: {
			y: "-1rem",
			opacity: 0,
		},
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "tween",
				duration: 0.15,
			},
		},
		exit: {
			y: "-1rem",
			opacity: 0,
			transition: {
				type: "tween",
				duration: 0.15,
			},
		},
	},
};
