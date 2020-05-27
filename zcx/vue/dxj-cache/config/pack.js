const fs = require('fs');
const archiver = require('archiver');

var toDou = n=>n<10?'0'+n:''+n;

var date = new Date();
var version = {"version":"2.6.0","time":0};
try{
    version = JSON.parse(fs.readFileSync('config/version.json', 'utf-8'));
}catch(e){
    console.log('create version.json');
}

var name = date.getFullYear()+toDou(date.getMonth()+1)+toDou(date.getDate());
if (name != version.date) {
    version.time = 0;  
    version.date = name; 
}
name += ++version.time;
var output = fs.createWriteStream(`${name}.zip`);
var archive = archiver('zip',{
    zlib: { level: 9 },
    store: true
});

output.on('close',()=>{
    console.log('\u6253\u5305\u5B8C\u6210,\u603B\u5927\u5C0F\u4E3A:'+ archive.pointer() +' bytes');
});
archive.on('error',err=>{
    throw err;
});

archive.pipe(output);
archive.directory('www','/');
archive.append(name, { name: 'version.txt' });
archive.finalize();

fs.writeFile('config/version.json', JSON.stringify(version), 'utf-8',(e)=>{e&&console.log(e)});