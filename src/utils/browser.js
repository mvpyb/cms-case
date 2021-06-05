/**
 * 浏览器信息相关的操作
 *
 *
 * */

// get brower
export function GetCurrentBrowser() {
  const ua = navigator.userAgent.toLocaleLowerCase()
  // var agent = navigator.userAgent.toLowerCase() ;

  const regStr_Opera = /opera [\d.]+;/gi
  const regStr_ie = /msie [\d.]+;/gi
  const regStr_ff = /firefox\/[\d.]+/gi
  const regStr_chrome = /chrome\/[\d.]+/gi
  const regStr_saf = /safari\/[\d.]+/gi
  var browserType = null; var version = null

  if ( ua.match( /msie/ ) != null || ua.match( /trident/ ) != null ) {
    browserType = 'IE'
    version = ua.match( regStr_ie )
  } else if ( ua.match( /firefox/ ) != null ) {
    browserType = 'firefox'
    version = ua.match( regStr_ff )
  } else if ( ua.match( /ucbrowser/ ) != null ) {
    browserType = 'UC'
  } else if ( ua.match( /opera/ ) != null || ua.match( /opr/ ) != null ) {
    browserType = 'opera'
    version = ua.match( regStr_Opera )
  } else if ( ua.match( /bidubrowser/ ) != null ) {
    browserType = 'baidu'
  } else if ( ua.match( /metasr/ ) != null ) {
    browserType = 'sougou'
  } else if ( ua.match( /tencenttraveler/ ) != null || ua.match( /qqbrowse/ ) != null ) {
    browserType = 'QQ'
  } else if ( ua.match( /maxthon/ ) != null ) {
    browserType = 'maxthon'
  } else if ( ua.match( /chrome/ ) != null ) {
    var is360 = _mime( 'type', 'application/vnd.chromium.remoting-viewer' )
    if ( is360 ) {
      browserType = '360'
    } else {
      browserType = 'chrome'
      version = ua.match( regStr_chrome )
    }
  } else if ( ua.match( /safari/ ) != null ) {
    browserType = 'Safari'
    version = ua.match( regStr_saf )
  } else {
    browserType = 'others'
    version = null
  }
  console.log( 'browserType browserType', browserType )
  console.log( 'browserType version', version )
  return { browserType, version }
}

export function GetCurrentBrowserV2() {
  var sys = {}
  var ua = navigator.userAgent.toLowerCase()
  var s;
  // eslint-disable-next-line no-cond-assign
  ( s = ua.match( /edge\/([\d.]+)/ ) ) ? sys.edge = s[1]
    // eslint-disable-next-line no-cond-assign
    : ( s = ua.match( /rv:([\d.]+)\) like gecko/ ) ) ? sys.ie = s[1]
    // eslint-disable-next-line no-cond-assign
      : ( s = ua.match( /msie ([\d.]+)/ ) ) ? sys.ie = s[1]
      // eslint-disable-next-line no-cond-assign
        : ( s = ua.match( /firefox\/([\d.]+)/ ) ) ? sys.firefox = s[1]
        // eslint-disable-next-line no-cond-assign
          : ( s = ua.match( /chrome\/([\d.]+)/ ) ) ? sys.chrome = s[1]
          // eslint-disable-next-line no-cond-assign
            : ( s = ua.match( /opera.([\d.]+)/ ) ) ? sys.opera = s[1]
            // eslint-disable-next-line no-cond-assign
              : ( s = ua.match( /version\/([\d.]+).*safari/ ) ) ? sys.safari = s[1] : 0

  if ( sys.edge ) return { browserType : 'Edge', version : sys.edge }
  if ( sys.ie ) return { browserType : 'IE', version : sys.ie }
  if ( sys.firefox ) return { browserType : 'Firefox', version : sys.firefox }
  if ( sys.chrome ) return { browserType : 'Chrome', version : sys.chrome }
  if ( sys.opera ) return { browserType : 'Opera', version : sys.opera }
  if ( sys.safari ) return { browserType : 'Safari', version : sys.safari }
  return { browserType : '', version : '0' }
}

function _mime( option, value ) {
  var mimeTypes = navigator.mimeTypes
  for ( var mt in mimeTypes ) {
    if ( mimeTypes[mt][option] === value ) {
      return true
    }
  }
  return false
}

