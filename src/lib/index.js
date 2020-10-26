// 导入所有组件
import wTable from './MyTable/index.js'
import wUpload from './upload/index.js'
import wForm from './MyForm/index.js'
import AdminHeader from './AdminHeader/index.js'
// import 
import HttpRequest, {
  setToken,
  formatSearch,
  checkToken,
  getRealToken,
  removeToken
} from '@/utils/request/request'
const components = [wTable, wUpload, wForm, AdminHeader]
const install = function(vue) {
  /* istanbul ignore if */
  if (install.installed) return;
  /*eslint-disable*/
  components.map((component) => {
    vue.component(component.name, component); //component.name 此处使用到组件vue文件中的 name 属性
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default {
  // js方法相关
  HttpRequest,
  setToken,
  formatSearch,
  checkToken,
  getRealToken,
  removeToken,
  // 组件相关
  install,
  AdminHeader,
  wTable,
  wUpload,
  wForm
}