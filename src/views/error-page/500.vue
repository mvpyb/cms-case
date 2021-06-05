<template>
  <div class="errPage-container">
    <div class="img-wrapper">
      <img :src="require( '@/assets/500_images/500.png' )" alt="">
    </div>
    <div>
      <div class="title">  服务器内部错误！</div>
      <div class="sub-title">
        当您看到这个页面,表示服务器内部错误,此网站可能遇到技术问题,无法执行您的请求,请稍后重试或联系站长进行处理,感谢您的支持!
        <span class="back" @click="$router.push( '/' )">点我返回首页</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name : 'Page500',
  data() {
    return {
    }
  },
  methods : {
    back() {
      if ( this.$route.query.noGoBack ) {
        this.$router.push( { path : '/dashboard' } )
      } else {
        this.$router.go( -1 )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 600px;
    max-width: 100%;
    margin: 50px auto;
    .img-wrapper {
      text-align: center;
      img{
        display: inline-block;
        width: 350px;
        height: auto;
      }
    }

    .title {
      text-align: center;
      font-size: 36px;
      line-height: 76px;
      color: #8e8e8e;
      margin: 25px 0;
    }
    .sub-title{
      text-align: center;
      font-size: 16px;
      line-height: 24px;
      color: #8e8e8e;
    }
    .back {
      cursor: pointer;
      display: inline-block;
      font-size: 14px;
      margin-left: 5px;
      color: #409EFF;
    }
  }
</style>
