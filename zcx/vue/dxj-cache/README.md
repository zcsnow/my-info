### 如何手机开发（二选一）
1. 自动刷新版
- 执行 `npm run server`
- 用手机打开 http://{ip}:8090/html/

1. 手动刷新版
- 执行 `npm run watch`
- 执行 `http-server ../../dxj-portal -p 1111`
- 手机访问 http://{ipv4}:1111/html/
* 需要全局安装http-server(cnpm install http-server -g).

### 如何使用
1. 初次使用，你需要执行：
`cnpm install`
1. 开发，执行(以下二选一)
 > 1. `npm run server`
 > 1. `npm start`
1. 上线执行
`npm run build`(目录为项目同级../www,不在放在项目里)

### other 	
if you use webpack locally, you have to make sure that the local version of webpack is 2.x. 
if not, please `(sudo) npm (install|update) -g webpack`. 	