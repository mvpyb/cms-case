<template>
  <div class="app-container">
    <!--友情链接类型管理-->
    <el-tabs v-model="currentTab" type="border-card">
      <el-tab-pane label="类型管理" name="types">
        <div class="tab-item type-item">
          <!--头部搜索 创建-->
          <div class="tab-headers clearfix">
            <el-button
              class="new-text-default"
              type="primary"
              @click="showCreateType"
            >新建类型</el-button>
          </div>
          <!--表格-->
          <el-table
            ref="typeTable"
            v-loading="typeLoading"
            class="links-list-table"
            :data="typeList"
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
            <el-table-column label="类型名称">
              <template slot-scope="scope">
                <div class="ellipsis">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="类型描述">
              <template slot-scope="scope">{{ scope.row.desc | subStringStr(10) }}</template>
            </el-table-column>
            <el-table-column label="创建人">
              <template slot-scope="scope">{{ scope.row.creator }}</template>
            </el-table-column>
            <el-table-column label="更新时间" width="180">
              <template slot-scope="scope">{{ scope.row.updatedAt | formatDate }}</template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center" class="btn-wrapper-cell">
              <template slot-scope="scope">
                <div style="position:relative;">
                  <el-button
                    class="new-text-default"
                    type="primary"
                    size="mini"
                    @click="showEditType(scope.row)"
                  >编辑</el-button>
                  <el-button
                    class="new-text-default"
                    type="danger"
                    size="mini"
                    @click="removeType(scope.row)"
                  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="types.total"
            :page.sync="types.listQuery.page"
            :limit.sync="types.listQuery.limit"
            :page-sizes="types.listQuery.pageSizes"
            :layout="types.listQuery.layout"
            @pagination="getTypeList"
          />
        </div>
      </el-tab-pane>
      <el-tab-pane label="子链接管理" name="links">
        <div class="tab-item links-item">
          <!--选择任务弹框-->
          <div class="tab-headers clearfix">
            <el-button
              class="new-text-default fl"
              type="primary"
              :disabled="allTypeList.length == 0"
              @click="showCreateLink"
            >新建链接</el-button>
            <div class="links-tab--header fl">
              <span> 选择类型： </span>
              <el-select v-model="currentType" placeholder="请选择" @change="changeTypes">
                <el-option
                  v-for="item in allTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </div>
          </div>
          <!--表格-->
          <el-table
            ref="linkTable"
            v-loading="linkLoading"
            :data="linkList"
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
            <el-table-column label="类型名称">
              <template slot-scope="scope">
                <div class="ellipsis">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="外链地址">
              <template slot-scope="scope">
                <el-tooltip class="item" effect="dark" :content="scope.row.links" placement="top">
                  <a :href="scope.row.links" target="_blank" style="cursor: pointer;color: #409EFF">点击前往</a>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="创建人">
              <template slot-scope="scope">{{ scope.row.creator }}</template>
            </el-table-column>
            <el-table-column label="更新时间" width="180">
              <template slot-scope="scope">{{ scope.row.updatedAt | formatDate }}</template>
            </el-table-column>

            <el-table-column label="操作" width="150" align="center" class="btn-wrapper-cell">
              <template slot-scope="scope">
                <div style="position:relative;">
                  <el-button
                    class="new-text-default"
                    type="primary"
                    size="mini"
                    @click="showEditLink(scope.row)"
                  >编辑</el-button>
                  <el-button
                    class="new-text-default"
                    type="danger"
                    size="mini"
                    @click="removeLink(scope.row)"
                  >删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            :total="links.total"
            :page.sync="links.listQuery.page"
            :limit.sync="links.listQuery.limit"
            :page-sizes="links.listQuery.pageSizes"
            :layout="links.listQuery.layout"
            @pagination="getTypeList"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
    <!--创建 / 编辑类型弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑类型"
      :visible.sync="typeDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="openTypeDialog"
      @close="closeTypeDialog"
    >
      <div class="content clearfix">
        <el-form ref="typeForms" :model="typeForm" :label-width="formLabelWidth" :rules="typeRules">
          <el-form-item label="类型名称" prop="name">
            <el-input
              ref="name"
              v-model="typeForm.name"
              name="name"
              maxlength="20"
              placeholder="1-20个字，可包含中英文、数字"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="类型描述" prop="desc">
            <el-input
              ref="desc"
              v-model="typeForm.desc"
              :autosize="{ minRows: 4, maxRows: 8}"
              type="textarea"
              name="desc"
              maxlength="200"
              placeholder="1~200个字符串，可不填"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button
          class="new-text-default"
          type="primary"
          size="mini"
          @click="submitTypeForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="typeDialogOff = false"
        >取消</el-button>
      </div>
    </el-dialog>
    <!--创建 / 编辑连接弹框-->
    <el-dialog
      width="60%"
      custom-class="customWidth"
      title="编辑链接"
      :visible.sync="linkDialogOff"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      @open="openLinkDialog"
      @close="closeLinkDialog"
    >
      <div class="content clearfix">
        <el-form ref="linkForms" :model="linkForm" :label-width="formLabelWidth" :rules="linkRules">
          <el-form-item label="链接名称" prop="name">
            <el-input
              ref="name"
              v-model="linkForm.name"
              name="name"
              maxlength="10"
              placeholder="1-20个字，可包含中英文、数字"
              autocomplete="new-password"
              clearable
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="外链地址" prop="links">
            <el-input
              ref="links"
              v-model="linkForm.links"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              name="links"
              placeholder="请输入外部链接"
              :clearable="true"
              tabindex="1"
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
          @click="submitLinkForm"
        >提交</el-button>
        <el-button
          class="new-text-default"
          type="danger"
          size="mini"
          @click="linkDialogOff = false"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
