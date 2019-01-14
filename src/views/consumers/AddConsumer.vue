<template>
    <div>
        <Breadcrumb>
            <BreadcrumbItem to="/">Home</BreadcrumbItem>
            <BreadcrumbItem to="/consumers">Consumer</BreadcrumbItem>
            <BreadcrumbItem v-if="!consumerId">Add Consumer</BreadcrumbItem>
            <BreadcrumbItem v-else>{{consumerId}}</BreadcrumbItem>
        </Breadcrumb>

        <Form :model="formItem" :label-width="120" style="margin-top: 20px">
            <FormItem label="username:">
                <Input v-model="formItem.username" placeholder="Enter username ..." class="text_input"></Input>
                <span class="field_desc">The unique username of the consumer. You must send either this field or custom_id with the request.</span>
            </FormItem>
            <FormItem label="custom_id:">
                <Input v-model="formItem.custom_id" placeholder="Enter custom_id ..." class="text_input"></Input>
                <span class="field_desc">Field for storing an existing unique ID for the consumer - useful for mapping Kong with users in your existing database. You must send either this field or username with the request.</span>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="saveConsumer">Save</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "AddConsumer",
        data() {
            return {
                formItem: {
                    username: '',
                    custom_id:''
                },
                consumerId: '',
                serviceIdCanChanged: true
            }
        },
        mounted(){
            this.consumerId = this.$route.params.id;
            if(this.consumerId) {
                this.loadConsumer();
            }
        },
        methods:{
            saveConsumer() {
                let _this = this;
                if (this.formItem.username === '') {
                    this.formItem.username = null;
                }
                if (this.formItem.custom_id === '') {
                    this.formItem.custom_id = null;
                }

                if (!this.consumerId) {
                    this._post('/consumers/', this.formItem, () => {
                        _this.$router.go(-1);
                    });
                } else {
                    //edit
                    this._patch('/consumers/' + this.consumerId, this.formItem, () => {
                        _this.$router.go(-1);
                    });
                }
            },
            loadConsumer() {
                this._get('/consumers/'+this.consumerId,response =>{
                    this.formItem=response.data;
                });
            }
        }
    }
</script>

<style scoped>
    .field_desc {
        margin-left: 10px;
    }

    .text_input {
        max-width: 200px;
    }

    .text_input_multiple {
        max-width: 400px;
    }
</style>
