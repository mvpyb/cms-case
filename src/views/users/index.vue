
<template>
  <div class="app-container">
    <!--头部搜索 创建-->
    <div class="tab-headers clearfix mb20">
      <el-button type="primary" class="fl" @click="showCreateContent">+ 创建用户</el-button>

      <!--<div class="fl" style="margin-left: 15px;margin-right: 15px;">
        <el-select
          slot="prepend"
          v-model="contents.currentNav"
          placeholder="请选择权限"
          style="width: 200px;"
          @change="navChange"
        >
          <el-option label="全部" :value="0" />
          <el-option
            v-for="user in authList"
            :label="user.name"
            :key="user.id"
            :value="user.id"
          />
        </el-select>
      </div>-->

      <div class="fr" style="width: calc(100% - 400px);">
        <el-input
          v-model="contents.searchField"
          placeholder="文章搜索"
          class="fr input-with-select1"
          style="width: 90%;"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUsers" />
        </el-input>
      </div>
    </div>
    <el-table
      ref="contentTable"
      v-loading="contents.loading"
      :data="userList"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <div slot="empty">
        <div class="no-datas">
          <svg-icon class-name="handle-icon" icon-class="no-data1" />
          <div class="txt">展示列表空空如也</div>
        </div>
      </div>
      <el-table-column label="序号" type="index" width="65" />
      <el-table-column
        prop="userName"
        label="用户名称"
      >
        <template slot-scope="scope">
          {{ scope.row.userName }}
        </template>
      </el-table-column>
      <el-table-column
        prop="auth"
        label="账号权限"
      >
        <template slot-scope="scope">
          {{ scope.row.auth }}
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        label="登录账号"
      >
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <!-- <el-table-column
        prop="phone"
        label="手机号"
      >
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
      >
        <template slot-scope="scope">
          {{ scope.row.sex == 1 ? '男' : '女' }}
        </template>
      </el-table-column>-->
      <el-table-column label="更新时间" width="180">
        <template slot-scope="scope">{{ scope.row.updatedAt | formatDate }}</template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center" class="btn-wrapper-cell">
        <template slot-scope="scope">
          <div style="position:relative;">
            <el-button-group>
              <el-button
                class="new-text-default"
                type="primary"
                size="mini"
                :disabled="authorityId > scope.row.authorityId && phone != scope.row.phone"
                @click="showEditContent(scope.row)"
              >编辑</el-button>
              <el-button
                class="new-text-default"
                type="danger"
                size="mini"
                :disabled="authorityId >= scope.row.authorityId"
                @click="removeUser(scope.row)"
              >删除</el-button>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :total="contents.total"
      :page.sync="contents.listQuery.page"
      :limit.sync="contents.listQuery.limit"
      :page-sizes="contents.listQuery.pageSizes"
      :layout="contents.listQuery.layout"
      @pagination="getUserList"
    />

    <!--创建 / 编辑worker 职员弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑用户"
      :visible.sync="contentDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="openContentDialog"
      @close="closeContentDialog"
    >
      <div class="content clearfix">
        <el-form ref="contentsForm" :model="contentForm" :label-width="formLabelWidth" :rules="contentRules">
          <el-form-item label="用户权限" prop="auth">
            <el-select v-model="contentForm.auth" filterable placeholder="请选择权限" style="width: 100%;">
              <el-option
                v-for="item in effectAuthList"
                :key="item.id"
                :disabled="item.disabled"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input
              ref="userName"
              v-model="contentForm.userName"
              name="userName"
              placeholder="请输入用户名，1-20位任意字符"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="登录账号" prop="account">
            <el-input
              ref="account"
              v-model="contentForm.account"
              name="account"
              placeholder="1-20个字母或数字"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="登录密码" prop="password">
            <el-input
              ref="password"
              v-model="contentForm.password"
              name="password"
              type="password"
              placeholder="6-20位字母或数字,默认12345678"
              :clearable="true"
              tabindex="1"
              show-password
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>
        <!--  <el-form-item label="确认密码" prop="repassword">
            <el-input
              ref="repassword"
              v-model="contentForm.repassword"
              name="repassword"
              type="password"
              placeholder="1-20位字母或数字"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>-->
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitContentForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="contentDialogOff = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { changeUserList } from '@/utils/tools'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import {
  getUsers,

  createUers,
  updateUsers,
  removeUsers

} from '@/api/request'

