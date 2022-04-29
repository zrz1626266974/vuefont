<template>
  <el-table
    :data="list"
    height="100%"
    style="width: 100%">
    <el-table-column
      prop="id"
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
    <!-- <el-table-column
      label="用户出生日期"
      width="auto">
      <template slot-scope="scope">
        {{scope.row.birthday|dateFormat}}
      </template>
    </el-table-column> -->
    <el-table-column
      prop="userPoint"
      label="用户积分"
      width="200">
    </el-table-column>
    <!-- <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" >修改</el-button>
        <el-button type="text" size="small" >删除</el-button>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import user from '@/api/user'
export default {
  name: 'UserList',
  data () {
    return {
      list: [],
      msg: ''
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList () {
      user.getUserList().then(data => {
        this.msg = data.data
        this.list = data.data.data.list
        console.log(this.list)
      }).catch(err => {
        this.msg = err
      })
    }
  }
}
</script>
