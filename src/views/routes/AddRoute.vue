<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">{{$t('breadcrumb.home')}}</BreadcrumbItem>
            <BreadcrumbItem to="/route">Route</BreadcrumbItem>
            <BreadcrumbItem v-if="!edit">{{$t('breadcrumb.addRoute')}}</BreadcrumbItem>
            <BreadcrumbItem v-else>{{routeId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="name:">
                <Input v-model="formItem.name" placeholder="Enter Route name ..." class="text_input"></Input>
                <span class="field_desc">{{$t('route.fieldName')}}</span>
            </FormItem>

            <FormItem label="protocols:">
                <CheckboxGroup v-model="formItem.protocols">
                    <Checkbox label="http"></Checkbox>
                    <Checkbox label="https"></Checkbox>
                    <Checkbox label="tcp"></Checkbox>
                    <Checkbox label="tls"></Checkbox>
                </CheckboxGroup>
                <span class="field_desc">{{$t('route.fieldProtocols')}}</span>
            </FormItem>

            <FormItem label="methods:">
                <CheckboxGroup v-model="formItem.methods">
                    <Checkbox label="GET"></Checkbox>
                    <Checkbox label="POST"></Checkbox>
                    <Checkbox label="DELETE"></Checkbox>
                    <Checkbox label="PATCH"></Checkbox>
                    <Checkbox label="PUT"></Checkbox>
                    <Checkbox label="HEAD"></Checkbox>
                    <Checkbox label="OPTIONS"></Checkbox>
                </CheckboxGroup>
                <span class="field_desc">{{$t('route.fieldMethods')}}</span>
            </FormItem>

            <FormItem label="hosts:">
                <Input v-model="hosts" placeholder="Use commas to separate multiple hosts"
                       class="text_input_multiple"></Input>
                <span class="field_desc">{{$t('route.fieldHosts')}} </span>
            </FormItem>

            <FormItem label="paths:">
                <Input v-model="paths" placeholder="Use commas to separate multiple paths"
                       class="text_input_multiple"></Input>
                <span class="field_desc">{{$t('route.fieldPaths')}} </span>
            </FormItem>

            <FormItem label="regex_priority:">
                <InputNumber v-model="formItem.regex_priority"></InputNumber>
                <div class="field_desc">{{$t('route.fieldRegexPriority')}}</div>
            </FormItem>

            <!--<FormItem label="strip_path">-->
            <!--<RadioGroup v-model="formItem.strip_path">-->
            <!--<Radio label="true">true</Radio>-->
            <!--<Radio label="false">false</Radio>-->
            <!--</RadioGroup>-->
            <!--</FormItem>-->
            <FormItem label="strip_path:">
                <i-switch v-model="formItem.strip_path" size="large">
                    <span slot="open">true</span>
                    <span slot="close">false</span>
                </i-switch>
                <span class="field_desc">{{$t('route.fieldStripPath')}}</span>

            </FormItem>

            <FormItem label="preserve_host:">
                <i-switch v-model="formItem.preserve_host" size="large">
                    <span slot="open">true</span>
                    <span slot="close">false</span>
                </i-switch>
                <span class="field_desc">{{$t('route.fieldPreserveHost')}}</span>
            </FormItem>


            <FormItem label="snis:">
                <Input v-model="snis" placeholder="Use commas to separate multiple snis"
                       class="text_input_multiple"></Input>
                <span class="field_desc">{{$t('route.fieldSnis')}} </span>
            </FormItem>
            <FormItem label="sources:">
                <Row v-for="(item,index) in formItem.sources" :key="index">
                    <Col span="4">
                        <Input type="text" v-model="item.ip" placeholder="10.1.0.0/16" />
                    </Col>
                    <Col span="2">
                        <Input type="number" v-model.number="item.port" placeholder="1234" />
                    </Col>
                    <Col span="4" offset="1">
                        <Button @click="formItem.sources.splice(index,1)">Delete</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <Button type="dashed" long @click="addSource" icon="md-add">Add item</Button>
                    </Col>
                </Row>
                <span class="field_desc">{{$t('route.fieldSources')}} </span>
            </FormItem>

            <FormItem label="destinations:">
                <Row v-for="(item,index) in formItem.destinations" :key="index">
                    <Col span="4">
                        <Input type="text" v-model="item.ip" placeholder="10.1.0.0/16" />
                    </Col>
                    <Col span="2">
                        <Input type="number" v-model.number="item.port" placeholder="1234" />
                    </Col>
                    <Col span="4" offset="1">
                        <Button @click="formItem.destinations.splice(index,1)">Delete</Button>
                    </Col>
                </Row>
                <Row>
                    <Col span="6">
                        <Button type="dashed" long @click="addDestination" icon="md-add">Add item</Button>
                    </Col>
                </Row>
                <span class="field_desc">{{$t('route.fieldDestinations')}}</span>
            </FormItem>

            <!--            <FormItem-->
            <!--                    v-for="(item, index) in formItem.destinations"-->
            <!--                    v-if="item.status"-->
            <!--                    :key="index"-->
            <!--                    :label="'Item ' + item.index"-->
            <!--                    :prop="'items.' + index + '.value'"-->
            <!--                    :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">-->
            <!--                <Row>-->
            <!--                    <Col span="18">-->
            <!--                        <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>-->
            <!--                    </Col>-->
            <!--                    <Col span="4" offset="1">-->
            <!--                        <Button @click="handleRemove(index)">Delete</Button>-->
            <!--                    </Col>-->
            <!--                </Row>-->
            <!--            </FormItem>-->
            <!--            <FormItem>-->
            <!--                <Row>-->
            <!--                    <Col span="12">-->
            <!--                        <Button type="dashed" long @click="handleAdd" icon="md-add">Add item</Button>-->
            <!--                    </Col>-->
            <!--                </Row>-->
            <!--            </FormItem>-->

            <FormItem label="service:">
                <Select v-model="formItem.service.id" style="width:400px" :disabled="!serviceIdCanChanged">
                    <Option v-for="item in services" :value="item.id" :key="item.id">{{ item.id }} &nbsp; &nbsp;{{
                        item.name }}
                    </Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="saveRoute">{{$t('common.save')}}</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>

    export default {
        name: 'AddRoute',
        data() {
            return {
                formItem: {
                    name: '',
                    protocols: ['http', 'https'],
                    methods: [],
                    hosts: [],
                    paths: [],
                    regex_priority: 0,
                    strip_path: true,
                    preserve_host: false,
                    snis: [],
                    sources: [],
                    destinations: [],
                    service: {id: ''},
                },
                serviceId: '',
                routeId: '',
                edit: false,
                serviceIdCanChanged: true,
                services: []
            }
        },
        mounted() {
            this.routeId = this.$route.params.id;
            this.serviceId = this.$route.params.serviceId;
            this.edit = this.routeId != null;
            if (this.serviceId != null) {
                this.formItem.service.id = this.serviceId;
                this.serviceIdCanChanged = false;
            }
            if (this.edit) {
                this.loadRoute();
            }
            this.loadServices();
        },
        methods: {
            saveRoute() {
                let _this = this;
                let param={};
                if (this.formItem.id) {
                    param.id = this.formItem.id;
                }
                if (this.formItem.name) {
                    param.name = this.formItem.name;
                }
                if (this.formItem.url) {
                    param.url = this.formItem.url;
                }
                if(this.formItem.sources!=null&&this.formItem.sources.length>0) {
                    param.sources=this.formItem.sources;
                }else{
                    param.sources=null;
                }
                if(this.formItem.destinations!=null&&this.formItem.destinations.length>0) {
                    param.destinations=this.formItem.destinations;
                }else{
                    param.destinations=null;
                }
                if(this.formItem.protocols!=null&&this.formItem.protocols.length>0) {
                    param.protocols=this.formItem.protocols;
                }else{
                    param.protocols=null;
                }
                if(this.formItem.hosts!=null&&this.formItem.hosts.length>0) {
                    param.hosts=this.formItem.hosts;
                }else{
                    param.hosts=null;
                }
                if(this.formItem.methods!=null&&this.formItem.methods.length>0) {
                    param.methods=this.formItem.methods;
                }else{
                    param.methods=null;
                }
                if(this.formItem.paths!=null&&this.formItem.paths.length>0) {
                    param.paths=this.formItem.paths;
                }else{
                    param.paths=null;
                }

                param.regex_priority=this.formItem.regex_priority;
                param.strip_path=this.formItem.strip_path;
                param.preserve_host=this.formItem.preserve_host;

                if(this.formItem.snis!=null&&this.formItem.snis.length>0) {
                    param.snis=this.formItem.snis;
                }else{
                    param.snis=null;
                }
                param.service=this.formItem.service;

                if (!this.edit) {
                    this._post('/routes/', param, () => {
                        _this.$router.go(-1);
                    });
                } else {
                    //edit
                    this._patch('/routes/' + this.routeId, param, () => {
                        _this.$router.go(-1);
                    });
                }
            },
            loadRoute() {
                let _this = this;
                this._get('/routes/' + this.routeId, response => {
                    let data=response.data;
                    if(data.methods===null) {
                        data.methods=[];
                    }
                    _this.formItem = data;
                    this.hosts = this.formItem.hosts ? this.formItem.hosts.join(',') : '';
                    this.paths = this.formItem.paths ? this.formItem.paths.join(',') : '';
                });
            },
            loadServices() {
                this._get('/services', response => {
                    this.services = [];
                    Array.prototype.push.apply(this.services, response.data.data);
                });
            },
            addDestination() {
                if(this.formItem.destinations==null) {
                    this.formItem.destinations=[];
                }
                this.formItem.destinations.push({ip:'',port:''});
            },
            addSource() {
                if(this.formItem.sources==null) {
                    this.formItem.sources=[];
                }
                this.formItem.sources.push({ip:'',port:''});
            }
        },
        computed: {
            hosts: {
                set: function (newValue) {
                    if (newValue) {
                        this.formItem.hosts = newValue.split(',');
                    } else {
                        this.formItem.hosts = [];
                    }
                },
                get: function () {
                    return this.formItem.hosts ? this.formItem.hosts.join(',') : '';
                }
            },
            paths: {
                set: function (newValue) {
                    if (newValue) {
                        this.formItem.paths = newValue.split(',');
                    } else {
                        this.formItem.paths = [];
                    }
                },
                get: function () {
                    return this.formItem.paths ? this.formItem.paths.join(',') : '';
                }
            },
            snis: {
                set: function (newValue) {
                    if (newValue) {
                        this.formItem.snis = newValue.split(',');
                    } else {
                        this.formItem.snis = [];
                    }
                },
                get: function () {
                    if (this.formItem.snis) {
                        return this.formItem.snis.join(',');
                    }
                    return '';
                }
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

    .text_input_multiple {
        max-width: 400px;
    }
</style>
