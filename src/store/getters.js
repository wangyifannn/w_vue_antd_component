const getters = {
  wsToken: state => state.account.wsToken,
  user: state => state.account.user,
  permissions: state => state.account.permissions,
  roles: state => state.account.roles,
  routesConfig: state => state.account.routesConfig,
  activedProject: state => state.setting.activedProject,
  errorCount: state => state.log.errorList.length
}
export default getters
