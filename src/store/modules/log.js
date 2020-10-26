import { saveErrorLogger } from '@/services/common'
export default {
  state: {
    errorList: []
  },
  mutations: {
    addError(state, error) {
      state.errorList.push(error)
    }
  },
  actions: {
    addErrorLog({ commit, rootState }, info) {
      const {
        user: { token, userId, userName }
      } = rootState
      const data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId,
        userName
      }
      saveErrorLogger(info).then(() => {
        commit('addError', data)
      })
    }
  }
}
