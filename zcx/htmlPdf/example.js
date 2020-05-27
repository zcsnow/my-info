// 参考文档
// 官网: http://amirraminfar.com/phantomjs-node/
// GITHUB: https://github.com/amir20/phantomjs-node
// npmjs: https://www.npmjs.com/package/phantom
// https://phantomjs.org/
// https://phantomjs.org/api/webpage/property/paper-size.html

var arg = process.argv.splice(2);
//"http://jshj007.com/test/index.html"
var htmlUrl = arg[0]; //html地址
var pdfName = arg[1]; //pdf名字

var phantom = require('phantom');




phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open(htmlUrl).then(function(status) {
            page.property('viewportSize',{width: 800, height: 1120});
            page.property('paperSize',{ 
                width: '280mm',
                height: '400mm',
                // format: 'A3', 
                orientation: 'portrait',
                margin: '0'
                
            });
            // page.property('settings',{ 
            //     userAgent: 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
            // });
            page.property('zoomFactor',1);
            //page.includeJs("http://jshj007.com/js/chunk-common.69d70d84.js", function() {
                

                if(status==='success'){
                    setTimeout(function() {
                        var result = page.evaluate(function(){
                            return document.getElementById("J_RateCounter").innerText;
                        });
                        page.render(pdfName+'.pdf').then(function(){
                            console.log('Page rendered');
                            //ph.exit();
                        });
                    }, 15000);
                }else{
                    console.log('Unable to load the address!');
                    phantom.exit();
                }
            
            //});
            //page.render(pdfName+'.jpeg', {format: 'jpeg', quality: '100'});
            
        });
    });
});



//es6写法
// const phantom = require('phantom');

// (async function() {
//     const instance = await phantom.create();
//     const page = await instance.createPage();

    
//     const status = await page.open('http://jshj007.com/test/index.html');
//     await page.property('viewportSize', {width: 800, height: 200});
//     //await page.property('content');
//     await page.render('CC.pdf');
//     console.log(`Page rendered`);

//     await instance.exit();
// }());