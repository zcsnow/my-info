//github:https://github.com/wkhtmltopdf/wkhtmltopdf
//官方文档：https://wkhtmltopdf.org
//npm:https://www.npmjs.com/package/wkhtmltopdf
//下载地址：http://wkhtmltopdf.org/downloads.html 

var arg = process.argv.splice(2);
var htmlUrl = arg[0]; //html地址
var pdfName = arg[1]; //pdf名字
var html = "";
var wkhtmltopdf = require('wkhtmltopdf');
var fs = require('fs');
if(htmlUrl.indexOf("http")>=0){
    html = htmlUrl;
}else{
    html = fs.readFileSync(htmlUrl,'utf8');
}

// URL 使用URL生成对应的PDF
wkhtmltopdf(html, { 
    //pageSize: 'A4' ,
    pageWidth: '700px',
    pageHeight: '1000px',
    javascriptDelay:5000,
    })
  .pipe(fs.createWriteStream(pdfName+'.pdf'));

  