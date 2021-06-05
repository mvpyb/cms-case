<!--
<template>
  <div>
    <div :class="{fullscreen:fullscreen}" class="tinymce-container" :style="{width:containerWidth}">
      <textarea :id="tinymceId" class="tinymce-textarea" />
      &lt;!&ndash;    <div class="editor-custom-btn-container">
        <editorIframe color="#1890ff" class="editor-upload-btn" @successCBK="insetIframeSuccessCBK" />
      </div>&ndash;&gt;
      &lt;!&ndash; <div class="editor-custom-btn-container">
        <el-button type="primary" size="mini">插入在线视频</el-button>
      </div>&ndash;&gt;
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
          &lt;!&ndash; @file-added="onFileAdded"
          @files-added="onFilesAdded"
          @file-progress="onFileProgress"&ndash;&gt;
          <uploader-unsupport>暂时不支持</uploader-unsupport>
          <uploader-drop>
            <p>拖动文件到此或者点击</p>
            <uploader-btn :attrs="attrs" :single="uploader.single">选择Mp4文件</uploader-btn>
          </uploader-drop>
          <div class="uploaderLists">
            <uploader-list v-show="true" />
            <div class="preview_video_thumb_area">
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
            </div>
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
import editorIframe from './components/EditorIframe'
import plugins from './plugins'
import toolbar from './toolbar'
import load from './dynamicLoadScript'
import { uploadImage, uploadMedias } from '@/api/request'
// const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce@5.5.1/tinymce.min.js'
import { getCookieByKey } from '@/utils/auth'

