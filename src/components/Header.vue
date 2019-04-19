<template>
    <Row>
        <Col span="3">
            <div id="title">Kong Admin UI</div>
        </Col>
        <Col span="21" class="config">
            <div>
                <p><router-link to="/config">{{address}}</router-link>&nbsp;&nbsp;&nbsp;&nbsp; <a @click="changeLanguage">{{language}}</a> </p>
            </div>
        </Col>
    </Row>

</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                address: 'aaa'
            }
        },
        computed:{
          language(){
            return this.$i18n.locale==='zh'?'English':'Chinese';
          }
        },
        mounted() {
            this.address = localStorage.address
        },
        methods:{
            changeLanguage(){
                this.$i18n.locale==='zh'?this.$i18n.locale='en':this.$i18n.locale='zh';
                localStorage.language=this.$i18n.locale;
            }
        }
    }
</script>

<style scoped>
    #title {
        color: white;
        font-size: 1.4rem;
    }
    .config {
        color: white;
        height: 64px;
    }
    .config div{
        position: absolute;
        top: 30px;
        right: 0;
        padding-right: 20px;
    }
    .config p {
        line-height: normal;
    }
    .config a {
        color: white;
    }
</style>
