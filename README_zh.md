# Kong admin UI

Kong 网关的管理界面

纯前端应用，所有请求从浏览器发出，不经过任何中间服务器，直接到达您的Kong admin api,安全、放心。如果您的kong admin api可以互联网访问,可直接使用部署在公网的demo，否则请本地化部署。


[https demo](https://pocketdigi.github.io/kong-admin-ui) ,部署在github上，https协议，所以您的kong admin api也必须是https协议，否则会被浏览器拦截。


[http demo](http://kong-admin.pocketdigi.com) http协议，部署在国内腾讯云，国内访问速度更快


### 特性
* 基本信息 (配置和状态)
* Service 管理
* Route 管理
* Upstream 管理
* Consumer 管理
* Plugin 管理
* 授权管理(支持 Basic Authentication, HMAC Authentication, JWT, Key Authentication, OAuth 2.0 Authentication)
* SSL证书 管理

**只支持 0.14.x 及以上版本的kong**

从0.3版本开始，支持自定义header,所以，您可以使用kong转发kong admin api接口，再加上Basic Authentication插件和Cors插件，在公网上管理kong更安全

### 截图


![basic info](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/basic_info.png)

![config](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/config.png)

![route list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/route_list.png)

![service list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/service_list.png)

![service detail](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/service_detail.png)

![upstream list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/upstream_list.png)

![consumer list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/consumer_list.png)

![consumer detail](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/consumer_detail.png)

![plugin list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/plugin_list.png)

![certification](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/certificate_add.png)
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```


