<template>
    <div>
        <div id="table">
            <Table border :columns="columns" :data="plugins">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">{{$t('common.view')}}</Button>
                    <Button type="error" size="small" @click="deleteDialog(row.id)">{{$t('common.delete')}}</Button>
                </template>
            </Table>
        </div>
    </div>

</template>

<script>
    import EventBus from '@/event-bus'

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
                            if(params.row.service){
                                return h('router-link',{props: {to:'/services/'+params.row.service.id}},params.row.service.id);
                            }

                        }
                    },
                    {
                        title: 'run_on',
                        key: 'run_on',
                        width:80
                    },
                    {
                        title: 'consumer',
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
                        width:150
                    },
                    {
                        title: 'route',
                        key: 'route',
                        width:140
                    },
                    {
                        title: 'enabled',
                        key: 'enabled',
                        width:90,
                        render:function (h, params) {
                            return h('i-switch',{props:{value:params.row.enabled,disabled:true}})
                        }
                    },
                    {
                        title: this.$t('common.action'),
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
            },
            deleteDialog(pluginId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Plugin',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + pluginId + '</p>',
                    onOk: () => {
                        _this._delete('/plugins/' + pluginId,()=> {
                            _this.$Message.info('Plugin deleted!');
                            EventBus.$emit('pluginChange', {pluginId: pluginId});
                        });
                    },
                    onCancel: () => {


                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>
