<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
        </Breadcrumb>
        <h1>Kong Info</h1>
        <Row>
            <Col span="6">hostname: {{basicInfo.hostname}}</Col>
            <Col span="6">version: {{basicInfo.version}}</Col>
            <Col span="6">node_id: {{basicInfo.node_id}}</Col>
            <Col span="6">tagline: {{basicInfo.tagline}}</Col>
        </Row>
        <h3>Configuration:</h3>
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

    </div>
</template>

<script>
    import EventBus from '@/event-bus'


    export default {
        data () {
            return {
               basicInfo:{
                   configuration:{
                   }
               }
            }
        },
        mounted() {
            EventBus.$emit('changePage',{activeName:'index',openNames:[]});
            this.loadBasicInfo();
        },
        methods: {
            loadBasicInfo(){
                let _this=this;
                this._get('/',response =>{
                    _this.basicInfo=response.data;
                });
            }
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
