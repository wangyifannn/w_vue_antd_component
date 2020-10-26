<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <router-link
        v-if="isMobile || layout === 'head'"
        to="/"
        :class="['logo', isMobile ? null : 'pc', headerTheme]"
      >
        <img width="32" :src="logoSrc" />
        <h1 v-if="!isMobile">{{ systemName }}</h1>
      </router-link>
      <a-divider v-if="isMobile" type="vertical" />
      <div :class="['logo', theme]">
        <router-link to="/dashboard">
          <img :src="logoSrc" />
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

import { mapState, mapMutations } from 'vuex'
import { projectDataApi } from '@/services/common'
export default {
  name: 'AdminHeader',
  components: { HeaderAvatar, ProjectMenu },
  props:{
    collapsed:{
      type:Boolean,
      default:false
    },
    logoSrc:{
      type:String,
      default:'../../assets/img/logo.png'
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
      headerTheme:'light',
      searchActive: false,
      projectData: []
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
    this.getProjectData()
  },
  methods: {
    logoutHandle(){
      this.$emit('logout')
    },
    async getProjectData() {
      await projectDataApi()
        .then(res => {
          this.projectData = res.data
        })
        .catch(err => {
          console.log(err)
          this.projectData = [
            { name: '问诊管理', path: 'http://taobao.com' },
            { name: '疫苗管理', path: "http://baidu.com" },
            { name: '商城库存', path: "http://tianmao.com" },
            { name: '回访管理', path: "http://vip.com"},
            { name: '信息库', path: "http://yapi.com" }
          ]
        })
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
