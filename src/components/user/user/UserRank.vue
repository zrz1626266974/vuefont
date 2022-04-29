<template>
  <el-table
    :data="list"
    height="100%"
    style="width: 100%">
    <el-table-column
      prop="userId"
      label="用户帐号"
      width="180">
    </el-table-column>
    <el-table-column
      label="用户性别"
      width="200">
      <template slot-scope="scope">
        {{scope.row.sex|isMan}}
      </template>
    </el-table-column>
    <el-table-column
      prop="age"
      label="用户年龄"
      width="200">
    </el-table-column>
    <el-table-column
      prop="userPoint"
      label="用户积分"
      width="200">
    </el-table-column>
    <el-table-column
      prop="countSid4"
      label="用户完成活动数"
      width="200">
    </el-table-column>
    <el-table-column
      prop="countArid"
      label="用户发布文章数"
      width="200">
    </el-table-column>
  </el-table>
</template>

<script>
import user from '@/api/user'
export default {
  name: 'UserRank',
  data () {
    return {
      list: [],
      msg: ''
    }
  },
  created () {
    this.userRank()
  },
  methods: {
    userRank () {
      user.userRank().then(data => {
        // this.msg = data.data
        this.list = data.data.data.list
        console.log(this.list)
      }).catch(err => {
        // this.msg = err
        console.log(err)
      })
    }
  }
}
</script>
