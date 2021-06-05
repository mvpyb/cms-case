<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" size="mini" type="primary" @click=" dialogVisible=true">
      插入第三方视频
    </el-button>
    <el-dialog
      custom-class="w400-dialog"
      :visible.sync="dialogVisible"
      title="编辑iframe"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <div>
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="标签代码" prop="iframes">
            <el-input
              v-model="ruleForm.iframes"
              type="textarea"
              name="iframes"
              maxlength="300"
              placeholder="请输入iframe地址"
              autocomplete="new-password"
              clearable
              show-word-limit
              :autosize="{ minRows: 6, maxRows: 10}"
            />
          </el-form-item>
        </el-form>
        <div class="btns" style="text-align: center">
          <el-button type="primary" @click="submitInsert"> 确定 </el-button>
          <el-button type="info" @click="dialogVisible = false"> 取消 </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name : 'EditorSlideInsetIframe',
  props : {
    color : {
      type : String,
      default : '#1890ff'
    }
  },
  data() {
    const checkIframes = ( rule, value, callback ) => {
      if ( !value || !value.trim() ) {
        return callback( new Error( '请输入iframe标签内容' ) )
      } else {
        if ( !value.startsWith( '<iframe' ) || !value.endsWith( '</iframe>' ) ) {
          return callback( new Error( '请输入合法的iframe标签内容' ) )
        } else {
          const datas = value.split( ' ' )
          const result = datas.find( item => item.startsWith( 'src=' ) )
          if ( !result ) {
            return callback( new Error( '请输入合法的iframe标签内容' ) )
          } else {
            callback()
          }
        }
      }
      // (<div[^>]*>.*?</div>|.)*?
    }
    return {
      dialogVisible : false,
      ruleForm : {
        // iframes : '<iframe src="//player.bilibili.com/player.html?aid=245087937&bvid=BV1jv411C7FC&cid=250310006&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>'
        iframes : ''
      },
      rules : {
        iframes : [
          { required : true, message : '请输入活动名称', trigger : ['blur', 'change'] },
          { validator : checkIframes, trigger : ['blur', 'change'] }
        ]
      }
    }
  },
  methods : {
    submitInsert() {
      this.$refs['ruleForm'].validate( valid => {
        if ( valid ) {
          this.$emit( 'successCBK', this.ruleForm.iframes )
          this.ruleForm.iframes = ''
          this.dialogVisible = false
        } else {
          return false
        }
      } )
    }
  }
}
</script>

<style>
  .w400-dialog{
    width: 500px;
  }
</style>
<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>
