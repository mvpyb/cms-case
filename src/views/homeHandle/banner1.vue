<template>
  <div class="section-container">
    <!--轮播展示管理-->
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
            :data="typeList"
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
            <el-table-column label="类型名称">
              <template slot-scope="scope">
                <div class="ellipsis">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="类型描述">
              <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column label="创建人">
              <template slot-scope="scope">{{ scope.row.creator }}</template>
            </el-table-column>

            <el-table-column label="更新时间" width="120">
              <template slot-scope="scope">{{ scope.row.update_time | changeTime }}</template>
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
      <el-tab-pane label="链接管理" name="links">
        <div class="tab-item links-item">
          <!--选择任务弹框-->
          <div class="tab-headers clearfix">
            <el-button
              class="new-text-default fl"
              type="primary"
              :disabled="typeList.length == 0"
              @click="showCreateLink"
            >新建链接</el-button>
            <div class="links-tab--header fl">
              <span> 选择类型： </span>
              <el-select v-model="currentType" placeholder="请选择" @change="changeTypes">
                <el-option
                  v-for="item in typeList"
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
            <el-table-column label="序号" type="index" width="80" />
            <el-table-column label="类型名称">
              <template slot-scope="scope">
                <div class="ellipsis">
                  {{ scope.row.name }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="类型描述">
              <template slot-scope="scope">{{ scope.row.description }}</template>
            </el-table-column>
            <el-table-column label="创建人">
              <template slot-scope="scope">{{ scope.row.creator }}</template>
            </el-table-column>

            <el-table-column label="更新时间" width="120">
              <template slot-scope="scope">{{ scope.row.update_time | changeTime }}</template>
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
            :total="types.total"
            :page.sync="types.listQuery.page"
            :limit.sync="types.listQuery.limit"
            :page-sizes="types.listQuery.pageSizes"
            :layout="types.listQuery.layout"
            @pagination="getTypeList"
          />
        </div>
      </el-tab-pane>
    </el-tabs>

    <!--创建-->
    <el-button type="primary" class="mb10" @click="openDialog = true">创建轮播图</el-button>
    <div v-if="tableData.length > 0" class="section-main banner-section">
      <el-table
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="index"
          label="索引"
          width="50"
        />
        <el-table-column
          label="图片"
          width="130"
        >
          <template slot-scope="{row}">
            <div>
              <el-image
                style="width: 100px; height: 100px"
                :src="row.url"
                :preview-src-list="[row.url]"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="link"
          label="跳转页面"
          width="180"
        />
        <el-table-column
          prop="description"
          label="描述"
          width="300"
        />
        <el-table-column
          label="创建者"
          width="180"
        >
          <template slot-scope="{row}">
            <div>
              {{ row.creator }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="创建时间"
          width="120"
        >
          <template slot-scope="{row}">
            <div>
              {{ row.createTime | formatUnixToDayTime }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="发布时间"
          width="120"
        >
          <template slot-scope="{row}">
            <div>
              {{ row.publishTime | formatUnixToDayTime }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          align="right"
          header-align="center"
          width="180"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{row}">
            <el-button type="text" size="small">发布</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <no-data v-else />
    <!--分页   v-show="total > 9" -->
    <pagination
      :total="total"
      :layout="listQuery.layout"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
    />
    @pagination="getList"

    <!--创建轮播弹框-->
    <div class="dialog-section">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="openDialog"
        custom-class="edit-app-dialog"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @open="openOff"
        @close="close"
      >
        <el-form ref="editAppForm" :model="form" :rules="rules">
          <el-form-item label="跳转页面" prop="did" :label-width="formLabelWidth">
            <el-cascader
              v-model="form.target"
              :options="targetList"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            />
          </el-form-item>
          <el-form-item label="描述" prop="description" :label-width="formLabelWidth">
            <el-input
              ref="description"
              v-model="form.description"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              name="account"
              placeholder="请输入banner描述"
              :clearable="true"
              tabindex="1"
              show-word-limit
              maxlength="200"
              autocomplete="new-password"
            />
          </el-form-item>
          <el-form-item label="选择图片" prop="sdk_name" :label-width="formLabelWidth">
            <el-button size="small" type="primary">选择文件</el-button>
            <input
              id="banner-file"
              ref="banner-file"
              accept="png/image,jpg/image,jpeg/image"
              type="file"
              class="select-file--inp"
            >
          </el-form-item>
          <el-form-item label="图片预览" prop="version" :label-width="formLabelWidth">
            <div class="preview-banner">
              <el-image :src="form.url">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline" />
                </div>
              </el-image>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer center">
          <el-button size="mini" type="primary" @click="publishBanner()">发布</el-button>
          <el-button size="mini" @click="saveBanner()">保存</el-button>
        </div>
      </el-dialog>
    </div>
    <!--图片裁剪-->
    <cropper-image
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="100"
      :height="100"
      :no-circle="true"
      url="https://httpbin.org/post"
      @close="close"
    />
  </div>
</template>

<script>
import cropperImage from '@/views/components/cropperImage'
import Pagination from '@/components/Pagination'
import NoData from '@/views/components/noData'
export default {
  name : 'Banner',
  components : {
    Pagination, NoData, cropperImage
  },
  data() {
    const trigger = ['blur', 'change']
    return {
      imagecropperShow : true,
      imagecropperKey : 0,
      image : 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',

      listLoading : false,
      total : 0,
      listQuery : {
        page : 1,
        limit : 9,
        layout : 'total, prev, pager, next, jumper'
      },
      tableData : [
        {
          id : 1,
          index : 1,
          url : 'http://xiehui.chinasme.org.cn/upload/template/5fced954b1c7c.jpg',
          creator : '王小虎1',
          creatorId : 3,
          createTime : 1610028496,
          publishTime : 1610028496,
          link : '王小虎',
          description : '上海市普陀区金沙江路 1518 弄'
        },
        {
          id : 2,
          index : 2,
          url : 'http://xiehui.chinasme.org.cn/upload/template/5fced954b1c7c.jpg',
          creator : '王小虎2',
          creatorId : 4,
          createTime : 1610018496,
          publishTime : 1610018496,
          link : '王小虎',
          description : '上海市普陀区金沙江路 1518 弄'
        }
      ],

      //  dialog
      dialogTitle : '编辑banner轮播图', // 更新弹窗标题
      openDialog : false,
      form : {
        url : '', // banner 图片URL
        target : '', // 跳转导航的ID
        // preview : '', // 图片预览
        description : '' // banner描述
      },
      rules : {
        // banner 图片URL
        url : [
          {
            required : true,
            trigger
            // validator : sdkEdit.checnickname
          }
        ],
        // 跳转导航的ID
        target : [
          {
            required : true,
            trigger
            // validator : sdkEdit.checversions
          }
        ],
        // banner描述
        description : [
          {
            required : true,
            trigger
            // validator : sdkEdit.checdescribed
          }
        ]
      },
      // 控制表格单格宽度
      formLabelWidth : '120px',
      // 导航列表
      targetList : [
        {
          value : '1',
          label : '首页'
        },
        {
          value : '2',
          label : '关于协会',
          children : [
            {
              value : '1-1',
              label : '协会简介'
            },
            {
              value : '1-2',
              label : '协会章程'
            },
            {
              value : '1-3',
              label : '组织架构'
            },
            {
              value : '1-4',
              label : '协会领导'
            },
            {
              value : '1-5',
              label : '人才招聘'
            },
            {
              value : '1-6',
              label : '联系我们'
            }
          ]
        }
      ]
    }
  },
  computed : {},
  created() {
    this.getList()
  },
  methods : {
    // 发布当前banner
    handleChange() {

    },
    // 发布当前banner
    publishBanner() {

    },
    // 保存当前banner
    saveBanner() {

    },
    // 获取列表请求
    async getList( params ) {
      const self = this
      self.listLoading = true
      if ( !params ) {
        setTimeout( () => {
          self.listLoading = false
        }, 1000 )
      } else {
        setTimeout( () => {
          self.listLoading = false
        }, 1000 )
      }
    },
    // 弹框关闭回调
    close() {
      this.resetForm()
      this.addNum = -1
    },
    // 弹框打开前的回调
    openOff() {
      this.$nextTick( () => {
        if ( this.addNum === 1 ) {
          this.$refs.editAppForm.resetFields()
          this.resetForm()
        }
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
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
