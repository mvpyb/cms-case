
<template>
  <div v-loading="loading" class="content-container" style="min-height: 100vh;">
    <div class="previews">
      <!--导航-->
      <div class="navbar clearfix syRegular">
        <!--顶部导航文字说明-->
        <div class="header pb37 content-bj">
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
                  v-model="preview.search"
                  class="inps"
                  disabled
                  placeholder="请输入内容"
                >
                  <i slot="prefix" class="el-input__icon el-icon-search" />
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <!--头部导航-->
        <div class="main-info-container">
          <div class="w1200">
            <div>
              <div class="navbar-menu">
                <div class="horizontal-menu-wrapper">
                  <a href="javascript:;" class="">
                    <span class="nav-bar-txts">首页</span>
                  </a>
                </div>
                <div v-for="nav in navLists" :key="nav.value" class="horizontal-menu-wrapper">
                  <a href="javascript:;" class="">
                    <span class="nav-bar-txts">{{ nav.label }}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--面包屑导航-->
        <!--<div class="breadcrumb-container-box">
          <div class="w1200 b1">
            <div class="breadcrumb-container clearfix">
              <div class="breadcrumb-item fl">
                <span class="breadcrumb__inner">
                  <a >SIAB</a>
                </span>
                <span class="breadcrumb__separator">/</span>
              </div>
            </div>
          </div>
        </div>-->
      </div>
      <!--新闻警示-->
      <div class="content-title">
        <div class=" content-container alerts ">
          <div class="w1200">
            当前页面为预览状态，外部用户不可访问
          </div>
        </div>
      </div>
      <!-- 新闻详情 -->
      <div class="detail-container main-containers">
        <div class="w1200 clearfix">
          <div class="fl about-wrapper-left">
            <div
              v-for="nav in currentNavs"
              :key="nav.value"
              class="vertical-menu-wrapper"
              :class="{ 'active' : nav.active }"
            >
              <span class="nav-bar-txts">{{ nav.label }}</span>
              <i class="el-icon-arrow-right" />
            </div>
          </div>
          <div class="content fr">
            <div class="w920">
              <div v-if="isExit" class="min-height">
                <div class="about-title syBold">
                  {{ articles.title }}
                </div>
                <div class="about-content">
                  <div class="about-content-item sub-info">
                    <div class="time">
                      更新时间： {{ articles.updatedAt | formatDate }}
                    </div>

                    <div class="source">
                      来源：
                      <span v-if="articles.classify == 1 ">SIAB</span>
                      <a v-else style="color: #409EFF" href="javascript:;">{{ articles.quoteName }}</a>
                    </div>
                    <div class="shares clearfix">
                      <div class="share-link fl wechat">
                        <svg-icon class-name="icons" icon-class="wechat" />
                      </div>
                      <div class="share-link fl weibo">
                        <svg-icon class-name="icons" icon-class="weibo" />
                      </div>
                      <div class="share-link fl copy">
                        <svg-icon class-name="icons" icon-class="link1" />
                      </div>
                    </div>
                  </div>
                  <div class="article about-content-item" v-html="getNewContents" />

                  <div v-if="articles.accessory && accessoryInfo" class="accessory">
                    <a :href="host + articles.accessory" :download="accessoryInfo.name + '.' + accessoryInfo.fix">附件下载</a>
                  </div>

                  <fields v-if="dicts.length > 0" :fields="dicts" />
                </div>

                <!--底部按钮-->
                <div class="divider" />
                <div class="btns-wrapper">
                  <el-button @click="editAgin">再次编辑</el-button>
                  <el-button @click="publishArticle">继续发布</el-button>
                </div>
              </div>
              <div v-else class="min-height">
                <div class=" details-404 backTopPosition">
                  <img :src="require('@/assets/imgs/404.png')" alt="">
                  <div class="description">
                    糟糕！你访问的页面走丢了，暂时无法访问
                  </div>
                  <a class="news-btn info-btn" href="javascript:;" @click="$router.push( `/` )">返回首页</a>
                </div>
              </div>
              <back-to-top />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--发布文章提示-->
    <el-dialog
      custom-class="customWidth"
      title="发布文章"
      :visible.sync="publishArticleDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <div class="dialog-content clearfix">
        <div class="content-item">
          <i class="el-message__icon el-icon-warning" />
          是否确认发布当前文章？
        </div>
        <div class="content-item1">
          <el-checkbox v-model="checked" />
          文章修改并发布时，仍显示初次发布时间
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="publishArticleDialog = false">取消</el-button>
        <el-button @click="publishArticles">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as request from '@/api/request'
import BackToTop from '@/components/BackToTop'
import { stringFormat } from '@/utils/tools'
import { getNavsByType, getAllNavs } from '@/api/navs'
import Fields from '@/views/components/fields'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )

