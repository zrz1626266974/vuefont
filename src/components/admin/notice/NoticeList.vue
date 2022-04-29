<template>
  <el-container style="width:100%; height:100%;">
  <el-table
    :data="list"
    height="100%"
    style="width: 100%">
    <el-table-column
      prop="noticeTitle"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="noticeContent"
      label="内容"
      width="600">
    </el-table-column>
    <el-table-column
      label="发布日期"
      width="200">
      <template slot-scope="scope">
        {{scope.row.noticeTime|dateFormat}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
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
    <template slot-scope="scope" v-if="id === scope.row.id">
      <el-button  type="text" size="small" @click="updateNotice(scope.row.nid)">修改</el-button>
      <el-button type="text" size="small" @click="delNotice(scope.row,scope.$index)">删除</el-button>
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
import notice from '@/api/notice'
import {getToken} from '@/util/auth'
export default {
  name: 'NoticeList',
  data () {
    return {
      list: [],
      id: getToken(),
      keyword: '',
      total: 0,
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    // this.getNoticeList()
    this.cur = this.$route.params.cur
    this.keyword = this.$route.params.keyword
    if (!this.cur) {
      this.cur = 1
    }
    this.getNoticeByPage(this.cur, this.pageSize, this.keyword)
  },
  methods: {
    // 分页获取公告列表
    getNoticeByPage (cur, limit = 5, keyword = '') {
      notice.getNoticeByPage(cur, limit, keyword).then(data => {
        this.total = data.data.data.total
        this.list = data.data.data.list
        this.cur = Number(cur)
      }).catch(err => {
        console.log(err)
      })
    },
    updateNotice (id) {
      console.log(id)
      this.$router.push({name: 'updateNotice', params: {id}})
    },
    delNotice (data, index) {
      notice.delNotice(data).then(data => {
        console.log(data)
        this.list.splice(index, 1)
        // this.$router.push({name: 'noticeList'})
      }).catch(err => {
        console.log(err)
      })
    },
    // 关键字搜索
    handleKeySearch () {
      this.getNoticeByPage(1, 5, this.keyword)
      console.log(this.keyword)
    },
    // 处理 current-change事件
    handleCurrentChange (cur) {
      // this.$router.push({name: 'refresh', params: {to: 'userNoticeList', cur, keyword: this.keyword}})
      this.getNoticeByPage(cur, this.pageSize, this.keyword)
      console.log('noticelist current change ')
    }
  }
}
</script>
