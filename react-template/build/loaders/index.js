const lessLoader = require('./less');
const mediaLoader = require('./media');
const babelLoader = require('./babel');
const tsLoader = require('./ts');

module.exports = [
    ...lessLoader,
    ...mediaLoader,
    ...babelLoader,
    ...tsLoader
];