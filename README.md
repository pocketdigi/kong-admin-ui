# Kong admin UI

[中文](README_zh.md)

A Web UI for the Kong(The Cloud-Native API Gateway & Service Mesh) admin api.

It's a font-end application,no need any back-end server.All requests to Kong admin api is send by user's browser.

If you can visit our [demo](https://pocketdigi.github.io/kong-admin-ui) ,and your current device can visit kong admin api directly,you can use our demo to manage your Kong,it's safe. 

[demo on github page](https://pocketdigi.github.io/kong-admin-ui) `https` protocol,so your kong admin api must `https` too.

[demo on pocketdigi.com](http://kong-admin.pocketdigi.com) `http` protocol,the server is in China.



### Features
* Basic Info (configurations and status)
* Service management
* Route management
* Upstream management(include target)
* Consumer management
* Plugin management
* Authentication management(Support Basic Authentication, HMAC Authentication, JWT, Key Authentication, OAuth 2.0 Authentication)
* Certificate management

**Only support kong 0.14.x and above.**

From version 0.3, we support custom headers,so you can use Basic Authentication plugin and Cors plugin on your Kong Admin Service,and add credential on header. 

[kong admin ui Custom Headers使用说明 给你的kong加个密码](https://www.pocketdigi.com/20190613/1644.html)

### How to use
1. If your computer can visit kong admin api and intenet, you can use the demo we deployed.
2. Clone the source code,compile,deploy with nginx
3. Download the zip we packed，deploy with nginx
4. Deploy with docker 

    ``` docker run -d --name kong-admin-ui -p 8899:80 pocketdigi/kong-admin-ui:0.5.2 ```

### Screenshots


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


