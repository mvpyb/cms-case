<template>
  <div>
    <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
      <textarea :id="tinymceId" class="tinymce-textarea" />
    </div>
    <el-dialog
      title="提示"
      custom-class="upload-dialog"
      :visible.sync="dialogVisible"
    >
      <div>
        <uploader
          ref="uploads"
          :options="options"
          :auto-start="uploader.autoStart"
          class="uploader-body"
          @file-success="onFileSuccess"
          @file-error="onFileError"
        >
          <uploader-unsupport>暂时不支持</uploader-unsupport>
          <uploader-drop>
            <p>拖动文件到此或者点击</p>
            <uploader-btn :attrs="attrs" :single="uploader.single">选择Mp4文件</uploader-btn>
          </uploader-drop>
          <div class="uploaderLists">
            <uploader-list v-show="true" />
            <!-- <div class="preview_video_thumb_area">
              <el-row :gutter="20">
                <el-col v-for="item in videoPreview" :key="item.id" :span="8">
                  <div class="preview-container" @click="choosePreview( item )">
                    <img :src="item.url" class="image">
                    <transition name="el-zoom-in-center">
                      <i v-if="item.active" class="iconfont rtc-iconselected-rt" />
                    </transition>
                  </div>
                </el-col>
              </el-row>
            </div>-->
          </div>
        </uploader>
        <div class="btns">
          <el-button type="primary" @click="insertVideo">确定</el-button>
          <el-button type="info" @click="dialogVisible = false">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import editorIframe from './components/EditorIframe'
import { initUrl } from '@/utils/tools'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
// import { uploadImage } from '@/api/request'
import * as request from '@/api/request'
import { getCookieByKey } from '@/utils/auth'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.5.1/tinymce.min.js'
// const tinymceCDN = 'https://resources.shadowcreator.com/project-sources/lib/tinymce/tinymce.min.js'
// const csss = requrire( '@/components/Tinymce/custorm.css' )

