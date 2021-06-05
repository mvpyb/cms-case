
<template>
  <div class="section-container">
    <!--轮播展示管理-->
    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane label="职位维护" name="job">
        <div class="tab-item banner-item">
          <!--头部搜索 创建-->
          <div class="tab-headers clearfix">
            <el-button type="primary" class="mb10" @click="showCreateJob">创建职位</el-button>
          </div>
          <!--表格-->
          <el-table
            ref="typeTable"
            v-loading="jobs.loading"
            class="job-list-table"
            :data="jobList"
            border
            stripe
            row-key="id"
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
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column
              label="职位名称"
              width="200"
            >
              <template slot-scope="scope">{{ scope.row.title | subStringStr(10) }}</template>
            </el-table-column>
            <el-table-column
              label="职位描述"
            >
              <template slot-scope="scope">{{ scope.row.desc | subStringStr(20) }}</template>
            </el-table-column>
            <el-table-column label="创建者" width="80">
              <template slot-scope="scope">{{ scope.row.creator }}</template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              width="100"
            >
              <template slot-scope="scope">{{ scope.row.updatedAt | formatDate }}</template>
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
                <el-button type="primary" size="small" @click="showEditJob(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="removeJob(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="jobs.total"
            :page.sync="jobs.listQuery.page"
            :limit.sync="jobs.listQuery.limit"
            :layout="jobs.listQuery.layout"
            @pagination="getJobList"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="职员维护" name="worker">
        <div class="tab-item case-item">
          <!--头部搜索 创建-->
          <div class="tab-headers clearfix">
            <el-button
              type="primary"
              class="mb10"
              @click="showCreateWorker"
            >创建员工</el-button>
          </div>
          <!--表格-->
          <el-table
            ref="workerTable"
            v-loading="workers.loading"
            :data="workerList"
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
            <el-table-column label="序号" type="index" width="50" />
            <el-table-column
              label="员工照片"
              width="100"
            >
              <template slot-scope="scope">
                <div>
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="host + scope.row.photo"
                    :preview-src-list="[host + scope.row.photo]"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="员工姓名"
              width="100"
            />
            <el-table-column
              prop="jobName"
              width="100"
              label="员工职位"
            />
            <el-table-column
              prop="desc"
              label="员工简介"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row.desc | subStringStr( 20 ) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="创建者"
              width="100"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row.creator }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="更新时间"
              width="100"
            >
              <template slot-scope="scope">
                <div>
                  {{ scope.row.updatedAt | formatDate }}
                </div>
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
                <el-button type="primary" size="small" @click="showEditWorker(scope.row)">编辑</el-button>
                <el-button type="danger" size="small" @click="removeWorker(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="workers.total"
            :page.sync="workers.listQuery.page"
            :limit.sync="workers.listQuery.limit"
            :layout="workers.listQuery.layout"
            @pagination="getWorkerList"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--创建 / 编辑Job 职位弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑职位"
      :visible.sync="jobDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :before-close="beforeJobDialog"
      @open="openJobDialog"
      @close="closeJobDialog"
    >
      <div class="content clearfix">
        <el-form
          ref="jobForms"
          :model="jobForm"
          :label-width="formLabelWidth"
          :rules="jobRules"
        >
          <el-form-item label="职位名称" prop="title">
            <el-input
              ref="title"
              v-model="jobForm.title"
              name="title"
              placeholder="1-20个非空字符"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>
          <!--  <el-form-item label="职位权重" prop="weight">
            <el-input
              ref="weight"
              v-model.number="jobForm.weight"
              oninput="value=value.replace(/[^\d]/g,'')"
              name="weight"
              placeholder="正整数，和职级成正比"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>-->
          <el-form-item label="职位描述" prop="desc">
            <el-input
              ref="desc"
              v-model="jobForm.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              name="desc"
              placeholder="1-200个非空字符"
              :clearable="true"
              tabindex="2"
              show-word-limit
              maxlength="200"
              autocomplete="new-password"
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitJobForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="hideJobDialog"
        >取消</el-button>
      </div>
    </el-dialog>
    <!--创建 / 编辑worker 职员弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑员工"
      :visible.sync="workerDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="openWorkerDialog"
      @close="closeWorkerDialog"
    >
      <div class="content clearfix">
        <el-form ref="workerForms" :model="workerForm" :label-width="formLabelWidth" :rules="workerRules">
          <el-form-item label="员工职位" prop="titleId">
            <el-select v-model="workerForm.titleId" filterable placeholder="请选择职位" style="width: 100%;">
              <el-option
                v-for="item in allJobList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="员工姓名" prop="name">
            <el-input
              ref="name"
              v-model="workerForm.name"
              name="name"
              placeholder="请输入员工姓名"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="20"
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="员工简介" prop="desc">
            <el-input
              ref="desc"
              v-model="workerForm.desc"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              name="desc"
              placeholder="1-500个非空字符"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="500"
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="选择照片" prop="file">
            <div class="select-imgs">
              <el-button size="small" type="primary" @click="imagecropperShow=true">选择文件</el-button>
            </div>
            <!-- <div class="info">
              建议上传尺寸：1920 * 385，仅支持格式: png | jpg, 不大于5M
            </div>-->
          </el-form-item>
          <el-form-item label="照片预览" prop="path">
            <div class="preview-banner" style="width: 200px;">
              <img :src="workerForm.path | changeUrl" alt="" >
            <!--  <el-image :src="workerForm.path | changeUrl">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
                <div slot="error" class="image-slot">
                  &lt;!&ndash; <i v-if="workerForm.url" class="el-icon-picture-outline" />&ndash;&gt;
                  <i v-if="workerForm.path" class="el-icon-picture-outline" />
                  <span v-else>请选择照片</span>
                </div>
              </el-image>-->
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitWorkerForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="workerDialogOff = false"
        >取消</el-button>
      </div>
    </el-dialog>
    <!--头像编辑-->
    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="300"
      :height="300"
      field="file"
      url="https://httpbin.org/post"
      lang-type="zh"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </div>
