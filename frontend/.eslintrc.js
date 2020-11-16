module.exports = {
	env: {
		browser: true,
		es2020: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"react-app",
		"plugin:jsx-a11y/recommended",
		"plugin:@asbjorn/groq/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 11,
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "jsx-a11y"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/no-var-requires": 0,
		"react/prop-types": 0,
		"no-debugger": process.env.NODE_ENV === "production" ? 1 : 0,
		"react/display-name": 0,
		"@typescript-eslint/no-explicit-any": 0,
		"jsx-a11y/anchor-is-valid": 0,
		"@typescript-eslint/ban-ts-ignore": 0,
		"@typescript-eslint/ban-ts-comment": 0,
		"@typescript-eslint/no-non-null-assertion": 0,
	},
};
