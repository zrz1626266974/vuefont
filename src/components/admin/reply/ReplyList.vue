<template>
  <el-container style="height: 100%;" direction="vertical">
    <!-- <el-header class="title">{{one.title}}</el-header> -->
    <el-main class="comment-container">
      <span>{{comment.id}}</span>
      <hr/>
      <div>{{comment.content}}</div>
    </el-main>
    <el-main style="height: 200px;overflow: auto;" direction="vertical">
      <ul v-infinite-scroll="load" style="height: auto; overflow: auto; text-align: left;" infinite-scroll-disabled="disabled">
        <li v-for="(i, index) in list" :key="index">
          <!-- <div>{{i.id}}</div> -->
          <h1>{{i.id}}</h1>
          <div style="display: inline-block; width: 90%;">
            {{i.content}}
          </div>
          <el-button
            v-if="i.id === id"
            type="text"
            size="small"
            style="float: right;"
            class="el-icon-circle-close"
            @click="handleDel(i.replyId)"></el-button>
          <hr/>
        </li>
      </ul>
      <p v-if="loading" style="margin-top:10px;" class="loading">
        <span>加载中...</span>
      </p>
      <p v-if="noMore" style="margin-top:10px;font-size:13px;">没有更多了</p>
    </el-main>
  </el-container>
</template>

<script>
import reply from '@/api/reply'
import comment from '@/api/comment'
import {getToken} from '@/util/auth'
export default {
  name: 'ReplyList',
  data () {
    return {
      list: [],
      comment: {},
      cid: null,
      id: getToken(),
      count: 0,
      one: {
        id: getToken(),
        cid: null,
        content: ''
      },
      cur: 1,
      total: 1,
      limit: 5,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.cur > Math.ceil(this.total / this.limit)
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  created () {
    this.cid = this.$route.params.cid
    this.one.cid = this.$route.params.cid
    this.getComment(this.cid)
    this.getReplyList(this.cid, this.cur, this.limit)
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.cur += 1
        this.getReplyList(this.cid, this.cur, this.limit)
      }, 2000)
    },
    // 获取评论的回复列表
    getReplyList (cid, cur = 1, limit = 5) {
      reply.getReplyByComment({cid}, cur, limit).then(data => {
        this.list = this.list.concat(data.data.data.list)
        this.total = Number(data.data.data.total)
        this.loading = false
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取具体评论留言
    getComment (cid) {
      comment.getCommentById(cid).then(data => {
        this.comment = data.data.data.one
        console.log(data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.comment-container {
  /* width: 90%; */
  height: 150px;
  text-align: left;
}
</style>
