import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login'),
        },
        {
            path: '/config',
            name: 'config',
            component: () => import('./views/Config.vue'),
        },
        {
            path: '/',
            component: () => import('./views/Index'),
            children: [

                {
                    path:'services',
                    component: () => import('./views/services/ServiceList.vue'),
                },
                {
                    path:'services/add',
                    component: () => import('./views/services/AddService'),
                },
                {
                    path:'services/edit/:id',
                    component: () => import('./views/services/AddService'),

                },
                {
                    path:'services/:id',
                    component: () => import('./views/services/ServiceDetail'),

                },
                {
                    path:'routes',
                    component: () => import('./views/routes/RouteList'),

                },
                {
                    path:'routes/add',
                    component: () => import('./views/routes/AddRoute'),

                },
                {
                    path:'routes/edit/:id',
                    component: () => import('./views/routes/AddRoute'),

                },
                {
                    path:'routes/add/:serviceId',
                    component: () => import('./views/routes/AddRoute'),

                },
                {
                    path:'upstreams',
                    component: () => import('./views/upstreams/UpstreamList'),

                },
                {
                    path:'upstreams/add',
                    component: () => import('./views/upstreams/AddUpstream'),

                },
                {
                    path:'upstreams/edit/:id',
                    component: () => import('./views/upstreams/AddUpstream'),

                },
                {
                    path:'upstreams/add/:name',
                    component: () => import('./views/upstreams/AddUpstream'),

                },
                {
                    path:'consumers',
                    component: () => import('./views/consumers/ConsumerList'),
                },
                {
                    path:'consumers/add',
                    component: () => import('./views/consumers/AddConsumer'),
                },
                {
                    path:'consumers/edit/:id',
                    component: () => import('./views/consumers/AddConsumer'),
                },
                {
                    path:'plugins',
                    component: () => import('./views/plugins/PluginList'),

                },
                {
                    path:'plugins/add',
                    component: () => import('./views/plugins/AddPlugin'),
                },
                {
                    path:'plugins/add/service/:serviceId',
                    component: () => import('./views/plugins/AddPlugin'),
                },
                {
                    path:'plugins/add/consumer/:consumerId',
                    component: () => import('./views/plugins/AddPlugin'),
                },
                {
                    path:'plugins/edit/:pluginId',
                    component: () => import('./views/plugins/AddPlugin'),
                },
                {
                    path:'certificates',
                    component: () => import('./views/certificates/CertificateList'),

                },
                {
                    path:'certificates/add',
                    component: () => import('./views/certificates/AddCertificate'),
                },
                {
                    path:'certificates/edit/:certificateId',
                    component: () => import('./views/certificates/AddCertificate'),
                },
                {
                    path:'',
                    component: () => import('./views/BasicInfo'),
                },

            ]
        }
    ]
})