// get os
export function GetOs() {
  const sUserAgent = navigator.userAgent.toLocaleLowerCase()
  const platform = navigator.platform.toLowerCase()
  const isWin = ( platform === 'win32' ) || ( platform === 'windows' )
  const isMac = ( platform === 'mac68k' ) || ( platform === 'macppc' ) || ( platform === 'macintosh' ) || ( platform === 'macintel' )
  if ( isMac ) return 'Mac'
  var isUnix = ( platform === 'x11' ) && !isWin && !isMac
  if ( isUnix ) return 'Unix'
  var isLinux = ( String( platform ).indexOf( 'linux' ) > -1 )
  if ( isLinux ) return 'Linux'
  if ( isWin ) {
    var isWin2K = sUserAgent.indexOf( 'windows nt 5.0' ) > -1 || sUserAgent.indexOf( 'windows 2000' ) > -1
    if ( isWin2K ) return 'Win2000'
    var isWinXP = sUserAgent.indexOf( 'windows nt 5.1' ) > -1 || sUserAgent.indexOf( 'windows xp' ) > -1
    if ( isWinXP ) return 'WinXP'
    var isWin2003 = sUserAgent.indexOf( 'windows nt 5.2' ) > -1 || sUserAgent.indexOf( 'windows 2003' ) > -1
    if ( isWin2003 ) return 'Win2003'
    var isWinVista = sUserAgent.indexOf( 'windows nt 6.0' ) > -1 || sUserAgent.indexOf( 'windows vista' ) > -1
    if ( isWinVista ) return 'WinVista'
    var isWin7 = sUserAgent.indexOf( 'windows nt 6.1' ) > -1 || sUserAgent.indexOf( 'windows 7' ) > -1
    if ( isWin7 ) return 'Win7'
  }
  if ( sUserAgent.indexOf( 'android' ) > -1 ) return 'Android'
  if ( sUserAgent.indexOf( 'iphone' ) > -1 ) return 'iPhone'
  if ( sUserAgent.indexOf( 'symbianos' ) > -1 ) return 'SymbianOS'
  if ( sUserAgent.indexOf( 'windows phone' ) > -1 ) return 'Windows Phone'
  if ( sUserAgent.indexOf( 'ipad' ) > -1 ) return 'iPad'
  if ( sUserAgent.indexOf( 'ipod' ) > -1 ) return 'iPod'
  return 'others'
}

export function isPc() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = true
  for ( let v = 0; v < Agents.length; v++ ) {
    if ( userAgentInfo.indexOf( Agents[v] ) > 0 ) {
      flag = false
      break
    }
  }
  return flag
}

// 验证浏览器是否支持RTC
export function checkBrowser() {
  // eslint-disable-next-line prefer-const
  let { browserType, version } = GetCurrentBrowserV2()
  const versionStr = ( version + '' ).replace( /[^0-9.]/ig, '' )
  browserType = browserType.toLowerCase()
  const res = {}
  // if ( ['chrome', 'firefox', 'safari'].indexOf( browserType ) >= 0 ) {
  if ( ['chrome'].indexOf( browserType ) >= 0 ) {
    const versionName = parseInt( versionStr.split( '.' )[0] )
    if ( browserType === 'chrome' && versionName < 58 ) {
      res.pass = false
      res.msg = '请选择谷歌（版本号大于58）或火狐高版本浏览器（版本号大于56）或版本大于11的safari浏览器，已获得更好的体验效果'
    } else if ( browserType === 'firefox' && versionName < 56 ) {
      res.pass = false
      res.msg = '请选择谷歌（版本号大于58）或火狐高版本浏览器（版本号大于56）或版本大于11的safari浏览器，已获得更好的体验效果'
    } else if ( browserType === 'safari' && versionName < 11 ) {
      res.pass = false
      res.msg = '请选择谷歌（版本号大于58）或火狐高版本浏览器（版本号大于56）或版本大于11的safari浏览器，已获得更好的体验效果'
    } else {
      res.pass = true
    }
  } else {
    res.pass = false
    res.msg = '请选择谷歌（版本号大于58）或火狐高版本浏览器（版本号大于56）或版本大于11的safari浏览器，已获得更好的体验效果'
  }
  return res
}

// https://docs.agora.io/cn/faq/browser_support#a-nameedgeaedge
// Safari 无法获取输出设备信息，因此不支持 getPlayoutDevices 和 setAudioOutput 这两个方法。
export function checkBrowserIsSoupport() {
  var getExplorer = ( function() {
    var explorer = window.navigator.userAgent
    var compare = function( s ) { return ( explorer.indexOf( s ) >= 0 ) }
    var ie11 = ( function() { return ( 'ActiveXObject' in window ) } )()
    if ( compare( 'MSIE' ) || ie11 ) { return 'ie' } else if ( compare( 'Firefox' ) && !ie11 ) { return 'Firefox' } else if ( compare( 'Chrome' ) && !ie11 ) {
      if ( explorer.indexOf( 'Edge' ) > -1 ) {
        return 'Edge'
      } else {
        return 'Chrome'
      }
    } else if ( compare( 'Opera' ) && !ie11 ) { return 'Opera' } else if ( compare( 'Safari' ) && !ie11 ) { return 'Safari' }
  } )()
  let res = {}
  if ( getExplorer === 'ie' ) {
    res.pass = false
  } else if ( getExplorer === 'Edge' ) {
    res.pass = false
  } else {
    res = checkBrowser()
  }
  return res
}
