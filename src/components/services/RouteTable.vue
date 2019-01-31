<template>
    <div>
        <div id="table">
            <Table border :columns="columns" :data="routes">
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


    <!--<div>Total {{ data6.length }}</div>-->
</template>
<script>
    import EventBus from '@/event-bus'

    export default {
        name: 'RouteTable',
        props:['routes'],
        data () {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'name',
                        key: 'name',
                        width:100
                    },
                    {
                        title: 'service',
                        key: 'service',
                        width:180,
                        render:function (h, params) {
                            return h('router-link',{props: {to:'/services/'+params.row.service.id}},params.row.service.id);
                        }
                    },
                    {
                        title: 'hosts',
                        key: 'hosts',
                        width:160
                    },
                    {
                        title: 'paths',
                        key: 'paths',
                        width:140

                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width:100
                    },
                    {
                        title: 'protocols',
                        key: 'protocols',
                        width:140
                    },

                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
            }
        },
        methods: {
            edit (routeId) {
                this.$router.push('/routes/edit/'+routeId);
            },
            deleteDialog(routeId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Service',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + routeId + '</p>',
                    onOk: () => {
                        _this._delete('/routes/' + routeId,() =>{
                            this.$Message.info('Route deleted!');
                            EventBus.$emit('routeChange', {routeId: routeId});
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
