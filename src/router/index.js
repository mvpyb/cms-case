import Vue from 'vue'
import Router from 'vue-router'

Vue.use( Router )

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path : '/redirect',
    component : Layout,
    hidden : true,
    children : [
      {
        path : '/redirect/:path(.*)',
        component : () => import( '@/views/redirect/index' )
      }
    ]
  },
  {
    path : '/login',
    component : () => import( '@/views/login/index' ),
    hidden : true
  },
  {
    path : '/auth-redirect',
    component : () => import( '@/views/login/auth-redirect' ),
    hidden : true
  },
  {
    path : '/404',
    component : () => import( '@/views/error-page/404' ),
    hidden : true
  },
  {
    path : '/401',
    component : () => import( '@/views/error-page/401' ),
    hidden : true
  },
  {
    path : '/500',
    component : () => import( '@/views/error-page/500' ),
    hidden : true
  },
  {
    path : '/',
    component : Layout,
    redirect : '/dashboard',
    children : [
      {
        path : 'dashboard',
        component : () => import( '@/views/dashboard/index' ),
        name : 'Dashboard',
        meta : { title : '首页', icon : 'dashboard', affix : true }
      }
    ]
  }
  // {
  //   //   path : '/guide',
  //   //   component : Layout,
  //   //   redirect : '/guide/index',
  //   //   children : [
  //   //     {
  //   //       path : 'index',
  //   //       component : () => import( '@/views/guide/index' ),
  //   //       name : 'Guide',
  //   //       meta : { title : '引导页', icon : 'guide', noCache : true }
  //   //     }
  //   //   ]
  //   // },

  // {
  //   path : '/profile',
  //   component : Layout,
  //   redirect : '/profile/index',
  //   hidden : true,
  //   children : [
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/profile/index' ),
  //       name : 'Profile',
  //       meta : { title : '关于我', icon : 'user', noCache : true }
  //     }
  //   ]
  // }
]

