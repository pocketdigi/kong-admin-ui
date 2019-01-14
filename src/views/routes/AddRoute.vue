<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/route">Route</BreadcrumbItem>
            <BreadcrumbItem v-if="!edit">Add Route</BreadcrumbItem>
            <BreadcrumbItem v-else>{{routeId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="name:">
                <Input v-model="formItem.name" placeholder="Enter Route name ..." class="text_input"></Input>
                <span class="field_desc">The name of the Route.</span>
            </FormItem>

            <FormItem label="protocols:">
                <CheckboxGroup v-model="formItem.protocols">
                    <Checkbox label="http"></Checkbox>
                    <Checkbox label="https"></Checkbox>
                    <Checkbox label="tcp"></Checkbox>
                    <Checkbox label="tls"></Checkbox>
                </CheckboxGroup>
                <span class="field_desc">A list of the protocols this Route should allow. When set to ["https"], HTTP requests are answered with a request to upgrade to HTTPS. Defaults to ["http", "https"].</span>
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
                <span class="field_desc">A list of HTTP methods that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set.</span>
            </FormItem>

            <FormItem label="hosts:">
                <Input v-model="hosts" placeholder="Use commas to separate multiple hosts"
                       class="text_input_multiple"></Input>
                <span class="field_desc">A list of domain names that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set. </span>
            </FormItem>

            <FormItem label="paths:">
                <Input v-model="paths" placeholder="Use commas to separate multiple paths"
                       class="text_input_multiple"></Input>
                <span class="field_desc">A list of paths that match this Route. When using http or https protocols, at least one of hosts, paths, or methods must be set. </span>
            </FormItem>

            <FormItem label="regex_priority:">
                <InputNumber v-model="formItem.regex_priority"></InputNumber>
                <div class="field_desc">A number used to choose which route resolves a given request when several routes
                    match it using regexes simultaneously. When two routes match the path and have the same
                    regex_priority, the older one (lowest created_at) is used. Note that the priority for non-regex
                    routes is different (longer non-regex routes are matched before shorter ones). Defaults to 0.
                </div>
            </FormItem>

            <!--<FormItem label="strip_path">-->
            <!--<RadioGroup v-model="formItem.strip_path">-->
            <!--<Radio label="true">true</Radio>-->
            <!--<Radio label="false">false</Radio>-->
            <!--</RadioGroup>-->
            <!--</FormItem>-->
            <FormItem label="strip_path:">
                <i-switch v-model="formItem.strip_path" size="large">
                    <span slot="true">true</span>
                    <span slot="false">false</span>
                </i-switch>
                <span class="field_desc">When matching a Route via one of the paths, strip the matching prefix from the upstream request URL.</span>

            </FormItem>

            <FormItem label="preserve_host:">
                <i-switch v-model="formItem.preserve_host" size="large">
                    <span slot="true">true</span>
                    <span slot="false">false</span>
                </i-switch>
                <span class="field_desc">When matching a Route via one of the hosts domain names, use the request Host header in the upstream request headers. If set to false, the upstream Host header will be that of the Service’s host.</span>
            </FormItem>


            <FormItem label="snis:">
                <Input v-model="snis" placeholder="Use commas to separate multiple snis"
                       class="text_input_multiple"></Input>
                <span class="field_desc">A list of SNIs that match this Route when using stream routing. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set. </span>
            </FormItem>
            <FormItem label="sources:">
                <Input v-model="sources" placeholder="Use commas to separate multiple sources"
                       class="text_input_multiple"></Input>
                <span class="field_desc">A list of IP sources of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set. </span>
            </FormItem>

            <FormItem label="destinations:">
                <Input v-model="destinations" placeholder="Use commas to separate multiple sources"
                       class="text_input_multiple"></Input>
                <span class="field_desc">A list of IP destinations of incoming connections that match this Route when using stream routing. Each entry is an object with fields “ip” (optionally in CIDR range notation) and/or “port”. When using tcp or tls protocols, at least one of snis, sources, or destinations must be set. </span>
            </FormItem>

            <FormItem label="service:">
                <Select v-model="formItem.service.id" style="width:400px" :disabled="!serviceIdCanChanged">
                    <Option v-for="item in services" :value="item.id" :key="item.id">{{ item.id }} &nbsp; &nbsp;{{ item.name }}</Option>
                </Select>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="saveRoute">Save</Button>
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
                if (this.formItem.id === '') {
                    this.formItem.id = null;
                }
                if (this.formItem.name === '') {
                    this.formItem.name = null;
                }
                if (this.formItem.url === '') {
                    this.formItem.url = null;
                }

                if (!this.edit) {
                    this._post('/routes/', this.formItem, () => {
                        _this.$router.go(-1);
                    });
                } else {
                    //edit
                    this._patch('/routes/' + this.routeId, this.formItem, () => {
                        _this.$router.go(-1);
                    });
                }
            },
            loadRoute() {
                let _this = this;
                this._get('/routes/' + this.routeId, response => {
                    _this.formItem = response.data;
                    this.hosts = this.formItem.hosts.join(',');
                    this.paths = this.formItem.paths.join(',');
                });
            },
            loadServices() {
                this._get('/services', response => {
                    this.services = [];
                    Array.prototype.push.apply(this.services, response.data.data);
                });
            }
        },
        computed:{
            hosts: {
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.hosts=newValue.split(',');
                    }else {
                        this.formItem.hosts=[];
                    }
                },
                get: function () {
                    return this.formItem.hosts.join(',');
                }
            },
            paths: {
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.paths=newValue.split(',');
                    }else {
                        this.formItem.paths=[];
                    }
                },
                get: function () {
                    return this.formItem.paths.join(',');
                }
            },
            snis: {
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.snis=newValue.split(',');
                    }else {
                        this.formItem.snis=[];
                    }
                },
                get: function () {
                    if(this.formItem.snis) {
                        return this.formItem.snis.join(',');
                    }
                    return '';
                }
            },
            sources: {
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.sources=newValue.split(',');
                    }else {
                        this.formItem.sources=[];
                    }
                },
                get: function () {
                    if(this.formItem.sources) {
                        return this.formItem.sources.join(',');
                    }
                    return '';
                }
            },
            destinations: {
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.destinations=newValue.split(',');
                    }else {
                        this.formItem.destinations=[];
                    }
                },
                get: function () {
                    if(this.formItem.destinations){
                        return this.formItem.destinations.join(',');
                    }
                    return '';

                }
            },
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
