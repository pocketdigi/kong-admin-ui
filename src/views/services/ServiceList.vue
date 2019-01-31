<template>
    <div id="content">
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/services">Service</BreadcrumbItem>
        </Breadcrumb>
        <Row>
            <Col span="12"> <h1>Service List:</h1></Col>
            <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                <Button type="primary" size="small" @click="addService">Add Service</Button>
            </Col>
        </Row>
        <div id="table">
            <Table border :columns="columns" :data="services" :loading="loading">
                <template slot-scope="{ row }" slot="name">
                    <strong>{{ row.name }}</strong>
                </template>
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(row.id)">View</Button>
                    <Button type="error" size="small" @click="deleteDialog(row.id)">Delete</Button>
                </template>
            </Table>
            <div class="page">
                <ButtonGroup>
                    <Button type="primary" icon="ios-skip-backward" @click="previous" :disabled="offsetStack.length===0"></Button>
                    <Button type="primary" icon="ios-skip-forward" @click="next" :disabled="!offset"></Button>
                </ButtonGroup>
            </div>
        </div>

    </div>

</template>

<script>
    import EventBus from '@/event-bus'
    import moment from 'moment'

    export default {
        name: "ServiceList",
        data() {
            return {
                loading: true,
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width: 110
                    },
                    {
                        title: 'name',
                        slot: 'name',
                        width: 100
                    },
                    {
                        title: 'host',
                        key: 'host',
                        width: 110
                    },
                    {
                        title: 'created_at',
                        key: 'createAtStr',
                        width: 160
                    },
                    {
                        title: 'protocol',
                        key: 'protocol',
                        width: 90
                    },
                    {
                        title: 'port',
                        key: 'port',
                        width: 70
                    },
                    {
                        title: 'path',
                        key: 'path'
                    },
                    {
                        title: 'updated_at',
                        key: 'updatedAtStr',
                        width: 160
                    },
                    {
                        title: 'Action',
                        slot: 'action',
                        width: 150,
                        align: 'center'
                    }
                ],
                services: [],
                offset:'',
                offsetStack:[]
            }
        },

        mounted() {
            EventBus.$emit('changePage',{activeName:'service-list',openNames:['service']});
            this.loadServices();
        },
        methods: {
            addService() {
                this.$router.push({path:`/services/add`})
            },
            show(serviceId) {
                this.$router.push('/services/' + serviceId)
            },
            deleteDialog(serviceId) {
                let _this = this;
                this.$Modal.confirm({
                    title: 'Delete Service',
                    content: '<p>Are you sure you would like to delete</p>' + '<p style="font-weight: bold">' + serviceId + '</p>',
                    onOk: () => {
                        _this._delete('/services/' + serviceId, () => {
                            this.$Message.info('Service deleted!');
                            this.loadServices();
                        });
                    },
                    onCancel: () => {
                    }
                });
            },
            loadServices(offset) {
                let url;
                if (offset) {
                    url = '/services?offset=' + offset + '&size=10';
                } else {
                    url = '/services?size=10';
                    this.offsetStack=[];
                    this.offset='';
                }
                this.loading = true;
                this._get(url, response => {
                    this.services = [];
                    Array.prototype.push.apply(this.services, response.data.data);
                    this.services.map(function (service) {
                        var createDate = moment.unix(service.created_at)
                        service.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                        var updatedDate = moment.unix(service.updated_at)
                        service.updatedAtStr = updatedDate.format('YYYY-MM-DD HH:mm:ss');
                    });
                    this.offset=response.data.offset;
                    this.loading = false;
                });
            },
            next() {
                let offset=this.offset;
                this.loadServices(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset=this.offsetStack[this.offsetStack.length-1];
                this.loadServices(offset);
            }
        }
    }
</script>

<style scoped>
    #table {
        margin-top: 10px;
    }

    .page {
        text-align: right;
        margin-top: 10px;
        font-size: 1rem;
    }
</style>
