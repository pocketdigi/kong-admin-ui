<template>
    <Row>
        <Col span="3">
            <div id="title">Kong Admin UI</div>
        </Col>
        <Col span="21" class="config">
            <div>
                <p><router-link to="/config">{{address}}</router-link></p>
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
        mounted() {
            this.address = localStorage.address
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
