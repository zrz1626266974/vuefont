<template>
  <el-container>
    <el-main>
    <el-form ref="form" :model="one" label-width="auto">
      <el-form-item label="用户帐号">
        <el-input v-model="one.id"></el-input>
      </el-form-item>
      <el-form-item label="用户密码">
        <el-input v-model="one.psw" type="password">
        </el-input>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="one.userName">
        </el-input>
      </el-form-item>
      <el-form-item label="用户18位身份证号">
        <el-input v-model="one.identity">
        </el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio v-model="one.sex" label="false">女</el-radio>
        <el-radio v-model="one.sex" label="true">男</el-radio>
      </el-form-item>
      <el-form-item label="用户出生日期">
        <el-date-picker
          v-model="one.birthday"
          type="date"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">用户注册</el-button>
        <!-- <el-button @click="adminLogin">管理员注册</el-button> -->
      </el-form-item>
    </el-form>
    </el-main>
  </el-container>
</template>

<script>
import user from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      one: {
        id: '',
        psw: '',
        sex: true,
        identity: '',
        userName: '',
        birthday: ''
      }
    }
  },
  methods: {
    addUser () {
      // console.log(this.info.id)
      // this.info.type = 1
      user.addUser(this.one).then(data => {
        this.$router.push({name: 'login'})
      }).catch(err => {
        console.log(err)
      })
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
