<template>
  <div class="section-container login-container syNormal un-select">
    <div class="body fix-width">
      <div class="top">
        <logo class="logos" />
        <div class="desc">中小企业管理后台</div>
      </div>
      <div class="main">
        <login-pwd />
      </div>
      <div class="footer">
        <div class="desc" />
      </div>
    </div>
    <div class="footer">
      <span> 上海中小企业国际合作协会 版权所有 未经授权严禁转载任何内容或建立镜像</span>
      <span> 制作单位：上海中小企业国际合作协会</span>
      <span> 沪ICP备2021007053号-1</span>
    </div>
  </div>

</template>

<script>
import Logo from './components/logo'
import LoginPwd from './components/loginPwd'
// import LoginPhone from './components/loginPhone'

export default {
  name : 'Login',
  components : { Logo, LoginPwd },
  data() {
    return {
      showDialog : false,
      activeName : 'account',
      logo : require( '@/assets/imgs/logo.png' )
    }
  },
  created() {
    const res = this.$route.params && this.$route.params.type
    this.activeName = res || 'account'
  },
  mounted() {},
  destroyed() {},
  methods : {

  }
}
</script>

<style lang="scss" scoped>
  /*自定义tab*/
  .logos{
    text-align: center;
    margin: 30px 0 15px;
  }
  @import '~@/styles/variables.scss';
  $fsizeA : 20px;
  $fsizeB : 14px;
  .login-container{
    width: 100%;
    min-height: 100%;
    padding: 160px 0 144px;
    position: relative;
    background-image: url('~@/assets/imgs/bgimg.svg');
  }
  .main {
    .title{
      font-size : $fsizeA;
      text-align: center;
      font-weight:bold;
      color: #000;
    }
    .foot-link{
      text-align: center;
      .link-item{
        margin: 0;
        font-size: 12px;
        color:#1890ff;
      }
    }
  }
  .body {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    border-radius: 4px;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    padding: 10px 30px 50px;
  }
  .fix-width{
    min-width: 260px;
    width: 390px;
    margin: 0 auto;
  }
  .top {
    .header{
      position: relative;
      padding-top: 20px;
    }
    .rtc-logo {
      text-align: center;
      color : #4578fb;
      .icons{
        width: 80px;
        height: 80px;
      }
      img{
        display: inline-block;
        vertical-align: middle;
      }
      span{
        margin-left: 5px;
        display: inline-block;
        vertical-align: middle;
        font-size: $fsizeA;
        color: $font01;
        font-weight: bold;
      }
    }
    .settings {
      position: absolute;
      right: 0;
      top: 0;
      cursor: pointer;
      .iconfont{
        color: #777;
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
  .desc{
    text-align: center;
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
    margin-bottom: 40px;
  }

  .footer {
    position: absolute;
    bottom: 20px;
    text-align: center;
    left: 0;
    width: 100%;
    /*height: 50px;*/
    /*line-height: 50px;*/
    span{
      color: rgba(0,0,0,.45);
      font-size: 14px;
      line-height: 25px;
      display: inline-block;
      width: 100%;

    }
  }

</style>

