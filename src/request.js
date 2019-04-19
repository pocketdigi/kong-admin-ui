import axios from 'axios';
export default {
    install: function(Vue,) {
        Vue.prototype._post= function (path,data,callback) {
            let _this=this;
            let checkResult = checkAddress(_this);
            if(!checkResult) {
                return;
            }
            let address=localStorage.address;

            axios
                .post(address + path, data,getConfig())
                .then(response => {
                    callback(response);
                })
                .catch(function (error) {
                    errorHandler(error,_this);
                });
        };
        Vue.prototype._get= function (path,callback,errorCallback) {
            let _this=this;
            let checkResult = checkAddress(_this);
            if(!checkResult) {
                return;
            }
            let address=localStorage.address;
            axios
                .get(address + path,getConfig())
                .then(response => {
                    callback(response);
                })
                .catch(function (error) {
                    if(errorCallback!=null) {
                        errorCallback(error)
                    }else{
                        errorHandler(error,_this);
                    }
                });
        };
        Vue.prototype._delete = function (path,callback,errorCallback) {
            let _this=this;
            let checkResult = checkAddress(_this);
            if(!checkResult) {
                return;
            }
            let address=localStorage.address;
            axios.delete(address + path,getConfig())
                .then(response => {
                    callback(response);
                })
                .catch(function (error) {
                    if(errorCallback!=null) {
                        errorCallback(error)
                    }else{
                        errorHandler(error,_this);
                    }
                });

        };
        Vue.prototype._patch = function (path, data, callback) {
            let _this=this;
            let checkResult = checkAddress(_this);
            if(!checkResult) {
                return;
            }
            let address=localStorage.address;
            axios
                .patch(address + path, data,getConfig())
                .then(response => {
                    callback(response);
                })
                .catch(function (error) {
                    errorHandler(error,_this);
                });
        };
        function checkAddress(_this) {
            let address=localStorage.address;
            if(address==null) {
                _this.$router.push('/config');
                return false;
            }
            return true;
        }
        function errorHandler(error,_this) {
            if(error.response&&error.response.status!==404) {
                _this.$Message.error({content: error.response.data.message, duration: 5});
            }else{
                _this.$Message.error({content: 'Failed to connect with your kong admin api,please check the address you input,or your computer has no permission to visit the admin api', duration: 10});
                _this.$router.push('/config');
            }
        }

        function getConfig() {
            let config={};
            if(localStorage.headers) {
                config.headers=JSON.parse(localStorage.headers);
            }
            return config;
        }
    }
}