export default {
  name : 'Tinymce',
  props : {
    id : {
      type : String,
      default : function() {
        return 'vue-tinymce-' + +new Date() + ( ( Math.random() * 1000 ).toFixed( 0 ) + '' )
      }
    },
    value : {
      type : String,
      default : ''
    },
    toolbar : {
      type : Array,
      required : false,
      default() {
        return []
      }
    },
    menubar : {
      type : String,
      default : 'file edit insert view format table'
    },
    height : {
      type : [Number, String],
      required : false,
      default : 400
    },
    width : {
      type : [Number, String],
      required : false,
      default : 'auto'
    }
  },
  data() {
    return {
      // 当前视频的URL
      currentInserMedia : '',
      videoPreview : [],
      cb : '',
      dialogVisible : false,
      options : {
        simultaneousUploads : 1,
        target : '',
        successStatuses : [200, 201, 202],
        permanentErrors : [404, 415, 500, 501],
        fileParameterName : 'file',
        query : {
          mode : 1
        },
        headers : {
          token : getCookieByKey( 'news_token' )
        },
        testChunks : false,
        chunkSize : 500 * 1024 * 1024,
        processResponse : ( response, cb ) => {
          const objMessage = JSON.parse( response )
          if ( objMessage.code !== 200 ) {
            cb( 'error', objMessage.message )
          } else {
            cb( null, response )
          }
          cb( null, response )
        }
      },
      attrs : {
        accept : 'video/mp4'
      },
      uploader : {
        autoStart : true,
        single : true
      },
      // 上传的实例
      uploaderInstance : '',
      hasChange : false,
      hasInit : false,
      tinymceId : this.id,
      fullscreen : false,
      languageTypeList : {
        'en' : 'en',
        'zh' : 'zh_CN',
        'es' : 'es_MX',
        'ja' : 'ja'
      }
    }
  },
  computed : {
    containerWidth() {
      const width = this.width
      if ( /^[\d]+(\.[\d]+)?$/.test( width ) ) { // matches `100`, `'100'`
        return `${width}px`
      }
      return width
    }
  },
  watch : {
    value( val ) {
      if ( !this.hasChange && this.hasInit ) {
        this.$nextTick( () =>
          window.tinymce.get( this.tinymceId ).setContent( val || '' ) )
      }
    }
  },
  created() {
    const { baseUrl } = initUrl()
    this.options = {
      ...this.options,
      target : baseUrl + '/file/upload'
    }
  },
  mounted() {
    this.init()
  },
  activated() {
    if ( window.tinymce ) {
      this.initTinymce()
    }
  },
  deactivated() {
    this.destroyTinymce()
  },
  destroyed() {
    this.destroyTinymce()
  },
  methods : {
    // 重置dialog
    async resetDialog() {
      const el = this.$refs.uploads
      const uploaderInstance = el.uploader
      uploaderInstance.cancel()
      this.videoPreview = []
      this.currentInserMedia = ''
      this.cb = ''
    },
    // 插入视频
    insertVideo( data ) {
      // const choose = this.videoPreview.find( item => item.active )
      // if ( !choose ) return false
      // console.log( '插入视频', data )
      // console.log( '插入视频 currentInserMedia', this.currentInserMedia )
      // window.tinymce.get( _this.tinymceId ).insertContent( `<img class="insetMedia" src="${choose.url}" >` )
      if ( this.cb ) {
        this.cb( this.currentInserMedia, {
          title : 'test.mp4',
          source2 : 'alt.ogg',
          autoplay : true
          // poster : choose.url
        } )
      }
      // https://webapps-fat.shadowcreator.com/a/oceans.mp4
      this.resetDialog()
        .then( () => {
          this.dialogVisible = false
        } )
    },
    onFileSuccess( rootFile, file, response, chunk ) {
      const result = JSON.parse( response )
      const { data } = result
      // const { path, frames, url } = data
      const { path } = data
      const host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
      this.currentInserMedia = host + path
      // this.videoPreview = frames.map( ( item, index ) => {
      //   return ( {
      //     id : index,
      //     url : item,
      //     active : index == 0
      //   } )
      // } )
      // this.videoPreview = this.videoPreview.splice( 0, 3 )
    },
    onFileError( rootFile, file, response, chunk ) {
      this.$message.error( `文件${file.name}上传错误，错误信息:${response}` )
      file.retry()
    },

    init() {
      load( tinymceCDN, ( err ) => {
        if ( err ) {
          this.$message.error( err.message )
          return
        }
        this.initTinymce()
      } )
    },
    initTinymce() {
      const _this = this
      window.tinymce.init( {
        selector : `#${this.tinymceId}`,
        // content_css : '/static/custorm.css',
        // content_css : './custorm.css',
        content_style : '.minganci { color: red; } em { font-style : normal; } p { margin : 0; padding : 0; }',
        // language : this.languageTypeList['zh'],
        // language_url : require( './utils/language.js' ),

        language : this.languageTypeList['zh'],
        language_url : require( './utils/zh_CN.js' ),
        height : this.height,
        body_class : 'panel-body ',
        object_resizing : false,
        toolbar : this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar : this.menubar,
        plugins : plugins,
        lineheight_formats : '1 1.1 1.2 1.3 1.4 1.5 1.75 2',
        fontsize_formats : '12px 14px 16px 18px 24px 36px',
        media_live_embeds : true,
        file_picker_types : 'media',
        file_picker_callback : function( cb, value, meta ) {
          // console.log( 'file_picker_callback meta', meta )
          // console.log( 'file_picker_callback value', value )
          if ( meta.filetype == 'media' ) {
            _this.dialogVisible = true
            _this.cb = cb
          }
        },
        end_container_on_empty_block : true,
        powerpaste_word_import : 'clean',
        code_dialog_height : 450,
        code_dialog_width : 1000,
        advlist_bullet_styles : 'square',
        advlist_number_styles : 'default',
        imagetools_cors_hosts : ['www.tinymce.com', 'codepen.io'],
        default_link_target : '_blank',
        link_title : false,
        nonbreaking_force_tab : true,
        images_upload_handler : async( blobInfo, success, failure, progress ) => {
          // try {
          //   const filename = blobInfo.filename()
          //   const fmData = new FormData()
          //   fmData.append(
          //     'file',
          //     blobInfo.blob(),
          //     filename
          //   )
          //   fmData.append( 'mode', 2 )
          //   fmData.append( 'token', this.$store.getters.token || getCookieByKey( 'company_token' ) )
          //   const { data } = await request.uploadImage( fmData )
          //   success( data.url )
          // } catch (error) {
          //   failure( error )
          //   console.error( 'error', error )
          // } finally {
          //
          // }
          const filename = blobInfo.filename()
          const fmData = new FormData()
          fmData.append(
            'file',
            blobInfo.blob(),
            filename
          )
          fmData.append( 'mode', 2 )
          fmData.append( 'token', this.$store.getters.token || getCookieByKey( 'company_token' ) )
          request.uploadImage( fmData )
            .then( ( { data } ) => {
              console.log( 'images_upload_handler', data )
              const host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
              const url = host + data.path
              success( url )
            } )
            .catch( ( error ) => {
              failure( error )
              console.error( 'error', error )
            } )
        },
        init_instance_callback : editor => {
          // console.log( 'init_instance_callback', _this.value )
          if ( _this.value ) {
            editor.setContent( _this.value )
          }
          _this.hasInit = true
          editor.on( 'KeyUp SetContent SetAttrib Change', () => {
            this.hasChange = true
            this.$emit( 'input', editor.getContent() )
          } )
        },
        setup( editor ) {
          editor.on( 'FullscreenStateChanged', ( e ) => {
            _this.fullscreen = e.state
          } )
        }
      } )
    },
    destroyTinymce() {
      const tinymce = window.tinymce.get( this.tinymceId )
      if ( this.fullscreen ) {
        tinymce.execCommand( 'mceFullScreen' )
      }

      if ( tinymce ) {
        tinymce.destroy()
      }
    },
    setContent( value ) {
      window.tinymce.get( this.tinymceId ).setContent( value )
    },
    getContent() {
      window.tinymce.get( this.tinymceId ).getContent()
    },
    insetIframeSuccessCBK( arr ) {
      const _this = this
      window.tinymce.get( _this.tinymceId ).insertContent( `${arr}` )
    }
  }
}
</script>

<style>
  .upload-dialog {
    width: 600px;
  }
</style>
<style scoped lang="scss">
.tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 2005;
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}

.preview_video_thumb_area {
  overflow: hidden;
  margin-top: 10px;
  padding: 20px 0;
  .preview-container {
    position: relative;
    cursor: pointer;
    /*width: 160px;*/
    /*height: 90px;*/
    width: 180px;
    height: 100px;
    overflow: hidden;
    .image {
      display: inline-block;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
      &:hover{
        transform: scale(1.05);
      }
    }
    .iconfont {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 34px;
      color: #5BD171;
    }
  }
}
.uploaderLists {
  min-height: 200px;
  overflow: auto;
}
.btns {
  text-align: center;
}
</style>
