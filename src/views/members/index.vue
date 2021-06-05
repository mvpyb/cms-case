
<template>
  <div class="app-container">
    <!--头部搜索 创建-->
    <div class="tab-headers clearfix mb20">
      <el-button type="primary" class="fl" :disabled="!contents.currentNav" @click="showCreateArticle">创建文章</el-button>

      <div class="fl" style="margin-left: 15px;margin-right: 15px;">
        <el-select
          slot="prepend"
          v-model="contents.currentNav"
          placeholder="请选择导航"
          style="width: 200px;"
          @change="navChange"
        >
          <el-option
            v-for="nav in navList"
            :key="nav.id"
            :label="nav.meta.title"
            :value="nav.id"
          />
        </el-select>
      </div>

      <div class="fr" style="width: calc(100% - 400px);">
        <el-input
          v-model="contents.searchField"
          placeholder="文章搜索"
          class="fr input-with-select1"
          style="width: 90%;"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchArticles" />
        </el-input>
      </div>
    </div>
    <el-table
      ref="contentTable"
      v-loading="contents.loading"
      :data="contentList"
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
      <el-table-column label="文章标题">
        <template slot-scope="scope">
          <div class="ellipsis">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="首次发布时间" width="160">
        <template slot-scope="scope">{{ scope.row.firstPublishTime | formatDate }}</template>
      </el-table-column>
      <el-table-column label="更新时间" width="160">
        <template slot-scope="scope">{{ scope.row.updatedAt | formatDate }}</template>
      </el-table-column>

      <el-table-column label="操作" width="300" align="center" class="btn-wrapper-cell">
        <template slot-scope="scope">
          <div style="position:relative;">
            <el-button-group>
              <el-button
                class="new-text-default"
                type="success"
                size="mini"
                @click="previewArticle(scope.row)"
              >预览</el-button>
              <el-button
                class="new-text-default"
                type="primary"
                size="mini"
                v-if="scope.row.status != 1"
                :disabled="scope.row.status == 1"
                @click="showEditArticle(scope.row)"
              >编辑</el-button>
              <el-button
                v-if="scope.row.status != 1"
                class="new-text-default"
                type="success"
                size="mini"
                :disabled="authorityId > 2"
                @click="publishArticle(scope.row)"
              >发布</el-button>
              <el-button
                v-if="scope.row.status == 1"
                class="new-text-default"
                type="warning"
                size="mini"
                :disabled="authorityId > 2"
                @click="offlineArticle(scope.row)"
              >下线</el-button>
              <el-button
                class="new-text-default"
                type="danger"
                size="mini"
                :disabled="authorityId > 2"
                @click="removeArticle(scope.row)"
              >删除</el-button>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="contentList.length > 0"
      :total="contents.total"
      :page.sync="contents.listQuery.page"
      :limit.sync="contents.listQuery.limit"
      :page-sizes="contents.listQuery.pageSizes"
      :layout="contents.listQuery.layout"
      @pagination="getArticleList"
    />
    <el-dialog
      custom-class="customWidth"
      title="发布文章"
      :visible.sync="publishArticleDialog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <div class="content clearfix">
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
import { getEnvs } from '@/utils/tools'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import * as request from '@/api/request'
import { getNavsByType } from '@/api/navs'
import GLOBAL_DATA from '@/api/global'

