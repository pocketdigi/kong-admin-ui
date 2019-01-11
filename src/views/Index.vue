<template>
    <div class="layout">
        <Layout>
            <Header style="padding: 0px">
                <HeaderComponent></HeaderComponent>
            </Header>
            <Layout>
                <Sider hide-trigger>
                    <keep-alive>
                        <Menu></Menu>
                    </keep-alive>
                </Sider>
                <Content>
                    <router-view class="router-content"></router-view>
                </Content>
            </Layout>
            <Footer><FooterComponent></FooterComponent></Footer>
        </Layout>
    </div>
</template>
<script>
    import Menu from '../components/Menu'
    import HeaderComponent from '../components/Header'
    import FooterComponent from '../components/Footer'

    export default {
        name: 'index',
        methods: {

        },
        components: {
            Menu,
            HeaderComponent,
            FooterComponent
        },
        mounted() {
        }
    }
</script>
<style scoped>
    .router-content {
        margin: 20px;
        text-align: left;
    }
</style>
