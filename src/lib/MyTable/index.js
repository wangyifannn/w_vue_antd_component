/** index.js **/
import wTable from './index.vue';
wTable.install = Vue => Vue.component(wTable.name, wTable);//.name就是开始说的vue文件暴露出来的name名，ldcPagination整个组件
export default wTable