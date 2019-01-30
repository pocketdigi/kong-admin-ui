<template>
    <div id="content">
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/plugins">Plugin</BreadcrumbItem>
        </Breadcrumb>
        <Row>
            <Col span="12"><h1>Plugin List:</h1></Col>
            <Col span="12" style="text-align:right;position: absolute;top: 30%;right: 0px">
                <Button type="primary" size="small" @click="addPlugin">Add Plugin</Button>
            </Col>
        </Row>
        <PluginTable v-bind:plugins="plugins"></PluginTable>
        <div class="page">
            <ButtonGroup>
                <Button type="primary" icon="ios-skip-backward" @click="previous"
                        :disabled="offsetStack.length===0"></Button>
                <Button type="primary" icon="ios-skip-forward" @click="next" :disabled="!offset"></Button>
            </ButtonGroup>
        </div>

    </div>
</template>

<script>
    import EventBus from '@/event-bus'
    import moment from 'moment'
    import PluginTable from '@/components/plugins/PluginTable'

    export default {
        name: "PluginList",
        data() {
            return {
                plugins: [],
                offset: '',
                offsetStack: []
            }
        },
        components: {PluginTable},
        mounted() {
            this.loadPlugins(null);
            EventBus.$emit('changePage',{activeName:'plugin-list',openNames:['plugin']});
            EventBus.$on('pluginChange',({pluginId}) => {
                console.log("plugin change:"+pluginId);
                for(let plugin of this.plugins) {
                    if(plugin.id===pluginId) {
                        this.loadPlugins();
                        break;
                    }
                }
            });

        },
        methods: {
            loadPlugins(offset) {
                let url;
                if (offset) {
                    url = '/plugins?offset=' + offset + '&size=10';
                } else {
                    url = '/plugins?size=10';
                }
                this._get(url, response => {
                    this.plugins = response.data.data;
                    this.offset = response.data.offset;
                    this.plugins.map(function (plugin) {
                        let createDate = moment.unix(plugin.created_at);
                        plugin.createAtStr = createDate.format('YYYY-MM-DD HH:mm:ss');
                    });

                });

            },
            addPlugin() {
                this.$router.push({path: `/plugins/add`});
            },
            loadRoutes(offset) {
                let url;
                if (offset) {
                    url = '/routes?offset=' + offset + '&size=10';
                } else {
                    url = '/routes?size=10';
                }
                this._get(url, response => {
                    this.routes = response.data.data;
                    this.offset = response.data.offset;
                });

            },
            next() {
                let offset = this.offset;
                this.loadPlugins(this.offset);
                this.offsetStack.push(offset);
            },
            previous() {
                this.offsetStack.pop();
                let offset = this.offsetStack[this.offsetStack.length - 1];
                this.loadPlugins(offset);
            }
        },
        destroyed() {
            EventBus.$off('pluginChange');
        }
    }
</script>

<style scoped>

</style>
