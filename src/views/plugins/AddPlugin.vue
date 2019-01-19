<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/plugins">Plugin</BreadcrumbItem>
            <BreadcrumbItem v-if="!pluginId">Add Plugin</BreadcrumbItem>
            <BreadcrumbItem v-else>{{pluginId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="140" style="margin-top: 20px">


            <FormItem label="name:">
                <Select v-model="formItem.name" filterable class="text_input">
                    <Option v-for="item in enabledPlugins" :value="item" :key="item">{{ item }}</Option>
                </Select>
                <span class="field_desc"><a href="https://docs.konghq.com/hub/"
                                            target="_blank">Plugin's document</a></span>
            </FormItem>

            <FormItem label="service:">
                <Select v-model="formItem.service_id" filterable class="text_input_multiple">
                    <Option v-for="item in services" :value="item.id" :key="item.id">{{ item.id+' '+item.name}}</Option>
                </Select>
                <Button type="primary" @click="formItem.service_id=''">Clear</Button>

                <span class="field_desc">If this plugin no need assign to a service,leave it blank.</span>
            </FormItem>
            <FormItem label="route:">
                <Select v-model="formItem.route_id" filterable class="text_input_multiple">
                    <Option v-for="item in routes" :value="item.id" :key="item.id">{{ item.id }}
                    </Option>
                </Select>
                <span class="field_desc">If this plugin no need assign to a route,leave it blank.</span>
            </FormItem>

            <FormItem label="consumer:">
                <Select v-model="formItem.consumer_id" filterable class="text_input_multiple">
                    <Option v-for="item in consumers" :value="item.id" :key="item.id">{{ item.id+' '+item.username
                        +' '+item.custom_id }}
                    </Option>
                </Select>
                <span class="field_desc">If this plugin no need assign to a consumer,leave it blank.</span>
            </FormItem>



            <FormItem :label-width="300" v-for="field in flatFields" :label="field.fieldName+':'"
                      :key="field.fieldName">

                <Input v-if="field.fieldType==='string'" :name="field.fieldName" class="text_input"
                       :value="field.defaultValue"></Input>
                <Input v-if="field.fieldType==='array'&&field.elementType==='string'" :name="field.fieldName"
                       class="text_input" :value="field.defaultValue"></Input>
                <Input v-if="field.fieldType==='set'&&field.elementType==='string'" :name="field.fieldName"
                       class="text_input" :value="field.defaultValue"></Input>
                <InputNumber v-if="field.fieldType==='number'" :name="field.fieldName" class="text_input"
                             :value="field.defaultValue"></InputNumber>
                <InputNumber v-if="field.fieldType==='integer'" :name="field.fieldName" class="text_input"
                             :value="field.defaultValue"></InputNumber>
                <i-switch v-if="field.fieldType==='boolean'" :name="field.fieldName" size="large"
                          :value="field.defaultValue">
                    <span slot="open">true</span>
                    <span slot="close">false</span>
                </i-switch>
            </FormItem>


            <FormItem>
                <Button type="primary" @click="savePlugin">Save</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "AddPlugin",
        data() {
            return {
                pluginId: '',
                formItem: {
                    service_id: '',
                    config: {},
                    enabled: false,
                    run_on: ''

                },
                enabledPlugins: [],
                schemaFields: [],
                flatFields: [],
                consumers: [],
                services: [],
                routes:[]
            }
        },
        watch: {
            name: function (newVal, oldVal) {
                console.log(newVal + ' ' + oldVal);
                this.loadPluginSchema();
            },
            serviceId: function (newVal, oldVal) {
                this.formItem.route_id='';
                this.loadRoutes();
            }
        },
        computed: {
            name() {
                return this.formItem.name;
            },
            serviceId() {
                return this.formItem.service_id;
            }
        },
        mounted() {
            this.formItem.service_id = this.$route.params.serviceId;
            this.formItem.consumer_id = this.$route.params.consumerId;
            this.pluginId = this.$route.params.pluginId;
            if (this.pluginId) {
                this.loadPlugin();
            }
            this.loadPlugins();
            this.loadConsumers();
            this.loadServices();
        },
        methods: {
            loadPlugin() {
                this._get('/plugins/' + this.pluginId, response => {
                    this.formItem = response.data;
                });
            },
            loadPlugins() {
                this._get('/plugins/enabled', response => {
                    this.enabledPlugins = response.data.enabled_plugins;
                });
            },
            loadPluginSchema() {
                if (this.name) {
                    this._get('/plugins/schema/' + this.name, response => {
                        this.schemaFields = response.data.fields;
                        this.flatFields = [];
                        this.unpackFields(this.schemaFields, 'config');
                        for (let field of this.flatFields) {
                            if (field.fieldType === 'map' || field.elementType === 'record') {
                                this.$Message.warning('Sorry,We not support this plugin yet');
                                this.flatFields = [];
                                break;
                            }
                        }

                    });
                }

            },
            unpackFields(fields, parent) {
                console.log("unpackFields:" + fields.length);
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    let entries = Object.entries(field);
                    let fieldName = entries[0][0];
                    let fieldValue = entries[0][1];
                    let type = fieldValue.type;

                    if (type === 'record') {
                        let fieldObj = Object.entries(fieldValue.fields);

                        this.unpackRecord(fieldObj, parent + '.' + fieldName);
                    } else {
                        console.log(parent + '.' + fieldName + ':' + type);
                        let elementType;
                        let defaultValue = fieldValue.default;
                        if (fieldValue.elements) {
                            elementType = fieldValue.elements.type;
                            defaultValue = fieldValue.elements.default;
                        }

                        this.flatFields.push(this.formField(parent + '.' + fieldName, type, elementType, defaultValue, fieldValue.values));
                    }

                }

            },
            unpackRecord(fields, parent) {
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    let fieldName = field[0];
                    if (isNaN(fieldName)) {
                        let elementType;
                        let defaultValue = field[1].default;
                        if (field[1].elements) {
                            elementType = field[1].elements.type;
                            defaultValue = field[1].elements.default;
                        }
                        this.flatFields.push(this.formField(parent + '.' + fieldName, field[1].type, elementType, defaultValue, field[1].values));
                    }
                }
            },

            formField(fieldName, fieldType, elementType, defaultValue, mapValueFields) {

                return {
                    fieldName: fieldName,
                    fieldType: fieldType,
                    defaultValue: defaultValue,
                    elementType: elementType,
                    mapValueFields: mapValueFields
                }
            },
            loadConsumers() {
                let url = '/consumers?size=1000';
                this._get(url, response => {
                    this.consumers = response.data.data;
                });

            },
            loadServices() {
                this._get('/services', response => {
                    Array.prototype.push.apply(this.services, response.data.data);
                });
            },
            loadRoutes() {
                console.log(this.formItem.service_id);
                this.routes = [];
                let url = '/routes?size=1000';
                if (this.formItem.service_id) {
                    url = '/services/' + this.formItem.service_id + '/routes'
                }
                this._get(url, response => {
                    this.routes = response.data.data;
                });

            },
            savePlugin() {

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

