<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <router-link
        v-if="isMobile || layout === 'head'"
        to="/"
        :class="['logo', isMobile ? null : 'pc', headerTheme]"
      >
        <img width="32" :src="logoSrc || defaultLog" />
        <h1 v-if="!isMobile">{{ systemName }}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <div :class="['logo', theme]">
        <router-link to="/dashboard">
          <img :src="logoSrc || defaultLog" />
          <h1>{{ systemName }}</h1>
        </router-link>
      </div>
      <a-icon
        v-if="layout !== 'head'"
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="toggleCollapse"
      />
      <!-- 顶部导航-项目模块 -->
      <div class="admin-header-menu">
        <ProjectMenu class="head-menu" :options="projectData" />
      </div>
      <div :class="['admin-header-right', headerTheme]">
        <header-avatar :user="user" @logout="logoutHandle" class="header-item" />
      </div>
    </div>
  </a-layout-header>
</template>
<script>
import HeaderAvatar from './HeaderAvatar'
import ProjectMenu from '@/lib/menu/ProjectMenu'
export default {
  name: 'AdminHeader',
  components: { HeaderAvatar, ProjectMenu },
  props:{
    collapsed:{
      type:Boolean,
      default:false
    },
    projectData:{
      type:Array,
      default:()=>{
        return [
            { key:'ask', text: '咨询', url: 'http://taobao.com' },
            { key:'system', text: '系统', url: "http://baidu.com" },
        ]
      }
    },
    logoSrc:{
      type:String,
      default:''
    },
    user:{
      type:Object,
      default:()=>{}
    },
    isMobile:{
      type:Boolean,
      default:false
    },
    layout:{
      type:String,
      default:'side'
    },
    systemName:{
      type:String,
      default:'家庭健康服务平台'
    },
    pageWidth:{
      // 内容区域宽度，fixed:固定宽度，fluid:流式宽度
      type:String,
      default:'fixed'
    }
  },
  data() {
    return {
      defaultLog: require('../../assets/img/logo.png'),
      headerTheme:'light',
      searchActive: false,
    }
  },
  computed: {
    menuWidth() {
      const { layout, searchActive } = this
      const headWidth = layout === 'head' ? '100% - 188px' : '100%'
      const extraWidth = searchActive ? '600px' : '400px'
      return `calc(${headWidth} - ${extraWidth})`
    }
  },
  mounted() {
  },
  methods: {
    logoutHandle(){
      this.$emit('logout')
    },
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
  }
}
</script>

<style lang="less" scoped>
@import 'index';
</style>
