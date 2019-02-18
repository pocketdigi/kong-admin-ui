export default {
    app:{
      name:'Kong Admin UI'
    },
    config:{
        button:{
            enter:'Enter',
            clear:'Clear address',
            notice1:'This app will not connect other servers except your kong admin api.Your kong admin api address is save in browser\'s localstorage, so it\'s safety to manage your kong.',
            notice2:'All requests to Kong admin api is send by your browser,so make sure your device can access Kong admin api without any security auth.',
        },
        error:{
            urlEmpty:'Please enter your Kong admin api url',
            urlError:'url error,must start with http:// or https://',
            urlEndWithSlash:'url error,cant\'t end with /',
            apiError:'Can\'t get your Kong\'s version,please check the address you input',
            connectFail:'Failed to connect with your kong admin api,please check the address you input,or your computer has no permission to visit the admin api',
            urlInvalid:'Kong admin api url error',
            versionNotSupport:'Version {version} is not support,We only support 0.14.0 and higher',
        }
    },
}
