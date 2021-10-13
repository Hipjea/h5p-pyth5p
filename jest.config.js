module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/fileMock.js',
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    preset: "ts-jest",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
