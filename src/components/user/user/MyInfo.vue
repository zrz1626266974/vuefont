<template>
  <el-container style="height: 500px; overflow: auto;">
    <el-main style="overflow: auto; height: 100%;">
      <el-form ref="one" :model="one">
        <el-form-item label="帐号">
          {{one.userId}}
        </el-form-item>
        <el-form-item label="姓名">
          {{one.userName}}
        </el-form-item>
        <el-form-item label="性别">
          {{one.sex}}
        </el-form-item>
        <el-form-item label="身份证号">
          {{one.identity}}
        </el-form-item>
        <el-form-item label="出生日期">
          {{one.birthday}}
        </el-form-item>
        <el-form-item label="我的邮箱">
          {{one.mail}}
        </el-form-item>
        <el-form-item label="我的积分">
          {{one.userPoint}}
        </el-form-item>
        <el-form-item label="正在审批的活动数">
          {{one.countSid1}}
        </el-form-item>
        <el-form-item label="审批通过的活动数">
          {{one.countSid2}}
        </el-form-item>
        <el-form-item label="审批未通过活动数">
          {{one.countSid3}}
        </el-form-item>
        <el-form-item label="已完成的活动数量">
          {{one.countSid4}}
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import user from '@/api/user'
import {getIdToken} from '@/util/auth'
export default {
  name: 'MyInfo',
  data () {
    return {
      one: {},
      userId: getIdToken()
    }
  },
  created () {
    this.getUserById(this.userId)
  },
  methods: {
    getUserById (userId) {
      user.getUserById(userId).then(data => {
        this.one = data.data.data.one
        console.log(data.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style>
.my-info {
  text-align: left;
}
.my-info div {
  border-bottom: 2px solid lightgray;
}
</style>
