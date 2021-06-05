import { request, upload } from '@/api/http.js'

// 获取验证码
export function getCode( data ) {
  return request( {
    url : '/user/captcha',
    data
  } )
}
// 账号密码登录
export function login( data ) {
  return request( {
    url : '/user/login',
    data
  } )
}
// 获取用户信息
export function tokenLogin( data ) {
  return request( {
    method : 'get',
    url : '/user/tokenInfo',
    data
  } )
}

// 文章编辑 -- 友情链接 -- 排序
export function sortJobs( data ) {
  return upload( {
    url : '/staff/titleSort',
    method : 'post',
    data
  } )
}

export function sortLinks( data ) {
  return upload( {
    url : '/friendshipLink/typeSort',
    method : 'post',
    data
  } )
}


// 文章编辑 -- 上传图片
export function uploadImage( data, callback ) {
  return upload( {
    url : '/file/upload',
    method : 'post',
    data,
    callback
  } )
}
// 文章编辑 -- 上传附件
export function uploadFile( data, callback ) {
  return upload( {
    url : '/file/upload',
    method : 'post',
    data,
    callback
  } )
}
// 首页 -- banner管理 - 获取banner列表
export function getBanners( data ) {
  return request( {
    method : 'get',
    url : '/banner/list',
    data
  } )
}
// 首页 -- banner管理 - 创建banner
export function createBanner( data ) {
  return request( {
    method : 'put',
    url : '/banner/add',
    data
  } )
}
// 首页 -- banner管理 - 更新banner
export function updateBanner( data ) {
  return request( {
    url : '/banner/update',
    data
  } )
}
// 首页 -- banner管理 - 删除banner
export function removeBanner( data ) {
  return request( {
    method : 'delete',
    url : '/banner/delete',
    data
  } )
}

// 首页 -- banner管理 - 获取导航列表 todo
export function getNavs( data ) {
  return request( {
    url : '/user/userInfo',
    data
  } )
}

// 首页 - 友情链接管理 - 类型管理 - 获取列表
export function getTypes( data ) {
  return request( {
    method : 'get',
    url : '/friendshipLink/type',
    data
  } )
}
// 首页 - 友情链接管理 - 类型管理 - 创建列表
export function createTypes( data ) {
  return request( {
    method : 'put',
    url : '/friendshipLink/type',
    data
  } )
}
// 首页 - 友情链接管理 - 类型管理 - 删除列表
export function deleteTypes( data ) {
  return request( {
    method : 'delete',
    url : '/friendshipLink/type',
    data
  } )
}
// 首页 - 友情链接管理 - 类型管理 - 修改列表
export function updateTypes( data ) {
  return request( {
    method : 'post',
    url : '/friendshipLink/type',
    data
  } )
}

// 首页 - 友情链接管理 - 链接管理 - 获取列表
export function getLinks( data ) {
  return request( {
    method : 'get',
    url : '/friendshipLink/list',
    data
  } )
}
// 首页 - 友情链接管理 - 链接管理 - 创建列表
export function createLinks( data ) {
  return request( {
    method : 'put',
    url : '/friendshipLink/add',
    data
  } )
}
// 首页 - 友情链接管理 - 链接管理 - 删除列表
export function deleteLinks( data ) {
  return request( {
    method : 'delete',
    url : '/friendshipLink/delete',
    data
  } )
}
// 首页 - 友情链接管理 - 链接管理 - 修改列表
export function updateLinks( data ) {
  return request( {
    method : 'post',
    url : '/friendshipLink/update',
    data
  } )
}

// 关于协会 - 获取文章列表
export function getArticle( data ) {
  return request( {
    // url : '/article/list', // 前台获取
    url : '/article/adminList',
    method : 'get',
    data
  } )
}
// 关于协会 - 创建新闻文章
export function createArticle( data ) {
  return request( {
    url : '/article/add',
    method : 'put',
    data
  } )
}
// 关于协会 - 发布文章
export function onlineArticle( data ) {
  return request( {
    url : '/article/online',
    method : 'post',
    data
  } )
}
// 关于协会 - 下线文章
export function offlineArticle( data ) {
  return request( {
    url : '/article/offline',
    method : 'post',
    data
  } )
}
// 关于协会 - 删除文章
export function removeArticle( data ) {
  return request( {
    url : '/article/delete',
    method : 'delete',
    data
  } )
}
// 关于协会 - 更新文章
export function updateArticle( data ) {
  return request( {
    url : '/article/update',
    method : 'post',
    data
  } )
}
// 关于协会 - 预览文章
export function previewArticle( data ) {
  return request( {
    url : '/article/preview',
    method : 'get',
    data
  } )
}

// banner -- 获取所有文章
export function bannerArticle( data ) {
  return request( {
    url : '/article/bannerArticle',
    method : 'get',
    data
  } )
}

