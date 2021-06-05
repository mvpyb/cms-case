const getters = {
  sidebar : state => state.app.sidebar,
  size : state => state.app.size,
  device : state => state.app.device,
  visitedViews : state => state.tagsView.visitedViews,
  cachedViews : state => state.tagsView.cachedViews,
  permission_routes : state => state.permission.routes,
  errorLogs : state => state.errorLog.logs,

  // 用户信息
  token : state => state.user.token,
  avatar : state => state.user.avatar,
  id : state => state.user.id,
  createAt : state => state.user.createAt,
  updatedAt : state => state.user.updatedAt,
  email : state => state.user.email,
  phone : state => state.user.phone,
  nickName : state => state.user.nickName,
  authorityId : state => state.user.authorityId,
  status : state => state.user.status,
  // introduction : state => state.user.introduction,
  roles : state => state.user.roles,

  isChange : state => state.news.isChange,
  editType : state => state.news.editType,
  currentPreview : state => state.news.currentPreview
}
export default getters