</template>

<script>
import * as request from '@/api/request'
import { changeWorkers } from '@/utils/tools'
import ImageCropper from '@/components/ImageCropper'
import Pagination from '@/components/Pagination'
import Sortable from 'sortablejs'
export default {
  name : 'EditLeader',
  components : {
    Pagination, ImageCropper
  },
  data() {
    const trigger = ['blur', 'change']
    const checkName = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 20 || value.length == 0 ) {
        return callback( new Error( '职位名称只能是1~20个非空字符串' ) )
      } else {
        callback()
      }
    }
    // const checkWeight = ( rule, value, callback ) => {
    //   if ( !/^([0-9]){1,20}$/.test( value ) ) {
    //     return callback( new Error( '权重等级必须是正整数' ) )
    //   } else {
    //     callback()
    //   }
    // }
    const checkDes = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 200 || value.length == 0 ) {
        return callback( new Error( '职位描述只能是1~200个非空字符串' ) )
      } else {
        callback()
      }
    }
    const checkWorkerName = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 20 || value.length == 0 ) {
        return callback( new Error( '员工名字只能是1~20个非空字符串' ) )
      } else {
        callback()
      }
    }
    const checkWorkerDes = ( rule, value, callback ) => {
      if ( !value || !value.trim() || value.length > 500 || value.length == 0 ) {
        return callback( new Error( '员工简介只能是1~500个非空字符串' ) )
      } else {
        callback()
      }
    }
    return {
      host : 'http://',
      // 控制表格单格宽度
      formLabelWidth : '120px',
      // 当前tab
      currentTab : 'job',
      // 分页参数
      jobs : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        },
        loading : false
      },
      // 职位 列表
      allJobList : [],
      jobList : [],
      // 弹框参数
      jobDialogOff : false,
      jobDialogType : 'create',
      // 当前被编辑/ 删除的职位对象
      currentSelectJob : {},
      // job form
      jobForm : {
        title : '',
        // weight : '',
        desc : ''
      },
      jobRules : {
        title : [
          { required : true, message : '请选职位名称', trigger },
          { validator : checkName, trigger }
        ],
        // weight : [
        //   { required : true, message : '1职位权重等级不能为空', trigger },
        //   { validator : checkWeight, trigger }
        // ],
        desc : [
          { required : true, message : '请输入职位描述', trigger },
          { validator : checkDes, trigger }
        ]
      },

      // 员工 分页参数等
      workers : {
        // 分页
        total : 0,
        loading : false,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        }
      },
      workerList : [],
      workerDialogOff : false,
      workerDialogType : 'create',
      currentSelectWorker : {},
      // worker form
      imagecropperShow : false,
      imagecropperKey : 0,
      // image : 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',

      workerForm : {
        titleId : 1,
        name : '',
        desc : '',
        // file : '',
        path : ''
      },
      workerRules : {
        titleId : [
          { required : true, message : '员工职位不能为空', trigger }
        ],
        name : [
          { required : true, message : '员工姓名不能为空', trigger },
          { validator : checkWorkerName, trigger }
        ],
        desc : [
          { required : true, message : '请输入员工简介', trigger },
          { validator : checkWorkerDes, trigger }
        ],
        path : [
          { required : true, message : '请选择员工照片', trigger }
        ]
      }
    }
  },
  computed : {},
  watch : {
    'currentTab' : {
      async handler( res ) {
        if ( res == 'worker' ) {
          await this.getAllJobList()
          await this.getWorkerList()
        } else {
          this.getJobList()
        }
      },
      immediate : false
    }
  },
  async created() {
    // await this.getNavList()
    this.host = location.href.startsWith( 'https://' ) ? 'https://' : 'http://'
    await this.getJobList()
    await this.getWorkerList()
  },
  methods : {
    async rowDrop() {
      const tbody = document.querySelector( '.job-list-table .el-table__body-wrapper tbody' )
      const that = this
      Sortable.create( tbody, {
        async onEnd( { newIndex, oldIndex } ) {
          // console.log( 'newIndex', newIndex, oldIndex )
          const currRow = that.jobList.splice( oldIndex, 1 )[0]
          that.jobList.splice( newIndex, 0, currRow )
          // console.log( 'n1ewIndex', { ...that.jobList[newIndex] }, { ...that.jobList[oldIndex] } )
          try {
            const params = {
              sort : that.jobList.map( item => item.id ).join(',')
            }
            await request.sortJobs( params )
            // await this.getJobList()
          } catch ( e ) {

          } finally {

          }
        }
      } )
    },
    // 头像编辑
    cropSuccess( resData ) {
      const { path } = resData
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.$set( this.workerForm, 'path', path )
      // this.workerForm.path = path
      const fileEl = this.$refs['workerForms'].fields[4]
      fileEl.validateMessage = ''
      fileEl.validateState = 'success'
      console.log( '头像编辑', { ...this.workerForm }, path )
    },
    close() {
      this.imagecropperShow = false
      // this.workerForm.path = ''
    },
    // 重置表单
    resetForm( data, type = 'jobForm' ) {
      if ( data ) {
        this[type] = { ...data }
        if ( type == 'workerForm' ) {
          this['workerForm']['path'] = data['photo']
        }
      } else {
        for ( const key in this[type] ) {
          this.$set( this[type], key, '' )
        }
      }
    },
    // 重置分页参数
    async initPage( type = 'jobs' ) {
      this[type].listQuery.page = 1
      this[type].listQuery.limit = 10
    },
    // 获取所有职位请求
    async getAllJobList() {
      const that = this
      const params = {
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getJobs( params )
        that.allJobList = data.list
      } catch ( e ) {} finally {}
    },
    // 获取 职位请求
    async getJobList( data ) {
      const that = this
      that.jobs.loading = true
      if ( data ) {
        that.jobs.listQuery.page = data.page
        that.jobs.listQuery.limit = data.limit
      }
      const params = {
        // page : that.jobs.listQuery.page,
        // limit : that.jobs.listQuery.limit,

        page : 1,
        limit : -1
      }
      try {
        const { data } = await request.getJobs( params )
        that.jobs.total = data.count
        that.jobList = data.list
        that.rowDrop()
      } catch ( e ) {} finally {
        that.jobs.loading = false
      }
    },
    // 显示创建类型弹框
    async showCreateJob() {
      this.jobDialogOff = true
      this.jobDialogType = 'create'
      this.currentSelectJob = {}
    },
    // 显示编辑类型弹框
    async showEditJob( data ) {
      this.jobDialogOff = true
      this.jobDialogType = 'update'
      this.currentSelectJob = { ...data }
    },
    // 关闭职位弹框
    async hideJobDialog() {
      this.jobDialogOff = false
      this.jobDialogType = 'create'
      this.currentSelectJob = {}
    },
    // 关闭弹窗前的回调
    beforeJobDialog( done ) {
      // if ( !this.unChange ) {
      //   this.$confirm( '当前信息未保存，是否取消本次编辑', '', {} )
      //     .then( () => {
      //       done()
      //     } )
      //     .catch( () => {} )
      // } else {
      //   done()
      // }
      this.resetForm( false, 'jobForm' )
      done()
    },
    // 打开类型弹框
    async openJobDialog() {
      this.$nextTick( e => {
        this.$refs.jobForms.resetFields()
        if ( this.jobDialogType === 'create' ) {
          this.resetForm( false, 'jobForm' )
        } else {
          this.resetForm( this.currentSelectJob, 'jobForm' )
        }
      } )
    },
    // 关闭类型弹框
    async closeJobDialog() {
      const that = this
      that.resetForm( false, 'jobForm' )
      setTimeout( () => {
        that.currentSelectJob = {}
        that.jobDialogType = 'create'
      }, 100 )
    },
    // 提交更新
    async submitJobForm() {
      this.$refs['jobForms'].validate( valid => {
        if ( valid ) {
          if ( this.jobDialogType === 'create' ) {
            this.createJobRequest()
          } else {
            this.updateJobRequest()
          }
        }
      } )
    },
    // 发送创建 更新请求
    async createJobRequest() {
      const params = { ...this.jobForm }
      try {
        await request.createJobs( params )
        await this.getJobList()
        this.jobDialogOff = false
      } catch ( e ) {} finally {}
    },
    async updateJobRequest() {
      const params = { ...this.jobForm }
      try {
        await request.updateJobs( params )
        await this.getJobList()
        this.jobDialogOff = false
      } catch ( e ) {} finally {}
    },
    // 删除 job
    async removeJob( data ) {
      this.$confirm( '删除之后该职位下的员工都将被删除，确定删除吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await request.removeJobs( params )
            await this.$notify( {
              title : '成功',
              message : '删除成功',
              duration : 1500,
              customClass : 'center-center',
              type : 'success'
            } )
            await this.initPage( 'jobs' )
            await this.getJobList()
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

    // 获取 case Job 请求
    async getWorkerList( data ) {
      const that = this
      that.workers.loading = true
      if ( data ) {
        that.workers.listQuery.page = data.page
        that.workers.listQuery.limit = data.limit
      }
      // 查询所有
      const params = {
        page : that.workers.listQuery.page,
        limit : that.workers.listQuery.limit
      }
      try {
        const { data } = await request.getWorkers( params )
        that.workers.total = data.count
        that.workerList = changeWorkers( data.list, this.allJobList )
      } catch ( e ) {} finally {
        that.workers.loading = false
      }
    },
    // 显示创建类型弹框
    async showCreateWorker() {
      this.workerDialogOff = true
      this.workerDialogType = 'create'
      this.currentSelectWorker = {}
    },
    // 显示编辑类型弹框
    async showEditWorker( data ) {
      this.workerDialogOff = true
      this.workerDialogType = 'update'
      this.currentSelectWorker = { ...data }
    },
    // 打开类型弹框
    async openWorkerDialog() {
      this.$nextTick( e => {
        this.$refs.workerForms.resetFields()
        if ( this.workerDialogType === 'create' ) {
          this.resetForm( false, 'workerForm' )
        } else {
          this.resetForm( this.currentSelectWorker, 'workerForm' )
        }
      } )
    },
    // 关闭类型弹框
    async closeWorkerDialog() {
      const that = this
      this.resetForm( false, 'workerForm' )
      setTimeout( () => {
        that.currentSelectWorker = {}
        that.workerDialogType = 'create'
      }, 100 )
    },
    // 提交更新类型
    async submitWorkerForm() {
      this.$refs['workerForms'].validate( valid => {
        if ( valid ) {
          if ( this.workerDialogType === 'create' ) {
            this.createWorkerRequest()
          } else {
            this.updateWorkerRequest()
          }
        }
      } )
    },
    // 发送创建 更新请求
    async createWorkerRequest() {
      const params = {
        ...this.workerForm,
        // titleId : this.workerForm.job,
        photo : this.workerForm.path
      }
      try {
        await request.createWorkers( params )
        await this.getWorkerList()
        this.workerDialogOff = false
      } catch ( e ) {} finally {}
    },
    // 发送创建 更新请求
    async updateWorkerRequest() {
      const params = {
        ...this.workerForm,
        // titleId : this.workerForm.job,
        photo : this.workerForm.path
      }
      try {
        await request.updateWorkers( params )
        await this.getWorkerList()
        this.workerDialogOff = false
      } catch ( e ) {} finally {}
    },
    // 删除worker
    async removeWorker( data ) {
      this.$confirm( '确定删除该员工吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await request.removeWorkers( params )
            await this.initPage( 'workers' )
            await this.getWorkerList()
          } catch ( e ) {}
        } )
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
</style>
