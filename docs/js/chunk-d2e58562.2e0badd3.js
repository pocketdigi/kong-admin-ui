(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d2e58562"],{"02f4":function(t,e,s){var r=s("4588"),o=s("be13");t.exports=function(t){return function(e,s){var i,n,a=String(o(e)),l=r(s),c=a.length;return l<0||l>=c?t?"":void 0:(i=a.charCodeAt(l),i<55296||i>56319||l+1===c||(n=a.charCodeAt(l+1))<56320||n>57343?t?a.charAt(l):i:t?a.slice(l,l+2):n-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,s){"use strict";var r=s("02f4")(!0);t.exports=function(t,e,s){return e+(s?r(t,e).length:1)}},"0bfb":function(t,e,s){"use strict";var r=s("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,s){"use strict";s("b0c5");var r=s("2aba"),o=s("32e9"),i=s("79e5"),n=s("be13"),a=s("2b4c"),l=s("520a"),c=a("species"),u=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),m=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var s="ab".split(t);return 2===s.length&&"a"===s[0]&&"b"===s[1]}();t.exports=function(t,e,s){var p=a(t),h=!i((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),d=h?!i((function(){var e=!1,s=/a/;return s.exec=function(){return e=!0,null},"split"===t&&(s.constructor={},s.constructor[c]=function(){return s}),s[p](""),!e})):void 0;if(!h||!d||"replace"===t&&!u||"split"===t&&!m){var f=/./[p],v=s(n,p,""[t],(function(t,e,s,r,o){return e.exec===l?h&&!o?{done:!0,value:f.call(e,s,r)}:{done:!0,value:t.call(s,e,r)}:{done:!1}})),I=v[0],_=v[1];r(String.prototype,t,I),o(RegExp.prototype,p,2==e?function(t,e){return _.call(t,this,e)}:function(t){return _.call(t,this)})}}},"28a5":function(t,e,s){"use strict";var r=s("aae3"),o=s("cb7c"),i=s("ebd6"),n=s("0390"),a=s("9def"),l=s("5f1b"),c=s("520a"),u=s("79e5"),m=Math.min,p=[].push,h="split",d="length",f="lastIndex",v=4294967295,I=!u((function(){RegExp(v,"y")}));s("214f")("split",2,(function(t,e,s,u){var _;return _="c"=="abbc"[h](/(b)*/)[1]||4!="test"[h](/(?:)/,-1)[d]||2!="ab"[h](/(?:ab)*/)[d]||4!="."[h](/(.?)(.?)/)[d]||"."[h](/()()/)[d]>1||""[h](/.?/)[d]?function(t,e){var o=String(this);if(void 0===t&&0===e)return[];if(!r(t))return s.call(o,t,e);var i,n,a,l=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),m=0,h=void 0===e?v:e>>>0,I=new RegExp(t.source,u+"g");while(i=c.call(I,o)){if(n=I[f],n>m&&(l.push(o.slice(m,i.index)),i[d]>1&&i.index<o[d]&&p.apply(l,i.slice(1)),a=i[0][d],m=n,l[d]>=h))break;I[f]===i.index&&I[f]++}return m===o[d]?!a&&I.test("")||l.push(""):l.push(o.slice(m)),l[d]>h?l.slice(0,h):l}:"0"[h](void 0,0)[d]?function(t,e){return void 0===t&&0===e?[]:s.call(this,t,e)}:s,[function(s,r){var o=t(this),i=void 0==s?void 0:s[e];return void 0!==i?i.call(s,o,r):_.call(String(o),s,r)},function(t,e){var r=u(_,t,this,e,_!==s);if(r.done)return r.value;var c=o(t),p=String(this),h=i(c,RegExp),d=c.unicode,f=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(I?"y":"g"),b=new h(I?c:"^(?:"+c.source+")",f),x=void 0===e?v:e>>>0;if(0===x)return[];if(0===p.length)return null===l(b,p)?[p]:[];var g=0,C=0,y=[];while(C<p.length){b.lastIndex=I?C:0;var k,$=l(b,I?p:p.slice(C));if(null===$||(k=m(a(b.lastIndex+(I?0:C)),p.length))===g)C=n(p,C,d);else{if(y.push(p.slice(g,C)),y.length===x)return y;for(var R=1;R<=$.length-1;R++)if(y.push($[R]),y.length===x)return y;C=g=k}}return y.push(p.slice(g)),y}]}))},"520a":function(t,e,s){"use strict";var r=s("0bfb"),o=RegExp.prototype.exec,i=String.prototype.replace,n=o,a="lastIndex",l=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t[a]||0!==e[a]}(),c=void 0!==/()??/.exec("")[1],u=l||c;u&&(n=function(t){var e,s,n,u,m=this;return c&&(s=new RegExp("^"+m.source+"$(?!\\s)",r.call(m))),l&&(e=m[a]),n=o.call(m,t),l&&n&&(m[a]=m.global?n.index+n[0].length:e),c&&n&&n.length>1&&i.call(n[0],s,(function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(n[u]=void 0)})),n}),t.exports=n},"5f1b":function(t,e,s){"use strict";var r=s("23c6"),o=RegExp.prototype.exec;t.exports=function(t,e){var s=t.exec;if("function"===typeof s){var i=s.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"7f7f":function(t,e,s){var r=s("86cc").f,o=Function.prototype,i=/^\s*function ([^ (]*)/,n="name";n in o||s("9e1e")&&r(o,n,{configurable:!0,get:function(){try{return(""+this).match(i)[1]}catch(t){return""}}})},"9aee":function(t,e,s){"use strict";s("fa32")},a26f:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("Breadcrumb",[s("BreadcrumbItem",{attrs:{to:"/"}},[t._v(t._s(t.$t("breadcrumb.home")))]),s("BreadcrumbItem",{attrs:{to:"/route"}},[t._v("Route")]),t.edit?s("BreadcrumbItem",[t._v(t._s(t.routeId))]):s("BreadcrumbItem",[t._v(t._s(t.$t("breadcrumb.addRoute")))])],1),s("Form",{staticStyle:{"margin-top":"20px"},attrs:{model:t.formItem,"label-width":150}},[s("FormItem",{attrs:{label:"name:"}},[s("Input",{staticClass:"text_input",attrs:{placeholder:"Enter Route name ..."},model:{value:t.formItem.name,callback:function(e){t.$set(t.formItem,"name",e)},expression:"formItem.name"}}),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldName")))])],1),s("FormItem",{attrs:{label:"protocols:"}},[s("CheckboxGroup",{model:{value:t.formItem.protocols,callback:function(e){t.$set(t.formItem,"protocols",e)},expression:"formItem.protocols"}},[s("Checkbox",{attrs:{label:"http"}}),s("Checkbox",{attrs:{label:"https"}}),s("Checkbox",{attrs:{label:"tcp"}}),s("Checkbox",{attrs:{label:"tls"}})],1),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldProtocols")))])],1),s("FormItem",{attrs:{label:"methods:"}},[s("CheckboxGroup",{model:{value:t.formItem.methods,callback:function(e){t.$set(t.formItem,"methods",e)},expression:"formItem.methods"}},[s("Checkbox",{attrs:{label:"GET"}}),s("Checkbox",{attrs:{label:"POST"}}),s("Checkbox",{attrs:{label:"DELETE"}}),s("Checkbox",{attrs:{label:"PATCH"}}),s("Checkbox",{attrs:{label:"PUT"}}),s("Checkbox",{attrs:{label:"HEAD"}}),s("Checkbox",{attrs:{label:"OPTIONS"}})],1),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldMethods")))])],1),s("FormItem",{attrs:{label:"hosts:"}},[s("Input",{staticClass:"text_input_multiple",attrs:{placeholder:"Use commas to separate multiple hosts"},model:{value:t.hosts,callback:function(e){t.hosts=e},expression:"hosts"}}),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldHosts"))+" ")])],1),s("FormItem",{attrs:{label:"paths:"}},[s("Input",{staticClass:"text_input_multiple",attrs:{placeholder:"Use commas to separate multiple paths"},model:{value:t.paths,callback:function(e){t.paths=e},expression:"paths"}}),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldPaths"))+" ")])],1),s("FormItem",{attrs:{label:"headers:"}},[s("Input",{staticClass:"text_input_multiple",attrs:{placeholder:""},model:{value:t.headers,callback:function(e){t.headers=e},expression:"headers"}}),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldHeaders"))+" ")])],1),s("FormItem",{attrs:{label:"regex_priority:"}},[s("InputNumber",{model:{value:t.formItem.regex_priority,callback:function(e){t.$set(t.formItem,"regex_priority",e)},expression:"formItem.regex_priority"}}),s("div",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldRegexPriority")))])],1),s("FormItem",{attrs:{label:"https_redirect_status_code:"}},[s("InputNumber",{model:{value:t.formItem.https_redirect_status_code,callback:function(e){t.$set(t.formItem,"https_redirect_status_code",e)},expression:"formItem.https_redirect_status_code"}}),s("div",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldHttpsRedirectStatusCode")))])],1),s("FormItem",{attrs:{label:"strip_path:"}},[s("i-switch",{attrs:{size:"large"},model:{value:t.formItem.strip_path,callback:function(e){t.$set(t.formItem,"strip_path",e)},expression:"formItem.strip_path"}},[s("span",{attrs:{slot:"open"},slot:"open"},[t._v("true")]),s("span",{attrs:{slot:"close"},slot:"close"},[t._v("false")])]),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldStripPath")))])],1),s("FormItem",{attrs:{label:"preserve_host:"}},[s("i-switch",{attrs:{size:"large"},model:{value:t.formItem.preserve_host,callback:function(e){t.$set(t.formItem,"preserve_host",e)},expression:"formItem.preserve_host"}},[s("span",{attrs:{slot:"open"},slot:"open"},[t._v("true")]),s("span",{attrs:{slot:"close"},slot:"close"},[t._v("false")])]),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldPreserveHost")))])],1),s("FormItem",{attrs:{label:"snis:"}},[s("Input",{staticClass:"text_input_multiple",attrs:{placeholder:"Use commas to separate multiple snis"},model:{value:t.snis,callback:function(e){t.snis=e},expression:"snis"}}),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldSnis"))+" ")])],1),s("FormItem",{attrs:{label:"sources:"}},[t._l(t.formItem.sources,(function(e,r){return s("Row",{key:r},[s("Col",{attrs:{span:"4"}},[s("Input",{attrs:{type:"text",placeholder:"10.1.0.0/16"},model:{value:e.ip,callback:function(s){t.$set(e,"ip",s)},expression:"item.ip"}})],1),s("Col",{attrs:{span:"2"}},[s("Input",{attrs:{type:"number",placeholder:"1234"},model:{value:e.port,callback:function(s){t.$set(e,"port",t._n(s))},expression:"item.port"}})],1),s("Col",{attrs:{span:"4",offset:"1"}},[s("Button",{on:{click:function(e){return t.formItem.sources.splice(r,1)}}},[t._v("Delete")])],1)],1)})),s("Row",[s("Col",{attrs:{span:"6"}},[s("Button",{attrs:{type:"dashed",long:"",icon:"md-add"},on:{click:t.addSource}},[t._v("Add item")])],1)],1),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldSources"))+" ")])],2),s("FormItem",{attrs:{label:"destinations:"}},[t._l(t.formItem.destinations,(function(e,r){return s("Row",{key:r},[s("Col",{attrs:{span:"4"}},[s("Input",{attrs:{type:"text",placeholder:"10.1.0.0/16"},model:{value:e.ip,callback:function(s){t.$set(e,"ip",s)},expression:"item.ip"}})],1),s("Col",{attrs:{span:"2"}},[s("Input",{attrs:{type:"number",placeholder:"1234"},model:{value:e.port,callback:function(s){t.$set(e,"port",t._n(s))},expression:"item.port"}})],1),s("Col",{attrs:{span:"4",offset:"1"}},[s("Button",{on:{click:function(e){return t.formItem.destinations.splice(r,1)}}},[t._v("Delete")])],1)],1)})),s("Row",[s("Col",{attrs:{span:"6"}},[s("Button",{attrs:{type:"dashed",long:"",icon:"md-add"},on:{click:t.addDestination}},[t._v("Add item")])],1)],1),s("span",{staticClass:"field_desc"},[t._v(t._s(t.$t("route.fieldDestinations")))])],2),s("FormItem",{attrs:{label:"service:"}},[s("Select",{staticStyle:{width:"400px"},attrs:{disabled:!t.serviceIdCanChanged},model:{value:t.formItem.service.id,callback:function(e){t.$set(t.formItem.service,"id",e)},expression:"formItem.service.id"}},t._l(t.services,(function(e){return s("Option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.id)+"    "+t._s(e.name)+"\n                ")])})),1)],1),s("FormItem",[s("Button",{attrs:{type:"primary"},on:{click:t.saveRoute}},[t._v(t._s(t.$t("common.save")))])],1)],1)],1)},o=[],i=(s("28a5"),s("7f7f"),{name:"AddRoute",data:function(){return{formItem:{name:"",protocols:["http","https"],methods:[],hosts:[],paths:[],headers:null,regex_priority:0,https_redirect_status_code:426,strip_path:!0,preserve_host:!1,snis:[],sources:[],destinations:[],service:{id:""}},serviceId:"",routeId:"",edit:!1,serviceIdCanChanged:!0,services:[]}},mounted:function(){this.routeId=this.$route.params.id,this.serviceId=this.$route.params.serviceId,this.edit=null!=this.routeId,null!=this.serviceId&&(this.formItem.service.id=this.serviceId,this.serviceIdCanChanged=!1),this.edit&&this.loadRoute(),this.loadServices()},methods:{saveRoute:function(){var t=this,e={};this.formItem.id&&(e.id=this.formItem.id),this.formItem.name&&(e.name=this.formItem.name),this.formItem.url&&(e.url=this.formItem.url),null!=this.formItem.sources&&this.formItem.sources.length>0?e.sources=this.formItem.sources:e.sources=null,null!=this.formItem.destinations&&this.formItem.destinations.length>0?e.destinations=this.formItem.destinations:e.destinations=null,null!=this.formItem.protocols&&this.formItem.protocols.length>0?e.protocols=this.formItem.protocols:e.protocols=null,null!=this.formItem.hosts&&this.formItem.hosts.length>0?e.hosts=this.formItem.hosts:e.hosts=null,null!=this.formItem.methods&&this.formItem.methods.length>0?e.methods=this.formItem.methods:e.methods=null,null!=this.formItem.paths&&this.formItem.paths.length>0?e.paths=this.formItem.paths:e.paths=null,this.formItem.headers?e.headers=this.formItem.headers:e.headers=null,e.regex_priority=this.formItem.regex_priority,e.https_redirect_status_code=this.formItem.https_redirect_status_code,e.strip_path=this.formItem.strip_path,e.preserve_host=this.formItem.preserve_host,null!=this.formItem.snis&&this.formItem.snis.length>0?e.snis=this.formItem.snis:e.snis=null,e.service=this.formItem.service,this.edit?this._patch("/routes/"+this.routeId,e,(function(){t.$router.go(-1)})):this._post("/routes/",e,(function(){t.$router.go(-1)}))},loadRoute:function(){var t=this,e=this;this._get("/routes/"+this.routeId,(function(s){var r=s.data;null===r.methods&&(r.methods=[]),e.formItem=r,t.hosts=t.formItem.hosts?t.formItem.hosts.join(","):"",t.paths=t.formItem.paths?t.formItem.paths.join(","):""}))},loadServices:function(){var t=this;this._get("/services",(function(e){t.services=[],Array.prototype.push.apply(t.services,e.data.data)}))},addDestination:function(){null==this.formItem.destinations&&(this.formItem.destinations=[]),this.formItem.destinations.push({ip:"",port:""})},addSource:function(){null==this.formItem.sources&&(this.formItem.sources=[]),this.formItem.sources.push({ip:"",port:""})}},computed:{hosts:{set:function(t){this.formItem.hosts=t?t.split(","):[]},get:function(){return this.formItem.hosts?this.formItem.hosts.join(","):""}},paths:{set:function(t){this.formItem.paths=t?t.split(","):[]},get:function(){return this.formItem.paths?this.formItem.paths.join(","):""}},headers:{set:function(t){this.formItem.headers=t?JSON.parse(t):null},get:function(){return this.formItem.headers?JSON.stringify(this.formItem.headers):""}},snis:{set:function(t){this.formItem.snis=t?t.split(","):[]},get:function(){return this.formItem.snis?this.formItem.snis.join(","):""}}}}),n=i,a=(s("9aee"),s("2877")),l=Object(a["a"])(n,r,o,!1,null,"b99f0954",null);e["default"]=l.exports},aae3:function(t,e,s){var r=s("d3f4"),o=s("2d95"),i=s("2b4c")("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},b0c5:function(t,e,s){"use strict";var r=s("520a");s("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},fa32:function(t,e,s){}}]);
//# sourceMappingURL=chunk-d2e58562.2e0badd3.js.map