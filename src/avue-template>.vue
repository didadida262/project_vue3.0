<template>
  <basic-container>
    <el-row>
      <el-card class="box-card totalInfo">
        <el-tag size="small" type="success" class="tag">总预算： 33300000元</el-tag>
        <el-tag size="small" type="warning" class="tag">已入职花费： 33300000元</el-tag>
        <el-tag size="small" type="success" class="tag">总获批人数： 88人</el-tag>
        <el-tag size="small" type="warning" class="tag">总已入职人数： 20人</el-tag>
        <el-tag size="small" type="info" class="tag">剩余名额人数： 20人</el-tag>
      </el-card>      
    </el-row>
    <avue-crud
      ref="crud"
      v-model="form"
      :option="option"
      :table-loading="loading"
      :data="data.records"
      :page.sync="page"
      :before-open="beforeOpen"
      @row-save="rowAdd"
      @row-update="rowUpdate"
      @current-change="currentChange"
      @size-change="sizeChange"
      @search-reset="searchReset"
      @search-change="searchChange"
      @row-del="rowDel"
      @refresh-change="refreshChange"
      @on-load="onLoad"
      @selection-change="selectionChange"
    />
    <!-- <template slot="menuLeft" slot-scope="{ size }">
        <el-button type="danger" icon="el-icon-delete" :size="size" @click="toggleSelection()">批量删除</el-button>
      </template> -->
  </basic-container>
</template>

<script>
import { planDelete, pUpdate, planSearch } from '@/api/temp/plan'
export default {
  directives: {},
  data() {
    return {
      projectCode: '4666',
      selectionList: [],
      form: {},
      query: {},
      loading: true,
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      option: {
        // 不知道干嘛的
        // expand: false,
        // 操作栏宽度
        // menuWidth
        // 搜索显隐按钮
        searchBtn: true,
        selection: false,
        // 列显隐
        columnBtn: false,
        printBtn: false,
        refreshBtn: false,
        menu: false,
        card: true,
        searchBtnText: '查询',
        emptyBtnText: '重置',
        index: true,
        indexLabel: '序号',
        height: 'auto',
        calcHeight: 30,
        tip: true,
        searchShow: true,
        searchMenuSpan: 6,
        border: true,
        editBtn: true,
        addBtn: false,
        viewBtn: true,
        delBtn: true,
        menuWidth: 300,
        dialogWidth: 900,
        dialogClickModal: false,
        align: 'center',
        column: [
          {
            label: '项目名称',
            prop: 'projectName',
            search: true
            // searchSpan
            // searchLabelWidth
            // labelWidth
          },          
          {
            label: '岗位名称',
            prop: 'workName',
            search: true
          },
          {
            label: '获批岗位人数',
            prop: 'personNumber'
          },
          {
            label: '已入职人数',
            prop: 'workNumber'
          },
          {
            label: '花费预算(元)',
            prop: 'yearBudget'
          },
          {
            label: '剩余名额',
            prop: 'yearBudget'
          },
          {
            label: '剩余预算（元）',
            prop: 'workNumber'
          },
          {
            label: '对应审批流码',
            prop: 'planCode',
            html:true,
            formatter:(val)=>{
              return '<span style="color: #2e91fb">'+val.planCode+'</span>'
            }            
          }
        ]
      },
      data: []
    }
  },

  computed: {},
  watch: {
    $route() {
      this.onLoad()
    }
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    selectionChange(list) {
      this.selectionList = list.map(item => {
        return item.id
      })
    },
    beforeOpen(done, type) {
      done()
      // if (['edit', 'view'].includes(type)) {
      //   console.log('this.form:', this.form)
      //   planInfo(this.form.planCode).then(({ data }) => {
      //     console.log('planInfo获取数据：', data)
      //     this.form = data.data
      //     done()
      //   })
      // } else {
      //   done()
      // }
    },
    /* 添加弹窗的保存按钮*/
    rowAdd(data, done, loading) {
      console.log('data:', data)
      const listProvisionalProposalPlanDetail = this.data.listProvisionalProposalPlanDetail
      listProvisionalProposalPlanDetail.push(data)
      const params = {
        ...this.data
      }
      params.listProvisionalProposalPlanDetail = listProvisionalProposalPlanDetail
      console.log('planUpdate请求参数', params)
      pUpdate(params, 0)
        .then(({ data }) => {
          console.log('获取数据:', data)
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            done()
            this.refreshChange()
          } else {
            this.$message({
              message: '添加失败！',
              type: 'warning'
            })
            loading()
          }
        })
        .catch(() => {
          loading()
        })
    },
    rowDel(row, index, done) {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确认删除
          this.data.listProvisionalProposalPlanDetail[index].delFlag = 1
          const param = JSON.parse(JSON.stringify(this.data))
          return planDelete(param)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
          // 数据回调进行刷新
          done()
          this.onLoad(this.page)
        })
        .catch(e => {
          console.log(e)
        })
    },
    // 批量删除
    toggleSelection() {
      for (let i = 0; i < this.data.listProvisionalProposalPlanDetail.length; i++) {
        const id = this.data.listProvisionalProposalPlanDetail[i].id
        if (this.selectionList.includes(id)) {
          this.data.listProvisionalProposalPlanDetail[i].delFlag = 1
        }
      }
      const param = JSON.parse(JSON.stringify(this.data))
      return planDelete(param)
        .then(() => {
          // 数据回调进行刷新
          this.onLoad()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
        .catch(e => {
          console.log(e)
        })
    },
    rowUpdate(data, index, done, loading) {
      this.data.listProvisionalProposalPlanDetail[index] = data
      const param = JSON.parse(JSON.stringify(this.data))
      pUpdate(param, 1)
        .then(({ data }) => {
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            done()
            this.refreshChange()
          } else {
            this.$message({
              message: '更新失败！',
              type: 'warning'
            })
            loading()
          }
        })
        .catch(() => {
          loading()
        })
    },
    currentChange(currentPage) {
      this.page.currentPage = currentPage
    },
    sizeChange(pageSize) {
      this.page.pageSize = pageSize
    },
    // 重置
    searchReset() {
      this.page.currentPage = 1
      this.query = {}
      this.onLoad(this.page, {})
    },
    refreshChange() {
      this.onLoad(this.page, this.query)
    },
    // 搜索
    searchChange(params, done) {
      params.tenantId = '000000'
      console.log('params:', params)
      this.onLoad(this.page, params)
    },
    onLoad(page, params = {}, done) {
      const query = {
        size: this.page.pageSize,
        current: this.page.currentPage,
        tenantId: '000000',
        ...params
      }
      console.log('请求参数', query)
      planSearch(query).then(res => {
        console.log('res:', res)
        this.data = res.data.data
        this.page.total = res.data.data.total
        this.currentPage = res.data.data.current
        this.loading = false
        if (done) {
          done()
        }
      })
    }
  }
}
</script>

<style>
.none-border {
  border: 0;
  background-color: transparent !important;
}
.el-upload {
  width: 50px;
}
.totalInfo {
  display: flex;
  margin-bottom: 10px;
}
.tag {
  margin-right: 5px;
}
</style>
