const navList = {
  'code' : 200,
  'data' : [
    {
      'id' : 2,
      'value' : 2,
      'label' : '关于协会',
      'path' : '/about',
      'component' : 'About',
      'redirect' : '/about/index',
      'alwaysShow' : true,
      'meta' : {
        'noCache' : true,
        'title' : '关于协会'
      },
      'children' : [
        {
          'id' : 6,
          'value' : 6,
          'label' : '协会简介',
          'path' : 'index',
          'component' : 'about/index',
          'name' : 'Index',
          'meta' : {
            'title' : '协会简介',
            'noCache' : true
          }
        },
        {
          'id' : 7,
          'value' : 7,
          'label' : '协会章程',
          'path' : 'rule',
          'component' : 'about/rule',
          'name' : 'Rule',
          'meta' : {
            'title' : '协会章程',
            'noCache' : true
          }
        },
        {
          'id' : 8,
          'value' : 8,
          'label' : '组织架构',
          'path' : 'organization',
          'component' : 'about/organization',
          'name' : 'Organization',
          'meta' : {
            'title' : '组织架构',
            'noCache' : true
          }
        },
        {
          'id' : 9,
          'value' : 9,
          'label' : '协会领导',
          'path' : 'leader',
          'component' : 'about/leader',
          'name' : 'Leader',
          'meta' : {
            'title' : '协会领导',
            'noCache' : true
          }
        },
        {
          'id' : 10,
          'value' : 10,
          'label' : '人才招聘',
          'path' : 'join',
          'component' : 'about/join',
          'name' : 'Join',
          'meta' : {
            'title' : '人才招聘',
            'noCache' : true
          }
        },
        {
          'id' : -1,
          'path' : 'jobDetail',
          'value' : -1,
          'label' : '招聘详情',
          'component' : 'about/jobDetail',
          'hidden' : true,
          'name' : 'JobDetail',
          'meta' : {
            'title' : '招聘详情',
            'noCache' : true
          }
        },
        {
          'id' : 11,
          'value' : 11,
          'label' : '联系我们',
          'path' : 'contacts',
          'component' : 'about/contacts',
          'name' : 'Contacts',
          'meta' : {
            'title' : '联系我们',
            'noCache' : true
          }
        }
      ]
    },
    {
      'id' : 3,
      'value' : 3,
      'label' : '工作动态',
      'path' : '/dynamic',
      'component' : 'Dynamic',
      'redirect' : '/dynamic/politics',
      'alwaysShow' : true,
      'meta' : {
        'noCache' : true,
        'title' : '工作动态'
      },
      'children' : [
        {
          'id' : 12,
          'value' : 12,
          'label' : '时政要闻',
          'path' : 'politics',
          'component' : 'dynamic/politics',
          'name' : 'Politics',
          'meta' : {
            'title' : '时政要闻',
            'noCache' : true
          }
        },
        {
          'id' : 13,
          'value' : 13,
          'label' : '协会动态',
          'path' : 'association',
          'component' : 'dynamic/association',
          'name' : 'Association',
          'meta' : {
            'title' : '协会动态',
            'noCache' : true
          }
        },
        {
          'id' : 14,
          'value' : 14,
          'label' : '会员动态',
          'path' : 'member',
          'component' : 'dynamic/member',
          'name' : 'Member',
          'meta' : {
            'title' : '会员动态',
            'noCache' : true
          }
        },
        {
          'id' : 15,
          'value' : 14,
          'label' : '通知公告',
          'path' : 'notice',
          'component' : 'dynamic/notice',
          'name' : 'Notice',
          'meta' : {
            'title' : '通知公告',
            'noCache' : true
          }
        },

        {
          'id' : -2,
          'value' : -2,
          'label' : '详情',
          'path' : 'details',
          'component' : 'dynamic/details',
          'name' : 'Details',
          'hidden' : true,
          'meta' : {
            'title' : '详情',
            'noCache' : true
          }
        }
      ]
    },
    {
      'id' : 4,
      'value' : 4,
      'label' : '专题服务',
      'path' : '/feature',
      'component' : 'Feature',
      'redirect' : '/feature/secretariat',
      'alwaysShow' : true,
      'meta' : {
        'noCache' : true,
        'title' : '专题服务'
      },
      'children' : [
        {
          'id' : 16,
          'value' : 16,
          'label' : '秘书处',
          'path' : 'secretariat',
          'component' : 'feature/secretariat',
          'name' : 'Secretariat',
          'meta' : {
            'title' : '秘书处',
            'noCache' : true
          }
        },
        {
          'id' : 17,
          'value' : 17,
          'label' : '党建办公室',
          'path' : 'office',
          'component' : 'feature/office',
          'name' : 'Office',
          'meta' : {
            'title' : '党建办公室',
            'noCache' : true
          }
        },
        {
          'id' : 18,
          'value' : 18,
          'label' : '科技创新委员会',
          'path' : 'science',
          'component' : 'feature/science',
          'name' : 'Science',
          'meta' : {
            'title' : '科技创新委员会',
            'noCache' : true
          }
        },
        {
          'id' : 19,
          'value' : 19,
          'label' : '国际合作办公室',
          'path' : 'international',
          'component' : 'feature/international',
          'name' : 'International',
          'meta' : {
            'title' : '国际合作办公室',
            'noCache' : true
          }
        },
        {
          'id' : 20,
          'value' : 20,
          'label' : '专业分会管理办公室',
          'path' : 'chapter',
          'component' : 'feature/chapter',
          'name' : 'Chapter',
          'meta' : {
            'title' : '专业分会管理办公室',
            'noCache' : true
          }
        },
        {
          'id' : 21,
          'value' : 21,
          'label' : '教育培训机构',
          'path' : 'education',
          'component' : 'feature/education',
          'name' : 'Education',
          'meta' : {
            'title' : '教育培训机构',
            'noCache' : true
          }
        },
        {
          'id' : -3,
          'value' : -3,
          'label' : '详情',
          'path' : 'details',
          'component' : 'feature/details',
          'name' : 'Details',
          'hidden' : true,
          'meta' : {
            'title' : '详情',
            'noCache' : true
          }
        }
      ]
    },
    {
      'id' : 5,
      'value' : 5,
      'label' : '会员天地',
      'path' : '/member',
      'component' : 'Member',
      'redirect' : '/member/membership',
      'alwaysShow' : true,
      'meta' : {
        'noCache' : true,
        'title' : '会员天地'
      },
      'children' : [
        {
          'id' : 22,
          'value' : 22,
          'label' : '入会条件',
          'path' : 'membership',
          'component' : 'member/membership',
          'name' : 'Membership',
          'meta' : {
            'title' : '入会条件',
            'noCache' : true
          }
        },
        {
          'id' : 23,
          'value' : 23,
          'label' : '会员风采',
          'path' : 'demeanor',
          'component' : 'member/demeanor',
          'name' : 'Demeanor',
          'meta' : {
            'title' : '会员风采',
            'noCache' : true
          }
        },
        {
          'id' : -4,
          'value' : -4,
          'label' : '详情',
          'path' : 'details',
          'component' : 'member/details',
          'name' : 'Details',
          'hidden' : true,
          'meta' : {
            'title' : '详情',
            'noCache' : true
          }
        }
      ]
    },
    {
      'id' : -11,
      'value' : -1,
      'label' : '404',
      'path' : '*',
      'redirect' : '/404',
      'hidden' : true
    }
  ]
}

export function getNavsByType( type ) {
  const { data } = navList
  if ( data.length == 0 ) {
    return {}
  } else {
    return data.find( item => item.id == type )
  }
}

export function getAllNavs() {
  return navList.data
}
