// import parseTime, formatTime and set to filter
export { parseTime, formatTime } from '@/utils'

function pluralize( time, label ) {
  if ( time === 1 ) {
    return time + label
  }
  return time + label + 's'
}

/**
 * @param {number} time
 */
export function timeAgo( time ) {
  const between = Date.now() / 1000 - Number( time )
  if ( between < 3600 ) {
    return pluralize( ~~( between / 60 ), ' minute' )
  } else if ( between < 86400 ) {
    return pluralize( ~~( between / 3600 ), ' hour' )
  } else {
    return pluralize( ~~( between / 86400 ), ' day' )
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter( num, digits ) {
  const si = [
    { value : 1E18, symbol : 'E' },
    { value : 1E15, symbol : 'P' },
    { value : 1E12, symbol : 'T' },
    { value : 1E9, symbol : 'G' },
    { value : 1E6, symbol : 'M' },
    { value : 1E3, symbol : 'k' }
  ]
  for ( let i = 0; i < si.length; i++ ) {
    if ( num >= si[i].value ) {
      return ( num / si[i].value ).toFixed( digits ).replace( /\.0+$|(\.[0-9]*[1-9])0+$/, '$1' ) + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter( num ) {
  return ( +num || 0 ).toString().replace( /^-?\d+/g, m => m.replace( /(?=(?!\b)(\d{3})+$)/g, ',' ) )
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst( string ) {
  return string.charAt( 0 ).toUpperCase() + string.slice( 1 )
}

// 把时间戳（单位秒 转为 年-月-日 时:分:秒
export function changeTime( str ) {
  if ( !str ) {
    return '未发布'
  }
  var time = new Date( str * 1000 )
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  return y + '-' + add0( m ) + '-' + add0( d )
}
export function add0( m ) { return m < 10 ? '0' + m : m }

// 将时间戳格式转换为 今天 昨天 还是实际时间
export function formatUnixToDayTime( date ) {
  var res = date * 1000
  const tt = new Date( parseInt( res ) )
  const days = parseInt( ( new Date().getTime() - res ) / 86400000 )
  const today = new Date().getDate()
  const day = tt.getDate()
  let result
  const offset = Math.abs( today - day )
  if ( days < 4 && offset < 4 ) {
    if ( offset === 0 ) {
      // result = "今天" + time + ":" + min;
      result = '今天'
    } else if ( offset === 1 ) {
      result = '昨天'
    } else if ( offset === 2 ) {
      result = changeTime( date )
    }
  } else {
    result = changeTime( date )
  }
  return result
}
// 根据参数截取字符串
export function subStringStr( value, len ) {
  if ( !value ) return ''
  return ( value.length > len ? value.substring( 0, len ) + '...' : value )
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18

// eslint-disable-next-line no-extend-native
Date.prototype.Format = function( fmt ) {
  var o = {
    'M+' : this.getMonth() + 1, // 月份
    'd+' : this.getDate(), // 日
    'h+' : this.getHours(), // 小时
    'm+' : this.getMinutes(), // 分
    's+' : this.getSeconds(), // 秒
    'q+' : Math.floor( ( this.getMonth() + 3 ) / 3 ), // 季度
    'S' : this.getMilliseconds() // 毫秒
  }
  if ( /(y+)/.test( fmt ) ) { fmt = fmt.replace( RegExp.$1, ( this.getFullYear() + '' ).substr( 4 - RegExp.$1.length ) ) }
  for ( var k in o ) {
    if ( new RegExp( '(' + k + ')' ).test( fmt ) ) { fmt = fmt.replace( RegExp.$1, ( RegExp.$1.length == 1 ) ? ( o[k] ) : ( ( '00' + o[k] ).substr( ( '' + o[k] ).length ) ) ) }
  }
  return fmt
}

export function formatTimeToStr( times, pattern ) {
  var d = new Date( times ).Format( 'yyyy-MM-dd hh:mm:ss' )
  if ( pattern ) {
    d = new Date( times ).Format( pattern )
  }
  return d.toLocaleString()
}

export function formatDate( time ) {
  if ( time != null && time != '' ) {
    var date = new Date( time )
    return formatTimeToStr( date, 'yyyy-MM-dd hh:mm:ss' )
  } else {
    return ''
  }
}

/**
 * 文件大小格式转换
 *
 * */
export function changeSize( size, unit = 'MB' ) {
  if ( size <= 0 ) {
    return '0' + unit
  }
  if ( unit == 'KB' ) {
    return ( size / 1024 ).toFixed( 2 ) + 'KB'
  } else if ( unit == 'MB' ) {
    return ( size / 1024 / 1024 ).toFixed( 2 ) + 'MB'
  } else if ( unit == 'GB' ) {
    return ( size / 1024 / 1024 / 1024 ).toFixed( 2 ) + 'GB'
  } else {
    return ( size / 1024 / 1024 / 1024 ).toFixed( 2 ) + 'GB'
  }
}

/**
 * 拼接协议
 *
 * */
export function changeUrl( path ) {
  const protocol = window.location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
  if ( !path.startsWith( 'https://' ) && !path.startsWith( 'http://' ) ) {
    return protocol + path
  } else {
    return path
  }
}
