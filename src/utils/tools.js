
import GLOBAL_DATA from '@/api/global.js'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { setCookie } from '@/utils/auth'

// 获取设备指纹
export const getFingerprint = async() => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  const visitorId = result.visitorId
  return visitorId
}

// 获取当前env环境名称
export function getEnvs() {
  const env = process.env.NODE_ENV
  const href = window.location.href
  let envStr = ''
  if ( env === 'development' ) {
    envStr = 'dev'
  } else {
    if ( href.indexOf( 'fat' ) >= 0 ) {
      envStr = 'fat'
    } else if ( href.indexOf( 'uat' ) >= 0 ) {
      envStr = 'uat'
    } else {
      envStr = 'pro'
    }
  }
  return envStr
}

// 根据环境获取URL
export function initUrl() {
  const envStr = getEnvs()
  // console.log( 'envStr', envStr, process.env, envStr === 'dev' )
  // console.log( 'VUE_APP_PREFIX', process.env.VUE_APP_PREFIX, process.env.VUE_APP_PREFIX )
  const baseUrl = envStr === 'dev' ? process.env.VUE_APP_PREFIX : GLOBAL_DATA[envStr]['baseUrl']
  return {
    baseUrl
  }
}
// 根据当前 协议名称 自动转化url（https  http 互转）
export function changeProtocol( url ) {
  const protocol = window.location.protocol
  let result
  if ( protocol.startsWith( 'https' ) && !url.startsWith( 'https' ) ) {
    result = 'https' + url.substring( 4 )
  } else if ( !protocol.startsWith( 'https' ) && url.startsWith( 'https' ) ) {
    result = 'http' + url.substring( 5 )
  }
  return result
}

// 时间格式互转 s =>
export function secondsToStr( temp ) {
  const years = Math.floor( temp / 31536000 )
  if ( years ) {
    return years + ' year' + numberEnding( years )
  }
  const days = Math.floor( ( temp %= 31536000 ) / 86400 )
  if ( days ) {
    return days + ' day' + numberEnding( days )
  }
  const hours = Math.floor( ( temp %= 86400 ) / 3600 )
  if ( hours ) {
    return hours + ' hour' + numberEnding( hours )
  }
  const minutes = Math.floor( ( temp %= 3600 ) / 60 )
  if ( minutes ) {
    return minutes + ' minute' + numberEnding( minutes )
  }
  const seconds = temp % 60
  return seconds + ' second' + numberEnding( seconds )
  function numberEnding( number ) {
    return ( number > 1 ) ? 's' : ''
  }
}

export function kebabCase( s ) {
  return s.replace( /[A-Z]/g, ( m ) => `-${m.toLowerCase()}` )
}

// 获取文件大小
export function getFileSizes( size ) {
  let num
  const size1 = size / 1024
  if ( size1 >= 512000 ) {
    num = ( size1 / 1024 / 1024 ).toFixed( 1 ) + 'GB'
  } else if ( size1 >= 500 && size1 <= 512000 ) {
    num = ( size1 / 1024 ).toFixed( 1 ) + 'MB'
  } else {
    num = size1.toFixed( 1 ) + 'KB'
  }
  return num
}

// 获取文件的临时路径 blob:....
export const getObjectURL = async( file ) => {
  let url = null
  if ( window.createObjectURL != undefined ) { // basic
    url = await window.createObjectURL( file )
  } else if ( window.URL != undefined ) { // mozilla(firefox)
    url = await window.URL.createObjectURL( file )
  } else if ( window.webkitURL != undefined ) { // webkit or chrome
    url = await window.webkitURL.createObjectURL( file )
  }
  return {
    url
  }
}
// 读取image 用来验证图片宽高大小等
export function readImage( file, success, error ) {
  const reader = new FileReader()
  reader.readAsDataURL( file )
  reader.onload = () => {
    const image = new Image()
    image.src = reader.result
    image.onload = () => {
      success && success( {
        image,
        url : reader.result
      } )
    }
  }
  reader.onerror = () => {
    error && error()
  }
}
// 读取文件， 用来验证文件
export function readFiles( file, success, error ) {
  const reader = new FileReader()
  reader.readAsDataURL( file )
  reader.onload = () => {
    success && success( {
      url : reader.result
    } )
  }
  reader.onerror = () => {
    error && error()
  }
}

export function alertMsg( self, params ) {
  const customClass = params.customClass || 'alert-msg-box'
  return self.$alert( `${params.message}`, params.title, {
    customClass : `${customClass}`,
    showClose : params.showClose || false,
    closeOnClickModal : false,
    // closeOnClickModal : params.closeOnClickModal !== false,
    center : params.center || false,
    confirmButtonClass : params.confirmButtonClass || 'remote-default h32 mini-size',
    confirmButtonText : params.confirmButtonText || '确定'
  } )
}

// confirm 错误提示
export function confirmMsg( self, params ) {
  const customClass = params.customClass || 'leave-room'
  return self.$confirm( `${params.message}`, params.title ? params.title : '',
    {
      customClass : `${customClass} remote-message-box remote-confirm-box`,
      showClose : params.showClose || false,
      cancelButtonClass : params.cancelButtonClass || 'remote-light h32 mini-size',
      cancelButtonText : params.cancelButtonText || '',
      confirmButtonClass : params.confirmButtonClass || 'remote-default h32 mini-size',
      confirmButtonText : params.confirmButtonText || '确定',
      dangerouslyUseHTMLString : params.dangerouslyUseHTMLString || false,
      center : params.center || false,
      closeOnClickModal : params.closeOnClickModal !== false
    } )
}

