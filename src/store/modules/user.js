import { tokenLogin } from '@/api/request'
import { getCookieByKey, setCookie, clearAllCookies } from '@/utils/auth'
import { getRoles, saveUseInfo } from '@/utils/tools'
import { resetRouter } from '@/router'

const state = {
  token : getCookieByKey( 'company_token' ),
  avatar : require( '@/assets/imgs/avatar3.png' ),
  id : 1,
  createAt : '0001-01-01T00:00:00Z',
  updatedAt : '0001-01-01T00:00:00Z',
  phone : '17606175081',
  email : '',
  nickName : '系统用户',
  authorityId : '1',
  status : 1,
  roles : []

  // nickName : '',
  // name : '',
  // gender : '',
  // phone : '',
  // email : '',
  // address : '',
  // birthday : '',
  // country : '',
  // language : '',
  // roles : []
}

const mutations = {
  SET_TOKEN : ( state, data ) => {
    state.token = data.token
  },
  SET_USERINFOS( state, data ) {
    state.id = data.id || ''
    state.token = data.token || getCookieByKey( 'company_token' )
    state.updatedAt = data.updatedAt || ''
    state.createAt = data.createAt || ''
    state.phone = data.phone || ''
    state.email = data.email
    state.nickName = data.nickName
    state.authorityId = data.authorityId
    state.status = data.status || 1
    state.roles = data.roles
  },
  CLEAR_USERINFOS( state ) {
    state.id = ''
    state.token = ''
    state.updatedAt = ''
    state.createAt = ''
    state.phone = ''
    state.email = ''
    state.nickName = ''
    state.authorityId = ''
    state.status = 1
    state.roles = []
  },
  SET_ROLES : ( state, roles ) => {
    state.roles = roles
  }
}

const actions = {
  // 用户登录成功之后， 保存token
  saveToken( { commit }, paylaod ) {
    const { token, user } = paylaod
    commit( 'SET_TOKEN', token )
    commit( 'SET_USERINFOS', user )
    setCookie( 'company_token', token )
    // saveUseInfo( user )
  },
  // token 登录
  loginByToken( { commit, state }, payload ) {
    return new Promise( ( resolve, reject ) => {
      tokenLogin( payload )
        .then( response => {
          const { data, code } = response
          if ( !data || code !== 200 ) {
            reject( 'token登录失败' )
          }
          const { user, token } = data
          user.roles = [getRoles( user.authorityId ).roleName] || ['user']
          user.token = payload.token || token
          commit( 'SET_USERINFOS', user )
          saveUseInfo( user )
          resolve( user )
        } )
        .catch( error => {
          reject( error )
          commit( 'CLEAR_USERINFOS' )
          clearAllCookies()
          resetRouter()
        } )
    } )
  },
  // 退出
  logout( { dispatch } ) {
    return new Promise( ( resolve, reject ) => {
      dispatch( 'user/resetInfo', null, { root : true } )
      resolve()
    } )
  },
  // 清空所有登录信息
  resetInfo( { commit, dispatch } ) {
    return new Promise( ( resolve ) => {
      commit( 'CLEAR_USERINFOS' )
      clearAllCookies()
      resetRouter()
      dispatch( 'tagsView/delAllViews', null, { root : true } )
      resolve()
    } )
  }

}

export default {
  namespaced : true,
  state,
  mutations,
  actions
}
