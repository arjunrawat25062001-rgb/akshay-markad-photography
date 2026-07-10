import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript")];

// Explicitly ignore generated Next.js files to avoid linting .next types.
eslintConfig.push({
	ignores: ["**/.next/**"]
});

export default eslintConfig;
