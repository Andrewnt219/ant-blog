import { Variants } from "framer-motion";

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
			},
		},
	},

	postSet: {
		hidden: {},
		visible: {
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
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
				type: "tween",
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
