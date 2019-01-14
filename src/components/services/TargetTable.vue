<template>
    <div>
        <div id="table">
            <Table border :columns="columns" :data="targets">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="error" size="small" @click="deleteDialog(row.id)">Delete</Button>
                </template>
            </Table>
        </div>

        <Modal
                title="Add Target"
                v-model="addTargetModal"
                @on-ok="addTarget(upstreamId)"
                @on-cancel="cancelAddModalDialog()"
                class-name="vertical-center-modal">
            <Form :model="target" :label-width="120" :rules="ruleAddTarget">
                <FormItem label="Upstream Id:">
                    <Input v-bind:value="upstreamId" disabled></Input>
                </FormItem>
                <FormItem label="target:" prop="target">
                    <Input v-model="target.target" placeholder="enter target,default port is 8000"></Input>
                </FormItem>
                <FormItem label="weight:">
                    <InputNumber :min="1" v-model="target.weight"></InputNumber>
                </FormItem>
            </Form>
        </Modal>
    </div>


    <!--<div>Total {{ data6.length }}</div>-->
</template>
<script>
    import moment from 'moment'

    export default {
        name: 'RouteTable',
        props: ['upstreamId'],

        data() {
            return {
                loading: true,
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'target',
                        key: 'target',
                        width: 100
                    },
                    {
                        title: 'weight',
                        key: 'weight',
                        width: 100
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width: 100
                    },
                    {
                        title: 'health',
                        key: 'health',
                        width: 200,
                        render:function (h, params) {
                            if(params.row.health==='HEALTHY'){
                                return h('div',[
                                    h('Icon',{
                                        props: {
                                            type: 'ios-checkmark-circle',
                                            size:16,
                                            color:'green'
                                        }
                                    }),h('span',params.row.health)
                                ]);
                                // return h('router-link',{props: {to:'/services/'+params.row.service.id}},params.row.service.id);
                            }else if (params.row.health === 'HEALTHCHECKS_OFF') {
                                return h('div',[
                                    h('Icon',{
                                        props: {
                                            type: 'ios-warning',
                                            size:16,
                                            color:'#db5f0c'
                                        }
                                    }),h('span',params.row.health)
                                ]);
                            }else{
                                return h('div',[
                                    h('Icon',{
                                        props: {
                                            type: 'ios-bug',
                                            size:16,
                                            color:'red'
                                        }
                                    }),h('span',params.row.health)
                                ]);
                            }

                        }
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                targets: [],
                addTargetModal: false,
                target: {
                    target: '',
                    weight: 2
                },
                ruleAddTarget: {
                    target: [
                        {required: true, message: 'Please fill target', trigger: 'blur'}
                    ],
                    weight: [
                        {required: true, message: 'Please fill weight', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            loadTargets() {
                let _this=this;
                this._get('/upstreams/' + this.upstreamId + '/health',function (response) {
                    _this.targets = response.data.data;
                    _this.targets.map(function (route) {
                        let createDate = moment.unix(route.created_at)
                        route.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                });

            },
            showAddTargetModal() {
                this.addTargetModal = true
            },
            addTarget() {
                let _this = this;
                this._post('/upstreams/' + this.upstreamId + '/targets',this.target,()=> {
                    _this.target.target='';
                    _this.target.weight=2;
                    _this.loadTargets();
                });

            },
            deleteDialog(targetId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Target',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + targetId + '</p>',
                    onOk: () => {
                        _this._delete('/upstreams/' + this.upstreamId + '/targets/' + targetId,()=> {
                            _this.$Message.info('Target deleted!');
                            _this.loadTargets();
                        });
                    },
                    onCancel: () => {


                    }
                });
            },
            cancelAddModalDialog(){
                this.target.target='';
                this.target.weight=2;

            }

        }

    }
</script>

<style scoped>
    .ivu-icon {
        font-size: 2rem;
    }
</style>
