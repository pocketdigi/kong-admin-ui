<template>
    <Row id="menu">
        <Col span="24">
            <Menu :theme="theme2" width="auto" v-bind:active-name="activeName" v-bind:open-names="openNames" ref="menu">
                <router-link to="/">
                    <MenuItem name="index">
                        <Icon type="ios-home"/>
                        Kong Info
                    </MenuItem>
                </router-link>

                <Submenu name="service">
                    <template slot="title">
                        <Icon type="ios-paper"/>
                        Service
                    </template>
                    <router-link to="/services">
                        <MenuItem name="service-list">Service List</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="route">
                    <template slot="title">
                        <Icon type="ios-people"/>
                        Route
                    </template>
                    <router-link to="/routes">
                        <MenuItem name="route-list">Route List</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="upstream">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        Upstream
                    </template>
                    <router-link to="/upstreams">
                        <MenuItem name="upstream-list">Upstream List</MenuItem>
                    </router-link>

                </Submenu>
                <Submenu name="consumer">
                    <template slot="title">
                        <Icon type="ios-stats"/>
                        Consumer
                    </template>
                    <router-link to="/consumers">
                        <MenuItem name="consumer-list">Consumer List</MenuItem>
                    </router-link>

                </Submenu>
            </Menu>
        </Col>
    </Row>
</template>
<script>
    import EventBus from '@/event-bus'

    export default {
        data() {
            return {
                theme2: 'dark',
                activeName: '',
                openNames: []
            }
        },
        mounted() {
            EventBus.$on('changePage', ({activeName, openNames}) => {
                this.activeName = activeName;
                this.openNames = openNames;
                this.$nextTick(() => {
                    if(this.$refs.menu){
                        this.$refs.menu.updateOpened();
                        this.$refs.menu.updateActiveName();
                    }
                })
            });
        },
        destroyed() {
            EventBus.$off('changePage');
        }
    }
</script>

<style scoped>
    #menu {
        background: #17233d;
    }

    .router-link-active {
        color: white;
    }
</style>
