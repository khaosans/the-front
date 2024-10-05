   module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json', // Ensure this points to your tsconfig file
        }],
        '^.+\\.jsx?$': 'babel-jest', // Use Babel for JSX files
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transformIgnorePatterns: [
        '/node_modules/(?!your-module-to-transform)', // Adjust this if you have specific modules to transform
    ],
};