<template>
  <el-container style="height: 100%;">
    <el-table
      :data="list"
      height="100%"
      style="width: 100%">
      <el-table-column
        label="标题"
        width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleDetail(scope.row.nid)">{{scope.row.noticeTitle}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="管理员"
        width="200">
      </el-table-column>
      <el-table-column
        label="发布日期"
        width="auto">
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
          {{scope.row.noticeTime|dateFormat}}
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
export default {
  name: 'NoticeList',
  data () {
    return {
      list: [],
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
    // this.cur = Number(this.cur)
    // this.getAcByPage(this.cur)
    this.getNoticeByPage(this.cur, this.pageSize, this.keyword)
  },
  methods: {
    // 获取分页公告列表
    getNoticeByPage (cur, limit = 5, keyword = '') {
      notice.getNoticeByPage(cur, limit, keyword).then(data => {
        this.total = data.data.data.total
        this.list = data.data.data.list
        this.cur = Number(cur)
      }).catch(err => {
        console.log(err)
      })
    },
    // 公告详情
    handleDetail (nid) {
      this.$router.push({name: 'userNoticeDetail', params: {nid}})
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
