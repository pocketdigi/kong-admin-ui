<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">{{$t('breadcrumb.home')}}</BreadcrumbItem>
            <BreadcrumbItem to="/certificates">Certificate</BreadcrumbItem>
            <BreadcrumbItem v-if="!edit">{{$t('breadcrumb.add_certificate')}}</BreadcrumbItem>
            <BreadcrumbItem v-else>{{certificateId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="cert:">
                <Input v-model="formItem.cert" type="textarea" :rows="8" placeholder="cert ..." ></Input>
                <span class="field_desc">{{$t('certificate.cert')}}</span>
            </FormItem>

            <FormItem label="key:">
                <Input v-model="formItem.key" type="textarea" :rows="8" placeholder="key ..." ></Input>
                <span class="field_desc">{{$t('certificate.key')}}</span>
            </FormItem>

            <FormItem label="snis:">
                <Input v-model="snis_str" class="text_input"></Input>
                <span class="field_desc">{{$t('certificate.snis')}}</span>
            </FormItem>
            <FormItem label="tags:">
                <Input v-model="tags_str" class="text_input"></Input>
                <span class="field_desc">{{$t('certificate.tags')}}</span>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="saveCertificates">{{$t('common.save')}}</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>

    export default {
        name: 'AddCertificate',
        data() {
            return {
                formItem: {
                    cert: '',
                    key: '',
                    snis: [],
                    tags: []
                },
                certificateId: '',
                edit: false,
            }
        },
        mounted() {
            this.certificateId = this.$route.params.certificateId;
            this.edit = this.certificateId != null;
            if (this.edit) {
                this.loadCertificate();
            }
        },
        methods: {
            saveCertificates() {
                let _this = this;
                if (this.formItem.cert === '') {
                    delete this.formItem.cert;
                }
                if (this.formItem.tags === '') {
                    delete this.formItem.tags;
                }

                if (!this.edit) {
                    this._post('/certificates/', this.formItem, () => {
                        _this.$router.go(-1);
                    });
                } else {
                    //edit
                    this._patch('/certificates/' + this.certificateId, this.formItem, () => {
                        _this.$router.go(-1);
                    });
                }
            },
            loadCertificate() {
                let _this = this;
                this._get('/certificates/' + this.certificateId, response => {
                    _this.formItem = response.data;
                    if( this.formItem.snis==null) {
                        this.formItem.snis=[];
                    }
                    this.snis_str = this.formItem.snis.join(',');
                    if( this.formItem.tags==null) {
                        this.formItem.tags=[];
                    }
                    this.tags_str = this.formItem.tags.join(',');
                });
            }
        },
        computed:{
            snis_str:{
                get(){
                    if(this.formItem.snis.length>0){
                        return this.formItem.snis.join(',');
                    }
                    return '';
                },
                set(newValue){
                    if(newValue){
                        this.formItem.snis=newValue.split(',');
                    }else{
                        this.formItem.snis=[];
                    }

                }
            },
            tags_str:{
                get(){
                    if(this.formItem.tags.length>0){
                        return this.formItem.tags.join(',');
                    }
                    return '';
                },
                set(newValue){
                    if(newValue){
                        this.formItem.tags=newValue.split(',');
                    }else{
                        this.formItem.tags=[];
                    }

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
