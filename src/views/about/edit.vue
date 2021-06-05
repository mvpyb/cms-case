
<template>
  <div v-loading="loading" class="content-container p12">
    <!--创建文章-->
    <div style="display: none">
      isChange{{ isChange }}
    </div>

    <div class="dialog-container">
      <div class="content clearfix">
        <el-form ref="taskForm" :model="form" :label-width="formLabelWidth" :rules="rules">
          <el-form-item class="title-bold" label="文章类型" />
          <el-form-item label="所属导航" prop="nav">
            <!-- <el-select v-model="form.type" filterable placeholder="请选择文章类型" style="width: 100%;">
              <el-option
                v-for="item in newNavLists"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>-->

            <el-input
              v-model="navs.currentNav"
              name="title"
              maxlength="100"
              disabled
              placeholder="请输入文章标题，支持中英文字符、数字、空格及标点符号，最多100个字符"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
            <!-- <el-cascader
              ref="nav"
              v-model="form.nav"
              placeholder="请选择导航"
              style="width: 100%;"
              name="nav"
              class="block"
              :options="newNavLists"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChangeBanner"
            />-->
          </el-form-item>
          <el-form-item label="文章标题" prop="title">
            <el-input
              v-model="form.title"
              name="title"
              maxlength="100"
              placeholder="请输入文章标题，支持中英文字符、数字、空格及标点符号，最多100个字符"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>

          <el-form-item label="封面图片" prop="preview" :required="needPreview">
            <input
              ref="selectFiles"
              type="file"
              class="selectFiles"
              name="preview"
              accept="image/jpeg, image/jpg, image/png"
              @change="selectFileList"
            >
            <div class="avatar-uploader" @click.stop="$refs.selectFiles.click()">
              <img v-if="form.preview" :src="form.preview" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </div>
            <p class="upload-description">建议图片尺寸570px*320px，不超过5MB，仅支持jpg/png格式</p>
          </el-form-item>

          <el-form-item label="封面摘要" prop="digest">
            <el-input
              v-model="form.digest"
              type="textarea"
              name="digest"
              maxlength="150"
              placeholder="请输入封面摘要信息"
              autocomplete="new-password"
              clearable
              show-word-limit
              :autosize="{ minRows: 4, maxRows: 4}"
            />
          </el-form-item>
          <el-form-item label="文章作者" prop="classify">
            <el-radio-group v-model="form.classify">
              <el-radio :label="1">原创</el-radio>
              <el-radio :label="2">引用</el-radio>
            </el-radio-group>

            <div v-if="form.classify == 2">
              <el-form-item label="引用方名称" prop="quote_name" style="margin-bottom: 20px;">
                <el-input
                  v-model="form.quote_name"
                  name="quote_name"
                  maxlength="150"
                  placeholder="请输入引用方名称，支持中英文字符及数字，最多50个字符"
                  autocomplete="new-password"
                  clearable
                  show-word-limit
                />
              </el-form-item>
              <el-form-item label="引用方链接" prop="quote_url">
                <el-input
                  v-model="form.quote_url"
                  name="quote_url"
                  placeholder="请输入引用方链接，不可全为空格及标点符号"
                  autocomplete="new-password"
                  clearable
                  show-word-limit
                />
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="关键词" prop="keyWords" class="keywords-item">
            <custom-inp v-model="currentInps" :inputs="inputs" :maxlen="8" :disabled="false" @removeTag="removeTag" @addTags="addTags" />
          </el-form-item>

          <el-form-item label="附件上传" prop="accessory">
            <input
              ref="accessory"
              type="file"
              class="accessory"
              name="accessory"
              @change="selectExcelList"
            >
            <el-button v-if="!form.accessory" type="primary" @click.stop="$refs.accessory.click()">选择附件</el-button>
            <div v-else>
              <span class="file-item file-name">{{ accessoryName }}</span>
              <!--<span class="file-item file-size">{{accessorySize | changeSize }}</span>-->
              <el-button type="text" @click="$refs.accessory.click()">重新上传</el-button>
            </div>
            <p v-if="!form.accessory" class="upload-description">附件大小不超过5MB</p>
          </el-form-item>

          <div class="dashod-driver" />
          <el-form-item class="title-bold contents-require" label="正文编辑" />
          <el-form-item ref="tinymce-wrapper-item" label="" prop="contents" class="tinymce-wrapper-el-item">
            <div class="tinymce-wrapper">
              <tinymce v-model="form.contents" :height="400" @input="getEditorContent" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer">
        <div>
          <el-button style="width: 120px;" type="primary" :disabled="isSaving" @click="submitForm">保 存</el-button>
        </div>
      </div>
    </div>
    <el-backtop target="#app .app-wrapper" :bottom="100" />
  </div>
