import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getCookieByKey } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure( { showSpinner : false } )

const whiteList = ['/login', '/auth-redirect']

router.beforeEach( async( to, from, next ) => {
  NProgress.start()
  document.title = getPageTitle( to.meta.title )
  const hasToken = getCookieByKey( 'company_token' )
  if ( hasToken ) {
    if ( to.path === '/login' ) {
      next( { path : '/' } )
      NProgress.done()
      // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if ( hasRoles ) {
        next()
      } else {
        try {
          // const tokenData = {}
          // tokenData.token = hasToken
          const { roles } = await store.dispatch( 'user/loginByToken', {} )
          const accessRoutes = await store.dispatch( 'permission/generateRoutes', roles )
          router.addRoutes( accessRoutes )
          next( { ...to, replace : true } )
        } catch ( error ) {
          await store.dispatch( 'user/resetInfo' )
          // Message.error(error || 'Has Error')
          next( `/login?redirect=${to.path}` )
          NProgress.done()
        }
      }
    }
  } else {
    if ( whiteList.indexOf( to.path ) !== -1 ) {
      next()
    } else {
      next( `/login?redirect=${to.path}` )
      NProgress.done()
    }
  }
} )

router.afterEach( () => {
  NProgress.done()
} )
