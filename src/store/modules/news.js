
const state = {
  editType : {
    source : 'about', // 页面来源 ：
    type : 'create',
    pid : '',
    needPreview : true,
    id : ''
  },
  currentPreview : {
    source : 'about', // 页面来源 ：
    details : {}
  },
  isChange : false
}

const mutations = {
  SET_EDIT_TYPES : ( state, data ) => {
    state.editType = data ? { ...data } : {
      source : 'about',
      type : 'create',
      pid : '',
      needPreview : true,
      id : ''
    }
  },
  IS_CHANGE_ARTICLES : ( state, data ) => {
    // console.log( 'IS_CHANGE_ARTICLES', data )
    state.isChange = data
  },
  SET_ARTICLES : ( state, data ) => {
    state.currentPreview = { ...data }
  }
}

const actions = {
  // 设置当前创建 | 编辑 文章的类型信息
  setEditType( { commit, state }, payload ) {
    return new Promise( ( resolve, reject ) => {
      commit( 'SET_EDIT_TYPES', payload )
      resolve( payload )
    } )
  },
  //
  isChange( { commit, state }, payload ) {
    return new Promise( ( resolve, reject ) => {
      commit( 'IS_CHANGE_ARTICLES', payload )
      resolve( payload )
    } )
  },
  //
  setCurrentPreviewNews( { commit, state }, payload ) {
    return new Promise( ( resolve, reject ) => {
      commit( 'SET_ARTICLES', payload )
      resolve( payload )
    } )
  }

}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
