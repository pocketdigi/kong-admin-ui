<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">{{$t('breadcrumb.home')}}</BreadcrumbItem>
            <BreadcrumbItem to="/services">Service</BreadcrumbItem>
            <BreadcrumbItem v-if="!edit">{{$t('breadcrumb.addService')}}</BreadcrumbItem>
            <BreadcrumbItem v-else>{{serviceId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="name:">
                <Input v-model="formItem.name" placeholder="Enter Service name ..." class="text_input"></Input>
                <span class="field_desc">{{$t('service.fieldServiceName')}}</span>
            </FormItem>
            <FormItem label="retries:">
                <InputNumber :min="1" v-model="formItem.retries"></InputNumber>
                <span class="field_desc">{{$t('service.fieldRetries')}}</span>
            </FormItem>
            <FormItem label="protocol:">
                <RadioGroup v-model="formItem.protocol">
                    <Radio label="http">http</Radio>
                    <Radio label="https">https</Radio>
                </RadioGroup>
                <span class="field_desc">{{$t('service.fieldProtocol')}}</span>
            </FormItem>
            <FormItem label="host:">
                <!--<Input v-model="formItem.host" placeholder="Enter host" class="text_input"></Input>-->
                <AutoComplete
                        v-model="formItem.host"
                        :data="upstreamNames"
                        :filter-method="filterMethod"
                        placeholder="Enter host"
                        style="width:200px"></AutoComplete>
                <span class="field_desc">{{$t('service.fieldHost')}}</span>
            </FormItem>
            <FormItem label="port:">
                <Input v-model="formItem.port" placeholder="Enter port" class="text_input" number></Input>
                <span class="field_desc">{{$t('service.fieldPort')}}</span>
            </FormItem>
            <FormItem label="path:">
                <Input v-model="formItem.path" placeholder="Enter path" class="text_input"></Input>
                <span class="field_desc">{{$t('service.fieldPath')}}</span>
            </FormItem>
            <FormItem label="connect_timeout:">
                <InputNumber v-model="formItem.connect_timeout" class="text_input"></InputNumber>
                <span class="field_desc">{{$t('service.fieldConnectTimeout')}}</span>
            </FormItem>
            <FormItem label="write_timeout:">
                <InputNumber v-model="formItem.write_timeout" class="text_input"></InputNumber>
                <span class="field_desc">{{$t('service.fieldWriteTimeout')}}</span>
            </FormItem>
            <FormItem label="read_timeout:">
                <InputNumber v-model="formItem.read_timeout" class="text_input"></InputNumber>
                <span class="field_desc">{{$t('service.fieldReadTimeout')}}</span>
            </FormItem>
            <FormItem label="url:" v-if="!edit">
                <Input v-model="formItem.url" placeholder="Enter url" style="max-width: 400px"></Input>
                <span class="field_desc">{{$t('service.fieldUrl')}}</span>
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
                    delete formData.name;
                }
                if (formData.host==='') {
                    delete formData.host;
                }
                if (formData.path==='') {
                    delete formData.path;
                }
                if (formData.url==='') {
                    delete formData.url;
                }
                if(!this.edit){
                    this._post('/services/',formData,()=>{
                        _this.$router.push('/services');
                    });
                }else{
                    //edit
                    this._patch('/services/'+this.serviceId,formData,() => {
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
