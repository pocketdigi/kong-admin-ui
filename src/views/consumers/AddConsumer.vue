<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/consumers">Consumer</BreadcrumbItem>
            <BreadcrumbItem v-if="!consumerId">Add Consumer</BreadcrumbItem>
            <BreadcrumbItem v-else>{{consumerId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="username:">
                <Input v-model="formItem.username" placeholder="Enter username ..." class="text_input"></Input>
                <span class="field_desc">The unique username of the consumer. You must send either this field or custom_id with the request.</span>
            </FormItem>
            <FormItem label="custom_id:">
                <Input v-model="formItem.custom_id" placeholder="Enter custom_id ..." class="text_input"></Input>
                <span class="field_desc">Field for storing an existing unique ID for the consumer - useful for mapping Kong with users in your existing database. You must send either this field or username with the request.</span>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="saveConsumer">Save</Button>
            </FormItem>
        </Form>

        <div id="plugins" v-if="consumerId">
            <Row style="margin-bottom: 10px">
                <Col span="12"><h1>Plugins:</h1></Col>
                <Col span="12" style="text-align:right;position: absolute;top: 50%;right: 0px">
                    <Button type="primary" size="small" @click="addPlugin()">Add plugin</Button>
                </Col>
            </Row>
            <PluginTable v-bind:plugins="plugins"></PluginTable>
        </div>

        <HMACAuthConfigTable  v-bind:consumerId="consumerId" v-if="consumerId"></HMACAuthConfigTable>
        <OAuth2ConfigTable  v-bind:consumerId="consumerId" v-if="consumerId"></OAuth2ConfigTable>
        <BasicAuthConfigTable  v-bind:consumerId="consumerId" v-if="consumerId"></BasicAuthConfigTable>


    </div>
</template>

<script>
    import moment from 'moment'
    import PluginTable from '@/components/plugins/PluginTable'
    import HMACAuthConfigTable from '@/components/consumers/HMACAuthConfigTable'
    import OAuth2ConfigTable from '@/components/consumers/OAuth2ConfigTable'
    import BasicAuthConfigTable from '@/components/consumers/BasicAuthConfigTable'
    import EventBus from '@/event-bus'

    export default {
        name: "AddConsumer",
        components:{PluginTable,HMACAuthConfigTable,OAuth2ConfigTable,BasicAuthConfigTable},
        data() {
            return {
                formItem: {
                    username: '',
                    custom_id:''
                },
                consumerId: '',
                serviceIdCanChanged: true,
                plugins:[],
                configHmacAuth:[]
            }
        },
        mounted(){
            this.consumerId = this.$route.params.id;
            if(this.consumerId) {
                this.loadConsumer();
                this.loadPlugins();
            }

            EventBus.$on('pluginChange',({pluginId}) => {
                console.log("plugin change:"+pluginId);
                for(let plugin of this.plugins) {
                    if(plugin.id===pluginId) {
                        this.loadPlugins();
                        break;
                    }
                }
            });

        },
        methods:{
            saveConsumer() {
                let _this = this;
                if (this.formItem.username === '') {
                    this.formItem.username = null;
                }
                if (this.formItem.custom_id === '') {
                    this.formItem.custom_id = null;
                }

                if (!this.consumerId) {
                    this._post('/consumers/', this.formItem, () => {
                        _this.$router.go(-1);
                    });
                } else {
                    //edit
                    this._patch('/consumers/' + this.consumerId, this.formItem, () => {
                        _this.$router.go(-1);
                    });
                }
            },
            loadConsumer() {
                this._get('/consumers/'+this.consumerId,response =>{
                    this.formItem=response.data;
                });
            },
            loadPlugins(){
                this._get('/consumers/' + this.consumerId +'/plugins', response => {
                    this.plugins = response.data.data;
                    this.plugins.map(function (plugin) {
                        let createDate = moment.unix(plugin.created_at);
                        plugin.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                });

            },
            addPlugin(){
                this.$router.push({path: `/plugins/add/consumer/${this.consumerId}`});
            }
        },
        destroyed() {
            EventBus.$off('pluginChange');
        }
    }
</script>

<style scoped>
    .field_desc {
        margin-left: 10px;
    }

    .text_input {
        max-width: 200px;
    }

    .text_input_multiple {
        max-width: 400px;
    }
    #plugin-config{
        margin-top: 10px;
    }
</style>