export function stringFormat( content, dicts, hasstr = true ) {
  // console.log( 'stringFormat', content, dicts )
  // eslint-disable-next-line no-extend-native
  String.prototype.myReplace = function( f, e ) { // 吧f替换成e
    var reg = new RegExp( f, 'g' ) // 创建正则RegExp对象
    return this.replace( reg, e )
  }
  const result = {}
  result.Flag = false
  dicts = dicts || []
  if ( dicts.length > 0 ) {
    for ( var item in dicts ) {
      if ( content.indexOf( dicts[item] ) >= 0 ) {
        if ( !result.Flag ) result.Flag = true
        // var reg1 = /(<\/?em.*?>)/gi
        // const str = content.replace( reg1, '' )
        // console.log( 'str', str )
        // const str = content

        // content = hasstr
        //   ? content.myReplace( dicts[item], '<em style="color: red">' + dicts[item] + '（敏感词）</em> ' )
        //   : content.myReplace( dicts[item], '<em style="color: red">' + dicts[item] + '</em> ' )
        // const reg3 = /<(span class=\"minganci\")[^>]*>[^<]*<\/(\1)>/gi
        // console.log( 'test', reg3.test( content ) )

        content = hasstr
          ? content.myReplace( dicts[item], '<em class="minganci">' + dicts[item] + '（敏感词）</em>' )
          : content.myReplace( dicts[item], '<em class="minganci">' + dicts[item] + '</em>' )

        // content = hasstr
        //   ? content.myReplace( dicts[item], '<em class="minganci">' + dicts[item] + '（敏感词）</em>' )
        //   : content.myReplace( dicts[item], '<em class="minganci">' + dicts[item] + '</em>' )
      }
    }
  }
  // console.log( '替换了content', content )
  return content
}

export function replactProtcol( url ) {
  const protocol = window.location.protocol
  let newUrl = url
  if ( protocol.startsWith( 'https' ) ) {
    if ( !url.startsWith( 'https' ) ) {
      newUrl = 'https' + url.substring( 4 )
    }
  } else {
    if ( url.startsWith( 'https' ) ) {
      newUrl = 'https' + url.substring( 5 )
    }
  }
  return newUrl
}
// 根据 来源获取导航
export const getSourceNav = async( source ) => {
  let sourceName
  if ( source == 'about' ) {
    sourceName = 'About' // 关于协会
  } else if ( source == 'dynamic' ) {
    sourceName = 'Dynamic' // 工作动态
  } else if ( source == 'members' ) {
    sourceName = 'Members' // 会员条件
  } else if ( source == 'special' ) {
    sourceName = 'Special' // 专属服务
  } else {
    sourceName = 'About'
  }
  return sourceName
}

// 角色权限,1 超管 2 管理员 3 操作员
export function getRoles( role ) {
  let roleName = ''
  let roleZh = ''
  switch ( role ) {
    case 1:
      roleName = 'platform'
      roleZh = '超级管理员'
      break

    case 2:
      roleName = 'manger'
      roleZh = '管理员'
      break

    case 3:
      roleName = 'user'
      roleZh = '操作员'
      break

    default :
      roleName = 'user'
      roleZh = '操作员'
  }
  return { roleName, roleZh }
}

// 角色权限,1 超管 2 管理员 3 操作员
export function saveUseInfo( data ) {
  const { id, updatedAt, createAt, phone, email, nickName, authorityId, status } = data
  setCookie( 'company_id', id )
  setCookie( 'company_updatedAt', updatedAt )
  setCookie( 'company_createAt', createAt )
  setCookie( 'company_phone', phone )
  setCookie( 'company_email', email )
  setCookie( 'company_nickName', nickName )
  setCookie( 'company_authorityId', authorityId )
  setCookie( 'company_status', status )
}

// 用户列表 -- 转换数据
export function changeUserList( data ) {
  const result = []
  if ( data.length > 0 ) {
    data.forEach( user => {
      const obj = {
        ...user,
        account : user.phone || user.email,
        userName : user.nickName,
        auth : getRoles( user.authorityId ).roleZh
      }
      result.push( obj )
    } )
  }
  return result
}

// 链接管理 - 类型管理
export function changeTypes( data ) {
  const result = []
  // if ( data.length > 0 ) {
  //   data.forEach( user => {
  //     const obj = {
  //       ...user,
  //       account : user.phone || user.email,
  //       userName : user.nickName,
  //       auth : getRoles( user.authorityId ).roleZh
  //     }
  //     result.push( obj )
  //   } )
  // }
  return result
}
// 链接管理 - 链接管理
export function changeLinks( data ) {
  const result = []
  if ( data.length > 0 ) {
    data.forEach( item => {
      const obj = {
        ...item,
        links : item.redirect || item.links
      }
      result.push( obj )
    } )
  }
  return result
}

// 职位 - 员工列表
export function changeWorkers( data, jobs ) {
  const result = []
  if ( data.length > 0 && jobs.length > 0 ) {
    data.forEach( item => {
      const titleId = item.titleId
      const job = jobs.find( j => j.id == titleId )
      const obj = {
        ...item,
        jobName : job ? job.title : '未知职位'
      }
      result.push( obj )
    } )
  }
  return result
}
