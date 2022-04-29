<template>
  <el-container style="height: 100%;">
  <el-table
    :data="list"
    height="100%"
    style="width: 100%">
    <!-- 展开开始 -->
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="志愿者姓名">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="志愿者身份证号码">
            <span>{{ props.row.identity }}</span>
          </el-form-item>
          <el-form-item label="志愿者报名时间">
            <span>{{ props.row.regTime|dateFormat }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.description }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!-- 展开结束 -->
    <el-table-column
      prop="id"
      label="用户名称"
      width="180">
    </el-table-column>
    <el-table-column
      label="报名时间"
      width="auto">
      <template slot-scope="scope">
        {{scope.row.regTime|dateFormat}}
      </template>
    </el-table-column>
    <el-table-column
    fixed="right"
    label="操作"
    width="auto">
    <template slot-scope="scope"  v-if="scope.row.sid !== 4">
      <el-button
        size="small"
        @click="updateReg({sid: 2,id: scope.row.id, acid: scope.row.acid})">报名通过</el-button>
      <el-button
        size="small"
        @click="updateReg({sid: 3,id: scope.row.id, acid: scope.row.acid})">报名不通过</el-button>
      <el-button
        size="small"
        @click="updateReg({sid: 4,id: scope.row.id, acid: scope.row.acid})">活动完成</el-button>
    </template>
  </el-table-column>
  </el-table>
  <el-footer>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="cur"
      :hide-on-single-page="true"
      @current-change="handleCurrentChange">
    </el-pagination>
  </el-footer>
</el-container>
</template>

<script>
import reg from '@/api/registration'
export default {
  name: 'RegList',
  data () {
    return {
      list: [],
      // info: {
      //   sid: null,
      //   acid: null
      // },
      acid: null,
      keyword: '',
      total: 0,
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    this.acid = this.$route.params.acid
    this.cur = this.$route.params.cur
    if (!this.cur) {
      this.cur = 1
    }
    this.cur = Number(this.cur)
    this.keyword = this.$route.params.keyword
    this.getRegByAcPage(this.acid, this.cur, this.pageSize, this.keyword)
  },
  methods: {
    // 分页获取活动相关的报名表
    getRegByAcPage (acid, cur = 1, limit = 5, keyword = '') {
      reg.getRegByAcPage(acid, cur, limit, keyword).then(data => {
        this.total = data.data.data.total
        this.list = data.data.data.list
        this.cur = Number(cur)
      }).catch(err => {
        console.log(err)
      })
    },
    // 更改报名通过
    updateReg (data) {
      reg.updateReg(data).then(data => {
        this.$router.push({name: 'refresh', params: {acid: this.acid, to: 'regList'}})
        // this.$router.redi
        console.log(data.data.message)
      }).catch(err => {
        console.log(err)
      })
    },
    // 页面的current-change改变事件触发
    handleCurrentChange (cur) {
      console.log('current change == ', cur)
      // this.$router.push({name: 'refresh', params: {to: 'userActivityList', cur, keyword: this.keyword}})
      this.getRegByAcPage(this.acid, cur, this.pageSize, this.keyword)
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 150px;
  color: #99a9bf;
  border-right: 1px solid gainsboro;
  margin-right: 10px;
  padding-left: 5px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
