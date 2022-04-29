<template>
  <el-container class="notice-container">
    <el-header style="border-bottom: 2px solid lightgray;">
      <h1>{{one.noticeTitle}}</h1>
    </el-header>
    <el-main class="notice-main" style="border-bottom: 2px solid lightgrey;">
      <div>{{one.noticeContent}}</div>
    </el-main>
    <el-footer class="notice-footer">
      <span style="float: left;">发布人员：{{one.id}}</span>
      <span style="float: right;">发布时间：{{one.noticeTime}}</span>
    </el-footer>
  </el-container>

</template>

<script>
import notice from '@/api/notice'
export default {
  name: 'NoticeDetail',
  data () {
    return {
      one: {
        nid: '',
        id: '',
        noticeTitle: '',
        noticeContent: ''
      }
    }
  },
  created () {
    this.one.nid = this.$route.params.nid
    this.getNoticeById(this.one.nid)
  },
  methods: {
    // 获取公告详情
    getNoticeById (nid) {
      notice.getNoticeById(nid).then(data => {
        this.one = data.data.data.one
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.notice-container {
  display: relative;
  text-align: left;
  border: 2px solid lightgray;
  height: 100%;
}
.notice-main {
  border-bottom: 2px solid lightgray;
}
.notice-footer {
  height: auto;
  background: lightblue;
}
</style>