import * as request from '@/api/request'
import Pagination from '@/components/Pagination'
import { validURL } from '@/utils/validate'
import { changeLinks } from '@/utils/tools'
import { mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
const _ = require( 'lodash' )

export default {
  name : 'Links',
  components : { Pagination },
  data() {
    const trigger = ['blur', 'change']
    const checkTypeName = ( rule, value, callback ) => {
      const reg = /^([0-9]|[a-zA-Z]|[\u4e00-\u9fa5]){1,20}$/
      if ( !reg.test( value ) ) {
        return callback( new Error( '名称只能是1-20个字，可包含中英文、数字' ) )
      } else {
        callback()
      }
    }
    const checkTypeDes = ( rule, value, callback ) => {
      if ( value ) {
        if ( value.length > 200 ) {
          return callback( new Error( '描述只能是1~200个非空字符串' ) )
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    const checkLinkName = ( rule, value, callback ) => {
      const reg = /^([0-9]|[a-zA-Z]|[\u4e00-\u9fa5]){1,20}$/
      if ( !reg.test( value ) ) {
        return callback( new Error( '名称只能是1-20个字，可包含中英文、数字' ) )
      } else {
        callback()
      }
    }
    const checkLinks = ( rule, value, callback ) => {
      // 判断当前类型 如果类型为 固定市场 2 则验证
      if ( !validURL( value ) ) {
        return callback( new Error( '请输入合法的外部链接' ) )
      } else {
        callback()
      }
    }
    return {
      list1 : [],
      list2 : [],

      formLabelWidth : '80px',
      // 当前tab
      currentTab : 'types',
      typeList : [],
      allTypeList : [],
      linkList : [],
      types : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          // limit : 0, // 查询所有
          layout : 'total, prev, pager, next'
        }
      },
      // 类型form
      typeForm : {
        name : '',
        desc : ''
      },
      typeRules : {
        name : [
          { required : true, message : '请输入类型名称', trigger },
          { validator : checkTypeName, trigger }
        ],
        desc : [
          { validator : checkTypeDes, trigger }
        ]
      },
      // 链接form
      linkForm : {
        // type : '',
        name : '',
        links : ''
      },
      linkRules : {
        // type : [
        //   { required : true, message : '请选择类型', trigger }
        // ],
        name : [
          { required : true, message : '请输入类型名称', trigger },
          { validator : checkLinkName, trigger }
        ],
        links : [
          { required : true, message : '请输外链地址', trigger },
          { validator : checkLinks, trigger }
        ]
      },
      typeDialogOff : false,
      linkDialogOff : false,
      typeLoading : false,
      linkLoading : false,
      typeDialogType : 'create',
      linkDialogType : 'create',
      // 类型管理 - 当前被编辑/ 删除的类型对象
      currentSelectType : {},
      currentSelectLink : {},
      // 连接管理 - 当前被选择的Type
      currentType : '',
      links : {
        // 分页
        total : 0,
        listQuery : {
          page : 1,
          limit : 10,
          layout : 'total, prev, pager, next'
        }
      }
    }
  },
  computed : {
    ...mapGetters( [
      'name',
      'avatar',
      'roles'
    ] )
  },
  watch : {
    'currentTab' : {
      async handler( res ) {
        if ( res == 'links' ) {
          await this.getAllTypeList()
          this.currentType = this.currentType || this.allTypeList[0]['id']
          await this.getLinkList()
        } else {
          await this.getTypeList()
        }
      },
      immediate : false
    }
  },
  created() {
    this.getTypeList()
    // this.getLinkList()
  },
  methods : {
    async rowDrop() {
      const tbody = document.querySelector( '.links-list-table .el-table__body-wrapper tbody' )
      const that = this
      Sortable.create( tbody, {
        async onEnd( { newIndex, oldIndex } ) {
          // console.log( 'newIndex', newIndex, oldIndex )
          const currRow = that.typeList.splice( oldIndex, 1 )[0]
          that.typeList.splice( newIndex, 0, currRow )
          try {
            const params = {
              sort : that.typeList.map( item => item.id ).join(',')
            }
            await request.sortLinks( params )
            // await this.getTypeList()
          } catch ( e ) {} finally {}
        }
      } )
    },
    // 重置表单
    resetForm( data, type = 'typeForm' ) {
      if ( data ) {
        this.$nextTick( () => {
          this[type] = { ...data }
        } )
      } else {
        for ( const key in this[type] ) {
          this.$set( this[type], key, '' )
        }
      }
    },
    // 重置分页参数
    async initPage( type = 'types' ) {
      this[type].listQuery.page = 1
      this[type].listQuery.limit = 10
    },
    // 显示创建类型弹框
    async showCreateType() {
      this.typeDialogOff = true
      this.typeDialogType = 'create'
      this.currentSelectType = {}
    },
    // 显示编辑类型弹框
    async showEditType( data ) {
      this.typeDialogOff = true
      this.typeDialogType = 'update'
      this.currentSelectType = { ...data }
    },
    // 获取类型列表
    async getAllTypeList() {
      const that = this
      that.typeLoading = true
      // 查询所有
      const params = {
        page : 1,
        limit : 0
      }
      try {
        const { data } = await request.getTypes( params )
        that.allTypeList = data.list
      } catch ( e ) {} finally {
        that.typeLoading = false
      }
    },
    // 获取类型列表
    async getTypeList( data ) {
      const that = this
      that.typeLoading = true
      if ( data ) {
        that.types.listQuery.page = data.page
        that.types.listQuery.limit = data.limit
      }
      // 查询所有
      const params = {
        // page : that.types.listQuery.page,
        // limit : that.types.listQuery.limit,
        page : 1,
        limit : -1
      }
      try {
        const { data } = await request.getTypes( params )
        that.types.total = data.count
        that.typeList = data.list
        that.rowDrop()
      } catch ( e ) {} finally {
        that.typeLoading = false
      }
    },
    // 打开类型弹框
    async openTypeDialog() {
      this.$nextTick( e => {
        this.$refs.typeForms.resetFields()
        if ( this.typeDialogType === 'create' ) {
          this.resetForm( false, 'typeForm' )
        } else {
          this.resetForm( this.currentSelectType, 'typeForm' )
        }
      } )
    },
    // 关闭类型弹框
    async closeTypeDialog() {
      const self = this
      this.resetForm( false, 'typeForm' )
      setTimeout( () => {
        self.currentSelectType = {}
        self.typeDialogType = 'create'
      }, 100 )
    },
    // 提交更新类型
    async submitTypeForm() {
      this.$refs['typeForms'].validate( valid => {
        if ( valid ) {
          if ( this.typeDialogType === 'create' ) {
            this.createTypeRequest()
          } else {
            this.updateTypeRequest()
          }
        }
      } )
    },
    // 发送创建 更新请求
    async createTypeRequest() {
      const params = { ...this.typeForm }
      try {
        await request.createTypes( params )
        await this.getTypeList()
        this.typeDialogOff = false
      } catch ( e ) {
        // console.log( '创建banner出错', e )
      } finally {
        this.typeLoading = false
      }
    },
    async updateTypeRequest() {
      const params = { ...this.typeForm }
      try {
        await request.updateTypes( params )
        await this.getTypeList()
        this.typeDialogOff = false
      } catch ( e ) {
        // console.log( '创建banner出错', e )
      } finally {
        this.typeLoading = false
      }
    },
    // 删除类型
    async removeType( data ) {
      this.$confirm( '确定删除该类型吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await request.deleteTypes( params )
            await this.initPage( 'types' )
            await this.getTypeList()
          } catch ( e ) {}
        } )
    },

    // 连接管理 - 类型改变时 更新表格数据
    async changeTypes( data ) {
      this.getLinkList()
    },
    // 显示创建链接弹框
    async showCreateLink() {
      this.linkDialogOff = true
      this.linkDialogType = 'create'
      this.currentSelectLink = {}
    },
    // 显示编辑链接弹框
    async showEditLink( data ) {
      this.linkDialogOff = true
      this.linkDialogType = 'update'
      this.currentSelectLink = { ...data }
    },
    // 获取链接列表
    async getLinkList( data ) {
      const that = this
      that.linkLoading = true
      if ( data ) {
        that.links.listQuery.page = data.page
        that.links.listQuery.limit = data.limit
      }
      const params = {
        type : that.currentType || 1,
        page : that.links.listQuery.page,
        limit : that.links.listQuery.limit
      }
      try {
        const { data } = await request.getLinks( params )
        that.links.total = data.count
        that.linkList = changeLinks( data.list )
      } catch ( e ) {} finally {
        that.linkLoading = false
      }
    },
    // 打开类型弹框
    async openLinkDialog() {
      this.$nextTick( e => {
        this.$refs.linkForms.resetFields()
        if ( this.linkDialogType === 'create' ) {
          this.resetForm( false, 'linkForm' )
        } else {
          this.resetForm( this.currentSelectLink, 'linkForm' )
        }
      } )
    },
    // 关闭类型弹框
    async closeLinkDialog() {
      const self = this
      this.resetForm( false, 'linkForm' )
      setTimeout( () => {
        self.currentSelectLink = {}
        self.linkDialogType = 'create'
      }, 100 )
    },
    // 提交更新类型
    async submitLinkForm() {
      this.$refs['linkForms'].validate( valid => {
        if ( valid ) {
          if ( this.linkDialogType === 'create' ) {
            this.createLinkRequest()
          } else {
            this.updateLinkRequest()
          }
        }
      } )
    },
    // 发送创建 更新请求
    async createLinkRequest() {
      const that = this
      const params = {
        type : that.currentType,
        name : that.linkForm.name,
        redirect : that.linkForm.links
      }
      try {
        await request.createLinks( params )
        await that.getLinkList()
        that.linkDialogOff = false
      } catch ( e ) {} finally {
        that.linkLoading = false
      }
    },
    async updateLinkRequest() {
      const that = this
      const params = {
        id : that.currentSelectLink.id,
        name : that.linkForm.name,
        type : that.currentType,
        redirect : that.linkForm.links
      }
      try {
        await request.updateLinks( params )
        await that.getLinkList()
        that.linkDialogOff = false
      } catch ( e ) {} finally {
        that.linkLoading = false
      }
    },
    // 删除类型
    async removeLink( data ) {
      this.$confirm( '确定删除该链接吗？', '删除提示', {} )
        .then( async() => {
          try {
            const params = {
              ids : [data.id]
            }
            await request.deleteLinks( params )
            await this.initPage( 'links' )
            await this.getLinkList()
          } catch ( e ) {}
        } )
    }
  }
}
</script>

<style lang="scss" scoped>
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
  /*tab 头部*/
  .tab-headers {
    margin-bottom: 10px;
    /*连接管理 头部*/
    .links-tab--header {
      width: 70%;
      margin-left: 20px;
      height: 40px;
      .el-select {
        width: 40%;
      }
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

  /*分页*/
  .pagination-container {
    margin: 0;
    padding: 20px 10px;
    border-bottom: 1px solid #dfe6ec;
    border-left: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }

</style>
