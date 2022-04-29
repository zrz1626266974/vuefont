<template>
  <el-container class="article-list">
  <el-table
    :data="list"
    height="500"
    style="width: 100%">
    <el-table-column
      label="文章标题"
      width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="getArticleDetail(scope.row.arid)">{{scope.row.articleTitle}}</el-button>
        <!-- <el-button type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
    <el-table-column
      prop="userId"
      label="文章作者"
      width="200">
    </el-table-column>
    <el-table-column
      label="发布时间"
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
        {{scope.row.articleTime|dateFormat}}
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
import article from '@/api/article'
export default {
  name: 'ArticleList',
  data () {
    return {
      list: [],
      keyword: '',
      total: null,
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    // this.getArticleList()
    this.cur = this.$route.params.cur
    console.log('this.cur == ', this.cur)
    if (!this.cur) {
      console.log('!this.cur == ', this.cur)
      this.cur = 1
    }
    this.cur = Number(this.cur)
    this.keyword = this.$route.params.keyword
    this.getArticleByPage(this.cur, this.pageSize, this.keyword)
  },
  methods: {
    // 分页获取文章列表
    getArticleByPage (cur, limit = 5, keyword = '') {
      article.getArticleByPage(cur, limit, keyword).then(data => {
        this.list = data.data.data.list
        this.total = data.data.data.total
        this.cur = Number(cur)
        console.log('getArticleByPage data', data.data.data)
      })
    },
    // getArticleList () {
    //   article.getArticleList().then(data => {
    //     this.list = data.data.data.list
    //     console.log(this.list)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // 文章详情
    getArticleDetail (arid) {
      this.$router.push({name: 'userArticleDetail', params: {arid}})
    },
    handleCurrentChange (cur) {
      // this.$router.push({name: 'refresh', params: {to: 'userArticleList', cur, keyword: this.keyword}})
      this.getArticleByPage(cur, this.pageSize, this.keyword)
    },
    // 关键字搜索
    handleKeySearch () {
      this.getArticleByPage(1, this.pageSize, this.keyword)
      console.log(this.keyword)
    }
  }
}
</script>
<style>
.article-list {
  height: 100%;
  width: 100%;
}
</style>