// 文章编辑 -- 获取导航列表
// export function getNavs( data ) {
//   return request( {
//     url : '/news/getList',
//     method : 'post',
//     data
//   } )
// }

// 关于我们 职位 职员维护

// 获取职位列表
export function getJobs( data ) {
  return request( {
    url : '/staff/title',
    method : 'get',
    data
  } )
}
// 创建职位
export function createJobs( data ) {
  return request( {
    url : '/staff/title',
    method : 'put',
    data
  } )
}
// 更新职位
export function updateJobs( data ) {
  return request( {
    url : '/staff/title',
    method : 'post',
    data
  } )
}
// 删除职位
export function removeJobs( data ) {
  return request( {
    url : '/staff/title',
    method : 'delete',
    data
  } )
}

// 获取员工列表
export function getWorkers( data ) {
  return request( {
    url : '/staff/profile',
    method : 'get',
    data
  } )
}
// 创建员工
export function createWorkers( data ) {
  return request( {
    url : '/staff/profile',
    method : 'put',
    data
  } )
}
// 更新员工
export function updateWorkers( data ) {
  return request( {
    url : '/staff/profile',
    method : 'post',
    data
  } )
}
// 删除员工
export function removeWorkers( data ) {
  return request( {
    url : '/staff/profile',
    method : 'delete',
    data
  } )
}

// 关于协会 - 获取联系方式
export function getContacts( data ) {
  return request( {
    url : '/contacts/contacts',
    method : 'get',
    data
  } )
}
// 关于协会 - 更新联系方式
export function updateContacts( data ) {
  return request( {
    url : '/contacts/contacts',
    method : 'post',
    data
  } )
}

// 用户管理 - 获取用户列表
export function getUsers( data ) {
  return request( {
    url : '/user/getUserList',
    method : 'get',
    data
  } )
}
// 用户管理 - 创建用户
export function createUers( data ) {
  return request( {
    url : '/user/registered',
    method : 'put',
    data
  } )
}
// 用户管理 - 更新用户
export function updateUsers( data ) {
  return request( {
    url : '/user/update',
    data
  } )
}
// 用户管理 - 删除用户
export function removeUsers( data ) {
  return request( {
    method : 'delete',
    url : '/user/delete',
    data
  } )
}

// // 获取验证码
// export function getCaptcha( data ) {
//   return request( {
//     url : '/account/captcha',
//     data
//   } )
// }
// export function logout( data ) {
//   return request( {
//     url : '/account/logout',
//     data
//   } )
// }
// export function settings( data ) {
//   return request( {
//     url : '/settings/modify',
//     data
//   } )
// }
// // 获取头像列表
// export function getAvatars( data ) {
//   return request( {
//     url : '/common/avatar',
//     data
//   } )
// }
// // 上传图片
// export function uploadFile( data, callback ) {
//   return upload( {
//     url : '/file/uploads',
//     method : 'post',
//     data,
//     fn : callback
//   } )
// }
// // 新闻类型接口
// // 修改新闻类型
// export function updateNewsType( data ) {
//   return request( {
//     url : '/news/modifyType',
//     method : 'post',
//     data
//   } )
// }
// // 修改新闻类型状态
// export function changeTypeStatus( data ) {
//   return request( {
//     url : '/news/modifyStatus',
//     method : 'post',
//     data
//   } )
// }
// // 新增新闻类型
// export function createTypes( data ) {
//   return request( {
//     url : '/news/createType',
//     method : 'post',
//     data
//   } )
// }
// // 获取新闻类型列表
// export function getTypesList( data ) {
//   return request( {
//     url : '/news/getList',
//     method : 'post',
//     data
//   } )
// }
//
// // 新闻文章接口
// // 搜索 | 获取文章列表
// export function getArticles( data ) {
//   return request( {
//     // url : '/news/searchNews',
//     url : '/news/backNewsList',
//     method : 'post',
//     data
//   } )
// }
//
// export function offlineArticle( data ) {
//   return request( {
//     url : '/news/offlineNews',
//     method : 'post',
//     data
//   } )
// }
// // 删除新闻文章
// export function removeArticle( data ) {
//   return request( {
//     url : '/news/deleteNews',
//     method : 'post',
//     data
//   } )
// }
// // 前台新闻列表
// export function getArticleList( data ) {
//   return request( {
//     url : '/news/newsList',
//     method : 'post',
//     data
//   } )
// }
// // 获取文章详情
// export function getArticleDetail( data ) {
//   return request( {
//     url : '/news/detailNews',
//     method : 'post',
//     data
//   } )
// }
// // 上传视频
// export function uploadMedias( data ) {
//   return upload( {
//     url : '/upload/video',
//     method : 'post',
//     data
//   } )
// }
//
