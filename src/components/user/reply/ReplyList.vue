<template>
  <el-container class="article-detail" direction="vertical">
    <!-- <el-header class="title">{{one.title}}</el-header> -->
    <el-main class="comment-container">
      <span>{{comment.userId}}</span>
      <hr/>
      <div>{{comment.commentContent}}</div>
    </el-main>
    <el-container >
        <el-input
          v-model="one.replyContent"
          placeholder="留言回复"></el-input>
        <el-button
          style="padding: 0;"
          @click="handleReply">回复评论</el-button>
    </el-container>
    <el-container style="height: 390px;overflow: auto;" direction="vertical">
      <ul v-infinite-scroll="load" style="overflow: auto; height: 90%; text-align: left;" infinite-scroll-disabled="disabled">
        <li v-for="(i, index) in list" :key="index">
          <!-- <div>{{i.userId}}</div> -->
          <h1>{{i.userId}}</h1>
          <div style="display: inline-block; width: 90%;">
            {{i.replyContent}}
          </div>
          <el-button
            v-if="i.userId === userId"
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
    </el-container>
  </el-container>
</template>

<script>
import reply from '@/api/reply'
import comment from '@/api/comment'
import {getIdToken} from '@/util/auth'
export default {
  name: 'ReplyList',
  data () {
    return {
      list: [],
      comment: {},
      cid: null,
      userId: getIdToken(),
      count: 0,
      one: {
        userId: getIdToken(),
        cid: null,
        commentContent: ''
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
    // this.cur = this.$route.params
    this.getComment(this.cid)
    this.getReplyList(this.cid, this.cur, this.limit)
  },
  methods: {
    load () {
      // this.list = ['a', 'b']
      this.loading = true
      setTimeout(() => {
        this.cur += 1
        // this.loading = false
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
    },
    // 回复评论
    handleReply () {
      reply.addReply(this.one).then(data => {
        this.$router.push({name: 'refresh', params: {to: 'userReplyList', cid: this.cid}})
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除回复
    handleDel (replyId) {
      reply.delReply({replyId}).then(data => {
        this.$router.push({name: 'refresh', params: {to: 'userReplyList', cid: this.cid}})
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
