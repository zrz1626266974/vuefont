<template>
  <el-container style="height: 100%;">
  <el-table
    :data="list"
    height="600px"
    style="width: 100%">
    <el-table-column
      prop="activityName"
      label="活动名称"
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
          @click="updateActivity(scope.row.acid)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="delActivity(scope.row, scope.$index)">删除</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="getRegList(scope.row.acid)">报名表</el-button>
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
import activity from '@/api/activity'
import {getToken} from '@/util/auth'
export default {
  name: 'ActivityList',
  data () {
    return {
      one: {
        id: getToken()
      },
      list: [],
      keyword: '',
      total: 0,
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    this.cur = this.$route.params.cur
    if (!this.cur) {
      this.cur = 1
    }
    this.cur = Number(this.cur)
    this.keyword = this.$route.params.keyword
    this.getAdminAcByPage(this.one, this.cur, this.pageSize, this.keyword)
    console.log(this.$route.params.cur)
  },
  methods: {
    // 分页获取管理员的活动
    getAdminAcByPage (data, cur = 1, limit = 5, keyword = '') {
      activity.getAdminAcByPage(data, cur, limit, keyword).then(data => {
        this.total = data.data.data.total
        this.list = data.data.data.list
        this.cur = Number(cur)
      }).catch(err => {
        console.log(err)
      })
    },
    // 根据admin 获取相应的活动列表
    getActivityByAdmin (data) {
      console.log(`admin = ${data.id}`)
      activity.getActivityByAdmin(data).then(data => {
        this.list = data.data.data.list
        console.log(data.data)
      })
    },
    updateActivity (acid) {
      this.$router.push({name: 'updateActivity', params: {acid}})
    },
    delActivity (data, index) {
      activity.delActivity(data).then(data => {
        this.list.splice(index, 1)
        console.log(data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    getRegList (acid) {
      this.$router.push({name: 'regList', params: {acid}})
    },
    // 关键字搜索
    handleKeySearch () {
      this.getAdminAcByPage(this.one, 1, 5, this.keyword)
      console.log(this.keyword)
    },
    // 页面的current-change改变事件触发
    handleCurrentChange (cur) {
      console.log('current change == ', cur)
      // this.$router.push({name: 'refresh', params: {to: 'userActivityList', cur, keyword: this.keyword}})
      this.getAdminAcByPage(this.one, cur, this.pageSize, this.keyword)
    }
  }
}
</script>
