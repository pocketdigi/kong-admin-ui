<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/services">Service</BreadcrumbItem>
            <BreadcrumbItem v-if="!edit">Add Service</BreadcrumbItem>
            <BreadcrumbItem v-else>{{serviceId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="name:">
                <Input v-model="formItem.name" placeholder="Enter Service name ..." class="text_input"></Input>
                <span class="field_desc">The Service name.</span>
            </FormItem>
            <FormItem label="retries:">
                <InputNumber :min="1" v-model="formItem.retries"></InputNumber>
                <span class="field_desc">The number of retries to execute upon failure to proxy. Defaults to 5.</span>
            </FormItem>
            <FormItem label="protocol:">
                <RadioGroup v-model="formItem.protocol">
                    <Radio label="http">http</Radio>
                    <Radio label="https">https</Radio>
                </RadioGroup>
                <span class="field_desc">The protocol used to communicate with the upstream. It can be one of http or https. Defaults to "http".</span>
            </FormItem>
            <FormItem label="host:">
                <!--<Input v-model="formItem.host" placeholder="Enter host" class="text_input"></Input>-->
                <AutoComplete
                        v-model="formItem.host"
                        :data="upstreamNames"
                        :filter-method="filterMethod"
                        placeholder="Enter host"
                        style="width:200px"></AutoComplete>
                <span class="field_desc">The host of the upstream server..</span>
            </FormItem>
            <FormItem label="port:">
                <Input v-model="formItem.port" placeholder="Enter port" class="text_input"></Input>
                <span class="field_desc">The upstream server port. Defaults to 80.</span>
            </FormItem>
            <FormItem label="path:">
                <Input v-model="formItem.path" placeholder="Enter path" class="text_input"></Input>
                <span class="field_desc">The path to be used in requests to the upstream server.</span>
            </FormItem>
            <FormItem label="connect_timeout:">
                <InputNumber v-model="formItem.connect_timeout" class="text_input"></InputNumber>
                <span class="field_desc">The timeout in milliseconds for establishing a connection to the upstream server. Defaults to 60000.</span>
            </FormItem>
            <FormItem label="write_timeout:">
                <InputNumber v-model="formItem.write_timeout" class="text_input"></InputNumber>
                <span class="field_desc">The timeout in milliseconds between two successive write operations for transmitting a request to the upstream server. Defaults to 60000.</span>
            </FormItem>
            <FormItem label="read_timeout:">
                <InputNumber v-model="formItem.read_timeout" class="text_input"></InputNumber>
                <span class="field_desc">The timeout in milliseconds between two successive read operations for transmitting a request to the upstream server. Defaults to 60000</span>
            </FormItem>
            <FormItem label="url:" v-if="!edit">
                <Input v-model="formItem.url" placeholder="Enter url" style="max-width: 400px"></Input>
                <span class="field_desc">Shorthand attribute to set protocol, host, port and path at once. This attribute is write-only (the Admin API never “returns” the url).</span>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="saveService">Save</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>

    export default {
        name: 'AddService',
        data () {
            return {
                formItem: {
                    name: '',
                    retries: 5,
                    protocol: 'http',
                    host:'',
                    port: 80,
                    path: '',
                    connect_timeout:6000,
                    write_timeout:6000,
                    read_timeout:6000,
                    url:''
                },
                upstreamNames:[],
                serviceId:'',
                edit: false
            }
        },
        mounted() {
            this.serviceId=this.$route.params.id;
            this.edit=this.serviceId!=null;
            this.loadUpstreams();
            if(this.edit) {
                this.loadService();
            }
        },
        methods: {
            loadUpstreams() {
                this.upstreamNames=[];
                let _this=this;
                this._get('/upstreams/',function (response) {
                    let upstreams=response.data.data;
                    upstreams.map(function (upstream) {
                        _this.upstreamNames.push(upstream.name)
                    })
                });
            },
            filterMethod (value, option) {
                if(value){
                    return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
                }
                return true;
            },
            saveService () {
                let _this = this;
                let formData = JSON.parse(JSON.stringify(this.formItem));
                if (formData.name==='') {
                    formData.name=null;
                }
                if (formData.host==='') {
                    formData.host=null;
                }
                if (formData.path==='') {
                    formData.path=null;
                }
                if (formData.url==='') {
                    formData.url=null;
                }
                if(!this.edit){
                    this._post('/services/',formData,response=>{
                        console.log(response.data);
                        _this.$router.push('/services');
                    });
                }else{
                    //edit
                    this._patch('/services/'+this.serviceId,formData,response => {
                        console.log(response.data);
                        _this.$router.go(-1);
                    });
                }

            },
            loadService() {
                let _this = this;
                this._get('/services/' + this.serviceId,response => {
                    _this.formItem = response.data;
                });
            }
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
</style>