export const asyncRoutes = [
  {
    path : '/home',
    component : Layout,
    meta : {
      noCache : true,
      title : '首页管理',
      icon : 'home',
      roles : ['manger', 'user']
    },
    children : [
      // {
      //   path : 'nav',
      //   component : () => import( '@/views/homeHandle/nav' ),
      //   name : 'Nav',
      //   meta : {
      //     noCache : true,
      //     title : '导航管理',
      //     icon : 'nav',
      //     roles : ['manger', 'user']
      //   }
      // },
      {
        path : 'banner',
        component : () => import( '@/views/homeHandle/banner' ),
        name : 'Banner',
        meta : {
          noCache : true,
          title : 'banner管理',
          icon : 'banner',
          roles : ['manger', 'user']
        }
      },
      {
        path : 'links',
        component : () => import( '@/views/homeHandle/links' ),
        name : 'Links',
        meta : {
          noCache : true,
          title : '友情链接管理',
          icon : 'links',
          roles : ['manger', 'user']
        }
      }
    ]
  },

  {
    path : '/preview',
    name : 'Preview',
    component : () => import( '@/views/about/preview' ),
    meta : {
      // noCache : true,
      title : '预览',
      icon : 'project',
      roles : ['manger', 'user']
    },
    hidden : true
  },

  {
    path : '/about',
    component : Layout,
    meta : {
      noCache : true,
      title : '关于协会',
      icon : 'about',
      roles : ['manger', 'user']
    },
    children : [
      {
        path : '',
        component : () => import( '@/views/about/index' ),
        name : 'About',
        meta : {
          noCache : true,
          title : '关于协会',
          icon : 'about',
          roles : ['manger', 'user']
        }
      },
      {
        path : 'edits',
        component : () => import( '@/views/about/edit' ),
        name : 'Edits',
        meta : {
          noCache : true,
          title : '文章编辑',
          icon : 'about',
          roles : ['manger', 'user']
        },
        hidden : true
      },

      {
        path : 'editLeader',
        component : () => import( '@/views/about/editLeader' ),
        name : 'EditLeader',
        meta : {
          noCache : true,
          title : '协会领导',
          icon : 'about',
          roles : ['manger', 'user']
        },
        hidden : false
      },

      {
        path : 'editContacts',
        component : () => import( '@/views/about/editContacts' ),
        name : 'EditContacts',
        meta : {
          noCache : true,
          title : '联系我们',
          icon : 'about',
          roles : ['manger', 'user']
        },
        hidden : false
      }
      // {
      //   path : 'preview',
      //   component : () => import( '@/views/about/preview' ),
      //   name : 'Preview',
      //   meta : {
      //     noCache : false,
      //     icon : 'about',
      //     title : '文章预览',
      //     roles : ['platform', 'manger', 'user']
      //   },
      //   hidden : false
      // }
    ]
  },
  {
    path : '/dynamic',
    component : Layout,
    meta : {
      noCache : true,
      title : '工作动态',
      icon : 'dynamic',
      roles : ['manger', 'user']
    },
    children : [
      {
        path : '',
        component : () => import( '@/views/dynamic/index' ),
        name : 'Dynamic',
        meta : {
          noCache : true,
          title : '工作动态',
          icon : 'dynamic',
          roles : ['manger', 'user']
        }
      }
    ]
  },

  {
    path : '/special',
    component : Layout,
    meta : {
      noCache : true,
      title : '专题服务',
      icon : 'special',
      roles : ['manger', 'user']
    },
    children : [
      {
        path : '',
        component : () => import( '@/views/special/index' ),
        name : 'Special',
        meta : {
          noCache : true,
          title : '专题服务',
          icon : 'special',
          roles : ['manger', 'user']
        }
      }
    ]
  },
  {
    path : '/members',
    component : Layout,
    meta : {
      noCache : true,
      title : '会员天地',
      icon : 'members',
      roles : ['manger', 'user']
    },
    children : [
      {
        path : '',
        component : () => import( '@/views/members/index' ),
        name : 'Members',
        meta : {
          noCache : true,
          title : '会员天地',
          icon : 'members',
          roles : ['manger', 'user']
        }
      }
    ]
  },
  {
    path : '/users',
    component : Layout,
    meta : {
      noCache : true,
      title : '用户管理',
      icon : 'users',
      roles : ['platform']
    },
    children : [
      {
        path : '',
        component : () => import( '@/views/users/index' ),
        name : 'Users',
        meta : {
          noCache : true,
          title : '用户管理',
          icon : 'users',
          roles : ['platform']
        }
      }
    ]
  },

  // {
  //   path : '/pages',
  //   component : Layout,
  //   meta : { title : '页面管理', icon : 'icon', noCache : true },
  //   children : [
  //     {
  //       path : 'nav',
  //       component : () => import( '@/views/pagesHandle/nav' ),
  //       name : 'Icons',
  //       meta : { title : '导航修管理', icon : 'icon', noCache : true }
  //     },
  //     {
  //       path : 'banner',
  //       component : () => import( '@/views/pagesHandle/banner' ),
  //       name : 'Icons',
  //       meta : { title : 'banner管理', icon : 'icon', noCache : true }
  //     },
  //     {
  //       path : 'news',
  //       component : () => import( '@/views/pagesHandle/news' ),
  //       name : 'Icons',
  //       meta : { title : '新闻管理', icon : 'icon', noCache : true }
  //     },
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/pagesHandle/nav' ),
  //       name : 'Icons',
  //       meta : { title : '导航修管理', icon : 'icon', noCache : true }
  //     },
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/pagesHandle/nav' ),
  //       name : 'Icons',
  //       meta : { title : '导航修管理', icon : 'icon', noCache : true }
  //     }
  //   ]
  // },
  // {
  //   path : '/icon',
  //   component : Layout,
  //   children : [
  //     {
  //       path : 'index',
  //       component : () => import( '@/views/icons/index' ),
  //       name : 'Icons',
  //       meta : { title : '图标', icon : 'icon', noCache : true }
  //     }
  //   ]
  // },
  // {
  //   path : 'external-link',
  //   component : Layout,
  //   children : [
  //     {
  //       path : 'https://www.shadowcreator.com/',
  //       meta : { title : '影创官网', icon : 'link' }
  //     }
  //   ]
  // },

  { path : '*', redirect : '/404', hidden : true }
]

const createRouter = () => new Router( {
  // mode: 'history', // require service support
  scrollBehavior : () => ( { y : 0 } ),
  routes : constantRoutes
} )

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
