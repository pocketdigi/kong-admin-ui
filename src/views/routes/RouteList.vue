<template>
    <div id="content">
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/routes">Route</BreadcrumbItem>
        </Breadcrumb>
        <Row>
            <Col span="12"> <h1>Route List:</h1></Col>
            <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                <Button type="primary" size="small" @click="addRoute">Add Route</Button>
            </Col>
        </Row>
        <RouteTable  v-bind:routes="routes"></RouteTable>
        <div class="page">
            <ButtonGroup>
                <Button type="primary" icon="ios-skip-backward" @click="previous" :disabled="offsetStack.length===0"></Button>
                <Button type="primary" icon="ios-skip-forward" @click="next" :disabled="!offset"></Button>
            </ButtonGroup>
        </div>

    </div>

</template>

<script>
    import EventBus from '@/event-bus'
    import RouteTable from '@/components/services/RouteTable'
    export default {
        name: "RouterList",
        data (){
            return {
                routes:[],
                offset:'',
                offsetStack:[]
            }
        },
        components: {
            RouteTable
        },
        mounted() {
            EventBus.$emit('changePage',{activeName:'route-list',openNames:['route']});
            this.loadRoutes();

            EventBus.$on('routeChange',({routeId}) => {
                console.log("route change:"+routeId);
                for(let route of this.routes) {
                    if(route.id===routeId) {
                        this.loadRoutes();
                        break;
                    }
                }
            });
        },
        methods: {
            addRoute() {
                this.$router.push({path:`/routes/add`})
            },
            loadRoutes(offset) {
                let url;
                if (offset) {
                    url = '/routes?offset=' + offset + '&size=10';
                } else {
                    url = '/routes?size=10';
                }
                this._get(url,response => {
                    this.routes=response.data.data;
                    this.offset=response.data.offset;
                });

            },
            next() {
                let offset=this.offset;
                this.loadRoutes(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset=this.offsetStack[this.offsetStack.length-1];
                this.loadRoutes(offset);
            }
        },
        destroyed() {
            EventBus.$off('routeChange');
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
