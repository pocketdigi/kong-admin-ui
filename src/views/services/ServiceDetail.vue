<template>
    <div id="content">
        <Breadcrumb>
            <BreadcrumbItem to="/">{{$t('breadcrumb.home')}}</BreadcrumbItem>
            <BreadcrumbItem to="/services">Service</BreadcrumbItem>
            <BreadcrumbItem>{{$t('breadcrumb.service_detail')}}</BreadcrumbItem>
        </Breadcrumb>

        <div id="service-info">

            <Row>
                <Col span="12"><h1>{{$t('service.serviceInfo')}}:</h1></Col>
                <Col span="12" style="text-align:right;position: absolute;top: 50%;right: 0px">
                    <Button type="primary" size="small" @click="editService">{{$t('common.edit')}}</Button>
                </Col>
            </Row>
            <Card>
                <Row>
                    <Col span="9"><span>id:</span> {{ service.id }}</Col>
                    <Col span="4"><span>name:</span> {{ service.name }}</Col>
                    <Col span="6"><span>create_at:</span> {{ service.createAtStr }}</Col>
                    <Col span="5"><span>updated_at:</span> {{ service.updatedAtStr }}</Col>
                </Row>
                <Row>
                    <Col span="6"><span>host:</span> {{ service.host }}</Col>
                    <Col span="6"><span>protocol:</span> {{ service.protocol }}</Col>
                    <Col span="6"><span>path:</span> {{ service.path }}</Col>
                    <Col span="6"><span>port:</span> {{ service.port }}</Col>
                </Row>
                <Row>
                    <Col span="6"><span>connect_timeout:</span> {{ service.connect_timeout }}</Col>
                    <Col span="6"><span>read_timeout:</span> {{ service.read_timeout }}</Col>
                    <Col span="6"><span>write_timeout:</span> {{ service.write_timeout }}</Col>
                    <Col span="6"><span>retries:</span> {{ service.retries }}</Col>
                </Row>
            </Card>
        </div>
        <Divider/>
        <div id="route-info">
            <Row>
                <Col span="12"><h1>{{$t('service.routeInfo')}}:</h1></Col>
                <Col span="12" style="text-align:right;position: absolute;top: 50%;right: 0px">
                    <Button type="primary" size="small" @click="addRoute">{{$t('common.add')}}</Button>
                </Col>
            </Row>
            <div>
                <RouteTable v-bind:routes="routes"></RouteTable>
            </div>
        </div>
        <Divider/>
        <div id="upstream-info">
            <Row>
                <Col span="12"><h1>{{$t('service.service_upstream')}}</h1></Col>
                <Col span="12" style="text-align:right;position: absolute;top: 50%;right: 0px">
                    <Button type="primary" size="small" @click="editUpstream()">{{$t('common.edit')}}</Button>
                </Col>
            </Row>
            <Card>
                <!--<div v-if="!upstreamExisted">Upstream `{{service.host}}` is not existed,if it's not a external host,You must <a @click="addUpstream(service.host)">add a Upstream named `{{service.host}}`</a></div>-->
                <div v-if="!upstreamExisted">{{$t('service.upstreamNotExisted',{host:service.host})}} <Button type="primary" size="small" @click="addUpstream(service.host)">{{$t('common.add')}}</Button></div>
                <div v-else>
                    <Row>
                        <Col span="9"><span>id:</span> {{ upstream.id }}</Col>
                        <Col span="4"><span>name:</span> {{ upstream.name }}</Col>
                        <Col span="6"><span>create_at:</span> {{ upstream.createAtStr }}</Col>
                        <Col span="5"><span>hash_on:</span> {{ upstream.hash_on }}</Col>
                    </Row>
                    <Row>
                        <Col span="8"><span>hash_on_cookie_path:</span> {{ upstream.hash_on_cookie_path }}</Col>
                        <Col span="8"><span>hash_fallback:</span> {{ upstream.hash_fallback }}</Col>
                        <Col span="8"><span>slots:</span> {{ upstream.slots }}</Col>
                    </Row>

                    <Collapse style="margin-top: 10px">
                        <Panel name="1">
                            Health checks
                            <p slot="content">
                            <pre>{{ upstream.healthchecks }}</pre>
                            </p>
                        </Panel>
                    </Collapse>

                    <Row>
                        <Col span="12"><h3>Targets:</h3></Col>
                        <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                            <Button type="primary" size="small" @click="addTarget">{{$t('common.addTarget')}}</Button>
                        </Col>
                    </Row>
                    <TargetTable style="margin-top: 10px" v-bind:upstreamId="upstream.id"
                                 ref="targetTable"></TargetTable>
                </div>
            </Card>

        </div>
        <Divider/>
        <div id="plugins">
            <Row>
                <Col span="12"><h1>Plugins:</h1></Col>
                <Col span="12" style="text-align:right;position: absolute;top: 50%;right: 0px">
                    <Button type="primary" size="small" @click="addPlugin()">Add plugin</Button>
                </Col>
            </Row>
            <PluginTable v-bind:plugins="plugins"></PluginTable>

        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    import RouteTable from '@/components/services/RouteTable'
    import EventBus from '@/event-bus'
    import TargetTable from '@/components/services/TargetTable'
    import PluginTable from '@/components/plugins/PluginTable'
    import hljs from 'highlight.js'
    import 'highlight.js/styles/atom-one-dark.css'


    const highlightCode = () => {
        const preEl = document.querySelectorAll('pre')

        preEl.forEach((el) => {
            hljs.highlightBlock(el)
        })
    };

    export default {
        name: "ServiceDetail",
        data() {
            return {
                service: {},
                routes: [],
                upstream: {},
                upstreamExisted:true,
                plugins:[]
            }
        },
        mounted() {

            EventBus.$emit('changePage', {activeName: 'service-list', openNames: ['service']});
            EventBus.$on('routeChange', ({routeId}) => {
                for (let route of this.routes) {
                    if (route.id === routeId) {
                        this.loadRoutes();
                        break;
                    }
                }
            });
            EventBus.$on('pluginChange',({pluginId}) => {
                for(let plugin of this.plugins) {
                    if(plugin.id===pluginId) {
                        this.loadPlugins();
                        break;
                    }
                }
            });

            this.loadServiceDetail();
        },
        components: {
            RouteTable,
            TargetTable,
            PluginTable
        },
        methods: {
            loadServiceDetail() {
                this._get('/services/' + this.$route.params.id, response => {
                    this.service = response.data;
                    let createDate = moment.unix(this.service.created_at);
                    this.service.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    let updatedDate = moment.unix(this.service.updated_at);
                    this.service.updatedAtStr = updatedDate.format('YYYY-MM-DD HH:mm:ss');
                    this.loadRoutes();
                    this.loadUpstream();
                    this.loadPlugins();

                });
            },
            loadRoutes() {
                this.routes = [];
                this._get('/services/' + this.$route.params.id + '/routes', response => {
                    this.routes = response.data.data
                    this.routes.map(function (route) {
                        let createDate = moment.unix(route.created_at)
                        route.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                        let updatedDate = moment.unix(route.updated_at)
                        route.updatedAtStr = updatedDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                });
            },
            loadUpstream() {
                this._get('/upstreams/' + this.service.host, response => {
                    this.upstream = response.data
                    let createDate = moment.unix(this.upstream.created_at)
                    this.upstream.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    let updatedDate = moment.unix(this.upstream.updated_at)
                    this.upstream.updatedAtStr = updatedDate.format('YYYY-MM-DD HH:mm:ss');

                    this.$nextTick(() => {
                        this.$refs.targetTable.loadTargets();
                        highlightCode();
                    })
                }, error => {
                    if(error.response.status===404) {
                        //upstream not existed
                        this.upstreamExisted=false;
                    }

                });

            },
            loadPlugins() {
                this._get('/services/' + this.$route.params.id+'/plugins', response => {
                    this.plugins = response.data.data;

                    this.plugins.map(function (plugin) {
                        let createDate = moment.unix(plugin.created_at);
                        plugin.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                    this.$nextTick(() => {
                        highlightCode();
                    })
                });

            },
            editService() {
                this.$router.push({path: `/services/edit/${this.service.id}`});
            },
            addRoute() {
                this.$router.push({path: `/routes/add/${this.service.id}`});
            },
            addTarget() {
                this.$refs.targetTable.showAddTargetModal();
            },
            addUpstream(name) {
                this.$router.push({path: `/upstreams/add/`+name});
            },
            editUpstream() {
                this.$router.push({path: `/upstreams/edit/${this.upstream.id}`});
            },
            addPlugin(){
                this.$router.push({path: `/plugins/add/service/${this.service.id}`});
            }

        },
        destroyed() {
            EventBus.$off('routeChange');
            EventBus.$off('pluginChange');
        }


    }
</script>

<style scoped>
    #content {
        font-size: 1rem;
    }

    #content span {
        font-weight: bold;
    }

    #content h1 {
        margin-top: 20px;
    }

    Row {
        color: aqua;
    }
</style>
