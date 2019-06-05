# 简介

项目上传到CDN，暂时只支持七牛云

#### 安装

```
npm install -g bv-cdn-cli
```

#### 初始化
生成配置文件

```
bv-cdn init
```

在当前目录生成cdn.config.js
```
/**
 * qiniu 配置文件
 * @param {String} cdn cdn类型
 * @param {String} bucket cdn服务配置（在cdn上可以查到）
 * @param {String} accessKey cdn服务配置（在cdn上可以查到）
 * @param {String} secretKey cdn服务配置（在cdn上可以查到）
 * @param {Object} glob 上传文件配置
 * @param {String} glob.pattern 匹配要上传的文件
 * @param {Array||String} glob.ignore 匹配要排除的文件
 */

module.exports = {
  cdn: 'qiniu',
  bucket: '',
  accessKey: '',
  secretKey: '',
  glob: {
    pattern: '',
    ignore: [],
  }
}
```

#### 上传文件
配置好配置文件后，执行：

```
bv-cdn upload
```

执行其它配置文件

```
bv-cdn upload ./cdn.dev.config.js
```

#### 其它

```
bv-cdn help
```