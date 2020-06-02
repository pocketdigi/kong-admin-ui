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
                <Select v-model="serviceId" filterable class="text_input_multiple" ref="service" clearable>
                    <Option v-for="item in services" :value="item.id" :key="item.id">{{ item.id+' '+item.name}}</Option>
                </Select>
                <span class="field_desc">If this plugin no need assign to a service,leave it blank.</span>
            </FormItem>

            <FormItem label="route:">
                <Select v-model="formItem.route.id" filterable class="text_input_multiple" clearable>
                    <Option v-for="item in routes" :value="item.id" :key="item.id">{{ item.id }}
                    </Option>
                </Select>
                <span class="field_desc">If this plugin no need assign to a route,leave it blank.</span>
            </FormItem>


            <FormItem label="consumer:">
                <Select v-model="formItem.consumer.id" filterable class="text_input_multiple" clearable>
                    <Option v-for="item in consumers" :value="item.id" :key="item.id">
                        {{ item.id+' '+item.username+' '+item.custom_id }}
                    </Option>
                </Select>
                <span class="field_desc">If this plugin no need assign to a consumer,leave it blank.</span>
            </FormItem>

            <FormItem label="run_on:" v-if="!isKong2()">
                <Select v-model="formItem.run_on" filterable class="text_input">
                    <Option v-for="item in runOns" :value="item" :key="item">
                        {{ item }}
                    </Option>
                </Select>
                <span class="field_desc">Control on which Kong nodes this plugin will run, given a Service Mesh scenario. </span>
            </FormItem>

            <FormItem label="enable:">
                <i-switch v-model="formItem.enabled" size="large">
                    <span slot="open">true</span>
                    <span slot="close">false</span>
                </i-switch>
                <span class="field_desc">Whether the plugin is applied.</span>
            </FormItem>


            <FormItem :label-width="300" v-for="field in flatFields" :label="field.fieldName+':'"
                      :key="field.fieldName">

                <Input v-if="field.fieldType==='string'" :name="field.fieldName" class="text_input"
                       @input="valueChange($event,field)"
                       :value="field.defaultValue"></Input>
                <Input v-if="field.fieldType==='array'&&field.elementType==='string'" :name="field.fieldName"
                       @input="valueChange($event,field)" placeholder="Split by comma"
                       class="text_input" :value="field.defaultValue"></Input>

                <Input v-if="field.fieldType==='set'&&field.elementType==='string'" :name="field.fieldName"
                       @input="valueChange($event,field)" placeholder="Split by comma"
                       class="text_input" :value="field.defaultValue"></Input>
                <InputNumber v-if="field.fieldType==='number'" :name="field.fieldName" class="text_input"
                             @input="valueChange($event,field)"
                             :value="field.defaultValue"></InputNumber>
                <InputNumber v-if="field.fieldType==='integer'" :name="field.fieldName" class="text_input"
                             @input="valueChange($event,field)"
                             :value="field.defaultValue"></InputNumber>
                <i-switch v-if="field.fieldType==='boolean'" :name="field.fieldName" size="large"
                          @input="valueChange($event,field)"
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
                    name: '',
                    consumer: {},
                    service: {},
                    route: {},
                    config: {},
                    enabled: true,
                },
                enabledPlugins: [],
                schemaFields: [],
                flatFields: [],
                consumers: [],
                services: [],
                routes: [],
                runOns: ['first', 'second', 'all'],
            }
        },
        watch: {
            name: function (newVal, oldVal) {
                if (oldVal) {
                    this.formItem.config = {};
                }

                this.loadPluginSchema();
            }
        },
        computed: {
            name() {
                return this.formItem.name;
            },
            serviceId: {
                get() {
                    return this.formItem.service.id;
                },
                set(newValue) {
                    if (newValue) {
                        this.formItem.service.id = newValue;
                        this.loadRoutes();
                    } else {
                        this.formItem.service.id = null;
                    }
                }

            }
        },
        mounted() {
            this.serviceId = this.$route.params.serviceId;
            this.formItem.consumer.id = this.$route.params.consumerId;
            this.pluginId = this.$route.params.pluginId;
            if (this.pluginId) {
                this.loadPlugin();
            } else {
                this.loadPlugins();
                this.loadConsumers();
                this.loadServices();
            }


        },
        methods: {
            loadPlugin() {
                this._get('/plugins/' + this.pluginId, response => {
                    this.formItem = response.data;
                    this.serviceId = this.formItem.service.id;
                    if (!this.formItem.consumer) {
                        this.formItem.consumer = {};
                    }
                    if (!this.formItem.route) {
                        this.formItem.route = {};
                    }
                    if (!this.formItem.service) {
                        this.formItem.service = {};
                    }
                    this.loadPlugins();
                    this.loadConsumers();
                    this.loadServices();
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
                        let elementType;
                        let defaultValue = fieldValue.default;
                        if (fieldValue.elements) {
                            elementType = fieldValue.elements.type;
                            defaultValue = fieldValue.elements.default;
                        }
                        let finalFieldName = parent + '.' + fieldName;
                        let formField = this.formField(finalFieldName, type, elementType, defaultValue, fieldValue.values);
                        this.flatFields.push(formField);
                        this.valueChange(formField.defaultValue, formField);
                    }

                }

            },
            unpackRecord(fields, parent) {
                for (let i = 0; i < fields.length; i++) {
                    let field = fields[i];
                    let fieldObj=Object.entries(field[1])[0];
                    let fieldName = fieldObj[0];
                    if (isNaN(fieldName)) {
                        let elementType;
                        let defaultValue = fieldObj[1].default;
                        if (fieldObj[1].elements) {
                            elementType = fieldObj[1].elements.type;
                            defaultValue = fieldObj[1].elements.default;
                        }
                        let finalFieldName = parent + '.' + fieldName;
                        let formField = this.formField(finalFieldName, fieldObj[1].type, elementType, defaultValue, fieldObj[1].values);

                        this.flatFields.push(formField);

                        this.valueChange(formField.defaultValue, formField);

                    }
                }
            },

            formField(fieldName, fieldType, elementType, defaultValue, mapValueFields) {

                let array = fieldName.split('.');
                let obj = this.formItem.config;
                for (let i = 1; i < array.length; i++) {
                    let name = array[i];
                    if (i < array.length - 1) {
                        //not the last one
                        if (!obj[name]) {
                            break;
                        }
                        obj = obj[name];
                    } else {
                        let value = obj[name];
                        if (value) {
                            if (fieldType === 'array' || fieldType === 'set') {
                                defaultValue = value.join(',');
                            } else {
                                defaultValue = value;
                            }
                        }
                    }
                }

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
                    this.services = response.data.data;
                });
            },
            loadRoutes() {
                this.routes = [];
                let url = '/routes?size=1000';
                if (this.formItem.service.id) {
                    url = '/services/' + this.formItem.service.id + '/routes'
                }
                this._get(url, response => {
                    this.routes = response.data.data;
                });

            },
            valueChange: function (val, formField) {
                if (val == null) {
                    return;
                }
                let fieldName = formField.fieldName;
                let fieldType = formField.fieldType;
                let elementType = formField.elementType;
                if (fieldType === 'array' && elementType === 'string') {
                    val = val.split(',');
                }
                if (fieldType === 'array' && elementType === 'number') {
                    let tmpStrArray = val.split(',');
                    val = [];
                    tmpStrArray.forEach(str => {
                        val.push(parseInt(str));
                    });

                }

                let nameArr = fieldName.split('.');
                let obj = this.formItem.config;
                for (let i = 1; i < nameArr.length; i++) {
                    let name = nameArr[i];
                    if (i < nameArr.length - 1) {
                        //not the last one
                        if (!obj[name]) {
                            obj[name] = {};
                        }
                        obj = obj[name];
                    } else {
                        obj[name] = val;
                    }

                }
            },
            savePlugin() {
                let _this = this;
                let formData = JSON.parse(JSON.stringify(this.formItem));

                if (!formData.service.id) {
                    formData.service = null;
                }
                if (!formData.consumer.id) {
                    formData.consumer = null;
                }
                if (!formData.route.id) {
                    formData.route = null;
                }
                console.log(formData);
                if (!this.pluginId) {
                    this._post('/plugins', formData, () => {
                        _this.$router.go(-1);
                    });
                } else {
                    //edit
                    this._patch('/plugins/' + this.pluginId, formData, () => {
                        _this.$router.go(-1);
                    });
                }

            },
            clearService() {
                this.formItem.service.id = '';
                this.$refs.service.clearSingleSelect();
            },
            isKong2() {
                return localStorage.kongVersion.startsWith('2');
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

    .clear_button {
        margin-left: 10px;
    }
</style>

