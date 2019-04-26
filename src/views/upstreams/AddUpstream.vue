<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/upstreams">Upstream</BreadcrumbItem>
            <BreadcrumbItem v-if="!edit">Add Upstream</BreadcrumbItem>
            <BreadcrumbItem v-else>{{upstreamId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="300" style="margin-top: 20px">
            <FormItem label="name:">
                <Input v-model="formItem.name" placeholder="Enter upstream name ..." class="text_input"></Input>
                <span class="field_desc">This is a hostname, which must be equal to the host of a Service.</span>
            </FormItem>

            <FormItem label="hash_on:">
                <RadioGroup v-model="formItem.hash_on">
                    <Radio label="none">none</Radio>
                    <Radio label="consumer">consumer</Radio>
                    <Radio label="ip">ip</Radio>
                    <Radio label="header">header</Radio>
                    <Radio label="cookie">cookie</Radio>
                </RadioGroup>
                <span class="field_desc">What to use as hashing input: none (resulting in a weighted-round-robin scheme with no hashing), consumer, ip, header, or cookie</span>
            </FormItem>

            <FormItem label="hash_fallback:">
                <RadioGroup v-model="formItem.hash_fallback">
                    <Radio label="none">none</Radio>
                    <Radio label="consumer">consumer</Radio>
                    <Radio label="ip">ip</Radio>
                    <Radio label="header">header</Radio>
                    <Radio label="cookie">cookie</Radio>
                </RadioGroup>
                <span class="field_desc">What to use as hashing input if the primary hash_on does not return a hash (eg. header is missing, or no consumer identified). One of: none, consumer, ip, header, or cookie. Not available if hash_on is set to cookie. </span>
            </FormItem>


            <FormItem label="hash_on_header:" v-if="formItem.hash_on==='header'">
                <Input v-model="formItem.hash_on_header" placeholder="hash_on_header" class="text_input"></Input>
                <span class="field_desc">The header name to take the value from as hash input. Only required when hash_on is set to header.</span>
            </FormItem>

            <FormItem label="hash_fallback_header:" v-if="formItem.hash_fallback==='header'">
                <Input v-model="formItem.hash_fallback_header" placeholder="hash_fallback_header" class="text_input"></Input>
                <span class="field_desc">The header name to take the value from as hash input. Only required when hash_fallback is set to header.</span>
            </FormItem>

            <FormItem label="hash_on_cookie:" v-if="formItem.hash_on==='cookie'||formItem.hash_fallback==='cookie'">
                <Input v-model="formItem.hash_on_cookie" placeholder="hash_on_cookie" class="text_input"></Input>
                <span class="field_desc">The cookie name to take the value from as hash input. Only required when hash_on or hash_fallback is set to cookie. If the specified cookie is not in the request, Kong will generate a value and set the cookie in the response.</span>
            </FormItem>


            <FormItem label="hash_on_cookie_path:" v-if="formItem.hash_on==='cookie'||formItem.hash_fallback==='cookie'">
                <Input v-model="formItem.hash_on_cookie_path" placeholder="hash_on_cookie" class="text_input"></Input>
                <span class="field_desc">The cookie path to set in the response headers. Only required when hash_on or hash_fallback is set to cookie.</span>
            </FormItem>

            <FormItem label="slots:">
                <InputNumber v-model="formItem.slots" class="text_input"></InputNumber>
                <span class="field_desc">The number of slots in the loadbalancer algorithm (10-65536). </span>
            </FormItem>


            <FormItem label="healthchecks.active.https_verify_certificate:">
                <i-switch v-model="formItem.healthchecks.active.https_verify_certificate" size="large">
                    <span slot="open">true</span>
                    <span slot="close">false</span>
                </i-switch>
                <span class="field_desc">Whether to check the validity of the SSL certificate of the remote host when performing active health checks using HTTPS. </span>
            </FormItem>

            <FormItem label="healthchecks.active.unhealthy.http_statuses:">
                <Input v-model="healthchecksActiveUnhealthyHttpStatuses" placeholder="http status" class="text_input_multiple"></Input>
                <span class="field_desc">An array of HTTP statuses to consider a failure, indicating unhealthiness, when returned by a probe in active health checks.  </span>
            </FormItem>

            <FormItem label="healthchecks.active.unhealthy.tcp_failures:">
                <InputNumber v-model="formItem.healthchecks.active.unhealthy.tcp_failures" :min="0"  class="text_input"></InputNumber>
                <span class="field_desc">Number of TCP failures in active probes to consider a target unhealthy </span>
            </FormItem>


            <FormItem label="healthchecks.active.unhealthy.timeouts:">
                <InputNumber v-model="formItem.healthchecks.active.unhealthy.timeouts"  :min="0"  class="text_input"></InputNumber>
                <span class="field_desc">Number of timeouts in active probes to consider a target unhealthy</span>
            </FormItem>


            <FormItem label="healthchecks.active.unhealthy.http_failures:">
                <InputNumber v-model="formItem.healthchecks.active.unhealthy.http_failures" :min="0"  class="text_input"></InputNumber>
                <span class="field_desc">Number of HTTP failures in active probes (as defined by healthchecks.active.unhealthy.http_statuses) to consider a target unhealthy.</span>
            </FormItem>

            <FormItem label="healthchecks.active.unhealthy.interval:">
                <InputNumber v-model="formItem.healthchecks.active.unhealthy.interval"  :min="0"  class="text_input"></InputNumber>
                <span class="field_desc">Interval between active health checks for unhealthy targets (in seconds). A value of zero indicates that active probes for unhealthy targets should not be performed.</span>
            </FormItem>


            <FormItem label="healthchecks.active.http_path:">
                <Input v-model="formItem.healthchecks.active.http_path" placeholder="http_path" class="text_input"></Input>
                <span class="field_desc">Path to use in GET HTTP request to run as a probe on active health checks.</span>
            </FormItem>

            <FormItem label="healthchecks.active.timeout:">
                <InputNumber v-model="formItem.healthchecks.active.timeout" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Socket timeout for active health checks (in seconds).</span>
            </FormItem>


            <FormItem label="healthchecks.active.healthy.http_statuses:">
                <Input v-model="healthchecksActiveHealthyHttpStatuses" placeholder="http status" class="text_input"></Input>
                <span class="field_desc">An array of HTTP statuses to consider a success, indicating healthiness, when returned by a probe in active health checks. </span>
            </FormItem>


            <FormItem label="healthchecks.active.healthy.interval:">
                <InputNumber v-model="formItem.healthchecks.active.healthy.interval" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Interval between active health checks for unhealthy targets (in seconds). A value of zero indicates that active probes for unhealthy targets should not be performed.</span>
            </FormItem>

            <FormItem label="healthchecks.active.healthy.successes:">
                <InputNumber v-model="formItem.healthchecks.active.healthy.successes" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Number of successes in active probes (as defined by healthchecks.active.healthy.http_statuses) to consider a target healthy.</span>
            </FormItem>

            <FormItem label="healthchecks.active.https_sni:">
                <Input v-model="formItem.healthchecks.active.https_sni" class="text_input"></Input>
                <span class="field_desc">The hostname to use as an SNI (Server Name Identification) when performing active health checks using HTTPS. This is particularly useful when Targets are configured using IPs, so that the target host’s certificate can be verified with the proper SNI.</span>
            </FormItem>

            <FormItem label="healthchecks.active.concurrency:">
                <InputNumber v-model="formItem.healthchecks.active.concurrency" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Number of targets to check concurrently in active health checks. </span>
            </FormItem>


            <FormItem label="healthchecks.active.type:">
                <RadioGroup v-model="formItem.healthchecks.active.type">
                    <Radio label="tcp">tcp</Radio>
                    <Radio label="http">http</Radio>
                    <Radio label="https">https</Radio>
                </RadioGroup>
                <span class="field_desc">Whether to perform active health checks using HTTP or HTTPS, or just attempt a TCP connection. </span>
            </FormItem>

            <FormItem label="healthchecks.passive.unhealthy.http_failures:">
                <InputNumber v-model="formItem.healthchecks.passive.unhealthy.http_failures" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Number of HTTP failures in proxied traffic (as defined by healthchecks.passive.unhealthy.http_statuses) to consider a target unhealthy, as observed by passive health checks.</span>
            </FormItem>


            <FormItem label="healthchecks.passive.unhealthy.http_statuses:">
                <Input v-model="healthchecksPassiveUnHealthyHttpStatuses" placeholder="http status" class="text_input"></Input>
                <span class="field_desc">An array of HTTP statuses which represent unhealthiness when produced by proxied traffic, as observed by passive health checks.  </span>
            </FormItem>


            <FormItem label="healthchecks.passive.unhealthy.tcp_failures:">
                <InputNumber v-model="formItem.healthchecks.passive.unhealthy.tcp_failures" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Number of TCP failures in proxied traffic to consider a target unhealthy, as observed by passive health checks.</span>
            </FormItem>

            <FormItem label="healthchecks.passive.unhealthy.timeouts:">
                <InputNumber v-model="formItem.healthchecks.passive.unhealthy.timeouts" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Number of timeouts in proxied traffic to consider a target unhealthy, as observed by passive health checks.</span>
            </FormItem>

            <FormItem label="healthchecks.passive.type:">
                <RadioGroup v-model="formItem.healthchecks.passive.type">
                    <Radio label="tcp">tcp</Radio>
                    <Radio label="http">http</Radio>
                    <Radio label="https">https</Radio>
                </RadioGroup>
                <span class="field_desc">Whether to perform passive health checks interpreting HTTP/HTTPS statuses, or just check for TCP connection success. Possible values are tcp, http or https (in passive checks, http and https options are equivalent.). </span>
            </FormItem>

            <FormItem label="healthchecks.passive.healthy.successes:">
                <InputNumber v-model="formItem.healthchecks.passive.healthy.successes" :min="0" class="text_input"></InputNumber>
                <span class="field_desc">Number of successes in proxied traffic (as defined by healthchecks.passive.healthy.http_statuses) to consider a target healthy, as observed by passive health checks. </span>
            </FormItem>


            <FormItem label="healthchecks.passive.healthy.http_statuses:">
                <Input v-model="healthchecksPassiveHealthyHttpStatuses" placeholder="http status" class="text_input_multiple"></Input>
                <span class="field_desc">An array of HTTP statuses which represent healthiness when produced by proxied traffic, as observed by passive health checks. </span>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="saveService">Save</Button>
            </FormItem>
        </Form>
        <div v-if="upstreamId">
            <Row>
                <Col span="12"><h3>Targets:</h3></Col>
                <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                    <Button type="primary" size="small" @click="addTarget">Add Target</Button>
                </Col>
            </Row>
            <TargetTable style="margin-top: 10px" v-bind:upstreamId="upstreamId"
                         ref="targetTable"></TargetTable>
        </div>

    </div>

</template>
<script>
    import TargetTable from '@/components/services/TargetTable'
    export default {
        name: 'AddUpstream',
        data () {
            return {
                formItem: {
                    name: '',
                    hash_on:'none',
                    hash_fallback:'none',
                    hash_on_header:'',
                    hash_fallback_header:'',
                    hash_on_cookie:'',
                    hash_on_cookie_path:'/',
                    slots:10000,
                    healthchecks:{
                        active:{
                            https_verify_certificate:true,
                            unhealthy:{
                                http_statuses:[429, 404, 500, 501, 502, 503, 504, 505],
                                tcp_failures:0,
                                timeouts:0,
                                http_failures:0,
                                interval:0
                            },
                            http_path:'/',
                            timeout:1,
                            healthy: {
                                http_statuses:[200, 302],
                                interval:0,
                                successes:0
                            },
                            https_sni:'',
                            concurrency:10,
                            type:'http'
                        },
                        passive: {
                            unhealthy: {
                                http_failures:0,
                                http_statuses:[429, 500, 503],
                                tcp_failures:0,
                                timeouts:0
                            },
                            type:'http',
                            healthy: {
                                successes:0,
                                http_statuses:[200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308],
                            }
                        }
                    }
                },
                upstreamNames:[],
                serviceId:'',
                edit: false,
                upstreamId:''
            }
        },

        computed:{
            healthchecksActiveUnhealthyHttpStatuses: {
               get: function () {
                   return this.formItem.healthchecks.active.unhealthy.http_statuses.join(',');
               },
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.healthchecks.active.unhealthy.http_statuses=newValue.split(',');
                    }else {
                        this.formItem.healthchecks.active.unhealthy.http_statuses=[];
                    }
                }
            },
            healthchecksActiveHealthyHttpStatuses: {
                get: function () {
                    return this.formItem.healthchecks.active.healthy.http_statuses.join(',');
                },
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.healthchecks.active.healthy.http_statuses=newValue.split(',');
                    }else {
                        this.formItem.healthchecks.active.healthy.http_statuses=[];
                    }
                }
            },
            healthchecksPassiveUnHealthyHttpStatuses: {
                get: function () {
                    return this.formItem.healthchecks.passive.unhealthy.http_statuses.join(',');
                },
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.healthchecks.passive.unhealthy.http_statuses=newValue.split(',');
                    }else {
                        this.formItem.healthchecks.passive.unhealthy.http_statuses=[];
                    }
                }
            },
            healthchecksPassiveHealthyHttpStatuses: {
                get: function () {
                    return this.formItem.healthchecks.passive.healthy.http_statuses.join(',');
                },
                set: function (newValue) {
                    if(newValue) {
                        this.formItem.healthchecks.passive.healthy.http_statuses=newValue.split(',');
                    }else {
                        this.formItem.healthchecks.passive.healthy.http_statuses=[];
                    }
                }
            },
        },
        mounted() {
            this.upstreamId=this.$route.params.id;
            this.formItem.name=this.$route.params.name;
            this.edit=this.upstreamId!=null;
            if(this.edit) {
                this.loadUpstream();
            }
        },
        methods: {
            filterMethod (value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            saveService () {
                let _this = this;
                if (this.formItem.name==='') {
                    this.formItem.name=null;
                }
                if (this.formItem.hash_on_header==='') {
                    this.formItem.hash_on_header=null;
                }
                if (this.formItem.hash_fallback_header==='') {
                    this.formItem.hash_fallback_header=null;
                }
                if (this.formItem.hash_on_cookie==='') {
                    this.formItem.hash_on_cookie=null;
                }
                if (this.formItem.healthchecks.active.https_sni==='') {
                    this.formItem.healthchecks.active.https_sni=null;
                }

                if(!this.edit){
                    this._post('/upstreams/',this.formItem,()=>{
                        _this.$router.go(-1);
                    });
                }else{
                    //edit
                    this._patch('/upstreams/'+this.upstreamId,this.formItem,() => {
                        _this.$router.go(-1);
                    });
                }
            },
            loadUpstream() {
                let _this = this;
                this._get('/upstreams/' + this.upstreamId,response => {
                    _this.formItem = response.data;
                    _this.$refs.targetTable.loadTargets();
                });
            },
            addTarget() {
                this.$refs.targetTable.showAddTargetModal();
            },
        },
        components: {
            TargetTable
        },
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
