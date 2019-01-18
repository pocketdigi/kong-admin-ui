import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import HelloWorld from './components/HelloWorld'
import Index from './views/Index'
import ServiceList from './views/services/ServiceList'
import ServiceDetail from './views/services/ServiceDetail'
import AddService from './views/services/AddService'
import Config from './views/Config'
import BasicInfo from './views/BasicInfo'
import RouteList from './views/routes/RouteList'
import AddRoute from './views/routes/AddRoute'
import UpstreamList from './views/upstreams/UpstreamList'
import AddUpstream from './views/upstreams/AddUpstream'
import ConsumerList from './views/consumers/ConsumerList'
import AddConsumer from './views/consumers/AddConsumer'
import AddPlugin from './views/plugins/AddPlugin'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/hello',
            name: 'hello',
            component: HelloWorld
        },
        {
            path: '/config',
            name: 'config',
            component: Config
        },
        {
            path: '/',
            component: Index,
            children: [

                {
                    path:'services',
                    component:ServiceList
                },
                {
                    path:'services/add',
                    component:AddService
                },
                {
                    path:'services/edit/:id',
                    component:AddService
                },
                {
                    path:'services/:id',
                    component:ServiceDetail
                },
                {
                    path:'routes',
                    component:RouteList
                },
                {
                    path:'routes/add',
                    component:AddRoute
                },
                {
                    path:'routes/edit/:id',
                    component:AddRoute
                },
                {
                    path:'routes/add/:serviceId',
                    component:AddRoute
                },
                {
                    path:'upstreams',
                    component:UpstreamList
                },
                {
                    path:'upstreams/add',
                    component:AddUpstream
                },
                {
                    path:'upstreams/edit/:id',
                    component:AddUpstream
                },
                {
                    path:'upstreams/add/:name',
                    component:AddUpstream
                },
                {
                    path:'consumers',
                    component:ConsumerList
                },
                {
                    path:'consumers/add',
                    component:AddConsumer
                },
                {
                    path:'consumers/edit/:id',
                    component:AddConsumer
                },
                {
                    path:'plugins/add/service/:serviceId',
                    component:AddPlugin
                },
                {
                    path:'',
                    component:BasicInfo
                },
            ]
        }
    ]
})