</template>

<script>
import * as request from '@/api/request'
import Tinymce from '@/components/Tinymce/index'
import CustomInp from '@/views/components/customInp'
import { stringFormat, replactProtcol, getSourceNav } from '@/utils/tools'
import {
  validArticleTitle,
  validArticleDescription,
  validArticleQuoteName,
  validArticleQuoteUrl,
  validArticleFields,
  validateFileSize
} from '@/utils/validate'
import { mapGetters } from 'vuex'
import { getNavsByType, getAllNavs } from '@/api/navs'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )

export default {
  name : 'Articles',
  components : {
    CustomInp,
    Tinymce
  },
  data() {
    const trigger = ['blur', 'change']
    const checkTitle = ( rule, value, callback ) => {
      if ( !validArticleTitle( value ) ) {
        return callback( new Error( '请输入正确格式的文章标题' ) )
      } else {
        callback()
      }
    }
    const hasImage = ( rule, value, callback ) => {
      if ( !value ) {
        if ( !this.needPreview ) {
          callback()
        } else {
          return callback( new Error( '请上传封面图片' ) )
        }
      } else if ( value == -1 ) {
        return callback( new Error( '请上传正确格式的封面图片' ) )
      } else {
        callback()
      }
    }
    const checkDescription = ( rule, value, callback ) => {
      if ( !validArticleDescription( value ) ) {
        return callback( new Error( '请输入正确格式的封面摘要内容，支持中英文字符、数字、空格及常规标点符号，最多150个字符。' ) )
      } else {
        callback()
      }
    }
    const checkQuoteName = ( rule, value, callback ) => {
      if ( !validArticleQuoteName( value ) ) {
        return callback( new Error( '请填写正确格式的引用方名称' ) )
      } else {
        callback()
      }
    }
    const checkQuoteUrl = ( rule, value, callback ) => {
      if ( !validArticleQuoteUrl( value ) ) {
        return callback( new Error( '请填写正确格式的引用方链接' ) )
      } else {
        callback()
      }
    }
    const checkFields = ( rule, value, callback ) => {
      callback()
    }
    const checkContents = ( rule, value, callback ) => {
      if ( value && value.trim() ) {
        callback()
      } else {
        return callback( new Error( '请编辑正文内容' ) )
      }
    }
    return {
      // 封面图是否必填 默认必填
      needPreview : true,
      host : '',
      accessoryName : '',
      accessorySize : 0,
      showArticlesType : 'create',
      showArticlesSource : 'about',
      formLabelWidth : '92px',
      // 导航列表：全部导航，每个导航显示前100个文章
      navs : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        },
        loading : false,
        currentNav : '',
        currentNavsChildren : undefined,
        currentNavs : undefined,
        pid : '',
        id : ''
      },
      // 导航列表
      navLists : [],

      isSaving : false, // 是否保存中
      checked : false, // 是否修改发布时间
      loading : false,
      inputs : [],
      currentInps : '',
      form : {
        // nav : ['2', '1-3'],
        title : '',
        // preview : '',
        // previewUrl : '',
        digest : '',
        classify : 1,
        quote_name : '',
        quote_url : '',
        keyWords : '',
        contents : '',
        url : '',
        accessory : '',
        preview : ''
      },
      rules : {
        title : [
          { required : true, message : '请输入文章标题', trigger : ['blur', 'change'] },
          { validator : checkTitle, trigger : ['blur', 'change'] }
        ],
        preview : [
          // { required : true, message : '请上传封面图片', trigger : ['blur', 'change'] },
          { validator : hasImage, trigger : ['blur', 'change'] }
        ],
        digest : [
          { required : true, message : '请编辑封面摘要内容', trigger : ['blur', 'change'] },
          { validator : checkDescription, trigger : ['blur', 'change'] }
        ],
        classify : [
          { required : true, message : '请选择文章来源', trigger : ['blur', 'change'] }
        ],

        quote_name : [
          { required : true, message : '请填写引用方名称', trigger : ['blur', 'change'] },
          { validator : checkQuoteName, trigger : ['blur', 'change'] }
        ],
        quote_url : [
          { required : true, message : '请填写引用方链接', trigger : ['blur', 'change'] },
          { validator : checkQuoteUrl, trigger : ['blur', 'change'] }
        ],
        keyWords : [
          // { required : true, message : '1 请至少添加一个关键词', trigger : ['blur', 'change'] },
          { validator : checkFields, trigger : ['blur', 'change'] }
        ],
        contents : [
          { required : true, message : '请编辑正文内容', trigger : ['blur', 'change'] },
          { validator : checkContents, trigger : ['blur', 'change'] }
        ],
        url : [
          { required : true, message : '请先上传图片', trigger }
        ]
      },
      // 预览页面返回后 -- 当前正在编辑的文章
      currentEditArticles : {
        id : '',
        nav : '',
        title : '',
        preview : '',
        digest : '',
        classify : '',
        quote_name : '',
        quote_url : '',
        contents : '',
        status : '',
        firstPublishTime : '',
        // previewed : '',
        publishTime : '',
        keywords : [],
        dicts : []
      }
    }
  },
  computed : {
    ...mapGetters( [
      'token', 'currentPreview', 'editType'
    ] ),
    // 当前显示的 tag
    currentViews() {
      return this.$store.state.tagsView.visitedViews.find( item => item.name === 'Edits' )
    },
    newNavLists() {
      // this.navLists.forEach( item => {
      //   item.value = item.id
      //   item.label = item.meta.title
      //   if ( item.children && item.children.length > 0 ) {
      //     item.children.forEach( child => {
      //       child.value = child.id
      //       child.label = child.meta.title
      //     } )
      //   }
      // } )
      console.log( 'computdss', _.cloneDeep( this.navLists ) )
      return this.navLists
    },
    isChange() {
      let isChangesContents = false
      if ( this.inputs.length == 0 ) {
        for ( const key in this.form ) {
          if ( this.form[key] && JSON.stringify( this.form[key] ) != '[]' ) {
            isChangesContents = true
          }
        }
      } else {
        isChangesContents = true
      }
      this.$store.dispatch( 'news/isChange', isChangesContents )
      return isChangesContents ? 1 : 2
    }
  },
  watch : {
    'currentInps' : {
      handler( val ) {
        this.form.keyWords = val
        const { pass, msg } = this.vaildFields()
        if ( !pass ) {
          this.$refs['taskForm'].fields[5].validateMessage = msg
          this.$refs['taskForm'].fields[5].validateState = 'error'
        } else {
          this.$refs['taskForm'].fields[5].validateMessage = ''
          this.$refs['taskForm'].fields[5].validateState = 'success'
        }
        // this.$refs.taskForm.validateField( 'keyWords' )
      },
      immediate : false
    }
  },
  async created() {
    // type: "create" id: "" source : about | nn
    await this.getNavList()
    this.host = location.href.startsWith( 'https' ) ? 'https://' : 'http://'
    console.log( 'editType', { ...this.editType } )

    if ( this.editType ) {
      const { type, id, source, pid, aid, needPreview } = this.editType
      if ( !pid || !id ) {
        await this.closeSelectedTag()
        await this.$router.push( `/${source}` )
        return false
      }
      this.needPreview = needPreview !== false
      this.showArticlesType = type || 'create'
      this.showArticlesSource = source || 'about'
      this.form.nav = [pid, id]
      this.navs.pid = pid
      this.navs.id = id
      const currentNavs = this.navLists.find( item => item.id == pid )
      if ( !currentNavs || !currentNavs.children ) {
        await this.closeSelectedTag()
        await this.$router.push( `/${source}` )
        return false
      }
      const currentNavsChildren = currentNavs.children.find( item => item.id == id )
      const pTitle = currentNavs.meta.title
      const cTitle = currentNavsChildren.meta.title
      this.navs.currentNav = `${pTitle}/${cTitle}`
      this.navs.currentNavs = currentNavs
      this.navs.currentNavsChildren = currentNavsChildren

      // console.log( 'created', { ...this.navs } )
      if ( type == 'create' ) {
        this.resetForm( false )
      } else {
        if ( type == 'edit' && aid ) {
          this.previewArticles( aid )
        } else {
          this.closeSelectedTag()
        }
      }
    } else {
      this.closeSelectedTag()
    }

    console.log( 'needPreview', this.needPreview )
  },
  async mounted() {
    this.$nextTick( () => {
      const el = this.$refs['tinymce-wrapper-item']
      el.contentStyle.marginLeft = 0
      // .childNodes firstElementChild
      // console.log( 'el', el )
      // el.style.marginLeft = 0
    } )
    // this.test()
  },
  beforeDestroy() {
    // this.init()
  },
  methods : {
    // 上传附件
    async selectExcelList() {
      const that = this
      const el = that.$refs.accessory
      const file = el.files[0]
      if ( file ) {
        const { size, name } = file
        if ( size <= 1024 * 1024 * 5 ) {
          this.accessoryName = name
          this.accessorySize = size
          const fmData = new FormData()
          fmData.append( 'file', file )
          const { code, data } = await request.uploadImage( fmData )
          if ( code == 200 ) {
            // qi clearValidate
            that.$refs.taskForm.clearValidate( 'accessory' )
            const { path } = data
            that['form'].accessory = that.host + path
          } else {
            this['form'].accessory = ''
          }
          el.value = ''
        } else {
          this.accessoryName = ''
          this.accessorySize = 0
          this.form.accessory = ''
          this.$refs['taskForm'].fields[6].validateMessage = `附近不得超过5MB`
          this.$refs['taskForm'].fields[6].validateState = 'error'
          el.value = ''
        }
      }
    },
    // 关闭tag
    async closeSelectedTag() {
      await this.$store.dispatch( 'tagsView/delView', this.currentViews )
      // const sourceName = await getSourceNav( this.showArticlesSource )
      // await this.$router.push( {
      //   name : sourceName
      // } )
      // await this.$router.push( `/${this.showArticlesSource}` )
      this.$router.push( { path : `/${this.showArticlesSource}`, query : { id : this.navs.id }} )
      // this.showArticlesSource = source
      await this.init()
    },
    // 获取导航列表 根据source 获取导航
    async getNavList() {
      const that = this
      this.navLists = getAllNavs()
      that.navs.loading = false
      that.navs.total = that.navLists.length
    },
    // 提交创建 更新请求
    submitForm() {
      this.isSaving = true
      this.$refs['taskForm'].validate( async( valid ) => {
        if ( valid ) {
          const { pass, msg } = this.vaildFields()
          if ( !pass ) {
            this.$refs['taskForm'].fields[5].validateMessage = msg
            this.$refs['taskForm'].fields[5].validateState = 'error'
            this.isSaving = false
          } else {
            this.$refs['taskForm'].fields[5].validateMessage = ''
            this.$refs['taskForm'].fields[5].validateState = 'success'
            if ( this.showArticlesType === 'create' ) {
              await this.createArticlesRequest()
            } else {
              await this.updateArticlesRequest()
            }
          }
        } else {
          this.isSaving = false
        }
      } )
    },
    // 创建文章请求
    async createArticlesRequest() {
      let preview
      let accessory
      if ( this.form.preview.startsWith( 'http://' ) || this.form.preview.startsWith( 'https://' ) ) {
        preview = this.form.preview.slice( 7, this.form.preview.length )
        if ( this['form'].accessory ) {
          accessory = this['form'].accessory.slice( 7, this.form.preview.length )
        } else {
          accessory = ''
        }
      } else if ( this.form.preview.startsWith( 'https://' ) ) {
        preview = this.form.preview.slice( 8, this.form.preview.length )
        if ( this['form'].accessory ) {
          accessory = this['form'].accessory.slice( 8, this.form.preview.length )
        } else {
          accessory = ''
        }
      } else {
        preview = this.form.preview
        accessory = this['form'].accessory || ''
      }
      const createParams = {
        type : this.navs.id,
        title : this.form.title,
        digest : this.form.digest,
        classify : this.form.classify,
        contents : this.form.contents,
        preview : preview
      }
      if ( accessory ) {
        createParams.accessory = accessory
      }

      console.log( 'contents', this.form.contents, this['form'].accessory )

      createParams.keyWords = this.inputs.map( item => item.content )
      if ( this.form.classify == 2 ) {
        createParams.quoteName = this.form.quote_name
        createParams.quoteUrl = this.form.quote_url
      }
      try {
        await request.createArticle( createParams )
        this.showArticlesType = 'create'
        this.$notify( {
          title : '成功',
          message : '文章保存成功',
          duration : 1000,
          customClass : 'center-center',
          type : 'success'
        } )
        await this.closeSelectedTag()
      } catch ( e ) {
        console.log( '创建文章失败', e )
      } finally {
        this.isSaving = false
      }
    },
    // 编辑文章请求
    async updateArticlesRequest() {
      // const preview = this.form.preview.startsWith( 'http' )
      let preview
      let accessory
      if ( this.form.preview.startsWith( 'http://' ) || this.form.preview.startsWith( 'https://' ) ) {
        preview = this.form.preview.slice( 7, this.form.preview.length )
        if ( this['form'].accessory ) {
          accessory = this['form'].accessory.slice( 7, this.form.preview.length )
        } else {
          accessory = ''
        }
      } else if ( this.form.preview.startsWith( 'https://' ) ) {
        preview = this.form.preview.slice( 8, this.form.preview.length )
        if ( this['form'].accessory ) {
          accessory = this['form'].accessory.slice( 8, this.form.preview.length )
        } else {
          accessory = ''
        }
      } else {
        preview = this.form.preview
        accessory = this['form'].accessory || ''
      }
      const updateParams = {
        id : this.editType.aid,
        type : this.navs.id,
        title : this.form.title,
        digest : this.form.digest,
        classify : this.form.classify,
        contents : this.form.contents,
        preview : preview
      }

      if ( accessory ) {
        updateParams.accessory = accessory
      }

      if ( this.form.classify == 2 ) {
        updateParams.quoteName = this.form.quote_name
        updateParams.quoteUrl = this.form.quote_url
      }

      // console.log( '编辑文章请求 contents', this.form.contents )
      // console.log( '编辑文章请求', { ...updateParams } )
      // console.log( 'inputs', { ...this.inputs } )
      try {
        updateParams.keyWords = this.inputs.map( item => item.content )
        await request.updateArticle( updateParams )
        this.$notify( {
          title : '成功',
          message : '更新文章成功',
          duration : 1000,
          customClass : 'center-center',
          type : 'success'
        } )
        this.closeSelectedTag()
        this.showArticlesType = 'create'
      } catch ( e ) {
        console.log( '编辑文章错误', e )
      } finally {
        this.isSaving = false
      }
    },
    // 重置表单
    resetForm( data ) {
      if ( data ) {
        this.$nextTick( () => {
          this.form = { ...data }
          this.form.preview = data.preview ? this.host + data.preview : ''
          this.form.accessory = data.accessory ? this.host + data.accessory : ''
          this.accessoryName = data.accessory ? data.accessory.substr( data.accessory.length - 10, 10 ) : ''
          if ( data.classify == 2 ) {
            this.$set( this.form, 'quote_name', data.quoteName )
            this.$set( this.form, 'quote_url', data.quoteUrl )
          }
          this.inputs = data.keywords.map( ( item, index ) => ( {
            id : index,
            content : item
          } ) )
          this.currentInps = ''
          // console.log( 'resetForm', { ...this.form }, [...this.inputs], this.currentInps )
          // console.log( 'currentInps', this.currentInps )
        } )
      } else {
        for ( const key in this['form'] ) {
          this.$set( this['form'], key, '' )
        }
        this.form.classify = 1
        this.currentInps = ''
        this.inputs = []
      }
    },
    // todo
    async previewArticles( id ) {
      const that = this
      this.loading = true
      try {
        const { data } = await request.previewArticle( { id } )
        console.log( '预览文章 previewArticles', data )
        this.loading = false
        const { detail, dict } = data
        const reg1 = /(<\/?em.*?>)/gi
        const str = detail.contents.replace( reg1, '' )
        detail.contents = str ? stringFormat( str, dict, false ) : ''
        this.resetForm( detail )
      } catch ( e ) {
        this.$notify( {
          title : '失败',
          message : '预览临时文章失败,即将跳转到文章列表页面',
          duration : 2000,
          customClass : 'center-center',
          type : 'error',
          onClose() {
            that.closeSelectedTag()
            that.loading = false
          }
        } )
      } finally {
        that.loading = false
      }
    },
    // 获取已选择文件列表
    async selectFileList() {
      const that = this
      const el = that.$refs.selectFiles
      const file = el.files[0]
      if ( file ) {
        const fmData = new FormData()
        fmData.append( 'file', file )
        const { code, data } = await request.uploadImage( fmData )
        if ( code == 200 ) {
          // qi clearValidate
          that.$refs.taskForm.clearValidate( 'preview' )
          const { path } = data
          that['form'].preview = that.host + path
        } else {
          this['form'].preview = ''
        }
        el.value = ''
      }
    },
    // 校验图片格式
    checkImage( file, url, callback ) {
      if ( !file ) {
        return callback( -2 )
      } else if ( file && !validateFileSize( file.size, 5 ) ) {
        return callback( -1 )
      } else {
        return callback( 200 )
        // const image = new Image()
        // image.src = url
        // image.onload = function() {
        //   const width = image.width
        //   const height = image.height
        //   if ( width != 643 && height != 362 ) {
        //     return callback( -1 )
        //   } else {
        //     return callback( 200 )
        //   }
        // }
      }
    },
    // 关键词验证
    vaildFields() {
      const len = this.inputs.length
      const val = this.form.keyWords
      const result = {}
      if ( len <= 0 ) {
        if ( !val ) {
          result.pass = false
          result.msg = '请至少添加一个关键词'
        } else {
          if ( !validArticleFields( val ) ) {
            result.pass = false
            result.msg = '请添加正确格式的关键词，每个词最多8个字符，且不可全为空格及标点符号'
          } else {
            result.pass = true
          }
        }
      } else if ( len >= 5 ) {
        if ( !val ) {
          result.pass = true
        } else {
          result.pass = false
          result.msg = '关键词最多只能有5个'
        }
      } else {
        if ( !val ) {
          result.pass = true
        } else {
          if ( !validArticleFields( val ) ) {
            result.pass = false
            result.msg = '请添加正确格式的关键词，每个词最多8个字符，且不可全为空格及标点符号'
          } else {
            result.pass = true
          }
          // if ( !val.trim() ) {
          //   result.pass = true
          // } else {
          //   if ( !validArticleFields( val ) ) {
          //     result.pass = false
          //     result.msg = '请添加正确格式的关键词，每个词最多8个字符，且不可全为空格及标点符号'
          //   } else {
          //     result.pass = true
          //   }
          // }
        }
      }
      return result
    },
    // 移除关键词
    removeTag( data ) {
      this.inputs = this.inputs.filter( item => item.id !== data.id )
    },
    // 添加关键词
    addTags() {
      if ( this.inputs.length >= 5 ) {
        return false
      }
      // console.log( 'addTags', this.inputs, this.currentInps )
      if ( this.currentInps && validArticleFields( this.currentInps ) ) {
        this.inputs.push( {
          id : ( new Date() ).valueOf(),
          content : this.currentInps
        } )
        this.currentInps = ''
      }
    },
    // 富文本更新内容
    getEditorContent( info ) {
      // console.log( '1 富文本更新内容', info )
      // console.log( '2 富文本更新内容', this.form.contents )
      this.form.contents = info
      this.$refs.taskForm.validateField( 'contents', valid => {
        if ( !valid ) {
          this.$refs.taskForm.clearValidate( 'contents' )
        }
      } )
    },
    // 关闭之后重置页面参数
    async init() {
      this.$refs.taskForm && this.$refs.taskForm.resetFields()
      this.currentEditArticles = {
        id : '',
        nav : '',
        title : '',
        // preview : '',
        digest : '',
        classify : '',
        quote_name : '',
        quote_url : '',
        contents : '',
        status : '',
        firstPublishTime : '',
        previewed : '',
        publishTime : '',
        keywords : []
      }
      this.inputs = []
      this.$store.dispatch( 'news/setEditType', false )
      this.resetForm( false )
      this.showArticlesType = 'create'
      this.needPreview = true
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
    img {
      padding: 0;
      margin: 0;
    }
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
  .selectFiles, .accessory{
    display: none;
  }

  .file-item {
    display: inline-block;
    margin: 0 10px;
  }
</style>
