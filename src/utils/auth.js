import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get( TokenKey )
}

export function setToken( token ) {
  return Cookies.set( TokenKey, token )
}

export function removeToken() {
  return Cookies.remove( TokenKey )
}

import { getEnv } from '@/utils/tools.js'
// eslint-disable-next-line no-unused-vars
let hostStr
let cookiePreFix = ''
if ( window.location.host.indexOf( 'shadowcreator.com' ) >= 0 ) {
  hostStr = '.shadowcreator.com'
  if ( getEnv === 'fat' ) {
    cookiePreFix = 'fat_'
  } else if ( getEnv === 'uat' ) {
    cookiePreFix = 'uat_'
  } else {
    cookiePreFix = ''
  }
} else {
  cookiePreFix = 'fat_'
  hostStr = window.location.hostname
}
const cookieParams = {
  path : '/',
  domain : hostStr
}

export function getAllCookies() {
  var cookies = document.cookie.split( /;\s/g )
  var cookieObj = {}
  cookies.forEach( function( item ) {
    var key = item.split( '=' )[0]
    cookieObj[key] = item.split( '=' )[1]
  } )
  return cookieObj
}

export function getCookieByKey( key, off ) {
  let keyStr = ''
  if ( !off ) {
    keyStr = cookiePreFix + '' + key
  } else {
    keyStr = key
  }
  return Cookies.get( keyStr )
}
// setUserInfos
export function setCookie( key, value, params ) {
  params = params === undefined ? {
    expires : 7,
    path : '/',
    domain : hostStr || undefined
  } : params
  const keyStr = cookiePreFix + '' + key
  return Cookies.set( keyStr, value, params )
}

export function removeCookieByKey( key, off = false ) {
  const keyStr = off ? key : cookiePreFix + '' + key
  return Cookies.remove( keyStr, cookieParams )
}

export function clearAllCookies() {
  var keys = Object.keys( getAllCookies() )
  keys.forEach( key => {
    removeCookieByKey( key, true )
  } )
}

export function getStorageBy( key ) {
  if ( key ) {
    var storage = window.localStorage
    var data = storage.getItem( key )
    if ( data == '' || data == null || JSON.stringify( data ) == '{}' ) {
      data = ''
    } else {
      data = JSON.parse( data )
    }
    return data
  }
}

export function addStorageBy( key, data ) {
  if ( key ) {
    var storage = window.localStorage
    var $data = JSON.stringify( data )
    storage.setItem( key, $data )
  }
}

export function clearStorage( key, isAll = false ) {
  if ( key ) {
    var storage = window.localStorage
    if ( isAll ) {
      storage.clear()
    } else {
      storage.removeItem( key )
    }
  }
}

export default {
  getAllCookies,
  getCookieByKey,
  setCookie,
  removeCookieByKey,
  clearAllCookies
}
