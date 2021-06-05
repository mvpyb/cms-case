<template>
  <div class="header pb37 content-bj">
    <!--     <div class="header-top">
           <div class="w1200">
             欢迎光临中国中小企业国际合作协会官方网站
           </div>
         </div>-->
    <div class="clearfix w1200 pt30">
      <div class="logo-wrapper fl">
        <div class="pointer clearfix">
          <img class="fl logo-img" :src="require('@/assets/imgs/logo-2.png')" alt="">
          <div class="fl header-name">
            <div class="title syBold">上海中小企业国际合作协会</div>
            <div class="sub-title syRegular">Shanghai International Cooperation Association of SMEs</div>
          </div>
        </div>
      </div>
      <div class="header-right fr">
        <div class="index-right-top syRegular">
          <a class="header-right--item" href="javascript:;">设为首页</a>
          <span class="header-right--divider" />
          <a class="header-right--item" href="javascript:;">收藏本站</a>
        </div>

        <div class="index-sech">
          <el-input
            v-model="search"
            class="inps"
            placeholder="请输入内容"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>

          <!-- <form id="top_search_form" method="get" name="top_search_form" action="/site/search.html?siteid=5">
            <input type="hidden" name="siteid" value="5">                    <div class="clearfix" style="position: relative">
            <input type="text" value="" id="keywords" name="keywords" class="index-sech-input fl" placeholder="请输入您要搜索的内容">
            <a id="button" class="index-sech-sub fr"></a>
          </div>
          </form>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name : 'Headers',
  data() {
    return {
      search : ''
    }
  },
  methods : {
    showPer() {
      this.$emit( 'showPer' )
    }
  }
}
</script>

<style lang="scss" scoped>
  .pointer{
    cursor: pointer;
  }
  .content-bj {
    background-color: #fff;
    overflow: hidden;
  }
  /*header*/
  .header-top {
    background: #b89662;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }
  .logo {
    width: 725px;
    height: 80px;
  }
  .logo-wrapper {
    background: #fff;
    .logo-img {
      height: 70px;
      width: 70px;
      display : inline-block;
      margin-right: 20px;
    }
    .header-name{
      color : #000;
      .title {
        font-size: 36px;
        line-height: 54px;
      }
      .sub-title {
        font-size : 16px;
        line-height: 24px;
      }
    }
  }

  .header-right {
    width: 320px;
    .index-right-top {
      text-align: right;
      color: #333333;
      margin-bottom: 10px;
      .header-right--item {
        color: rgba(142, 142, 142, 100);
        font-size: 14px;
        color: #666666;
        padding: 3px 0;
        padding: 0;
        border: 1px solid #fff;
        /*margin: 0 5px;*/
        display: inline-block;
        vertical-align: middle;
      }
      .header-right--divider {
        vertical-align: middle;
        width: 1px;
        height: 16px;
        display: inline-block;
        background-color: rgba(142, 142, 142, 1);
        margin: 0 15px;
      }
    }
    .index-sech {
      /*background: url('~@/assets/imgs/sech-bj.png') no-repeat left center;*/
      width: 100%;
      height: 40px;
      overflow: hidden;
      /*.index-sech-input {
        width: 250px;
        margin-top: 9px;
        border: 0;
        margin-left: 2px;
      }
      .index-sech-sub {
        width: 21px;
        height: 21px;
        display: block;
        background: url('~@/assets/imgs/sechicon.png') no-repeat;
        position: absolute;
        right: 20px;
        top: 10px;
      }*/
    }
  }
  /*header end*/
</style>
<style lang="scss">
  // 自定义input框
  .inps {
    background: transparent;
    height: 40px;
    line-height: 40px;

    .el-input {
      height: 40px;
      line-height: 40px;
      /*color: rgba(255,255,255,0.22);*/
      /*background: transparent;*/
      /*border-color: rgba(170, 170, 170, 1);*/
      &:hover{
        /*color: rgba(255,255,255,0.22);*/
        /*background: transparent;*/
        /*border-color: rgba(170, 170, 170, 1);*/
      }
      &::-webkit-input-placeholder{
        /*color: rgba(255,255,255,0.22);*/
      }
      &::-moz-placeholder{
        /*color: rgba(255,255,255,0.22);*/
      }
      &::-ms-input-placeholder{
        /*color: rgba(255,255,255,0.22);*/
      }
      &.is-disabled{
        /*background: transparent;*/
        /*border-color: rgba(170, 170, 170, 1);*/
        &:hover{
          /*color: rgba(255,255,255,0.22);*/
          /*background: transparent;*/
          /*border-color: #a761e6;*/
        }
      }
      &.is-focus{
        .el-input__inner{
          /*border-color: rgba(170, 170, 170, 1);*/
        }
      }
    }
   /* .el-input__inner{
      @extend .el-input;
      &.is-focus{
        border-color: #a761e6;
      }
      &.is-disabled{
        color: yellow;
        background: transparent;
        border-color: #BCADF9;
        &:hover{
          color: rgba(255,255,255,0.22);
          color: blue;
          background: transparent;
          border-color: #a761e6;
        }
      }
    }
    .el-input.is-disabled .el-input__inner {
      background: transparent;
      border-color: #BCADF9;
    }
    .el-input.is-focus .el-input__inner {
      border-color: #a761e6;
      background: transparent;
    }

    &.white {
      .el-input {
        color: rgba(255,255,255,1);
        &:hover{
          color: rgba(255,255,255,1);
        }
        &::-webkit-input-placeholder{
          color: rgba(255,255,255,1);
        }
        &::-moz-placeholder{
          color: rgba(255,255,255,1);
        }
        &::-ms-input-placeholder{
          color: rgba(255,255,255,1);
        }
        &.is-disabled{
          &:hover{
            color: rgba(255,255,255,1);
          }
        }
      }
      .el-input__inner{
        @extend .el-input;
        &.is-disabled{
          color: rgba(255,255,255,1);
          &:hover{
            color: rgba(255,255,255,1);
          }
        }
      }
    }*/
  }
</style>
