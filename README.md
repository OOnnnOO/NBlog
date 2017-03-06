# NBlog

在 [N-blog](https://github.com/nswbmw/N-blog) 项目时，边看边写的一些代码，打算把这个项目的编写的代码用到自己的Blog中，对项目的代码进行调整修改。

## 部署

### 数据库 
安装mongodb数据库

（略）暂时先使用 [MLab](https://mlab.com) 云数据库吧

### 搭建环境
安装node
参看： <https://nodejs.org/en/download/>

安装pm2 

```npm
npm install -g pm2
```

### 配置
拷贝 `config/default.js` 至 `config/production.js`，调整其中的变量信息

### 启动

```npm
npm start
```
