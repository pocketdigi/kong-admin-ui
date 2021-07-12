export default {
    app: {
        name: 'Kong管理控制台'
    },
    config: {
        button: {
            enter: '进入',
            clear: '清除地址',
            notice1: '我们不会连接除了您的Kong服务器以外的其他服务器，您的配置保存在浏览器的localStorage里.',
            notice2: '所有发送给Kong管理接口的请求都是通过你的浏览器发出的，所以确保当前网络可以无需任何验证直接访问Kong管理接口。这个应用的目的是帮助您图形化操作kong,所以，所有Kong里的名词字段都不会翻译，请自行看文档理解。',
        },
        error: {
            urlEmpty: '请输入Kong管理接口地址',
            urlError: 'URL错误，必须是http:// 或 https://开头',
            urlEndWithSlash: 'URL错误,不能以/结尾 ',
            apiError: '无法获取Kong的版本号，请检查您输入的接口地址',
            connectFail: '连接管理接口失败，请检测您输入的地址，或者您的网络没有权限访问管理接口',
            urlInvalid: 'Kong管理接口地址错误',
            versionNotSupport: '不支持 {version} 版本,我们只支持 0.14.0或更高版本',
            header_format:'header 格式错误，必须是json',
            connect_fail:'连接到Kong admin 接口失败，请检查您的输入，确保当前设备有权限访问接口'

        }
    },
    common: {
        view: '查看',
        delete: '删除',
        deleteMessage: '<p>是否删除</p><p style="font-weight: bold">{id}?</p>',
        deleted:'{type} 已删除',
        edit:'编辑',
        add:'添加',
        save:'保存',
        addTarget:'添加Target',
        action:'操作',
        split_by_comma:'逗号隔开'
    },
    breadcrumb: {
        home: '首页',
        info: '基本信息',
        service_list: 'Service列表',
        service_detail: 'Service详情',
        route_list: 'Route列表',
        upstream_list: 'Upstream列表',
        consumer_list: 'Consumer列表',
        plugin_list: 'Plugin列表',
        addPlugin:'添加 Plugin',
        addService: '添加Service',
        addRoute: '添加Route',
        certificate_list: '证书列表',
        add_certificate: '添加证书',
    },
    basicInfo: {
        configuration: '配置',
        status: '状态'
    },
    service: {
        serviceInfo:'Service信息',
        routeInfo:'Route信息',
        service_upstream:'Service的Upstream',
        upstreamNotExisted:'名为`{host}`的上游服务器不存在，如果不是外部host,您需要添加一个叫{host}的上游服务器',
        fieldServiceName:'Service名称',
        fieldRetries:'失败时重试次数.',
        fieldProtocol:'与上游服务器通讯使用的协议',
        fieldHost:'上游服务器的主机名(外部填域名).',
        fieldPort:'上游服务器端口.',
        fieldPath:'请求上游服务器的路径.',
        fieldConnectTimeout:'连接上游服务器的超时时间，单位：毫秒',
        fieldWriteTimeout:'向上游服务器发送写操作的超时时间，单位：毫秒.',
        fieldReadTimeout:'从上游服务器读的超时时间，单位：毫秒',
        fieldUrl:'一次同时设置protocol, host, port 和 path. 该属性只读',


    },
    target:{
        addTarget:'添加Target',
        targetHint:'输入target,默认端口是8000',
        targetNotice:'请输入target',
        weightNotice:'请输入weight',
        deleteTarget:'删除Target'
    },
    plugin:{
    },
    upstream:{
        health:'健康',
        healthCheck:'健康检测',
        unhealthy:'不健康',
        healthy:'健康',
        healthCheckOff:'健康检测未开启'
    },
    route: {
        fieldName: 'Route名称',
        fieldProtocols: '该Route允许的协议.',
        fieldMethods: '该Route允许的HTTP 方法列表.使用http或https 协议时, hosts, paths, 或者 methods至少设置一个',
        fieldHosts: '该Route允许的域名列表。使用http或https 协议时, hosts, paths, 或者 methods至少设置一个',
        fieldPaths: '该Route允许的路径列表。 使用http或https 协议时, hosts, paths, 或者 methods至少设置一个.',
        fieldHeaders: '该Route允许的请求头。Host 请求头不能通过此属性设置，请使用hosts属性',
        fieldRegexPriority: '权重。当多个Route同时使用正则表达式匹配时，用于选择哪个Route解析给定请求。当两条路path配路径并具有相同的regex_priority时，将使用最早创建的path。请注意，非正则表达式路由的优先级不同（较长的非正则表达式Route在较短的Route之前匹配）',
        fieldHttpsRedirectStatusCode: '重定向到https的状态码。当除了协议以外的属性全都匹配时(用http而不是https协议发起请求)，如果该字段值是301、302、307或308，则Kong会添加Location Header,执行重定向到https。默认为426。注: 要使重定向生效，需要关闭http协议访问。',
        fieldStripPath: '当通过path匹配Route，向上游服务器请求时，删除匹配前缀(不带path).',
        fieldPreserveHost: '当通过域名配置，向上游服务请求时，header是否使用该域名，若选否，使用Service的host',
        fieldSnis: 'A list of SNIs that match this Route when using stream routing. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
        fieldSources: 'A list of IP sources of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
        fieldDestinations: 'A list of IP destinations of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
    },
    certificate: {
        cert: 'PEM编码的SSL证书公钥.一般以.crt为后缀，复制里面的内容。',
        key:'PEM编码的SSL证书私钥.一般以.key为后缀，复制里面的内容。',
        tags:'用于分组和过滤，多个逗号隔开',
        snis:'证书的域名，多个逗号隔开'
    }
}
