const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [autoprefixer({remove: false, add: false, browsers: ['last 9 versions'], cascade: false })]
}