export default {
  name : 'Preview',
  components : { BackToTop, Fields },
  data() {
    return {
      host : 'http://',
      showArticlesSource : 'about',
      showArticlesNavPid : 0,
      showArticlesNavCid : 0,
      currentNavs : [],
      // 导航列表：全部导航，每个导航显示前100个文章
      navs : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        },
        loading : false
      },
      // 导航列表
      navLists : [],

      preview : {
        search : '',
        showBred : true
      },
      // 是否修改发布时间
      checked : false,

      className : 'static',
      currentRight : 0,
      publishArticleDialog : false,
      loading : false,
      // 文章是否存在
      isExit : true,
      currentId : '',
      articles : {
        id : '',
        type : 1,
        title : '',
        preview : '',
        digest : '',
        classify : 2,
        quoteName : '',
        quoteUrl : '',
        contents : '',
        status : 2,
        firstPublishTime : 0,
        previewed : 2,
        publishTime : 0,
        keywords : []
      },
      // 敏感词列表
      dicts : []
    }
  },
  computed : {
    ...mapGetters( ['currentPreview'] ),
    getNewContents() {
      const contents = this.articles.contents
      let result
      if ( contents ) {
        result = stringFormat( contents, this.dicts )
      } else {
        result = ''
      }
      return result
    },
    accessoryInfo() {
      const accessory = this.articles.accessory
      if ( accessory && accessory.indexOf( '.' ) >= 0 ) {
        const data = accessory.split( '.' )
        return {
          name : data[data.length - 2],
          fix : data[data.length - 1]
        }
      } else {
        return ''
      }
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https' ) ? 'https://' : 'http://'
    try {
      // console.log( 'currentPreview', { ...this.currentPreview } )
      await this.getNavList()
      const { source, details, pid, id } = this.currentPreview

      if ( !pid || !id ) {
        this.isExit = false
        this.loading = false
        await this.$router.push( `/${source}` )
        return false
      }
      this.showArticlesSource = source
      this.showArticlesNavPid = pid
      this.showArticlesNavCid = id
      this.currentNavs = await getNavsByType( pid ).children

      // const sourceName = await getSourceNav( source )
      // console.log( 'sourceName', sourceName )
      // console.log( 'currentNavs', [...this.currentNavs] )
      if ( !details || JSON.stringify( details ) == '{}' ) {
        this.isExit = false
        this.loading = false
        // await this.$router.go( -1 )
        await this.$router.push( `/${source}` )
      } else {
        const { article, dicts } = details
        // console.log( 'details', { ...article }, [...dicts] )
        const reg1 = /(<\/?em.*?>)/gi
        const str = article.contents.replace( reg1, '' )
        const str1 = str ? stringFormat( str, dicts, false ) : ''
        this.articles = article
        this.articles.contents = str1
        this.currentId = article.id
        this.isExit = !!article.id
        this.dicts = dicts
        this.loading = false

        // console.log( 'articles', this.articles )
      }
    } catch ( e ) {
      // console.log( 'created e', e )
    } finally {

    }
  },
  mounted() {

  },
  beforeDestroy() {
    this.articles = {
      id : '',
      type : 1,
      title : '',
      preview : '',
      digest : '',
      classify : 2,
      quoteName : '',
      quoteUrl : '',
      contents : '',
      status : 2,
      firstPublishTime : 0,
      previewed : 2,
      publishTime : 1602691510,
      keywords : []
    }
    this.dicts = []
    this.currentId = ''
  },
  destroyed() {
    window.removeEventListener( 'scroll', this.scrollToTop, true )
  },
  methods : {
    // 获取导航列表 根据source 获取导航
    async getNavList() {
      const that = this
      that.loading = true
      const result = getAllNavs()
      that.navLists = result.filter( item => item.id > 0 )
      that.navs.loading = false
      that.navs.total = that.navLists.length
    },

    editAgin : _.throttle( async function() {
      // 提交store
      await this.$store.dispatch( 'news/setCurrentPreviewNews', {
        article : this.articles,
        dicts : this.dicts
      } )
      await this.$store.dispatch( 'news/setEditType', {
        source : this.showArticlesSource,
        type : 'edit',
        pid : this.showArticlesNavPid,
        id : this.showArticlesNavCid,
        aid : this.articles.id
      } )
      await this.$router.push( { name : 'Edits' } )
    }, 500 ),
    // 继续发布
    publishArticle : _.throttle( function() {
      this.publishArticleDialog = true
    }, 500 ),
    publishArticles : _.throttle( async function() {
      try {
        const params = {
          id : this.currentId,
          // 1 修改 2不修改发布时间
          change : this.checked ? 1 : 2
        }
        const response = await request.onlineArticle( params )
        if ( response.code == 200 ) {
          this.$notify( {
            title : '成功',
            message : '文章发布成功',
            duration : 1500,
            customClass : 'center-center',
            type : 'success'
          } )
          await this.$router.push( { path : `/${this.showArticlesSource}`, query : { id : this.showArticlesNavCid }} )
        } else {
          this.$notify( {
            title : '失败',
            message : '文章发布失败',
            duration : 1500,
            customClass : 'center-center',
            type : 'error'
          } )
        }
      } catch ( e ) {
        console.log( '文章发布失败', e )
      } finally {
        this.publishArticleDialog = false
        this.checked = false
      }
    }, 500 )
  }
}
</script>