export default {
  name : 'Users',
  components : { Pagination },
  data() {
    const trigger = ['blur', 'change']
    const checkAccount = ( rule, value, callback ) => {
      const reg = /^([0-9]|[a-zA-Z]|[\u4e00-\u9fa5]){1,20}$/
      if ( !reg.test( value ) ) {
        return callback( new Error( '名称只能是1-20个字，可包含中英文、数字' ) )
      } else {
        callback()
      }
    }
    const checkNickName = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 20 || value.length == 0 ) {
        return callback( new Error( '用户名由1-20位任意字符组成' ) )
      } else {
        callback()
      }
    }
    const checkPwd = ( rule, value, callback ) => {
      const reg = /^([0-9]|[a-zA-Z]){6,20}$/
      if ( value ) {
        if ( !reg.test( value ) ) {
          return callback( new Error( '密码只能是6-20个字，可包含大小写字母、数字' ) )
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      formLabelWidth : '80px',
      // 导航列表：全部导航，每个导航显示前100个文章
      users : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        },
        loading : false
      },
      userList : [],
      // 当前权限
      contents : {
        currentNav : 0,
        searchField : '',
        // 分页
        total : 0,
        loading : false,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        }
      },
      authList : [
        {
          id : 1,
          disabled : true,
          name : '超级管理员'
        },
        {
          id : 2,
          disabled : false,
          name : '管理员'
        },
        {
          id : 3,
          disabled : false,
          name : '操作员'
        }
      ],
      // 类型form
      contentForm : {
        auth : '',
        userName : '',
        account : '',
        password : '',
        repassword : ''
      },
      contentRules : {
        auth : [
          { required : true, message : '请选择权限', trigger }
        ],
        userName : [
          { required : true, message : '请输入用户名', trigger },
          { validator : checkNickName, trigger }
        ],
        account : [
          { required : true, message : '请输入账号', trigger },
          { validator : checkAccount, trigger }
        ],
        password : [
          // { required : true, message : '请输入密码', trigger },
          { validator : checkPwd, trigger }
        ]
        // repassword : [
        //   { required : true, message : '请再次输入密码', trigger },
        //   { validator : checkPwd, trigger }
        // ]
      },
      contentDialogOff : false,
      contentDialogType : 'create',
      currentSelectContent : {}
    }
  },
  computed : {
    ...mapGetters( ['authorityId', 'phone', 'roles'] ),
    effectAuthList() {
      this.authList.forEach( item => {
        this.$set( item, 'disabled', this.authorityId >= item.id )
      } )
      return this.authList
    }
  },
  async created() {
    await this.getUserList()
  },
  methods : {
    // 重置表单
    resetForm( data ) {
      if ( data ) {
        this['contentForm'] = { ...data }
        this['contentForm']['auth'] = data.authorityId
        this.$set( this['contentForm'], 'password', '' )
      } else {
        for ( const key in this['contentForm'] ) {
          this.$set( this['contentForm'], key, '' )
        }
      }
    },
    // 重置分页参数
    async initPage( type = 'contents' ) {
      this[type].listQuery.page = 1
      this[type].listQuery.limit = 10
    },
    // 获取用户列表
    async getUserList() {
      const that = this
      const params = {
        page : that.users.listQuery.page,
        limit : that.users.listQuery.limit
      }
      if ( this.contents.searchField ) {
        params.search = this.contents.searchField
      }
      try {
        const { data, code } = await getUsers( params )
        // console.log( '获取用户列表', data )
        if ( code == 200 ) {
          that.users.total = data.count
          that.userList = changeUserList( data.list )
        }
      } catch ( e ) {
        console.log( '获取用户列表出错', e )
      } finally {
        that.users.loading = false
      }
    },
    // 搜索用户
    async searchUsers() {
      await this.initPage()
      await this.getUserList()
    },
    // 显示编辑
    async showEditContent( data ) {
      this.contentDialogOff = true
      this.contentDialogType = 'update'
      this.currentSelectContent = { ...data }
    },
    // 显示创建
    async showCreateContent( data ) {
      this.contentDialogOff = true
      this.contentDialogType = 'create'
      this.currentSelectContent = {}
    },
    // 打开类型弹框
    async openContentDialog() {
      this.$nextTick( e => {
        this.$refs.contentsForm.resetFields()
        if ( this.contentDialogType === 'create' ) {
          this.resetForm( false )
        } else {
          this.resetForm( this.currentSelectContent )
        }
      } )
    },
    // 关闭类型弹框
    async closeContentDialog() {
      const that = this
      this.resetForm( false )
      setTimeout( () => {
        that.currentSelectContent = {}
        that.contentDialogType = 'create'
      }, 100 )
    },
    // 提交更新
    async submitContentForm() {
      this.$refs['contentsForm'].validate( valid => {
        if ( valid ) {
          if ( this.contentDialogType === 'create' ) {
            this.createContentRequest()
          } else {
            this.updateContentRequest()
          }
        }
      } )
    },
    // 发送创建
    async createContentRequest() {
      const params = {
        // ...this.contentForm,
        phone : this.contentForm.account,
        email : '',
        nickName : this.contentForm.userName,
        status : 1,
        authorityId : this.contentForm.auth
      }
      if ( this.contentForm.password ) {
        params.password = this.contentForm.password
      }
      try {
        await createUers( params )
        await this.initPage()
        await this.getUserList()
        this.contentDialogOff = false
      } catch ( e ) {
        // console.log( '创建 员工 Job 出错', e )
      }
    },
    async updateContentRequest( type = 'update' ) {
      const params = {
        id : this.contentForm.id,
        phone : this.contentForm.account,
        email : '',
        nickName : this.contentForm.userName,
        status : type == 'remove' ? 2 : 1,
        authorityId : this.contentForm.auth
      }
      if ( this.contentForm.password ) {
        params.password = this.contentForm.password
      }
      try {
        await updateUsers( params )
        await this.initPage()
        await this.getUserList()
        this.contentDialogOff = false
      } catch ( e ) {
        // console.log( '更新worker Job 出错', e )
      }
    },
    // 删除
    async removeUser( data ) {
      this.$confirm( '确定删除该用户吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await removeUsers( params )
            await this.initPage()
            await this.getUserList()
          } catch ( e ) {
          } finally {
            this.currentSelectContent = {}
          }
        } )
    }
  }
}
</script>

<style lang="scss" scoped>
  .mb20{
    margin-bottom: 20px;
  }
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
