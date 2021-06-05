import Vue from 'vue'
import Cookies from 'js-cookie'
import '@/assets/fonts/fonts.css'
import 'normalize.css/normalize.css'
import './assets/iconfonts/iconfont.css'
import Element from 'element-ui'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
import './icons'
import './permission'
import uploader from 'vue-simple-uploader'
Vue.use( uploader )
import * as filters from './filters'
Vue.use( Element, {
  size : Cookies.get( 'size' ) || 'medium'
} )

Object.keys( filters ).forEach( key => {
  Vue.filter( key, filters[key] )
} )

Vue.config.productionTip = false

new Vue( {
  el : '#app',
  router,
  store,
  render : h => h( App )
} )
