import axios from 'axios'
// import router from '../router'
// import qs from 'qs'
import { message } from '@/components/DonMessage'
import { getCookieByKey } from '@/utils/auth'
import { initUrl } from '@/utils/tools.js'
const base = initUrl().baseUrl

axios.defaults.timeout = 3000000
axios.defaults.withCredentials = false
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.baseURL = base
console.log( 'base', base )

axios.interceptors.request.use( ( config ) => {
  if ( !navigator.onLine ) {
    message( {
      message : '请检查您的网络是否正常',
      type : 'error',
      duration : 3 * 1000
    } )
    return Promise.reject( '请检查您的网络是否正常' )
  }
  // console.log( 'config', { ...config } )
  config.headers.common['x-token'] = getCookieByKey( 'company_token' ) || ''
  // config.data = qs.stringify(config.data)
  // const processData = config.processDat
  // const contentType = config.contentType
  // const headersContentType = config.headers['Content-Type']
  // if (config.method === 'post') {
  //   if (
  //     (typeof (processData) === 'boolean' && !processData && typeof (contentType) === 'boolean' && !contentType) ||
  //     headersContentType && headersContentType.indexOf('application/json;') >= 0){
  //   } else {
  //     config.data = qs.stringify(config.data)
  //   }
  // }
  return config
}, ( error ) => {
  return Promise.reject( error )
} )

axios.interceptors.response.use(
  ( res ) => {
    const result = res.data

    // console.log( 'result', { ...result } )

    const type = Object.prototype.toString.call( result )
    if ( type === '[object Blob]' || type === '[object ArrayBuffer]' ) {
      return result
    } else {
      if ( result.code !== 200 ) {
        message( {
          message : result.message || 'Error',
          type : 'error',
          duration : 3 * 1000
        } )
        return Promise.reject( result.message || 'Error' )
      } else {
        return result
      }
    }
  },
  ( error ) => {
    if ( error && error.response ) {
      switch ( error.response.status ) {
        case 400:
          error.message = '错误请求'
          break
        case 401:
          error.message = '未授权，请重新登录'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求错误,未找到该资源'
          break
        case 405:
          error.message = '请求方法未允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器端出错'
          break
        case 501:
          error.message = '网络未实现'
          break
        case 502:
          error.message = '网络错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网络超时'
          break
        case 505:
          error.message = 'http版本不支持该请求'
          break
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // console.log( 'error', error )
      // error.message = '连接到服务器失败'
    }
    message( {
      message : error.message || '连接到服务器失败',
      type : 'error',
      duration : 2 * 1000
    } )
    return Promise.reject( error.message )
  }
)

export function request( { method = 'post', url, data } ) {
  const payload = getParams( {
    method,
    url : url
  }, { method, data } )
  return new Promise( ( resolve, reject ) => {
    axios( payload )
      .then(
        res => {
          resolve( res )
        },
        err => { reject( err ) }
      )
      .catch( ( error ) => {
        reject( error )
      } )
  } )
}

export function requestWithCookie( { method = 'post', url, data } ) {
  const payload = getParams( {
    method : method,
    withCredentials : true,
    url : url
  }, { method, data } )
  return new Promise( ( resolve, reject ) => {
    axios( payload )
      .then(
        res => { resolve( res ) },
        err => { reject( err ) }
      )
      .catch( ( error ) => {
        reject( error )
      } )
  } )
}

export function upload( { url, data, fn } ) {
  return new Promise( ( resolve, reject ) => {
    axios( {
      method : 'post',
      url : url,
      data : data,
      headers : {
        'Content-Type' : 'multipart/form-data'
      },
      onUploadProgress : function( e ) {
        fn && fn( e )
      },
      processData : false,
      contentType : false
    } )
      .then(
        res => {
          resolve( res )
        },
        err => {
          reject( err )
        }
      )
      .catch(
        ( error ) => {
          reject( error )
        }
      )
  } )
}

export function blobRequest( { method = 'post', url, data } ) {
  const payload = getParams( {
    method : method,
    url : url,
    responseType : 'blob'
  }, { method, data } )

  return new Promise( ( resolve, reject ) => {
    axios( payload )
      .then(
        res => {
          resolve( res )
        },
        err => {
          reject( err )
        }
      )
      .catch( ( error ) => {
        reject( error )
      } )
  } )
}

export function arrayBurrerRequest( { method = 'post', url, data } ) {
  const payload = getParams( {
    method : method,
    url : url,
    responseType : 'arraybuffer'
  }, { method, data } )

  return new Promise( ( resolve, reject ) => {
    axios( payload )
      .then(
        res => {
          resolve( res )
        },
        err => {
          reject( err )
        }
      )
      .catch( ( error ) => {
        reject( error )
      } )
  } )
}

// 根据methots 生成新的请求参数
function getParams( payload, { method, data } ) {
  if ( ['post', 'put', 'patch', 'delete'].indexOf( method ) >= 0 ) {
    payload.data = data
  } else {
    payload.params = data
  }
  // if ( method === 'get' ) {
  //   payload.params = data
  // } else {
  //   payload.data = data
  // }
  return payload
}
