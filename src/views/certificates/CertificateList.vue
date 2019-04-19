<template>
    <div id="content">
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/certificate">Certificate</BreadcrumbItem>
        </Breadcrumb>
        <Row>
            <Col span="12"> <h1>{{$t('breadcrumb.certificate_list')}}:</h1></Col>
            <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                <Button type="primary" size="small" @click="addCertificate">{{$t('breadcrumb.add_certificate')}}</Button>
            </Col>
        </Row>

        <div id="table">
            <Table border :columns="columns" :data="certificates" :loading="loading">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">{{$t('common.view')}}</Button>
                    <Button type="error" size="small" @click="deleteDialog(row.id)">{{$t('common.delete')}}</Button>
                </template>
            </Table>
        </div>

        <div class="page">
            <ButtonGroup>
                <Button type="primary" icon="ios-skip-backward" @click="previous" :disabled="offsetStack.length===0"></Button>
                <Button type="primary" icon="ios-skip-forward" @click="next" :disabled="!offset"></Button>
            </ButtonGroup>
        </div>


    </div>

</template>

<script>
    import moment from 'moment'
    import EventBus from '@/event-bus'
    export default {
        name: "CertificateList",
        data (){
            return {
                certificates:[],
                loading: true,
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width:300
                    },
                    {
                        title: 'snis',
                        key: 'snis',
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width:160
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                offset:'',
                offsetStack:[]
            }
        },

        mounted() {
            EventBus.$emit('changePage',{activeName:'certificate-list',openNames:['certificate']});
            this.loadCertificates();

        },
        methods: {
            addCertificate() {
                this.$router.push({path:`/certificates/add`})
            },
            loadCertificates(offset) {
                let url;
                if (offset) {
                    url = '/certificates?offset=' + offset + '&size=10';
                } else {
                    url = '/certificates?size=10';
                    this.offsetStack=[];
                    this.offset='';
                }
                this.loading = true;
                this._get(url,response => {
                    this.certificates=response.data.data;

                    this.certificates.map(function (certificate) {
                        let createDate=moment.unix(certificate.created_at)
                        certificate.createAtStr=createDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.offset=response.data.offset;
                    this.loading = false;
                });
                this.loading = false;
            },
            edit (certificateId) {
                this.$router.push('/certificates/edit/'+certificateId);
            },
            deleteDialog(certificateId) {
                let _this=this;
                this.$Modal.confirm({
                    title: this.$t('common.delete'),
                    content: _this.$t('common.deleteMessage',{id:certificateId}),
                    onOk: () => {
                        _this._delete('/certificates/' + certificateId,() =>{
                            this.$Message.info(this.$t('common.deleted',{type:'Certificate'}));
                            this.loadCertificates();
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            next() {
                let offset=this.offset;
                this.loadCertificates(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset=this.offsetStack[this.offsetStack.length-1];
                this.loadCertificates(offset);
            }
        }
    }
</script>

<style scoped>
    .page {
        text-align: right;
        margin-top: 10px;
        font-size: 1rem;
    }
</style>
