
<template>
  <div v-loading="loading" class="content-container p12">
    <div class="dialog-container">
      <div class="content clearfix">
        <el-form ref="taskForm" :model="form" :label-width="formLabelWidth" :rules="rules">
          <el-form-item class="title-bold" label="联系方式管理" />
          <el-form-item label="邮箱" prop="email">
            <el-input
              ref="email"
              v-model="form.email"
              name="email"
              maxlength="50"
              placeholder="联系邮箱"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input
              ref="phone"
              v-model="form.phone"
              name="phone"
              maxlength="100"
              placeholder="联系电话"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="公司简介" prop="intro">
            <el-input
              v-model="form.intro"
              type="textarea"
              name="intro"
              maxlength="5000"
              placeholder="请输入公司简介, 1-5000个任意字符"
              autocomplete="new-password"
              clearable
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input
              ref="address"
              v-model="form.address"
              name="address"
              maxlength="100"
              placeholder="地址"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <div>
          <el-button style="width: 120px;" type="primary" @click="submitForm">保 存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as request from '@/api/request'
import { validEmail, validPhone1 } from '@/utils/validate'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )

export default {
  name : 'Contacts',
  data() {
    const checkEmail = ( rule, value, callback ) => {
      if ( !validEmail( value ) ) {
        return callback( new Error( '请输入正确的邮箱' ) )
      } else {
        callback()
      }
    }
    const checkPhone = ( rule, value, callback ) => {
      // if ( !validPhone1( value ) ) {
      //   return callback( new Error( '请输入正确的联系电话' ) )
      // } else {
      //   callback()
      // }
      callback()
    }
    const checkDes = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 5000 ) {
        return callback( new Error( '公司简介：1-5000位任意非空字符' ) )
      } else {
        callback()
      }
    }
    const checkAddress = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 100 || value.length < 1 ) {
        return callback( new Error( '公司地址：1-100位任意非空字符' ) )
      } else {
        callback()
      }
    }
    return {
      formLabelWidth : '120px',
      form : {
        email : '',
        phone : '',
        intro : '',
        address : ''
      },
      rules : {
        email : [
          { required : true, message : '请输入邮箱', trigger : ['blur', 'change'] },
          { validator : checkEmail, trigger : ['blur', 'change'] }
        ],
        phone : [
          { required : true, message : '请输入联系电话', trigger : ['blur', 'change'] },
          { validator : checkPhone, trigger : ['blur', 'change'] }
        ],
        intro : [
          { required : true, message : '请输入公司简介', trigger : ['blur', 'change'] },
          { validator : checkDes, trigger : ['blur', 'change'] }
        ],
        address : [
          { required : true, message : '请输入公司地址', trigger : ['blur', 'change'] },
          { validator : checkAddress, trigger : ['blur', 'change'] }
        ]
      },
      loading : false
    }
  },
  computed : {
    ...mapGetters( [
      'token', 'currentPreview', 'editType'
    ] )
  },
  watch : {},
  async created() {
    await this.getContacts()
  },
  async mounted() {},
  beforeDestroy() {},
  methods : {
    // removePhone( item ) {
    //   var index = this.form.phone.indexOf( item )
    //   if ( index !== -1 ) {
    //     this.form.phone.splice( index, 1 )
    //   }
    // },
    // addPhone() {
    //   this.form.phone.push( {
    //     value : '',
    //     key : Date.now()
    //   } )
    // },
    // 初始获取联系新
    async getContacts() {
      const that = this
      that.loading = true
      const params = {}
      try {
        const { data } = await request.getContacts( params )
        console.log( 'data', { ...data } )
        // that.form = { ...data }
        that.form = {
          // id : data.id,
          // createAt : data.createAt,
          // updatedAt : data.updatedAt,
          email : data.email ? data.email.trim() : '',
          phone : data.phone ? data.phone.trim() : '',
          intro : data.intro ? data.intro.trim() : '',
          address : data.address ? data.address.trim() : ''
        }
      } catch ( e ) {} finally {
        that.loading = false
      }
    },
    // 提交创建 更新请求
    submitForm() {
      this.loading = true
      this.$refs['taskForm'].validate( valid => {
        if ( valid ) {
          this.updateArticlesRequest()
        } else {}
      } )
    },
    // 更新联系方式
    async updateArticlesRequest() {
      const updateParams = {
        ...this.form
      }
      try {
        const { code, data } = await request.updateContacts( updateParams )
        this.loading = false
        if ( code == 200 ) {
          this.$notify( {
            title : '成功',
            message : '更新联系方式成功',
            duration : 1000,
            customClass : 'center-center',
            type : 'success'
          } )
        }
      } catch ( e ) {
        this.loading = false
        this.$notify( {
          title : '失败',
          message : '更新联系方式失败',
          duration : 1000,
          customClass : 'center-center',
          type : 'error'
        } )
      }
    }
  }
}
</script>

<style>
  .customWidth {
    width: 520px;
  }
</style>
<style lang="scss" scoped>
  .dialog-footer{
    text-align: center;
    height: 80px;
  }
  .content-container{
    padding-top: 20px;
  }
  ::v-deep .el-form-item{
    margin-bottom: 40px;
    .el-form-item__label{
      text-align: left;
    }
  }
  ::v-deep .title-bold{
    .el-form-item__label{
      color: #101010;
      font-size: 20px;
      text-align: right;
      letter-spacing: 0;
      padding: 0;
      line-height: 29px;
      height: 29px;
    }
    ::v-deep .el-form-item__content{
      display: block;
      margin-left: 0 !important;
      width: 100%;
    }
    &.contents-require{
      margin-bottom: 20px;
    }
  }
  ::v-deep .el-input--medium .el-input__inner{
    height: 40px;
    line-height: 40px;
  }
  ::v-deep .keywords-item, ::v-deep .contents-require {
    .el-form-item__label:before {
      content: '*';
      color: #ff4949;
      margin-right: 4px;
      font-size: 12px;
    }
  }
  ::v-deep .tinymce-wrapper-el-item {
    .el-form-item__error {
      left: -13%;
    }
  }
  .tinymce-wrapper{
    width: 809px;
    margin-left: -89px;
    margin-left: -92px;
  }

  .dashod-driver{
    border-top: 1px dashed rgba(187, 187, 187, 100);
    height: 1px;
    width: 100%;
    margin: 0 0 30px 0;
  }
  .dialog-container{
    width: 809px;
    margin: 0 auto;
  }
  .avatar-uploader {
    cursor: pointer;
    width: 168px;
    height: 95px;
    border: 1px dashed #c0ccda;
    display: inline-block;
    vertical-align: bottom;
    .avatar {
      width: 100%;
      height: 100%;
      line-height: 150px;
      display: block;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      line-height: 90px;
      text-align: center;
    }
  }
  .upload-description {
    display: inline-block;
    vertical-align: bottom;
    padding: 0;
    font-size: 14px;
    line-height: 14px;
    height: 14px;
    margin: 0 0 0 6px;
  }
  .selectFiles{
    display: none;
  }
</style>
