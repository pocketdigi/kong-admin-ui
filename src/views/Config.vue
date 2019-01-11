<template>
    <div>
        <h1 style="margin-top: 100px">Kong Admin UI</h1>
        <Row id="config">
            <Col span="6">&nbsp;</Col>
            <Col span="12">
                <Form :model="formItem" :label-width="280" :rules="ruleCustom" ref="form">
                    <FormItem label="Kong Admin Api url:" prop="address">
                        <Input v-model="formItem.address" placeholder="http://192.168.0.200:8001"></Input>
                    </FormItem>
                </Form>
                <Button type="primary" @click="test">Enter</Button>&nbsp;
                <Button type="success" @click="clear">Clear address</Button>
            </Col>
            <Col span="6">&nbsp;</Col>
        </Row>
        <div class="notice">
            <p>This app will not connect other servers except your kong admin api.Your kong admin api address is save in
                browser's localstorage, so it's safety to manage your kong.</p>
            <p>All requests to Kong admin api is send by your browser,so make sure your device can access Kong admin api
                without any security auth.</p>
        </div>
        <a href="https://github.com/pocketdigi/kong-admin-ui"><img
                style="position: absolute; top: 0; left: 0; border: 0;"
                src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" alt="Fork me on GitHub"></a>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your Kong admin api url'));
                } else {
                    if (!value.startsWith('http://') && !value.startsWith('https://')) {
                        callback(new Error('url error,must start with http:// or https://'));
                        return;
                    }
                    if(value.endsWith("/")) {
                        callback(new Error('url error,cant\'t end with /'));
                        this.formItem.address=this.formItem.address.substr(0,this.formItem.address.length-1)
                        return;
                    }
                    callback();
                }
            };
            return {
                formItem: {
                    address: '',
                },
                ruleCustom: {
                    address: [
                        {validator: validatePass, trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.formItem.address = localStorage.address;
        },
        methods: {
            saveConfig() {
                localStorage.address = this.formItem.address;
                this.$router.push('/');
            },
            test() {
                let _this=this;
                //validate address
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        axios
                            .get(this.formItem.address)
                            .then(response => {
                                let kongInfo = response.data;
                                let version = kongInfo.version;
                                if (version == null) {
                                    this.$Message.error({
                                        content: 'Can\'t get your Kong\'s version,please check the address you input',
                                        duration: 10
                                    });

                                }
                                let versionArr = version.split('.');
                                if (versionArr.length !== 3) {
                                    this.versionNotSupport(version);
                                }
                                if (versionArr[0] > 0) {
                                    this.saveConfig();
                                    return;
                                }
                                if (versionArr[1] >= 14) {
                                    this.saveConfig();
                                    return;
                                }
                                this.versionNotSupport(version);
                            })
                            .catch(function () {
                                _this.$Message.error({
                                    content: 'Failed to connect with your kong admin api,please check the address you input,or your computer has no permission to visit the admin api',
                                    duration: 10
                                });

                            })
                    } else {
                        this.$Message.error('Kong admin api url error');
                    }
                });



            },
            versionNotSupport(version) {
                this.$Message.error({
                    content: 'Version ' + version + ' is not support,We only support 0.14.0 and higher',
                    duration: 10
                });
            },
            clear() {
                localStorage.removeItem('address');
                this.formItem.address = '';
            }
        }
    }
</script>

<style scoped>
    #config {
        margin-top: 50px;
    }

    input {
        margin-left: 20px;
    }

    .notice {
        margin-top: 20px;
        font-weight: bold;
    }
</style>
