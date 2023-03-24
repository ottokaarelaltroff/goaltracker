module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'prettier',
        'plugin:react/jsx-runtime',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        "plugin:react-hooks/recommended"
    ],
    plugins: ['prettier', 'unused-imports', "react-hooks"],
    rules: {
        'prettier/prettier': ['error'],
        'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    parserOptions: {
        ecmaVersion: 2015,
        ecmaFeatures: { legacyDecorators: true },
    },
};
