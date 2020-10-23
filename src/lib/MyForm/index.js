/** index.js **/
import wForm from './index.vue';
wForm.install = Vue => Vue.component(wForm.name, wForm);//.name就是开始说的vue文件暴露出来的name名，ldcPagination整个组件
export default wForm