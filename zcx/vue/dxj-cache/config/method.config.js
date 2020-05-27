const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function read(dir,type,cb){
    let files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
        let filePath = path.resolve(dir,files[i]);
        let stat = fs.lstatSync(filePath);
        if(stat.isDirectory()){
            read(filePath,type,cb);
        }else{
            let pathObj = path.parse(filePath);
            if (pathObj.ext === type) {
                let name = pathObj.name;
                cb && cb(name,pathObj,filePath);
            }
        }
    }
}

function htmlplugin(htmlname,entryname){
    return new HtmlWebpackPlugin({
        filename: htmlname,
        template: htmlname,
        favicon: 'images/favicon.ico',
        minify: {
            minimize: true,
            removeComments: true,
            collapseWhitespace: true
        },
        inject: "head",
        hash: true,
        chunks: ["vendor","common",entryname],
        chunksSortMode: function (a, b) { 
            var orders = ["vendor","common",entryname];
            return orders.indexOf(a.names[0])-orders.indexOf(b.names[0]);
        }
    });
}

module.exports = {
    read,
    htmlplugin
}
