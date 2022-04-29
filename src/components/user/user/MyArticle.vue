<template>
  <el-container style="width:100%; height:100%;">
    <el-table
      :data="list"
      height="100%"
      style="width: 100%">
      <el-table-column
        label="标题"
        width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="getMyArticleDetail(scope.row.arid)">{{scope.row.articleTitle}}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="发布日期"
        width="auto">
        <template slot-scope="scope">
          {{scope.row.articleTime|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
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
              <div style="display: inline;">|</div>
              <el-button
              @click="addArticle">
              写文章
            </el-button>
            </template>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button @click="delArticle(scope.row)">删除</el-button>
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
<!-- </div> -->
</template>

<script>
import article from '@/api/article'
import {getIdToken} from '@/util/auth'
export default {
  name: 'MyArticle',
  data () {
    return {
      list: [],
      userId: getIdToken(),
      total: null,
      keyword: '',
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    // this.getMyArticleList(this.userId)
    this.cur = this.$route.params.cur
    this.keyword = this.$route.params.keyword
    if (!this.cur) {
      this.cur = 1
    }
    this.cur = Number(this.cur)
    this.getUserArticleByPage(this.userId, this.cur, this.pageSize, this.keyword)
    console.log(this.userId, '===', this.cur)
  },
  methods: {
    //  --- 获取用户文章列表--分页 ---
    getUserArticleByPage (userId, cur = 1, limit = 5, keyword = '') {
      article.getUserArticleByPage(userId, cur, limit, keyword).then(data => {
        this.list = data.data.data.list
        this.total = data.data.data.total
        this.cur = Number(cur)
        console.log(data.data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // getMyArticleList (data) {
    //   article.getArticleByUser(data).then(data => {
    //     this.list = data.data.data.list
    //     console.log(data.data.data)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    getMyArticleDetail (data) {
      this.$router.push({name: 'userArticleDetail', params: {arid: data}})
    },
    addArticle () {
      this.$router.push({name: 'userAddArticle'})
    },
    // 删除用户相应文章
    delArticle (data) {
      article.delArticle(data).then(data => {
        this.$router.push({name: 'refresh', params: {to: 'myArticle'}})
        console.log(data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 关键字搜索
    handleKeySearch () {
      this.getUserArticleByPage(this.userId, 1, this.pageSize, this.keyword)
      console.log(this.keyword)
    },
    // 页面的current-change改变事件触发
    handleCurrentChange (cur) {
      console.log('current change == ', cur)
      // this.$router.push({name: 'refresh', params: {to: 'myArticle', cur, keyword: this.keyword}})
      this.getUserArticleByPage(this.userId, cur, this.pageSize, this.keyword)
    }
  }
}
</script>
<style>
.my-article {
  height: 500px;
}
</style>
