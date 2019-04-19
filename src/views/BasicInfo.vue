<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">{{$t('breadcrumb.home')}}</BreadcrumbItem>
        </Breadcrumb>
        <h1>{{$t('breadcrumb.info')}}</h1>
        <Row>
            <Col span="6">hostname: {{basicInfo.hostname}}</Col>
            <Col span="6">version: {{basicInfo.version}}</Col>
            <Col span="6">node_id {{basicInfo.node_id}}</Col>
            <Col span="6">tagline: {{basicInfo.tagline}}</Col>
        </Row>
        <h3>{{$t('basicInfo.configuration')}}:</h3>
        <Row>
            <Col span="8">prefix: {{ basicInfo.configuration.prefix }}</Col>
            <Col span="8">proxy_listen: {{basicInfo.configuration.proxy_listen}}</Col>
            <Col span="8">db_update_frequency: {{basicInfo.configuration.db_update_frequency}}</Col>
        </Row>
        <Row>
            <Col span="8">admin_listen: {{basicInfo.configuration.admin_listen}}</Col>
            <Col span="8">nginx_conf: {{basicInfo.configuration.nginx_conf}}</Col>
            <Col span="8">nginx_pid: {{basicInfo.configuration.nginx_pid}}</Col>
        </Row>
        <h3>{{$t('basicInfo.status')}}:</h3>
        <Row>
            <Col span="8">server.connections_writing: {{ status.server.connections_writing }}</Col>
            <Col span="8">server.total_requests: {{ status.server.total_requests }}</Col>
            <Col span="8">server.connections_handled: {{ status.server.connections_handled }}</Col>
        </Row>
        <Row>
            <Col span="8">server.connections_accepted: {{ status.server.connections_accepted }}</Col>
            <Col span="8">server.connections_reading: {{ status.server.connections_reading }}</Col>
            <Col span="8">server.connections_active: {{ status.server.connections_active }}</Col>
        </Row>
        <Row>
            <Col span="8">server.connections_waiting: {{ status.server.connections_waiting }}</Col>
        </Row>
    </div>
</template>

<script>
    import EventBus from '@/event-bus'

    export default {
        data() {
            return {
                basicInfo: {
                    configuration: {}
                },
                status: {
                    server:{}
                },
                timer:''
            }
        },
        mounted() {
            EventBus.$emit('changePage', {activeName: 'index', openNames: []});
            this.loadBasicInfo();
            this.loadStatus();
            this.timer = setInterval(this.loadStatus, 3000);
        },
        methods: {
            loadBasicInfo() {
                let _this = this;
                this._get('/', response => {
                    _this.basicInfo = response.data;
                });
            },
            loadStatus() {
                let _this = this;
                this._get('/status', response => {
                    _this.status = response.data;
                });
            }
        },
        destroyed() {
            clearInterval(this.timer);
        }
    }
</script>

<style scoped>
    #login {
        margin-top: 200px;
    }

    input {
        margin-left: 20px;
    }

    Col {
        padding: 50px;
    }
</style>
