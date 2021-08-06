
<template>
  <div class="section-container">
    <!--轮播展示管理-->
    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane label="banner轮播" name="banner">
        <div class="tab-item banner-item">
          <!--头部搜索 创建-->
          <div class="tab-headers clearfix">
            <el-button type="primary" class="mb10" @click="showCreateBanner">创建轮播图</el-button>
          </div>
          <!--表格-->
          <el-table
            ref="typeTable"
            v-loading="banners.loading"
            :data="newBannerList"
            border
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            empty-text=""
          >
            <div slot="empty">
              <div class="no-datas">
                <svg-icon class-name="handle-icon" icon-class="no-data1" />
                <div class="txt">展示列表空空如也</div>
              </div>
            </div>
            <el-table-column label="序号" type="index" width="80" />
            <el-table-column
              label="图片"
              width="200"
            >
              <template slot-scope="{row}">
                <div>
                  <el-image
                    style="width: 100px; height: 24px"
                    :src="host + ( row.url || row.path )"
                    :preview-src-list="[host + ( row.url || row.path )]"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="typesStr"
              label="跳转类型"
            >
              <template slot-scope="{row}">
                {{ row.typesStr }}
              </template>
            </el-table-column>
            <el-table-column
              label="创建者"
              width="150"
            >
              <template slot-scope="{row}">
                <div>
                  {{ row.creator }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
            >
              <template slot-scope="{row}">
                <div>{{ row.updatedAt | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="right"
              header-align="center"
              width="150"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="showEditBanner(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="removeBanner(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="banners.total"
            :page.sync="banners.listQuery.page"
            :limit.sync="banners.listQuery.limit"
            :layout="banners.listQuery.layout"
            @pagination="getBannerList"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="轮播展示" name="case">
        <div class="tab-item case-item">
          <!--头部搜索 创建-->
          <div class="tab-headers clearfix">
            <el-button type="primary" class="mb10" @click="showCreateCase">创建展示轮播图</el-button>
          </div>
          <!--表格-->
          <el-table
            ref="caseTable"
            v-loading="cases.loading"
            :data="newCaseList"
            border
            stripe
            tooltip-effect="dark"
            style="width: 100%"
            empty-text=""
          >
            <div slot="empty">
              <div class="no-datas">
                <svg-icon class-name="handle-icon" icon-class="no-data1" />
                <div class="txt">展示列表空空如也</div>
              </div>
            </div>
            <el-table-column label="序号" type="index" width="80" />
            <el-table-column
              label="图片"
              width="200"
            >
              <template slot-scope="{row}">
                <div>
                  <el-image
                    style="width: 100px; height: 24px"
                    :src="host + ( row.url || row.path )"
                    :preview-src-list="[host + ( row.url || row.path )]"
                  />
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="typesStr"
              label="跳转类型"
            >
              <template slot-scope="{row}">
                {{ row.typesStr }}
              </template>
            </el-table-column>
            <el-table-column
              label="创建者"
              width="150"
            >
              <template slot-scope="{row}">
                <div>
                  {{ row.creator }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
            >
              <template slot-scope="{row}">
                <div>{{ row.updatedAt | formatDate }}</div>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="right"
              header-align="center"
              width="150"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="small" @click="showEditCase(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="removeCase(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="cases.total"
            :page.sync="cases.listQuery.page"
            :limit.sync="cases.listQuery.limit"
            :layout="cases.listQuery.layout"
            @pagination="getCaseList"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--创建 / 编辑banner弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑banner"
      :visible.sync="bannerDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="beforeBannerDialog"
      @open="openBannerDialog"
      @close="closeBannerDialog"
    >
      <div class="content clearfix">
        <el-form ref="bannerForms" :model="bannerForm" :label-width="formLabelWidth" :rules="bannerRules">
          <el-form-item label="跳转页面" prop="types">
            <el-radio-group v-model="bannerForm.types">
              <div class="radio-item clearfix">
                <el-radio :label="1" class="">不关联</el-radio>
              </div>
              <div class="radio-item clearfix">
                <el-radio :label="2" class="ib">关联文章</el-radio>
                <div class="ib" style="width: 300px;">
                  <el-form-item label="" prop="target">
                    <el-cascader
                      ref="target"
                      popper-class="custom-cascader"
                      v-model="bannerForm.target"
                      :disabled="bannerForm.types != 2"
                      name="target"
                      class="block"
                      :options="navList"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChangeBanner"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="radio-item clearfix">
                <el-radio :label="3" class="ib">关联外链</el-radio>
                <div class="ib" style="width: 300px;">
                  <el-form-item label="" prop="links">
                    <el-input
                      ref="links"
                      v-model="bannerForm.links"
                      :disabled="bannerForm.types != 3"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      name="links"
                      placeholder="请输入外部链接"
                      :clearable="true"
                      tabindex="1"
                      show-word-limit
                      autocomplete="new-password"
                    />
                  </el-form-item>
                </div>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择图片" prop="file">
            <div class="select-imgs">
              <el-button size="small" type="primary" @click="$refs.bannerFile.click()">选择文件</el-button>
<!--              <span class="file-name">我是文件名</span>-->
              <input
                id="banner-file"
                ref="bannerFile"
                accept="png/image,jpg/image,jpeg/image"
                type="file"
                class="select-file--inp"
                @change="selectPreivew( 'banner' )"
              >
            </div>
            <div class="info">
              建议上传尺寸：1920 * 385，仅支持格式: png | jpg, 不大于5M
            </div>
          </el-form-item>
          <el-form-item label="图片预览" prop="path">
            <div class="preview-banner">
              <img alt="" :src="host + ( bannerForm.url || bannerForm.path )">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitBannerForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="hideBannerDialog"
        >取消</el-button>
      </div>
    </el-dialog>
    <!--创建 / 编辑case弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑展示区域"
      :visible.sync="caseDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="openCaseDialog"
      @close="closeCaseDialog"
    >
      <div class="content clearfix">
        <el-form ref="caseForms" :model="caseForm" :label-width="formLabelWidth" :rules="caseRules">
          <el-form-item label="跳转页面" prop="types">
            <el-radio-group v-model="caseForm.types">
              <div class="radio-item clearfix">
                <el-radio :label="1" class="">不关联</el-radio>
              </div>
              <div class="radio-item clearfix">
                <el-radio :label="2" class="ib">关联文章</el-radio>
                <div class="ib" style="width: 300px;">
                  <el-form-item label="" prop="target">
                    <el-cascader
                      ref="target"
                      v-model="caseForm.target"
                      :disabled="caseForm.types != 2"
                      name="target"
                      class="block"
                      :options="navList"
                      :props="{ expandTrigger: 'hover' }"
                      @change="handleChangeBanner"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="radio-item clearfix">
                <el-radio :label="3" class="ib">关联外链</el-radio>
                <div class="ib" style="width: 300px;">
                  <el-form-item label="" prop="links">
                    <el-input
                      ref="links"
                      v-model="caseForm.links"
                      :disabled="caseForm.types != 3"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      name="links"
                      placeholder="请输入外部链接"
                      :clearable="true"
                      tabindex="2"
                      show-word-limit
                      autocomplete="new-password"
                    />
                  </el-form-item>
                </div>
              </div>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择图片" prop="file">
            <div class="select-imgs">
              <el-button size="small" type="primary" @click="$refs.caseFile.click()">选择文件</el-button>
<!--              <span class="file-name">我是文件名</span>-->
              <input
                id="case-file"
                ref="caseFile"
                accept="png/image,jpg/image,jpeg/image"
                type="file"
                class="select-file--inp"
                @change="selectPreivew( 'case' )"
              >
            </div>
            <div class="info">建议上传尺寸：1920 * 256，仅支持格式: png | jpg, 不大于5M</div>
          </el-form-item>
          <el-form-item label="图片预览" prop="path">
            <div class="preview-banner">
              <img alt="" :src="host + ( caseForm.url || caseForm.path )">
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitCaseForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="caseDialogOff = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )
import Pagination from '@/components/Pagination'
import { uploadImage, getBanners, createBanner, updateBanner, removeBanner, bannerArticle } from '@/api/request'
import { validateFileSize, validURL } from '@/utils/validate'
export default {
  name : 'Banner',
  components : { Pagination },
  data() {
    const trigger = ['blur', 'change']
    // 校验本地文章 和 外部链接
    const checkTarget = ( rule, value, callback ) => {
      // 判断当前类型 如果类型为 2 则验证
      if ( this.bannerForm.types == 2 ) {
        if ( !value ) {
          return callback( new Error( '请选择关联文章' ) )
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const checkLinks = ( rule, value, callback ) => {
      // 判断当前类型 如果类型为 固定市场 2 则验证
      if ( this.bannerForm.types == 3 ) {
        if ( !validURL( value ) ) {
          return callback( new Error( '请输入合法的外部链接' ) )
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    const checkImage = ( rule, value, callback ) => {
      if ( !value ) {
        return callback( new Error( '请选择图片' ) )
      } else if ( value && !validateFileSize( value.size, 5 ) ) {
        return callback( new Error( '图片最大只能为5M' ) )
      } else {
        callback()
      }
    }
    const checkDes = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 200 || value.length == 0 ) {
        return callback( new Error( '描述只能是1~200个非空字符串' ) )
      } else {
        callback()
      }
    }
    const checkUrl = ( rule, value, callback ) => {
      // const reg = /^([0-9]|[a-zA-Z]|[\u4e00-\u9fa5]){1,20}$/
      if ( !validURL( value ) ) {
        return callback( new Error( '非法URL' ) )
      } else {
        callback()
      }
    }

    return {
      host : 'http://',
      // 控制表格单格宽度
      formLabelWidth : '120px',
      // 导航列表：全部导航，每个导航显示前100个文章cle
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
      navList : [],
      // 当前tab
      currentTab : 'banner',
      // 分页参数
      banners : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        },
        loading : false
      },
      // 大banner 列表
      bannerList : [],
      // 弹框参数
      bannerDialogOff : false,
      bannerDialogType : 'create',
      // 当前被编辑/ 删除的轮播对象
      currentSelectBanner : {},
      // banner form
      bannerForm : {
        types : 1, // 1 不关联 2 本地文章， 3 外链
        target : '',
        links : '',
        // file : '',
        url : '',
        path : ''
      },
      bannerRules : {
        types : [],
        target : [
          { validator : checkTarget, trigger }
        ],
        links : [
          // { required : true, message : '请输入关联链接', trigger },
          { validator : checkLinks, trigger }
        ],
        path : [
          { required : true, message : '请先上传图片', trigger }
        ]
        // file : [
        //   { required : true, message : '请选择图片', trigger : 'change' },
        //   { validator : checkImage, trigger }
        // ],
      },

      // 小banner 分页参数等
      cases : {
        // 分页
        total : 0,
        loading : false,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        }
      },
      caseList : [],
      caseDialogOff : false,
      caseDialogType : 'create',
      currentSelectCase : {},
      // case form
      caseForm : {
        types : 1, // 1 不关联 2 本地文章， 3 外链
        target : '',
        links : '',
        url : '',
        path : ''
      },
      caseRules : {
        types : [],
        target : [
          { validator : checkTarget, trigger }
        ],
        links : [
          { validator : checkLinks, trigger }
        ],
        path : [
          { required : true, message : '请先上传图片', trigger }
        ]
      }
    }
  },
  computed : {
    newBannerList() {
      if ( this.bannerList.length > 0 ) {
        this.bannerList.forEach( item => {
          const types = item.types
          if ( types == 1 ) {
            item.typesStr = '不跳转'
          } else if ( types == 2 ) {
            item.typesStr = '跳转到本地文章'
          } else {
            item.typesStr = '跳转到外部链接'
          }
        } )
      }
      return this.bannerList
    },
    newCaseList() {
      if ( this.caseList.length > 0 ) {
        this.caseList.forEach( item => {
          const types = item.types
          if ( types == 1 ) {
            item.typesStr = '不跳转'
          } else if ( types == 2 ) {
            item.typesStr = '跳转到本地文章'
          } else {
            item.typesStr = '跳转到外部链接'
          }
        } )
      }
      return this.caseList
    }

    // newNavList() {
    //   if ( this.navList.length > 0 ) {
    //     this.navList.forEach( item => {
    //       const { children } = item
    //       if ( children && children.length > 0 ) {
    //         children.forEach( child => {
    //           const children1 = child.children
    //           if ( children1 && children1.length > 0 ) {
    //             children1.forEach( cItem => {
    //               const { id, title } = cItem
    //               cItem.value = id
    //               cItem.label = title
    //             } )
    //           }
    //         } )
    //       }
    //     } )
    //   }
    //   console.log( 'this.navList', this.navList )
    //   return this.navList
    // },
  },
  watch : {
    'currentTab' : {
      handler( res ) {
        if ( res == 'banner' ) {
          this.getBannerList()
        } else {
          this.getCaseList()
        }
      },
      immediate : true,
      deep : true
    }
  },
  async created() {
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getAllArticles()
    await this.getBannerList()
  },
  methods : {
    // 获取导航列表 ： 全部导航，每个导航显示前100个文章
    async getAllArticles() {
      const that = this
      try {
        const { data } = await bannerArticle( {} )
        console.log( 'h获取所有文章', data )
        that.navList = data
      } catch ( e ) {

      } finally {

      }
    },
    // 重置表单
    resetForm( data, type = 'bannerForm' ) {
      if ( data ) {
        this[type] = { ...data }
        if ( !this[type]['file'] && data['url'] ) {
          this[type]['file'] = data['url']
        }
        const { types, redirect } = data
        if ( types == 1 ) {
          // this[type]['target'] = ''
          // this[type]['links'] = ''
        } else if ( types == 2 ) {
          // const res = redirect.split( '-' )
          this[type]['target'] = redirect.split( '-' ).map( item => parseInt( item ) )
          // console.log( 'redirect', { ...data } )
          // console.log( 'target', this[type]['target'] )
        } else {
          this[type]['links'] = redirect
        }
      } else {
        for ( const key in this[type] ) {
          this.$set( this[type], key, '' )
        }
        this.$set( this[type], 'types', 1 )
      }
    },
    // 重置分页参数
    async initPage( type = 'banners' ) {
      this[type].listQuery.page = 1
      this[type].listQuery.limit = 10
    },
    // 选择图片 type : banner | case
    selectPreivew( type = 'banner' ) {
      const that = this
      let el
      let ref
      let formName
      if ( type == 'banner' ) {
        el = that.$refs.bannerFile
        formName = 'bannerForm'
        ref = 'bannerForms'
      } else {
        el = that.$refs.caseFile
        ref = 'caseForms'
        formName = 'caseForm'
      }
      const file = el.files[0]
      const fileEl = that.$refs[ref].fields[4]
      if ( file ) {
        // 判断文件尺寸
        that.$refs[ref].validateField( 'file', async( res ) => {
          // console.log( '单独验证video', res )
          if ( res ) {
            this[formName].url = ''
            this[formName].path = ''
            el.value = ''
          } else {
            // 上传图片
            const formData = new FormData()
            formData.append( 'file', file )
            const { code, data } = await uploadImage( formData )
            if ( code == 200 ) {
              const { path } = data
              that[formName].url = path
              that[formName].path = path
              el.value = ''
              fileEl.validateMessage = ''
              fileEl.validateState = 'success'
            } else {
              this[formName].url = ''
              this[formName].path = ''
              el.value = ''
              fileEl.validateMessage = '请选择图片'
              fileEl.validateState = 'error'
            }
            // console.log( 'uploadRes', data, { ...this[formName] } )
          }
        } )
      }
    },
    // 获取 大 banner请求
    async getBannerList( data ) {
      const that = this
      that.banners.loading = true
      if ( data ) {
        that.banners.listQuery.page = data.page
        that.banners.listQuery.limit = data.limit
      }
      const params = {
        // 状态筛选 1：大 banner 2  小 banner
        type : that.currentTab == 'banner' ? 1 : 2,
        page : that.banners.listQuery.page,
        limit : that.banners.listQuery.limit
      }
      try {
        const { data } = await getBanners( params )
        console.log( '获取banner', data )
        that.banners.total = data.count
        that.bannerList = data.list
      } catch ( e ) {

      } finally {
        that.banners.loading = false
      }
    },
    // 显示创建类型弹框
    async showCreateBanner() {
      this.bannerDialogOff = true
      this.bannerDialogType = 'create'
      this.currentSelectBanner = {}
    },
    // 显示编辑类型弹框
    async showEditBanner( data ) {
      this.bannerDialogOff = true
      this.bannerDialogType = 'update'
      this.currentSelectBanner = { ...data }
    },
    // 关闭banner弹框
    async hideBannerDialog() {
      this.bannerDialogOff = false
      this.bannerDialogType = 'create'
      this.currentSelectBanner = {}
    },
    // 关闭弹窗前的回调
    beforeBannerDialog( done ) {
      // if ( !this.unChange ) {
      //   this.$confirm( '当前信息未保存，是否取消本次编辑', '', {} )
      //     .then( () => {
      //       done()
      //     } )
      //     .catch( () => {} )
      // } else {
      //   done()
      // }
      this.resetForm( false, 'bannerForm' )
      done()
    },
    // 打开类型弹框
    async openBannerDialog() {
      this.$nextTick( e => {
        this.$refs.bannerForms.resetFields()
        if ( this.bannerDialogType === 'create' ) {
          this.resetForm( false, 'bannerForm' )
        } else {
          this.resetForm( this.currentSelectBanner, 'bannerForm' )
        }
      } )
    },
    // 关闭类型弹框
    async closeBannerDialog() {
      const that = this
      that.resetForm( false, 'bannerForm' )
      setTimeout( () => {
        that.currentSelectBanner = {}
        that.bannerDialogType = 'create'
      }, 100 )
    },
    // 提交更新
    async submitBannerForm() {
      this.$refs['bannerForms'].validate( valid => {
        if ( valid ) {
          // console.log( 'this.bannerDialogType', this.bannerDialogType )
          if ( this.bannerDialogType === 'create' ) {
            this.createBannerRequest()
          } else {
            this.updateBannerRequest()
          }
        }
      } )
    },
    // 发送创建 更新请求
    async createBannerRequest() {
      const { types, path, target, links } = this.bannerForm
      const params = {
        ...this.bannerForm,
        type : 1,
        path : path,
        types : types
      }
      if ( types == 2 ) {
        // 关联文章
        params.redirect = target.join( '-' )
      } else if ( types == 3 ) {
        params.redirect = links
      } else {
        params.redirect = ''
      }
      try {
        const res = await createBanner( params )
        await this.getBannerList()
        this.bannerDialogOff = false
      } catch ( e ) {
        // console.log( '创建banner出错', e )
      }
    },
    async updateBannerRequest() {
      const { types, id, path, target, links } = this.bannerForm
      const params = {
        id : id,
        type : 1,
        path : path,
        types : types
      }
      // console.log( 'this.bannerForm', { ...this.bannerForm } )
      if ( types == 2 ) {
        params.redirect = target.join( '-' )
      } else if ( types == 3 ) {
        params.redirect = links
      } else {
        params.redirect = ''
      }
      try {
        await updateBanner( params )
        await this.getBannerList()
        this.bannerDialogOff = false
      } catch ( e ) {
        // console.log( '更新banner出错', e )
      }
    },
    // 删除banner TODO 只需传入目标 ID
    async removeBanner( data ) {
      this.$confirm( '确定删除该banner吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await removeBanner( params )
            await this.initPage( 'banners' )
            await this.getBannerList()
          } catch ( e ) {
          }
        } )
    },

    // 获取 case banner请求
    async getCaseList( data ) {
      const that = this
      that.cases.loading = true
      if ( data ) {
        that.cases.listQuery.page = data.page
        that.cases.listQuery.limit = data.limit
      }
      const params = {
        type : 2,
        page : that.cases.listQuery.page,
        limit : that.cases.listQuery.limit
      }
      try {
        const { data } = await getBanners( params )
        that.cases.total = data.count
        that.caseList = data.list
      } catch ( e ) {

      } finally {
        that.cases.loading = false
      }
    },
    // 显示创建类型弹框
    async showCreateCase() {
      this.caseDialogOff = true
      this.caseDialogType = 'create'
      this.currentSelectCase = {}
    },
    // 显示编辑类型弹框
    async showEditCase( data ) {
      this.caseDialogOff = true
      this.caseDialogType = 'update'
      this.currentSelectCase = { ...data }
    },
    // 关闭banner弹框
    async hideCaseDialog() {
      this.caseDialogOff = false
      this.caseDialogType = 'create'
      this.currentSelectCase = {}
    },
    // 关闭弹窗前的回调
    beforeCaseDialog( done ) {
      // if ( !this.unChange ) {
      //   this.$confirm( '当前信息未保存，是否取消本次编辑', '', {} )
      //     .then( () => {
      //       done()
      //     } )
      //     .catch( () => {} )
      // } else {
      //   done()
      // }
      this.resetForm( false, 'caseForm' )
      done()
    },
    // 打开类型弹框
    async openCaseDialog() {
      this.$nextTick( e => {
        this.$refs.caseForms.resetFields()
        if ( this.caseDialogType === 'create' ) {
          this.resetForm( false, 'caseForm' )
        } else {
          this.resetForm( this.currentSelectCase, 'caseForm' )
        }
      } )
    },
    // 关闭类型弹框
    async closeCaseDialog() {
      const that = this
      this.resetForm( false, 'caseForm' )
      setTimeout( () => {
        that.currentSelectCase = {}
        that.caseDialogType = 'create'
      }, 100 )
    },
    // 提交更新类型
    async submitCaseForm() {
      this.$refs['caseForms'].validate( valid => {
        if ( valid ) {
          // console.log( 'this.caseDialogType', this.caseDialogType )
          if ( this.caseDialogType === 'create' ) {
            this.createCaseRequest()
          } else {
            this.updateCaseRequest()
          }
        }
      } )
    },
    // 发送创建 更新请求
    async createCaseRequest() {
      const { types, path, target, links } = this.caseForm
      const params = {
        ...this.caseForm,
        type : 2,
        path : path,
        types : types
      }
      if ( types == 2 ) {
        params.redirect = target
      } else if ( types == 3 ) {
        params.redirect = links
      } else {
        params.redirect = ''
      }
      try {
        const res = await createBanner( params )
        await this.getCaseList()
        this.caseDialogOff = false
      } catch ( e ) {
        // console.log( '创建case banner出错', e )
      }
    },
    async updateCaseRequest() {
      const { types, id, path, target, links } = this.caseForm
      const params = {
        id : id,
        type : 2,
        path : path,
        types : types
      }
      if ( types == 2 ) {
        params.redirect = target.join( '-' )
      } else if ( types == 3 ) {
        params.redirect = links
      } else {
        params.redirect = ''
      }
      try {
        await updateBanner( params )
        await this.getCaseList()
        this.caseDialogOff = false
      } catch ( e ) {
        // console.log( '更新case banner出错', e )
      }
    },
    // 删除case
    async removeCase( data ) {
      this.$confirm( '确定删除该banner吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await removeBanner( params )
            await this.initPage( 'cases' )
            await this.getCaseList()
          } catch ( e ) {
            this.$notify( {
              title : '失败',
              message : '删除失败',
              duration : 1500,
              customClass : 'center-center',
              type : 'error'
            } )
          }
        } )
    },

    // 三级联动选择框 change
    async handleChangeBanner( data ) {
      // console.log( 'handleChangeBanner', data, this.bannerForm.target )
    },
    async handleChangeCase( data ) {

    }
  }
}
</script>

<style lang="scss">
  .section-container {
    padding: 10px;
  }
  .el-image-viewer__wrapper {
    .el-icon-circle-close{
      color: #000;
    }
  }
  .mb10 {
    margin-bottom: 10px;
  }

  /*级联选择器*/
  .custom-cascader {
    .el-scrollbar.el-cascader-menu {
      .el-cascader-node__label {
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
        max-width: 300px;
      }
    }
  }
</style>
<style scoped lang="scss">
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
  /*上传文件*/
  .select-imgs {
    position: relative;
    .el-button{

    }
    .file-name {
      display: inline-block;
      margin-left: 15px;
      font-size: 14px;
    }
    .select-file--inp{
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      z-index: 9;
    }
  }
/*  .avatar-uploader {
    cursor: pointer;
    width: 200px;
    height: 47px;
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
  .selectFiles{
    display: none;
  }*/
  /*预览文件*/
  .preview-banner {
    max-width: 70%;
    height: auto;
    img {
      display: inline-block;
      width: 100%;
      height: auto;
    }
  }

  /*dialog*/
  .radio-item {
    width: 100%;
    height: 36px;
    margin-bottom: 20px;
    ::v-deep .el-radio {
      height: 36px;
      margin-top: 10px;
    }
    .ib {
      display: inline-block;
    }
  }
</style>
