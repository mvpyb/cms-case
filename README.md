## 功能

```
 vue通用项目模板，基于vue + element

```

## 目录结构

```
    ├── build                      // 构建相关  
    ├── config                     // 配置相关
    ├── src                        // 源代码
    │   ├── api                    // 所有请求
    │   ├── assets                 // 主题 字体等静态资源
    │   ├── components             // 全局公用组件
    │   ├── directive              // 全局指令
    │   ├── filtres                // 全局 filter
    │   ├── icons                  // 项目所有 svg icons
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store管理
    │   ├── styles                 // 全局样式
    │   ├── utils                  // 全局公用方法
    │   ├── vendor                 // 公用vendor
    │   ├── views                  // view
    │   │      ├── login           // 登录
    │   ├── App.vue                // 入口页面
    │   ├── global.js              // 一些全局变量
    │   ├── main.js                // 入口 加载组件 初始化等
    │   └── permission.js          // 权限管理
    ├── static                     // 第三方不打包资源
    │   └── fabric                 // canvas插件
    ├── eslintrc.js                // eslint 配置项
    ├── .gitignore                 // git 忽略项
    ├── .postcssrc.js              // 自动添加css前缀
    ├── jest.config.js             // 单元测试的一些配置
    ├── favicon.ico                // favicon图标
    ├── index.html                 // html模板
    └── package.json               // package.json
```



## 开发
```bash
# 克隆项目
git@gitlab.tech.shadowcreator.com:vue.js/template.git

# 进入项目目录
cd webailabel

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 修改本地开发地址
根目录下：文件(.env.development) 修改变量 VUE_APP_RTC_URL

# 启动服务
npm run dev
```


## 发布

```bash
# 构建生产环境
npm run build:pro
```

## 其它

```bash

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint-fix
```


