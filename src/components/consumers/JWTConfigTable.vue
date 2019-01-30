<template>
    <div id="config">
        <Row style="margin-bottom: 10px">
            <Col span="12"><h1>JWT credentials</h1></Col>
            <Col span="12" style="text-align:right;position: absolute;top: 50%;right: 0px">
                <Button type="primary" size="small" @click="showModal=true">Create a Credential</Button>
            </Col>
        </Row>


        <Table border :columns="columns" :data="configList">
            <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
            </template>
            <template slot-scope="{ row }" slot="action">
                <Button type="error" size="small" @click="deleteDialog(row.id)">Delete</Button>
            </template>
        </Table>

        <Modal
                @on-ok="addCredential"
                title="Add JWT Credential"
                v-model="showModal">
            <Form :model="formItem" :label-width="120" style="margin-top: 20px">
                <FormItem label="key:">
                    <Input v-model="formItem.key"  placeholder="Enter key ..." class="text_input"></Input>
                </FormItem>
                <FormItem label="algorithm:">
                    <Select v-model="formItem.algorithm" style="width:200px">
                        <Option v-for="item in algorithms" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="rsa_public_key:">
                    <Input v-model="formItem.rsa_public_key" placeholder="Enter rsa_public_key ..." class="text_input"></Input>
                </FormItem>
                <FormItem label="secret:">
                    <Input v-model="formItem.secret" placeholder="Enter secret ..." class="text_input"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "JWTConfigTable",
        props: ['consumerId'],
        data() {
            return {
                configList: [],
                formItem:{
                    key:'',
                    algorithm:'',
                    rsa_public_key:'',
                    secret:''
                },
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'key',
                        key: 'key',
                        width: 160
                    },
                    {
                        title: 'algorithm',
                        key: 'algorithm',
                        width: 160
                    },
                    {
                        title: 'rsa_public_key',
                        key: 'rsa_public_key',
                        width: 160
                    },
                    {
                        title: 'secret',
                        key: 'secret',
                        width: 160
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width: 150
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        fixed: 'right',
                        width: 150,
                        align: 'center'
                    }
                ],
                showModal:false,
                algorithms:['HS256','HS384','HS512','RS256','ES256']
            }
        },
        mounted(){
            this.loadCredential();
        },
        methods: {
            loadCredential(){
                this._get('/consumers/'+this.consumerId+'/jwt',response=>{
                    console.log(response.data);
                    this.configList=response.data.data;
                    this.configList.map(function (config) {
                        let createDate = moment.unix(config.created_at);
                        config.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                });
            },
            addCredential() {
                if(!this.formItem.rsa_public_key){
                    this.formItem.rsa_public_key=null;
                }
                if(!this.formItem.secret){
                    this.formItem.secret=null;
                }
                if(!this.formItem.key){
                    this.formItem.key=null;
                }
                if(!this.formItem.algorithm){
                    this.formItem.algorithm=null;
                }
                this._post('/consumers/'+this.consumerId+'/jwt',this.formItem,()=>{
                    this.loadCredential();
                    this.formItem.algorithm=null;
                    this.formItem.key=null;
                    this.formItem.secret=null;
                    this.formItem.rsa_public_key=null;
                });
            },
            deleteDialog(credentialId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Credential',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + credentialId + '</p>',
                    onOk: () => {
                        _this._delete('/consumers/'+this.consumerId+'/jwt/' + credentialId,()=> {
                            _this.$Message.info('Credential deleted!');
                            _this.loadCredential();
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
    #config {
        margin-top: 10px;
    }
</style>