export default {
  name : 'Tinymce',
  components : { editorIframe },
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
          // console.log( 'processResponse', objMessage )
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
    const url = 'http://192.168.2.196:8899/upload/video'
    this.options = {
      ...this.options,
      target : url
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
      const choose = this.videoPreview.find( item => item.active )
      if ( !choose ) return false
      // console.log( '插入视频', choose, data )
      // console.log( '插入视频 currentInserMedia', this.currentInserMedia )
      // window.tinymce.get( _this.tinymceId ).insertContent( `<img class="insetMedia" src="${choose.url}" >` )
      if ( this.cb ) {
        this.cb( this.currentInserMedia, {
          title : 'test.mp4',
          source2 : 'alt.ogg',
          poster : choose.url
        } )
      }
      this.resetDialog()
        .then( () => {
          this.dialogVisible = false
        } )
    },
    // 选择图片
    choosePreview( data ) {
      if ( this.videoPreview.length > 0 ) {
        this.videoPreview.forEach( item => {
          if ( item.id == data.id ) {
            item.active = !item.active
          } else {
            item.active = false
          }
        } )
      }
    },
    // // 有文件添加进来
    // onFileAdded( file ) {
    //   const extension = file.getExtension()
    //   const getType = file.getType()
    //   console.log( '有文件添加进来', file, extension )
    //   // console.log( '有文件添加进来', file, this.extension.indexOf( extension ), extension )
    //   // if ( this.extension.indexOf( extension ) < 0 ) {
    //   //   this.$message.warning( `您选择了不可上传的文件，已自动为你剔除了` )
    //   //   // this.uploaderInstance.files = this.uploaderInstance.files.filter( item => item.id !== file.id )
    //   //
    //   //   file.ignored = true
    //   //   file.cancel()
    //   // }
    //   // const self = this
    //   // setTimeout( () => {
    //   //   self.disabledUpload = self.uploaderInstance.files.length === 0 || self.uploaderInstance.fileList.length === 0
    //   //   // console.log( '有文件添加进来', self.$refs.uploads.uploader, self.$refs.uploads.uploader.fileList )
    //   //   // console.log( '1 有文件添加进来', self.uploaderInstance )
    //   //   console.log( '2 有文件添加进来', self.uploaderInstance.files, self.uploaderInstance.fileList )
    //   //   console.log( '3 有文件添加进来', self.uploaderInstance.files.length, self.uploaderInstance.fileList.length )
    //   //   // console.log( '4 有文件添加进来', self.disabledUpload )
    //   //   self.uploadErrorList = self.uploaderInstance.files.map( item => {
    //   //     return (
    //   //       {
    //   //         name : item.name,
    //   //         size : item.size,
    //   //         relativePath : item.relativePath,
    //   //         fileType : item.fileType,
    //   //         isFolder : item.isFolder,
    //   //         msg : '还未上传（上传被终止）'
    //   //       }
    //   //     )
    //   //   } )
    //   // }, 100 )
    // },
    // onFilesAdded( files, fileList ) {
    //   console.log( 'onFilesAdded', files, fileList )
    //   // const ifTrue = files.some( file => {
    //   //   const extension = file.getExtension()
    //   //   const getType = file.getType()
    //   //   if( this.extension.indexOf( extension ) < 0 ) {
    //   //     return false
    //   //   }
    //   //   return true
    //   // } )
    //   // if( ifTrue ) {
    //   //   files.ignored = true
    //   // }
    //   // console.log( 'files', files, fileList, ifTrue )
    //   // console.log( '1 有文件列表添加进来', files, fileList )
    // },

    onFileSuccess( rootFile, file, response, chunk ) {
      // console.log( 'onFileSuccess', rootFile, file, response, chunk )
      const result = JSON.parse( response )
      // console.log( '上传成功之后', result )
      const { data } = result
      const { frames, url } = data
      this.currentInserMedia = url
      this.videoPreview = frames.map( ( item, index ) => {
        return ( {
          id : index,
          url : item,
          active : index == 0
        } )
      } )
      this.videoPreview = this.videoPreview.splice( 0, 3 )
    },
    onFileError( rootFile, file, response, chunk ) {
      this.$message.error( `文件${file.name}上传错误，错误信息:${response}` )
      file.retry()
    },

    init() {
      // dynamic load tinymce from cdn
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
        language : this.languageTypeList['zh'],
        language_url : require( './utils/language1.js' ),
        height : this.height,
        body_class : 'panel-body ',
        object_resizing : false,
        toolbar : this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar : this.menubar,
        plugins : plugins,
        lineheight_formats : '1 1.1 1.2 1.3 1.4 1.5 1.75 2',
        fontsize_formats : '12px 14px 16px 18px 24px 36px',

        // menubar: 'view',
        // plugins: 'pageembed code preview',
        // toolbar: 'pageembed code preview',
        // tiny_pageembed_classes: [
        //   { text: 'Big embed', value: 'my-big-class' },
        //   { text: 'Small embed', value: 'my-small-class' }
        // ],

        media_live_embeds : true,
        // 想要哪一个图标提供本地文件选择功能，参数可为media(媒体)、image(图片)、file(文件),多个参数用空格分隔
        file_picker_types : 'media',
        // be used to add custom file picker to those dialogs that have it.
        // http://tinymce.ax-z.cn/plugins/media.php
        file_picker_callback : function( cb, value, meta ) {
          // console.log( 'file_picker_callback meta', meta )
          // console.log( 'file_picker_callback value', value )
          // 当点击meidia图标上传时,判断meta.filetype == 'media'有必要，
          // 因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口

          if ( meta.filetype == 'media' ) {
            _this.dialogVisible = true
            _this.cb = cb

            // // 创建一个隐藏的type=file的文件选择input
            // const input = document.createElement( 'input' )
            // input.setAttribute( 'type', 'file' )
            // input.setAttribute( 'accept', 'video/*' )

            // // onclick仅用来测试进度栏,属于多余内容，正常使用情况下删除掉它
            // input.onclick = function() {
            //   const notification = _this.createProgressBar()
            //   notification.progressBar.value( 40 )
            //   setTimeout( () => {
            //     // 8秒后加载中的状态消失
            //     tinymce.activeEditor.notificationManager.close()
            //   }, 8000 )
            // }

            // input.onchange = function() {
            //   const file = this.files[0]
            //   console.log( 'onchange', file )
            //   const notification = _this.createProgressBar()
            //   const isDemoFlag = 1// 是否为演示效果，仅演示值为1，正式使用值为0，2019-10-15
            //   if ( isDemoFlag ) {
            //     const localObjUrl = URL.createObjectURL( file )
            //     cb( localObjUrl, { title : file.name } )
            //     // 或者用setContent(),方法来源https://blog.csdn.net/a_wtf_pgm/article/details/85042597
            //     // cb('', { title: '' });
            //     // tinymce.activeEditor.windowManager.close()
            //     tinymce.activeEditor.setContent(
            //       `<p>
            //    <span class="mce-preview-object mce-object-video" contenteditable="false" data-mce-object="video" data-mce-p-allowfullscreen="allowfullscreen" data-mce-p-frameborder="no" data-mce-p-scrolling="no" data-mce-p-src=${localObjUrl} data-mce-html="%20">
            //      <video src=${localObjUrl} width="100%" controls="controls"><source src=${localObjUrl} /></video><span class="mce-shim"></span>
            //    </span>
            // </p>`
            //     )
            //     return
            //   } else {
            //     let xhr, formData
            //     xhr = new XMLHttpRequest()
            //     xhr.open( 'POST', _this.apiUrl )
            //     xhr.withCredentials = _this.credentials
            //     xhr.upload.onprogress = function( e ) {
            //       // 进度(e.loaded / e.total * 100)
            //       const percent = e.loaded / e.total * 100
            //       if ( percent < 100 ) {
            //         // tinymce.activeEditor.setProgressState(true);//是否显示loading状态：1（显示）0（隐藏）
            //         notification.progressBar.value( percent )
            //       } else {
            //         // tinymce.activeEditor.setProgressState(false);
            //         notification.progressBar.value( percent )
            //         // 关闭进度提示
            //         tinymce.activeEditor.notificationManager.close()
            //       }
            //     }
            //     xhr.onerror = function() {
            //       console.log( xhr.status )
            //       // tinymce.activeEditor.setProgressState(false);
            //       tinymce.activeEditor.notificationManager.close()
            //       return
            //     }
            //     xhr.onload = function() {
            //       let json
            //       if ( xhr.status < 200 || xhr.status >= 300 ) {
            //         console.log( 'HTTP 错误: ' + xhr.status )
            //         return
            //       }
            //       json = JSON.parse( xhr.responseText )
            //       // 假设接口返回JSON数据为{status: 0, msg: "上传成功", data: {location: "/localImgs/1546434503854.mp4"}}
            //       if ( json.status == 0 ) {
            //         // 接口返回的文件保存地址
            //         const mediaLocation = json.data.location
            //         // cb()回调函数，将mediaLocation显示在弹框输入框中
            //         cb( mediaLocation, { title : file.name } )
            //       } else {
            //         console.log( json.msg )
            //         return
            //       }
            //     }
            //     formData = new FormData()
            //     // 假设接口接收参数为file,值为选中的文件
            //     formData.append( 'file', file )
            //     // 正式使用将下面被注释的内容恢复
            //     // xhr.send(formData);
            //   }
            // }
            // 触发点击

            // input.click()
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
        nonbreaking_force_tab : true, // 插入不间断空格需要不间断空间插件
        images_upload_handler : ( blobInfo, success, failure, progress ) => {
          const filename = blobInfo.filename()
          const fmData = new FormData()
          fmData.append(
            'file',
            blobInfo.blob(),
            filename
          )
          fmData.append( 'mode', 2 )
          fmData.append( 'token', this.$store.getters.token || getCookieByKey( 'news_token' ) )
          uploadImage( fmData )
            .then( ( { data } ) => {
              success( data.url )
            } )
        },
        init_instance_callback : editor => {
          // console.log( 'init_instance_callback', _this.value )
          if ( _this.value ) {
            editor.setContent( _this.value )
          }
          _this.hasInit = true
          // https://www.tiny.cloud/docs/advanced/events/#editorcoreevents SetAttrib
          // editor.on( 'KeyUp SetContent Change NodeChange', () => {
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
-->