<style>
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  p,
  form,
  figure,
  dl,
  dd {
    margin: 0;
  }
  *:after,
  *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  ul,
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  main {
    display: block;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
    font-weight:normal;
  }
  a {
    text-decoration: none;
    color:#333;
  }
  img {
    vertical-align: top;
    border:none;
  }
  input,
  button,
  select,
  textarea {
    vertical-align: middle;
    outline: none;
    border:none;
    padding: 0;
    margin: 0;
  }
  input{
    border:1px solid #a1a1a1;
  }
  textarea {
    resize: none;
    overflow: auto;
  }
  i, em{
    font-style:normal;
  }
  .pb37 {
    padding-bottom: 37px;
  }
  .pt30 {
    padding-top: 30px;
  }
  .w920, .w1200 {
    margin: 0 auto;
  }
  .w1200 {
    width: 1200px;
  }
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
    }
  }
  .content {
    .about-content-item {
      img{
        margin: 15px 0;
        display: block;
        width: 100%;
        height: auto;
      }
    }
  }
  video, img {
    width: 100%;
    height: auto;
    display: inline-block;
    margin: 10px 0;
  }
  .minganci {
    color: red;
  }
</style>
<style lang="scss" scoped>
  .content-item{
    margin-bottom: 20px;
    i {
      color: #e6a23c;
      padding: 0;
      margin: 0;
    }
  }
  .content-item1{
    padding-left: 10px;
  }

  /*头部 -- 顶部*/
  .pointer{
    cursor: pointer;
  }
  .content-bj {
    background-color: #fff;
    overflow: hidden;
  }
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
      width: 100%;
      height: 40px;
      overflow: hidden;
    }
  }
  /*头部 -- 导航*/
  .navbar {
    .main-info-container {
      height: 60px;
      width: 100%;
      background-color: rgb(39, 72, 152);
      .horizontal-menu-wrapper{
        width: 170px;
        height: 60px;
        color: #fff;
        display: inline-block;
        text-align: center;
        font-size: 20px;
        line-height: 60px;
        font-family: Roboto;
        a {
          @extend .horizontal-menu-wrapper;
        }
        span {
           @extend .horizontal-menu-wrapper;
        }
      }
    }
    /*头部 -- 面包屑导航*/
    .breadcrumb-container-box {
      height: 50px;
      background: #fff;
      .b1 {
        border-bottom: 1px dashed #ccc;
      }
      .breadcrumb-container {

      }
      .breadcrumb-item {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 8px;
      }
      .breadcrumb__inner{
        color: #606266;
        font-weight: 400 !important;
        a {
          text-decoration: none;
          transition: color .2s cubic-bezier(.645,.045,.355,1);
          color: #303133;
          font-weight: 400!important;
        }
      }
      .breadcrumb__separator{
        margin: 0 9px;
        font-weight: 700;
        color: #c0c4cc;
      }
    }
  }

  /*主体 - 警示标题*/
  .content-title {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    margin: 10px 0 10px;
    background: #e4f3ff;
    color: #66b6ff;
    text-align: center;
  }
  .content-container {
    padding: 0 0 50px 0;
  }
  /*主体 - 左侧导航*/
  .detail-container {

  }
  .about-wrapper-left{
    width: 250px;
    .side-bar-item{
      background-color: #eee;
      color: #000;
      &:hover {
        background-color: #264898;
        color: #fff;
        .side-bar-item--box{
          .el-icon-arrow-right{
            color: #fff;
            display: inline-block;
          }
        }
      }
      &.active {
        background-color: #264898;
        color: #fff;
        .side-bar-item--box{
          .el-icon-arrow-right{
            color: #fff;
            display: inline-block;
          }
        }
      }
      .side-bar-item--box{
        position: relative;
        .el-icon-arrow-right {
          display: none;
          position: absolute;
          right: 0;
          top: 0;
          font-size: 14px;
          line-height: 60px;
          color: #000;
        }
      }
    }
    .vertical-menu-wrapper {
      height: 56px;
      line-height: 56px;
      font-size: 14px;
      padding: 0 20px;
      list-style: none;
      cursor: pointer;
      position: relative;
      transition: border-color .3s,background-color .3s,color .3s;
      box-sizing: border-box;
      white-space: nowrap;
      background-color: #eee;
      color: #000;
      padding-left: 20px;
      position: relative;
      .el-icon-arrow-right {
        display: none;
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 14px;
        line-height: 60px;
        color: #000;
      }
      &:hover {
        background-color: #264898;
        color: #fff;
        .el-icon-arrow-right {
          display: inline-block;
          color: #fff;
        }
      }
      &.active{
        background-color: #264898;
        color: #fff;
        .el-icon-arrow-right {
          color: #fff;
          display: inline-block;
        }
      }
      .nav-bar-txts {

      }
    }
  }
  /*主体 - 文章内容*/
  .content {
    width: 920px;
    height: auto;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #eee;
    padding: 20px 20px 60px 20px;
    margin-bottom: 30px;
    .about-title{
      color: rgba(0, 0, 0, 1);
      font-size: 28px;
      text-align: center;
      /*height: 80px;*/
      border-bottom: 1px solid #ddd;

      color: #101010;
      line-height: 36px;
      font-weight: 700;
      padding :20px 0 40px;
      word-break: break-all;

      &.list-title{
        font-size: 18px;
        line-height: 27px;
        height: auto;
        text-align: left;
        padding: 27px 0 12px;
      }
    }
    .about-content {
      border-bottom : 1px solid #ddd;
      padding-bottom: 30px;
      &.no-border{
        border: none;
      }
    }
    .about-content-item {
      color: rgb(123, 123, 124);
      &.sub-info{
        text-align: center;
        color: rgba(16, 16, 16, 100);
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        margin-bottom: 10px;
        .time{
          display: inline-block;
          vertical-align: middle;
        }
        .source{
          display: inline-block;
          margin: 0 40px;
          vertical-align: middle;
        }
        .shares{
          display: inline-block;
          vertical-align: middle;
          .share-link{
            cursor: pointer;
            position: relative;
            .icons{
              display: inline-block;
              width: 20px;
              height: 20px;
              margin: 0 13px;
              color: rgba(16, 16, 16, 100);
            }
            .wx-share-qrcode{
              position: absolute;
              top: 35px;
              left: 50%;
              border: 1px solid #ddd;
              border-radius: 3px;
              padding: 5px;
              width: 80px;
              height: 80px;
              background: #fff;
              margin-left: -40px;
              display: none;
            }
            &.wechat:hover {
              .wx-share-qrcode{
                display: block;
              }
            }
          }
        }

      }
      &.article{
        font-family: syRegular;
        font-size: 14px;
        line-height: 1.5;
        img{
          margin: 15px 0;
          display: block;
          width: 100%;
          height: auto;
        }
      }
      &.field{
        margin-top: 40px;
        display: inline-block;
        .field-item{
          display: inline-block;
          margin: 10px 10px;
          height: 26px;
          line-height: 26px;
          text-align: center;
          padding: 0 26px;
          border-radius: 26px;
          background-color: #eee;
        }
      }
      &.contacts-item{
        margin-bottom: 20px;
        //color: rgba(16, 16, 16, 100);
        font-size: 16px;
        span {
          display: inline-block;
          color: rgba(16, 16, 16, 100);
          font-size: 16px;
        }
      }
      video {
        width: 100%;
        height: auto;
        display: inline-block;
      }
    }

  }
  .accessory {
    a {
      color: #1E94FB;
    }
  }

  /*主体 - 404*/
  .detail-container{
    .details-404 {
      background: #fff;
      text-align: center;
      height: 550px;
      img {
        display: block;
        width: 600px;
        height: auto;
        margin: 30px auto;
      }
    }
    .description{
      color: #848587;
      font-size: 20px;
      line-height: 50px;
      height: 50px;
      text-align: center;
      margin: 30px 0;
    }
    .news-btn.info-btn{
      color: #1E94FB;
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      width: 120px;
      text-align: center;
      display: inline-block;
      border: 1px solid #1890FF;
      border-radius: 5px;
    }
   /* .details-wrapper .details-content{
      position: relative;
      padding: 0 15px;
    }*/
  }
  /*主体 - 底部*/
  /*按钮组*/
  .btns-wrapper{
    padding-top: 20px;
    text-align: center;
    .btn-item {
      margin: 0 20px;
    }
  }

  .content-item{
    margin-bottom: 20px;
    i {
      color: #e6a23c;
      padding: 0;
      margin: 0;
    }
  }
  .content-item1{
    padding-left: 10px;
  }
</style>
