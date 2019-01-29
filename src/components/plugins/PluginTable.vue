<template>
    <div>
        <div id="table">
            <Table border :columns="columns" :data="plugins">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">View</Button>
                    <Button type="error" size="small" @click="deleteDialog(row.id)">Delete</Button>
                </template>
            </Table>
        </div>
    </div>

</template>

<script>
    export default {
        name: "PluginTable",
        props:['plugins'],
        data() {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width:200
                    },
                    {
                        title: 'name',
                        key: 'name',
                        width:100
                    },
                    {
                        title: 'service',
                        key: 'service',
                        width:160,
                        render:function (h, params) {
                            console.log("render");
                            return h('router-link',{props: {to:'/services/'+params.row.service.id}},params.row.service.id);
                        }
                    },
                    {
                        title: 'run_on',
                        key: 'run_on',
                        width:80
                    },
                    {
                        title: 'consumer',
                        width:140,
                        render:function (h, params) {
                            if(params.row.consumer){
                                return h('router-link',{props: {to:'/consumers/edit/'+params.row.consumer.id}},params.row.consumer.id);
                            }
                            return h();
                        }

                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width:100
                    },
                    {
                        title: 'route',
                        key: 'route',
                        width:80
                    },
                    {
                        title: 'enabled',
                        key: 'enabled',
                        width:90
                    },
                    {
                        title: 'config',
                        key: 'config',
                        width:500,
                        render:function (h, params) {
                            if(params.row.config){
                                return h('pre',JSON.stringify(params.row.config,undefined,2));
                            }
                            return h();
                        }
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        fixed: 'right',
                        width: 150,
                        align: 'center'
                    }
                ],
            }
        },
        methods:{
            edit(pluginId){
                this.$router.push({path: `/plugins/edit/${pluginId}`});
            }
        }
    }
</script>

<style scoped>

</style>
