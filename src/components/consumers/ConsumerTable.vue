<template>
    <div>
        <div id="table">
            <Table border :columns="columns" :data="consumers">
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
    import EventBus from '@/event-bus'

    export default {
        name: 'RouteTable',
        props:['consumers'],
        data () {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'username',
                        key: 'username',
                        width:300
                    },
                    {
                        title: 'custom_id',
                        key: 'custom_id',
                        width:300
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
            edit (consumerId) {
                this.$router.push('/consumers/edit/'+consumerId);
            },
            deleteDialog(consumerId) {
                let _this=this;

                this.$Modal.confirm({
                    title: 'Delete Consumer',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + consumerId + '</p>',
                    onOk: () => {
                        _this._delete('/consumers/' + consumerId,() =>{
                            this.$Message.info('Consumer deleted!');
                            EventBus.$emit('consumerChange', {consumerId: consumerId});
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
