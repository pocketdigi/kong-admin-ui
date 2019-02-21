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
        }
    },
    common: {
        view: '查看',
        delete: '删除',
        deleteMessage: '<p>是否删除</p><p style="font-weight: bold">{id}?</p>',
        deleted:'{type} 已删除',
        edit:'编辑',
        add:'添加',
        addTarget:'添加Target',
        action:'操作'
    },
    breadcrumb: {
        home: '首页',
        info: '基本信息',
        service_list: 'Service列表',
        service_detail: 'Service详情',
        route_list: 'Route列表',
        upstream_list: 'Route列表',
        consumer_list: 'Consumer列表',
        plugin_list: 'Plugin列表',
        addPlugin:'添加 Plugin',
        addService: '添加Service',

    },
    basicInfo: {
        configuration: '配置',
        status: '状态'
    },
    service: {

        serviceInfo:'Service信息',
        routeInfo:'Route信息',
        service_upstream:'Service的Upstream',
        upstreamNotExisted:'名为`{host}`的upstream不存在，如果不是外部host,您需要添加一个叫{host}的Upstream'
    },
    target:{
        addTarget:'添加Target',
        targetHint:'输入target,默认端口是8000',
        targetNotice:'请输入target',
        weightNotice:'请输入weight',
        deleteTarget:'删除Target'
    },
    plugin:{
    }
}
