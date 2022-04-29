<template>
  <el-container class="article-detail" direction="vertical">
    <!-- <el-header class="title">{{one.title}}</el-header> -->
    <el-main class="article-main">
      <article >
        <h1>{{one.articleTitle}}</h1>
        <hr/>
        <pre>{{one.articleContent}}</pre>
      </article>
    </el-main>
    <el-container>
      <el-input
        v-model="comment.commentContent"
        placeholder="留言评论"
        style="width: 100%;" />
      <el-button
        style="padding: 0;"
        @click="addComment(comment)">评论留言</el-button>
    </el-container>
    <el-container style="height: 390px;overflow: auto;">
      <!-- <el-header>文章评论留言</el-header> -->
      <el-table
        :data="list"
        :show-header="false"
        >
        <el-table-column
          width="180">
          <template slot-scope="scope">
            {{scope.row.userId}}
          </template>
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          width="auto">
          <template slot-scope="scope">
            {{scope.row.commentContent}}
          </template>
        </el-table-column>
        <el-table-column
          width="200px">
          <template slot-scope="scope">
            {{scope.row.commentTime|dateFormat}}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="medium"
              class="el-icon-chat-dot-round"
              @click="showCommentReply(scope.row.cid)"></el-button>
            <el-button
              v-if="scope.row.userId === comment.userId"
              type="text" size="medium"
              class="el-icon-circle-close"
              @click="delComment(scope.$index, scope.row.cid)"></el-button>
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
  </el-container>
</template>

<script>
import article from '@/api/article'
import comment from '@/api/comment'
import {getIdToken} from '@/util/auth'
export default {
  name: 'ArticleDetail',
  data () {
    return {
      comment: {
        content: '',
        // cid: '',
        arid: null,
        userId: getIdToken()
      },
      one: {
        arid: null,
        articleContent: ''
      },
      list: [],
      total: 0,
      pageSize: 3,
      cur: 1
    }
  },
  created () {
    this.one.arid = this.$route.params.arid
    this.comment.arid = this.$route.params.arid
    // this.comment.userId = this.$store.getters.userId
    this.getArticleById(this.one.arid)
    // this.getCommentByArticle(this.one.arid)
    this.cur = this.$route.params.cur
    if (!this.cur) {
      this.cur = 1
    }
    this.cur = Number(this.cur)
    this.getCommentByPage(this.one.arid, this.cur, this.pageSize)
    // console.log(`user userId : ${this.comment.userId}`)
  },
  methods: {
    getArticleById (data) {
      article.getArticleById(data).then(data => {
        this.one = data.data.data.one
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取文章评论留言列表
    getCommentByArticle (data) {
      comment.getCommentByArticle(data).then(data => {
        this.list = data.data.data.list
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取分页回复
    getCommentByPage (arid, cur, limit = 5) {
      comment.getCommentByPage(arid, cur, limit).then(data => {
        this.list = data.data.data.list
        this.total = data.data.data.total
        this.cur = Number(cur)
        console.log(`getCommentByPage === `, data.data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    //  转到获取评论回复
    showCommentReply (cid) {
      this.$router.push({name: 'userReplyList', params: {cid}})
    },
    // 评论留言
    addComment (data) {
      comment.addComment(data).then(data => {
        this.$router.push({name: 'refresh', params: {to: 'userArticleDetail', arid: this.one.arid}})
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除评论
    delComment (index, cid) {
      this.list.splice(index, 1)
      comment.delComment({cid})
    },
    // 关键字搜索
    handleKeySearch () {
      console.log(this.keyword)
    },
    // 处理 current-change事件
    handleCurrentChange (cur) {
      this.getCommentByPage(this.one.arid, cur, this.pageSize)
      // this.$router.push({name: 'refresh', params: {to: 'userArticleDetail', cur, arid: this.one.arid}})
      // this.$router.replace({name: 'userArticleDetail', params: {cur, arid: this.one.arid}})
      console.log('article comment current change ')
    }
  }
}
</script>
<style>
.title {
  text-align: center;
  font-style: italic;
  font-size: 30px;
}
.el-form-item_label {
  font-size: x-large;
}
.el-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
/* .el-table td.el-table__cell div {
  white-space: nowrap;
} */
.el-icon-chat-dot-round, .el-icon-circle-close{
  padding: 0;
}
.el-icon-chat-dot-round, .el-icon-circle-close::before {
  font-size: 25px;
}
.article-detail {
  height: 550px;
}
.article-main {
  height: 80%;
}
.article-main article {
  text-align: left;
}
</style>
