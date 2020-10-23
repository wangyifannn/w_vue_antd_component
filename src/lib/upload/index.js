/** index.js **/
import wUpload from './index.vue';
wUpload.install = Vue => Vue.component(wUpload.name, wUpload);//.name就是开始说的vue文件暴露出来的name名，ldcPagination整个组件
export default wUpload