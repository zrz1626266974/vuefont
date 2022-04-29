<template>
  <el-form ref="form" :model="one" label-width="80px">
    <el-form-item label="公告标题">
      <!-- <el-input v-model="form.name"></el-input> -->
      <el-input
        placeholder="请输入公告标题"
        v-model="one.noticeTitle"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="公告内容">
      <el-input
        placeholder="请输入公告内容"
        v-model="one.noticeContent"
        type="textarea"
        :autosize="{minRows:3}"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import notice from '@/api/notice'
// import store from '@/store'
import {getToken} from '@/util/auth'
export default {
  name: 'AddNotice',
  data () {
    return {
      one: {
        id: getToken()
      }
    }
  },
  methods: {
    onSubmit () {
      // console.log(this.one)
      // console.log(this.$store.getters.id)
      // console.log(store.getters.id)
      notice.addNotice(this.one).then(data => {
        this.$router.push({name: 'noticeList'})
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
