<template>
  <el-container style="width:100%; height:100%;">
  <el-table
    :data="list"
    height="500px"
    style="width: 100%">
    <!-- <el-table-column>
    </el-table-column> -->
    <el-table-column
      prop="activityName"
      label="活动名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="typeName"
      label="活动类型"
      width="180">
    </el-table-column>
    <el-table-column
      label="活动开始时间">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.stime | dateFormat}}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="活动结束时间">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.etime | dateFormat}}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="keyword"
          size="mini"
          prefix-icon="el-icon-search"
          placeholder="输入关键字搜索">
          <template slot="append">
            <el-button
              @click="handleKeySearch">
              搜索
            </el-button>
          </template>
        </el-input>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="addReg(scope.row.acid)">报名</el-button>
        <el-button
          size="mini"
          @click="getActivityById(scope.row.acid)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-footer>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="cur"
      @current-change="handleCurrentChange">
    </el-pagination>
  </el-footer>
</el-container>
</template>

<script>
import activity from '@/api/activity'
export default {
  name: 'ActivityList2',
  data () {
    return {
      list: [],
      msg: 'msg',
      keyword: '',
      total: null,
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    // this.getActivityList()
    this.cur = this.$route.params.cur
    if (!this.cur) {
      this.cur = 1
    }
    this.cur = Number(this.cur)
    this.keyword = this.$route.params.keyword
    this.getAcByPage(this.cur, this.pageSize, this.keyword)
    console.log(this.$route.params.cur)
  },
  methods: {
    // getActivityList () {
    //   activity.getActivityList().then(data => {
    //     this.msg = data.data
    //     this.list = data.data.data.list
    //     console.log(this.list)
    //   }).catch(err => {
    //     this.msg = err
    //   })
    // },
    // 获取分页活动
    getAcByPage (cur, limit = 5, keyword = '') {
      activity.getAcByPage(cur, limit, keyword).then(data => {
        this.total = data.data.data.total
        this.list = data.data.data.list
        this.cur = Number(cur)
        console.log(data.data.data)
        console.log('this.total = = ', this.total)
      }).catch(err => {
        console.log(err)
      })
    },
    // 报名活动
    addReg (acid) {
      this.$router.push({name: 'userAddReg', params: {acid}})
    },
    // 获取活动详情
    getActivityById (acid) {
      this.$router.push({name: 'userActivityDetail', params: {acid}})
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 关键字搜索
    handleKeySearch () {
      this.getAcByPage(1, 5, this.keyword)
      console.log(this.keyword)
    },
    // 页面的current-change改变事件触发
    handleCurrentChange (cur) {
      console.log('current change == ', cur)
      // this.$router.push({name: 'refresh', params: {to: 'userActivityList', cur, keyword: this.keyword}})
      this.getAcByPage(cur, this.pageSize, this.keyword)
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
  margin-right: 5px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
