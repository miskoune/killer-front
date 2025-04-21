import { defineConfig } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends(
        "airbnb",
        "airbnb/hooks",
        "prettier",
        "eslint:recommended",
        "plugin:json/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ),
    plugins: {
        "@typescript-eslint": typescriptEslint,
        react,
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            typescript: {},
        },
    },

    rules: {
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-var-requires": "off",
        "react/jsx-fragments": ["error", "syntax"],
        "react/prop-types": "off",
        "react/require-default-props": "off",

        "react/jsx-filename-extension": ["error", {
            extensions: [".tsx"],
        }],

        "react/jsx-props-no-spreading": "off",
        "import/prefer-default-export": "off",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",

        "@typescript-eslint/no-use-before-define": ["error", {
            typedefs: false,
        }],

        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
        }],

        "react/function-component-definition": [2, {
            namedComponents: "function-declaration",
        }],

        "import/extensions": ["error", "ignorePackages", {
            js: "never",
            ts: "never",
            tsx: "never",
        }],

        "import/order": ["error", {
            groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            "newlines-between": "always",

            alphabetize: {
                order: "asc",
                caseInsensitive: true,
            },
        }],

        "no-shadow": "off",
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-void": "off",
        "@typescript-eslint/no-unused-vars": "error",

        "@typescript-eslint/consistent-type-imports": ["error", {
            fixStyle: "inline-type-imports",
        }],
    },
}]);