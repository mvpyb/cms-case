<template>
  <div class="app-container">
    <el-table
      ref="navTable"
      v-loading="navLoading"
      :data="navList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="component"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <div slot="empty">
        <div class="no-datas">
          <svg-icon class-name="handle-icon" icon-class="no-data1" />
          <div class="txt">展示列表空空如也</div>
        </div>
      </div>
      <el-table-column label="序号" type="index" width="65" />
      <el-table-column label="导航名称">
        <template slot-scope="scope">
          <div class="ellipsis">
            {{ scope.row.meta.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="导航路径" width="160">
        <template slot-scope="scope">{{ scope.row.component }}</template>
      </el-table-column>
      <!--  <el-table-column label="导航描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>-->
      <el-table-column label="创建人">
        <template slot-scope="scope">{{ scope.row.creator }}</template>
      </el-table-column>
      <el-table-column label="更新时间" width="120">
        <template slot-scope="scope">{{ scope.row.update_time | changeTime }}</template>
      </el-table-column>
      <el-table-column label="操作" width="220" align="center" class="btn-wrapper-cell">
        <template slot-scope="scope">
          <div style="position:relative;">
            <el-button
              class="new-text-default"
              type="primary"
              size="mini"
              @click="showEditNav(scope.row)"
            >编辑</el-button>
            <el-button
              class="new-text-default"
              type="warning"
              size="mini"
              @click="publishNav(scope.row)"
            >恢复</el-button>
            <el-button
              class="new-text-default"
              type="danger"
              size="mini"
              @click="removeNav(scope.row)"
            >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total="navs.total"
      :page.sync="navs.listQuery.page"
      :limit.sync="navs.listQuery.limit"
      :page-sizes="navs.listQuery.pageSizes"
      :layout="navs.listQuery.layout"
      @pagination="getNavList"
    />

    <!--创建 / 编辑导航弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑类型"
      :visible.sync="navDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="openNavDialog"
      @close="closeNavDialog"
    >
      <div class="content clearfix">
        <el-form ref="navForms" :model="navForm" :label-width="formLabelWidth" :rules="navRules">
          <el-form-item label="导航名称" prop="name">
            <el-input
              ref="name"
              v-model="navForm.name"
              name="name"
              maxlength="10"
              placeholder="1-10个字，可包含中英文、数字"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="类型描述" prop="description">
            <el-input
              ref="description"
              v-model="navForm.description"
              type="textarea"
              name="description"
              maxlength="200"
              placeholder="1~200个非空字符串"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitNavForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="navDialogOff = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name : 'Nav',
  components : { Pagination },
  data() {
    const trigger = ['blur', 'change']
    const checkTypeName = ( rule, value, callback ) => {
      const reg = /^([0-9]|[a-zA-Z]|[\u4e00-\u9fa5]){1,10}$/
      if ( !reg.test( value ) ) {
        return callback( new Error( '名称只能是1-10个字，可包含中英文、数字' ) )
      } else {
        callback()
      }
    }
    const checkTypeDes = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 200 || value.length == 0 ) {
        return callback( new Error( '描述只能是1~200个非空字符串' ) )
      } else {
        callback()
      }
    }
    return {
      formLabelWidth : '80px',
      // 导航数据
      navList : [
        {
          // id : 1,
          // name : '关于协会',
          // description : '',
          // create_time : 1610264269,
          // update_time : 1610264269,
          // creator : '1',
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
              'path' : 'index',
              'component' : 'about/index',
              'name' : 'Index',
              'meta' : {
                'title' : '协会简介',
                'noCache' : true
              }
            },
            {
              'path' : 'rule',
              'component' : 'about/rule',
              'name' : 'Rule',
              'meta' : {
                'title' : '协会章程',
                'noCache' : true
              }
            },

            {
              'path' : 'organization',
              'component' : 'about/organization',
              'name' : 'Organization',
              'meta' : {
                'title' : '组织架构',
                'noCache' : true
              }
            },
            {
              'path' : 'leader',
              'component' : 'about/leader',
              'name' : 'Leader',
              'meta' : {
                'title' : '协会领导',
                'noCache' : true
              }
            },
            {
              'path' : 'join',
              'component' : 'about/join',
              'name' : 'Join',
              'meta' : {
                'title' : '人才招聘',
                'noCache' : true
              }
            },
            {
              'path' : 'jobDetail',
              'component' : 'about/jobDetail',
              'hidden' : true,
              'name' : 'JobDetail',
              'meta' : {
                'title' : '招聘详情',
                'noCache' : true
              }
            },
            {
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
              'path' : 'politics',
              'component' : 'dynamic/politics',
              'name' : 'Politics',
              'meta' : {
                'title' : '时政要闻',
                'noCache' : true
              }
            },
            {
              'path' : 'association',
              'component' : 'dynamic/association',
              'name' : 'Association',
              'meta' : {
                'title' : '协会动态',
                'noCache' : true
              }
            },
            {
              'path' : 'member',
              'component' : 'dynamic/member',
              'name' : 'Member',
              'meta' : {
                'title' : '会员动态',
                'noCache' : true
              }
            },
            {
              'path' : 'notice',
              'component' : 'dynamic/notice',
              'name' : 'Notice',
              'meta' : {
                'title' : '通知公告',
                'noCache' : true
              }
            },
            {
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
              'path' : 'secretariat',
              'component' : 'feature/secretariat',
              'name' : 'Secretariat',
              'meta' : {
                'title' : '秘书处',
                'noCache' : true
              }
            },
            {
              'path' : 'office',
              'component' : 'feature/office',
              'name' : 'Office',
              'meta' : {
                'title' : '党建办公室',
                'noCache' : true
              }
            },
            {
              'path' : 'science',
              'component' : 'feature/science',
              'name' : 'Science',
              'meta' : {
                'title' : '科技创新委员会',
                'noCache' : true
              }
            },
            {
              'path' : 'international',
              'component' : 'feature/international',
              'name' : 'International',
              'meta' : {
                'title' : '国际合作办公室',
                'noCache' : true
              }
            },
            {
              'path' : 'chapter',
              'component' : 'feature/chapter',
              'name' : 'Chapter',
              'meta' : {
                'title' : '专业分会管理办公室',
                'noCache' : true
              }
            },
            {
              'path' : 'education',
              'component' : 'feature/education',
              'name' : 'Education',
              'meta' : {
                'title' : '教育培训机构',
                'noCache' : true
              }
            },
            {
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
              'path' : 'membership',
              'component' : 'member/membership',
              'name' : 'Membership',
              'meta' : {
                'title' : '入会条件',
                'noCache' : true
              }
            },
            {
              'path' : 'demeanor',
              'component' : 'member/demeanor',
              'name' : 'Demeanor',
              'meta' : {
                'title' : '会员风采',
                'noCache' : true
              }
            },
            {
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
        }

        /* {
          id : 1,
          name : '关于协会',
          description : '',
          create_time : 1610264269,
          update_time : 1610264269,
          creator : '1',
          children : [
            {
              id : '1-1',
              name : '协会简介',
              description : '',
              create_time : 1610264269,
              update_time : 1610264269,
              creator : '1'
            },
            {
              id : '1-2',
              name : '协会章程',
              description : '',
              create_time : 1610264269,
              update_time : 1610264269,
              creator : '1'
            }
          ]
        },
        {
          id : 2,
          name : '工作动态',
          description : '',
          create_time : 1610264269,
          update_time : 1610264269,
          creator : '1'
        }*/
      ],
      navs : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        }
      },
      // 类型form
      navForm : {
        name : '',
        description : ''
      },
      navRules : {
        name : [
          { required : true, message : '请输入类型名称', trigger },
          { validator : checkTypeName, trigger }
        ],
        description : [
          { required : true, message : '请输入类型描述', trigger },
          { validator : checkTypeDes, trigger }
        ]
      },
      navDialogOff : false,
      navLoading : false,
      currentSelectNav : {}

    }
  },
  computed : {
    ...mapGetters( [
      'name',
      'avatar',
      'roles'
    ] )
  },
  created() {
    this.getUser()
  },
  methods : {
    // 重置表单
    resetForm( data ) {
      if ( data ) {
        this.$nextTick( () => {
          this['navForm'] = { ...data }
          this['navForm']['name'] = data.meta.title
        } )
      } else {
        for ( const key in this['navForm'] ) {
          this.$set( this['navForm'], key, '' )
        }
      }
    },
    // 打开类型弹框
    async openNavDialog() {
      this.$nextTick( e => {
        this.$refs.navForms.resetFields()
        this.resetForm( this.currentSelectNav )
      } )
    },
    // 关闭类型弹框
    async closeNavDialog() {
      const self = this
      this.resetForm( false )
      setTimeout( () => {
        self.currentSelectNav = {}
        self.navDialogType = 'create'
      }, 100 )
    },
    // 显示编辑弹框
    async showEditNav( data ) {
      console.log( '显示编辑弹框', data )
      this.navDialogOff = true
      this.currentSelectNav = { ...data }
    },
    // 恢复导航
    async publishNav() {
      this.typeDialogOff = true
      this.typeDialogType = 'create'
      this.currentSelectType = {}
    },
    // 删除导航
    async removeNav() {
      this.typeDialogOff = true
      this.typeDialogType = 'create'
      this.currentSelectType = {}
    },
    // 获取链接列表
    async getNavList( type ) {
      console.log( 'changeTypes', type )
      this.navLoading = true
      setTimeout( () => {
        this.navList = [
          {
            id : 1,
            name : '关于协会',
            description : '',
            create_time : 1610264269,
            update_time : 1610264269,
            creator : '1'
          },
          {
            id : 2,
            name : '工作动态',
            description : '',
            create_time : 1610264269,
            update_time : 1610264269,
            creator : '1'
          }
        ]
        this.navLoading = false
      }, 1000 )
    },
    // 提交更新类型
    async submitNavForm() {
      this.$refs['navForms'].validate( valid => {
        if ( valid ) {
          this.updateNavRequest()
        }
      } )
    },
    async updateNavRequest() {},

    getUser() {
      this.user = {
        name : this.name,
        role : this.roles.join( ' | ' ),
        email : 'zhaocai@ivglass.com',
        avatar : this.avatar
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  /*空数据*/
  .no-datas {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;
    position: relative;
    .handle-icon {
      width: 140px;
      height: 140px;
      color: #EFEEF0;
    }
    .txt{
      font-size: 18px;
      color: #A6A6A6;
    }
    .cancels {
      position: absolute;
      bottom: 30px;
      left: 50%;
      margin-left: -96px;
      width: 192px;
    }
  }
  /*表格按钮*/
  .btn-wrapper {
    margin: 15px 0;
    .checkbox-wrapper {
      display: inline-block;
      text-align: center;
      width: 40px;
    }
    .new-info {
      width: 54px;
      margin-right: 20px;
      padding: 0;
      min-width:54px
    }
  }
  .cancel-search {
    text-align: center;
    border-bottom: 1px solid #dfe6ec;
    border-left: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
    .el-button {
      width: 192px;
      margin-top: 29px;
      margin-bottom: 29px;
    }
  }
  .el-table__body-wrapper{
    .el-table__expand-icon {
      display: inline-block;
      vertical-align: middle;
    }
    .ellipsis{
      display: inline-block;
      margin-left: 5px;
      vertical-align: middle;
      width:calc(100% - 20px - 30px);
    }
  }
  /*分页*/
  .pagination-container {
    margin: 0;
    padding: 20px 10px;
    border-bottom: 1px solid #dfe6ec;
    border-left: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }
</style>