export default {
  name : 'Members',
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
      sourceId : -1,
      checked : false,
      publishArticleDialog : false,
      formLabelWidth : '80px',
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
      navList : [],
      // 文章列表
      contentList : [],
      contents : {
        // 当前所处的父级导航ID 5 会员天地
        pid : 5,
        // 当前被选择的子级导航
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
      // 类型form
      contentForm : {
        name : '',
        description : ''
      },
      contentRules : {
        name : [
          { required : true, message : '请输入类型名称', trigger },
          { validator : checkTypeName, trigger }
        ],
        description : [
          { required : true, message : '请输入类型描述', trigger },
          { validator : checkTypeDes, trigger }
        ]
      },
      contentDialogOff : false,
      currentSelectContent : {}
    }
  },
  computed : {
    ...mapGetters( ['roles', 'authorityId'] )
  },
  async created() {
    const { id } = this.$route.query
    this.sourceId = id || -100
    await this.getNavList()
    await this.getArticleList()
  },
  methods : {
    // 获取导航列表 ： 全部导航，每个导航显示前100个文章
    async getNavList() {
      const that = this
      const result = getNavsByType( that.contents.pid )
      that.navList = result.children.filter( item => item.id != 9 && item.id != 11 && item.id > 0 )
      // that.contents.currentNav = that.navList[0]['id']
      if ( !that.navList.find( item => item.id == that.sourceId ) ) {
        that.contents.currentNav = that.navList[0]['id']
      } else {
        that.contents.currentNav = Number( that.sourceId )
      }
      that.navs.loading = false

      that.navs.total = that.navList.length
    },
    // 重置分页参数
    async initPage( type = 'contents' ) {
      this[type].listQuery.page = 1
      this[type].listQuery.limit = 10
    },
    // 获取文章列表
    async getArticleList( payload ) {
      const that = this
      that.contents.loading = true
      if ( payload ) {
        that.contents.listQuery.page = payload.page
        that.contents.listQuery.limit = payload.limit
      }
      const params = {
        type : that.contents.currentNav || 0,
        page : that.contents.listQuery.page,
        limit : that.contents.listQuery.limit
      }
      if ( that.contents.searchField ) {
        params.search = that.contents.searchField
      }
      try {
        const { data } = await request.getArticle( params )
        that.contents.total = data.count
        that.contentList = data.list
      } catch ( e ) {
        console.log( 'e', e )
      } finally {
        that.contents.loading = false
      }
    },
    // 导航切换
    async navChange( data ) {
      this.contents.currentNav = data || 0
      await this.initPage()
      await this.getArticleList()
    },
    // 搜索文章
    async searchArticles() {
      await this.initPage()
      await this.getArticleList()
    },
    // 发布文章
    async publishArticle( data ) {
      this.publishArticleDialog = true
      this.currentSelectTask = { ...data }
    },
    async publishArticles() {
      try {
        const params = {
          id : this.currentSelectTask.id,
          // 1 修改 2不修改发布时间
          change : this.checked ? 2 : 1
        }
        await request.onlineArticle( params )
        await this.$notify( {
          title : '成功',
          message : '发布成功',
          duration : 1500,
          customClass : 'center-center',
          type : 'success'
        } )
        await this.initPage()
        await this.getArticleList()
      } catch ( e ) {} finally {
        this.publishArticleDialog = false
        this.checked = false
      }
    },
    // 下线文章
    async offlineArticle( data ) {
      this.$confirm( '确定下线该文章吗？', '提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await request.offlineArticle( params )
            await this.$notify( {
              title : '成功',
              message : '下线成功',
              duration : 1500,
              customClass : 'center-center',
              type : 'success'
            } )
            await this.initPage()
            await this.getArticleList()
          } catch ( e ) {}
        } )
    },
    // 删除文章
    async removeArticle( data ) {
      this.$confirm( '确定删除该文章吗？', '提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await request.removeArticle( params )
            await this.$notify( {
              title : '成功',
              message : '删除成功',
              duration : 1500,
              customClass : 'center-center',
              type : 'success'
            } )
            await this.initPage()
            await this.getArticleList()
          } catch ( e ) {}
        } )
    },
    // 显示编辑文章弹框
    async showEditArticle( data ) {
      await this.$store.dispatch( 'news/setEditType', {
        source : 'members',
        type : 'edit',
        pid : this.contents.pid,
        id : this.contents.currentNav,
        aid : data.id
      } )
      await this.$router.push( { name : 'Edits' } )
    },
    // 显示创建文章弹框
    async showCreateArticle() {
      if ( !this.contents.currentNav ) return false
      // 如果当前是入会条件 name只能创建一片文章
      if ( this.contents.currentNav == 22 && this.contentList.length >= 1 ) {
        this.$message.warning( '当前目录只允许存在一篇文章，您可对现有文章修改或者删除后重新创建' )
        return false
      }
      await this.$store.dispatch( 'news/setEditType', {
        source : 'members',
        type : 'create',
        pid : this.contents.pid,
        id : this.contents.currentNav
      } )
      await this.$router.push( { name : 'Edits' } )
    },
    // 预览文章
    // 预览文章
    async previewArticle( params ) {
      const { id } = params
      const { dev } = GLOBAL_DATA
      const caseUrl = dev.case
      const currentNav = this.contents.currentNav
      // console.log( '1 预览文章 previewArticles', { ...params } )
      // console.log( 'currentNav', currentNav )
      try {
        this.currentSelectArticle = { ...params }
        this.loading = true
        const { data } = await request.previewArticle( {
          id : params.id
        } )
        if ( params.status === 1 ) {
          const envStr = getEnvs()
          let url = ''
          // 判断当前页面  如果是 入会条件 就跳转到 'https://webapps-fat.shadowcreator.com/a/test/#/member/membership'
          //                                否则 'https://webapps-fat.shadowcreator.com/a/test/#/member/details?id='
          if ( envStr === 'dev' ) {
            if ( currentNav == 23 ) {
              url = caseUrl + '/#/member/details?id=' + id
            } else {
              url = caseUrl + '/#/member/membership'
            }
          } else {
            if ( currentNav == 23 ) {
              url = caseUrl + '/#/member/details?id=' + id
            } else {
              url = caseUrl + '/#/member/membership'
            }
          }
          window.open( url, '_blank' )
        } else {
          const { detail, dict } = data
          console.log( '2 预览文章 previewArticles', data )
          await this.$store.dispatch( 'news/setCurrentPreviewNews', {
            type : 'preview',
            pid : this.contents.pid,
            id : this.contents.currentNav,
            source : 'members',
            details : {
              article : detail,
              dicts : dict
            }
          } )
          await this.$router.push( {
            name : 'Preview'
          } )
        }
      } catch ( e ) {
      } finally {
        this.loading = false
      }
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
