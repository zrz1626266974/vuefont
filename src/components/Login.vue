<template>
  <el-container>
    <el-main>
    <el-form ref="form" :model="info" label-width="auto">
      <el-form-item label="用户帐号">
        <el-input v-model="info.id"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="info.psw" type="password">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userLogin">用户登录</el-button>
        <el-button @click="adminLogin">管理员登录</el-button>
        <el-button @click="userRegister">用户注册</el-button>
      </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</template>

<script>
// import request from '@/util/request'
// import {userlogin, adminlogin} from '@/api/login'
export default {
  name: 'Login',
  data () {
    return {
      info: {
        id: '',
        psw: '',
        type: 0
      }
    }
  },
  methods: {
    userLogin () {
      console.log(this.info.id)
      this.info.type = 1
      this.$store.dispatch('Login', this.info).then(data => {
        this.$router.push({name: 'userNoticeList'})
      }).catch(err => {
        console.log(err)
      })
    },
    adminLogin () {
      this.info.type = 0
      this.$store.dispatch('Login', this.info).then(data => {
        console.log(data.data)
        this.$router.push({name: 'noticeList'})
      }).catch(err => {
        console.log(err)
      })
    },
    // 用户注册
    userRegister () {
      this.$router.push({name: 'register'})
    }
  }
}
</script>

<style>

.login{
  position: relative;
  background-color: rgb(0, 204, 255);
}
.info {
  position: relative;
  margin-top: 20%;
  left: 40%;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  background-color: aqua;
}
</style>
