export default {
    app: {
        name: 'Kong管理控制台'
    },
    config:{
        button:{
            enter:'进入',
            clear:'清除地址',
            notice1:'我们不会连接除了您的Kong服务器以外的其他服务器，您的配置保存在浏览器的localStorage里.',
            notice2:'所有发送给Kong管理接口的请求都是通过你的浏览器发出的，所以确保当前网络可以无需任何验证直接访问Kong管理接口',
        },
        error:{
            urlEmpty:'请输入Kong管理接口地址',
            urlError:'URL错误，必须是http:// 或 https://开头',
            urlEndWithSlash:'URL错误,不能以/结尾 ',
            apiError:'无法获取Kong的版本号，请检查您输入的接口地址',
            connectFail:'连接管理接口失败，请检测您输入的地址，或者您的网络没有权限访问管理接口',
            urlInvalid:'Kong管理接口地址错误',
            versionNotSupport:'不支持 {version} 版本,我们只支持 0.14.0或更高版本',
        }
    },
}
