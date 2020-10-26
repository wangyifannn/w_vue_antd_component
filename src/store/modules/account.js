import { closeSocket, socket } from '@/services/ws'
import { logout } from '@/services/user'
import store from '../../store'
export default {
  namespaced: true,
  state: {
    user: undefined,
    wsToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkYXRhdmlldy9hc2siLCJpYXQiOjE2MDI5MjQ1NzYsImV4cCI6MTYzNDQ2MDU3Nn0.Tx1lfQtCdsmA047imCVWVEmkh-aPrxn-PG32XQP2Two',
    permissions: null,
    roles: null,
    routesConfig: null
  },
  getters: {
    user: state => {
      if (!state.user) {
        try {
          const user = localStorage.getItem(process.env.VUE_APP_USER_KEY)
          console.log('user==', user)
          if (user && user !== 'undefined') {
            state.user = JSON.parse(user)
          } else {
            store.dispatch('account/handleLogOut')
          }
        } catch (e) {
          console.error(e)
        }
      }
      return state.user
    },
    permissions: state => {
      if (!state.permissions) {
        try {
          const permissions = localStorage.getItem(
            process.env.VUE_APP_PERMISSIONS_KEY
          )
          state.permissions = JSON.parse(permissions)
          state.permissions = state.permissions ? state.permissions : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.permissions
    },
    roles: state => {
      if (!state.roles) {
        try {
          const roles = localStorage.getItem(process.env.VUE_APP_ROLES_KEY)
          state.roles = JSON.parse(roles)
          state.roles = state.roles ? state.roles : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.roles
    },
    routesConfig: state => {
      if (!state.routesConfig) {
        try {
          const routesConfig = localStorage.getItem(
            process.env.VUE_APP_ROUTES_KEY
          )
          state.routesConfig = JSON.parse(routesConfig)
          state.routesConfig = state.routesConfig ? state.routesConfig : []
        } catch (e) {
          console.error(e.message)
        }
      }
      return state.routesConfig
    }
  },
  mutations: {
    setWsToken(state, token) {
      state.wsToken = token
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem(process.env.VUE_APP_USER_KEY, JSON.stringify(user))
    },
    setPermissions(state, permissions) {
      state.permissions = permissions
      localStorage.setItem(
        process.env.VUE_APP_PERMISSIONS_KEY,
        JSON.stringify(permissions)
      )
    },
    setRoles(state, roles) {
      state.roles = roles
      localStorage.setItem(process.env.VUE_APP_ROLES_KEY, JSON.stringify(roles))
    },
    setRoutesConfig(state, routesConfig) {
      state.routesConfig = routesConfig
      localStorage.setItem(
        process.env.VUE_APP_ROUTES_KEY,
        JSON.stringify(routesConfig)
      )
    }
  },
  actions: {
    // 退出登录
    handleLogOut({ commit }) {
      return new Promise(resolve => {
        // 断开socket连接
        commit('setWsToken', '')
        if (socket) {
          closeSocket()
        }
        logout()
        resolve()
      })
    }
  }
}
