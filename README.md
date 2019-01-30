# Kong admin UI

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

**Only support kong 0.14.x and above.**

### Screenshots


![basic info](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/basic_info.png)

![config](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/config.png)

![route list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/route_list.png)

![service list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/service_list.png)

![service detail](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/service_detail.png)

![upstream list](https://github.com/pocketdigi/kong-admin-ui/raw/master/docs/images/upstream_list.png)




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


