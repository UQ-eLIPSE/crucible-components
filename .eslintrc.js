/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
	root: true,
	extends: [
		"plugin:vue/vue3-recommended",
		"eslint:recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier",
	],
	overrides: [
		{
			files: [
				"**/__tests__/*.{cy,test}.{js,ts,jsx,tsx}",
			],
			extends: ["plugin:cypress/recommended"],
		},
	],
	rules: {
		"prettier/prettier": [
			"error",
			{ config: ".prettierrc", ignorePath: ".prettierignore" },
		],
		quotes: ["warn", "double"],
	},
	parserOptions: {
		ecmaVersion: "latest",
	},
	ignorePatterns: [ "/src/assets/*"], // Ignore default cypress folder
};
