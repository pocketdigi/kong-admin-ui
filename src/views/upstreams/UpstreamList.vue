<template>
    <div id="content">
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/upstream">Upstream</BreadcrumbItem>
        </Breadcrumb>
        <Row>
            <Col span="12"> <h1>Upstream List:</h1></Col>
            <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                <Button type="primary" size="small" @click="addUpstream">Add Upstream</Button>
            </Col>
        </Row>
        <!--<UpstreamTable v-bind:upstreams="upstreams"></UpstreamTable>-->

        <div id="table">
            <Table border :columns="columns" :data="upstreams" :loading="loading">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="edit(row.id)">View</Button>
                    <Button type="error" size="small" @click="deleteDialog(row.id)">Delete</Button>
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
        name: "UpstreamList",
        data (){
            return {
                upstreams:[],
                loading: true,
                columns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: 'name',
                        key: 'name',
                        width:100
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width:160
                    },
                    {
                        title: 'hash_on',
                        key: 'hash_on',
                        width:140
                    },
                    {
                        title: 'hash_on_cookie_path',
                        key: 'hash_on_cookie_path',
                        width:140

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
            EventBus.$emit('changePage',{activeName:'upstream-list',openNames:['upstream']});
            this.loadUpstreams();


        },
        methods: {
            addUpstream() {
                this.$router.push({path:`/upstreams/add`})
            },
            loadUpstreams(offset) {
                let url;
                if (offset) {
                    url = '/upstreams?offset=' + offset + '&size=10';
                } else {
                    url = '/upstreams?size=10';
                    this.offsetStack=[];
                    this.offset='';
                }
                this.loading = true;
                this._get(url,response => {
                    this.upstreams=response.data.data;

                    this.upstreams.map(function (upstream) {
                        let createDate=moment.unix(upstream.created_at)
                        upstream.createAtStr=createDate.format('YYYY-MM-DD HH:mm:ss');
                        let updatedDate=moment.unix(upstream.updated_at)
                        upstream.updatedAtStr=updatedDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.offset=response.data.offset;
                    this.loading = false;
                });
                this.loading = false;
            },
            edit (upstreamId) {
                this.$router.push('/upstreams/edit/'+upstreamId);
            },
            deleteDialog(upstreamId) {
                let _this=this;
                this.$Modal.confirm({
                    title: 'Delete Upstream',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + upstreamId + '</p>',
                    onOk: () => {
                        _this._delete('/upstreams/' + upstreamId,() =>{
                            this.$Message.info('Upstream deleted!');
                            this.loadUpstreams();
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            next() {
                let offset=this.offset;
                this.loadUpstreams(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset=this.offsetStack[this.offsetStack.length-1];
                this.loadUpstreams(offset);
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
