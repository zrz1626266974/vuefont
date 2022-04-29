<template>
  <el-form :model="one" status-icon :rules="rules" ref="one" label-width="150px">
    <el-form-item label="姓名" prop="userName">
      <el-input
        placeholder="请输入姓名"
        v-model="one.userName"
        disabled
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="身份证号码" prop="identity">
      <el-input
        placeholder="请输入18位身份证号码"
        maxlength="18"
        show-word-limit
        v-model="one.identity"
        disabled
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="手机号码" prop="userTel">
      <el-input
        placeholder="请输入11位手机号码"
        maxlength="11"
        show-word-limit
        v-model="one.userTel"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="专业" prop="major">
      <el-input
        placeholder="请输入专业"
        v-model="one.major"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="学历" prop="degree">
      <el-input
        placeholder="请输入学历"
        v-model="one.degree"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item label="个人简介" prop="introduction">
      <el-input
        type="textarea"
        placeholder="请输入个人简介：如个人所长，服务经历..."
        v-model="one.introduction"
        clearable>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()">提交</el-button>
      <el-button @click="resetForm()">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import reg from '@/api/registration'
import user from '@/api/user'
// import store from '@/store'
import {getIdToken} from '@/util/auth'
import validate from '@/util/validate'
export default {
  name: 'AddReg',
  data () {
    return {
      one: {
        userId: getIdToken(),
        userName: '',
        identity: '',
        userTel: '',
        major: '',
        degree: '',
        introduction: '',
        acid: null
      },
      rules: {
        identity: [
          {validator: validate.validateIdCard, trigger: 'blur'}
        ],
        userName: [
          {validator: validate.validateName, trigger: 'blur'}
        ],
        userTel: [
          {validator: validate.validateTel, trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    // 获取报名的相应活动的acid
    this.one.acid = this.$route.params.acid
    this.getUserById()
    console.log(this.acid)
  },
  methods: {
    // 获取用户个人信息
    getUserById () {
      user.getUserById(this.one.userId).then(data => {
        let one = data.data.data.one
        console.log(data.data.data.one)
        this.one.userName = one.userName
        this.one.identity = one.identity
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm () {
      this.$refs.one.validate((valid) => {
        if (valid) {
          reg.addReg(this.one).then(data => {
            this.$router.push({name: 'userActivityList'})
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.one.resetFields()
    }
  }
}
</script>
