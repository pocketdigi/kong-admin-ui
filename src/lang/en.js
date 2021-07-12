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
            custom_header:'Custom headers(json)'
        },
        error:{
            urlEmpty:'Please enter your Kong admin api url',
            urlError:'url error,must start with http:// or https://',
            urlEndWithSlash:'url error,cant\'t end with /',
            apiError:'Can\'t get your Kong\'s version,please check the address you input',
            connectFail:'Failed to connect with your kong admin api,please check the address you input,or your computer has no permission to visit the admin api',
            urlInvalid:'Kong admin api url error',
            versionNotSupport:'Version {version} is not support,We only support 0.14.0 and higher',
            header_format:'Header format error,must be json',
            connect_fail:'Failed to connect with your kong admin api,please check the address you input,or your computer has no permission to visit the admin api'
        }
    },
    common: {
        view: 'View',
        delete: 'Delete',
        deleteMessage: '<p>Are you sure you would like to delete<</p><p style="font-weight: bold">{id}?</p>',
        deleted:'{type} deleted',
        edit:'Edit',
        add:'Add',
        save:'Save',
        addTarget:'Add Target',
        action:'Action',
        split_by_comma:'Split by comma'

    },
    breadcrumb:{
        home:'Home',
        info:'Kong info',
        service_list:'Service List',
        service_detail: 'Service Detail',
        route_list:'Route List',
        upstream_list:'Upstream List',
        consumer_list:'Consumer List',
        plugin_list:'Plugin List',
        addPlugin:'Add Plugin',
        addService: 'Add Service',
        addRoute: 'Add Route',
        certificate_list: 'Certificate List',
        add_certificate: 'Add Certificate',
    },
    basicInfo:{
        configuration:'Configuration',
        status:'Status'
    },
    service: {

        serviceInfo:'Service Info',
        routeInfo:'Route Info',
        service_upstream:'Service\'s Upstream',
        upstreamNotExisted:'Upstream `{host}` is not existed,if it\'s not a external host,You must add a Upstream named `{host}`',
        fieldServiceName:'The Service name',
        fieldRetries:'The number of retries to execute upon failure to proxy.',
        fieldProtocol:'The protocol used to communicate with the upstream.',
        fieldHost:'The host of the upstream server.',
        fieldPort:'The upstream server port.',
        fieldPath:'The path to be used in requests to the upstream server.',
        fieldConnectTimeout:'The timeout in milliseconds for establishing a connection to the upstream server. ',
        fieldWriteTimeout:'The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server.',
        fieldReadTimeout:'The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. ',
        fieldUrl:'Shorthand attribute to set protocol, host, port and path at once. This attribute is write-only (the Admin API never “returns” the url). ',
    },
    target:{
        addTarget:'Add Target',
        targetHint:'enter target,default port is 8000',
        targetNotice:'Please fill target',
        weightNotice:'Please fill weight',
        deleteTarget:'Delete Target'
    },
    plugin:{
    },
    upstream:{
        health:'health',
        healthCheck:'Health check',
        unhealthy:'unhealthy',
        healthy:'healthy',
        healthCheckOff:'Health check off'
    },
    route: {
        fieldName: 'The name of the Route.',
        fieldProtocols: 'A list of the protocols this Route should allow. When set to ["https"], HTTP requests are answered with a request to upgrade to HTTPS.',
        fieldMethods: 'A list of HTTP methods that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.',
        fieldHosts: 'A list of domain names that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.',
        fieldPaths: 'A list of paths that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.',
        fieldHeaders: 'One or more lists of values indexed by header name that will cause this Route to match if present in the request. The Host header cannot be used with this attribute: hosts should be specified using the hosts attribute.',
        fieldRegexPriority: 'A number used to choose which route resolves a given request when several routes match it using regexes simultaneously. When two routes match the path and have the same regex_priority, the older one (lowest created_at) is used. Note that the priority for non-regex routes is different (longer non-regex routes are matched before shorter ones).',
        fieldHttpsRedirectStatusCode: 'The status code Kong responds with when all properties of a Route match except the protocol i.e. if the protocol of the request is HTTP instead of HTTPS. Location header is injected by Kong if the field is set to 301, 302, 307 or 308. Defaults to 426.',
        fieldStripPath: 'When matching a Route via one of the paths, strip the matching prefix from the upstream request URL.',
        fieldPreserveHost: 'When matching a Route via one of the hosts domain names, use the request Host header in the upstream request headers. If set to false, the upstream Host header will be that of the Service’s host.',
        fieldSnis: 'A list of SNIs that match this Route when using stream routing. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
        fieldSources: 'A list of IP sources of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
        fieldDestinations: 'A list of IP destinations of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set.',
    },
    certificate: {
        cert: 'PEM-encoded public certificate of the SSL key pair.',
        key:'PEM-encoded private key of the SSL key pair.',
        tags:'An optional set of strings associated with the Certificate, for grouping and filtering.',
        snis:'An array of zero or more hostnames to associate with this certificate as SNIs. This is a sugar parameter that will, under the hood, create an SNI object and associate it with this certificate for your convenience.'
    }
}
