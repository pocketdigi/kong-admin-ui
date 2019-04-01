<template>
    <Row id="menu">
        <Col span="24">
            <Menu :theme="theme2" width="auto" v-bind:active-name="activeName" v-bind:open-names="openNames" ref="menu">
                <router-link to="/">
                    <MenuItem name="index">
                        <Icon type="ios-stats"/>
                        {{$t('breadcrumb.info')}}
                    </MenuItem>
                </router-link>

                <Submenu name="service">
                    <template slot="title">
                        <Icon type="ios-paper"/>
                        Service
                    </template>
                    <router-link to="/services">
                        <MenuItem name="service-list">{{$t('breadcrumb.service_list')}}</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="route">
                    <template slot="title">
                        <Icon type="ios-people"/>
                        Route
                    </template>
                    <router-link to="/routes">
                        <MenuItem name="route-list">{{$t('breadcrumb.route_list')}}</MenuItem>
                    </router-link>
                </Submenu>
                <Submenu name="upstream">
                    <template slot="title">
                        <Icon type="ios-desktop"/>
                        Upstream
                    </template>
                    <router-link to="/upstreams">
                        <MenuItem name="upstream-list">{{$t('breadcrumb.upstream_list')}}</MenuItem>
                    </router-link>

                </Submenu>
                <Submenu name="consumer">
                    <template slot="title">
                        <Icon type="ios-person"/>
                        Consumer
                    </template>
                    <router-link to="/consumers">
                        <MenuItem name="consumer-list">{{$t('breadcrumb.consumer_list')}}</MenuItem>
                    </router-link>

                </Submenu>
                <Submenu name="plugin">
                    <template slot="title">
                        <Icon type="ios-glasses"/>
                        Plugin
                    </template>
                    <router-link to="/plugins">
                        <MenuItem name="plugin-list">{{$t('breadcrumb.plugin_list')}}</MenuItem>
                    </router-link>

                </Submenu>
                <Submenu name="certificate">
                    <template slot="title">
                        <Icon type="ios-glasses"/>
                        Certificate
                    </template>
                    <router-link to="/certificates">
                        <MenuItem name="certificate-list">{{$t('breadcrumb.certificate_list')}}</MenuItem>
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
