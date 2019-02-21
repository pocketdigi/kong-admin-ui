<template>
    <div>
        <h1 style="margin-top: 100px">{{$t('app.name')}}</h1>
        <Row id="config">
            <Col span="6">&nbsp;</Col>
            <Col span="12">
                <Form :model="formItem" :label-width="280" :rules="ruleCustom" ref="form">
                    <FormItem label="Kong Admin Api url:" prop="address">
                        <Input v-model="formItem.address" placeholder="http://192.168.0.200:8001"></Input>
                    </FormItem>
                </Form>
                <Button type="primary" @click="test">{{$t('config.button.enter')}}</Button>&nbsp;
                <Button type="success" @click="clear">{{$t('config.button.clear')}}</Button>
            </Col>
            <Col span="6">&nbsp;</Col>~
        </Row>
        <div class="notice">
            <p>{{$t('config.button.notice1')}}</p>
            <p>{{$t('config.button.notice2')}}</p>

        </div>
        <a href="https://github.com/pocketdigi/kong-admin-ui"><img
                style="position: absolute; top: 0; left: 0; border: 0;"
                src="https://s3.amazonaws.com/github/ribbons/forkme_left_green_007200.png" alt="Fork me on GitHub"></a>
        <a @click="changeLanguage"  style="position: absolute; top: 20px; right: 20px; border: 0;">{{language}}</a>
    </div>

</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            const validatePass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error(this.$t('config.error.urlEmpty')));
                } else {
                    if (!value.startsWith('http://') && !value.startsWith('https://')) {
                        callback(new Error(this.$t('config.error.urlError')));
                        return;
                    }
                    if(value.endsWith("/")) {
                        callback(new Error(this.$t('config.error.urlEndWithSlash')));
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
                                        content: this.$t('config.error.apiError'),
                                        duration: 10
                                    });

                                }
                                let versionArr = version.split('.');
                                if (versionArr.length !== 3) {
                                    this.versionNotSupport(version);
                                    return;
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
                                    content: _this.$t('config.error.connectFail'),
                                    duration: 10
                                });

                            })
                    } else {
                        this.$Message.error(this.$t('config.error.urlInvalid'));
                    }
                });

            },
            versionNotSupport(version) {
                this.$Message.error({
                    content: this.$t('config.error.versionNotSupport',{version:version}),
                    duration: 10
                });
            },
            clear() {
                localStorage.removeItem('address');
                this.formItem.address = '';
            },
            changeLanguage(){
                this.$i18n.locale==='zh'?this.$i18n.locale='en':this.$i18n.locale='zh';
                localStorage.language=this.$i18n.locale;
            }
        },
        computed:{
            language(){
                return this.$i18n.locale==='zh'?'English':'Chinese';
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
