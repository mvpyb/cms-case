<template>
  <el-form
    ref="ruleForm"
    :model="ruleForm"
    :rules="rules"
    label-width="0"
    class="login-ruleForm"
  >
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="">
          <el-form-item prop="account">
            <el-input
              ref="account"
              v-model="ruleForm.account"
              name="account"
              placeholder="请输入账号"
              :clearable="true"
              tabindex="1"
              type="text"
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="">
          <el-form-item prop="password">
            <el-input
              ref="password"
              v-model="ruleForm.password"
              show-password
              name="password"
              placeholder="请输入密码"
              :clearable="true"
              tabindex="2"
              maxlength="20"
              type="password"
              autocomplete="new-password"
              @keyup.enter.native="login"
            />
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="">
          <el-form-item
            prop="captcha"
            class="h32"
          >
            <el-row :gutter="20">
              <el-col :span="15">
                <el-input
                  ref="captcha"
                  v-model="ruleForm.captcha"
                  type="text"
                  name="captcha"
                  placeholder="请输入验证码"
                  :clearable="true"
                  tabindex="3"
                  maxlength="6"
                  autocomplete="new-password"
                  @keyup.enter.native="login"
                />
              </el-col>
              <el-col :span="9">
                <div class="code h44">
                  <img id="codeImgs" :src="captcha" alt="" @click="updateImage">
                </div>
              </el-col>
            </el-row>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="24" style="margin-top: 15px;">
        <div class="">
          <el-form-item>
            <div class="">
              <el-button
                :loading="loading"
                :disabled="!ruleForm.account || !ruleForm.password || !ruleForm.captcha"
                type="primary"
                style="width:100%;"
                @click.prevent="login"
              >
                登录
              </el-button>
            </div>
          </el-form-item>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getCode, login } from '@/api/request'
// import { validPhone, validEmail, validPasswrod } from '@/utils/validate'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )

export default {
  name : 'LoginPwd',
  components : {},
  data() {
    const validateAccount = ( rule, value, callback ) => {
      // if ( !validPhone( value ) && !validEmail( value ) ) {
      if ( value.length > 15 ) {
        callback( new Error( '账号最大长度为20' ) )
      } else {
        callback()
      }
    }
    const validatePassword = ( rule, value, callback ) => {
      // if ( !validPasswrod( value ) ) {
      if ( value.length > 15 ) {
        callback( new Error( '密码最大长度为20' ) )
      } else {
        callback()
      }
    }
    const trigger = ['blur', 'change']
    return {
      activeName : '1',
      captcha : '',
      captchaId : '',
      ruleForm : {
        captcha : '',
        // account : 'siabadmin1',
        // password : '123qweqwe'
        account : '',
        password : ''
      },
      rules : {
        account : [
          { required : true, message : '请输入账号', trigger },
          { validator : validateAccount, trigger }
        ],
        password : [
          { required : true, message : '请输入密码', trigger },
          { validator : validatePassword, trigger }
        ],
        captcha : [
          { required : true, message : '请输入验证码', trigger }
        ]
      },
      loading : false
      // redirect : undefined,
      // otherQuery : {}
    }
  },
  // watch : {
  //   $route : {
  //     handler : function( route ) {
  //       const query = route.query
  //       if ( query ) {
  //         this.redirect = query.redirect
  //         this.otherQuery = this.getOtherQuery( query )
  //       }
  //     },
  //     immediate : true
  //   }
  // },
  async created() {
    await this.updateImage()
  },
  methods : {
    async updateImage() {
      try {
        const { code, data } = await getCode()
        if ( code == 200 ) {
          const { captchaId, captcha } = data
          this.captcha = captcha
          this.captchaId = captchaId
        }
      } catch ( e ) {
        // console.log( 'e', e )
        this.captcha = undefined
        this.captchaId = undefined
      }
    },
    async login() {
      this.loading = true
      this.$refs['ruleForm'].validate( async( valid ) => {
        if ( valid ) {
          const loginParams = {
            ...this.ruleForm,
            captchaId : this.captchaId
          }
          try {
            const res = await login( loginParams )
            console.log( '登录', res )
            const { code, data } = res
            this.loading = false
            if ( code == 200 ) {
              await this.$store.dispatch( 'user/saveToken', data )
              await this.$router.push( '/' )
            }
          } catch ( e ) {

          } finally {
            this.loading = false
            await this.updateImage()
          }
        }
      } )
    }
    // getOtherQuery( query ) {
    //   return Object.keys( query ).reduce( ( acc, cur ) => {
    //     if ( cur !== 'redirect' ) {
    //       acc[cur] = query[cur]
    //     }
    //     return acc
    //   }, {} )
    // }
  }
}
</script>

<style lang="scss" scoped>
  img{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .imgCode{
    display: inline-block;
    width: 100%;
    height: 36px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0,0,0,0.1);
    }
  }
</style>
