export default {
  namespaced: true,
  state: {
    wsToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJkYXRhdmlldy9hc2siLCJpYXQiOjE2MDI5MjQ1NzYsImV4cCI6MTYzNDQ2MDU3Nn0.Tx1lfQtCdsmA047imCVWVEmkh-aPrxn-PG32XQP2Two',
  },
  mutations: {
    setWsToken(state, token) {
      state.wsToken = token
    }
  },
  actions: {
  }
}
