const path = require('path')
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    moduleDirectories: [
        'node_modules',
        path.join(__dirname, 'src'),
        path.join(__dirname, 'test'),
    ],
}

