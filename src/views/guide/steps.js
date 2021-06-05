const steps = [
  {
    element : '#hamburger-container',
    popover : {
      title : '开关',
      description : '打开 && 关闭 侧导航',
      position : 'bottom'
    }
  },
  {
    element : '#breadcrumb-container',
    popover : {
      title : '面包屑导航',
      description : '指示当前页面位置',
      position : 'bottom'
    }
  },
  {
    element : '#header-search',
    popover : {
      title : '页面搜索',
      description : '页面搜索，快速导航',
      position : 'left'
    }
  },
  {
    element : '#screenfull',
    popover : {
      title : '全屏开关',
      description : '全屏 / 取消全屏',
      position : 'left'
    }
  },
  {
    element : '#size-select',
    popover : {
      title : '字体大小',
      description : '切换系统字体大小',
      position : 'left'
    }
  },
  {
    element : '#tags-view-container',
    popover : {
      title : '历史页面',
      description : '已访问过的历史页面',
      position : 'bottom'
    },
    padding : 0
  }
]

export default steps
