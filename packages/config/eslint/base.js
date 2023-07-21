/** @type {import("eslint").Linter.Config} */
const config = {
    extends: [
        "turbo",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/stylistic-type-checked",
        "prettier",
    ],
    env: {
        es2022: true,
        node: true,
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: true,
    },
    plugins: ["@typescript-eslint", "import"],
    rules: {
        "@typescript-eslint/no-unused-vars": [
            "error",
            { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/consistent-type-imports": [
            "error",
            { prefer: "type-imports" },
        ],
        "@typescript-eslint/no-misused-promises": [
            2,
            { checksVoidReturn: { attributes: false } },
        ],
    },
    ignorePatterns: [
        "**/.eslintrc.cjs",
        "**/*.config.js",
        "**/*.config.cjs",
        "packages/config/**",
        ".next",
        "dist",
        "pnpm-lock.yaml",
    ],
    reportUnusedDisableDirectives: true,
};

module.exports = config;