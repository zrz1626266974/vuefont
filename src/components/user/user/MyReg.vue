<template>
  <el-container style="width:100%; height:100%;">
  <el-table
    :data="list"
    height="100%"
    style="width: 100%">
    <!-- 展开开始 -->
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="姓名">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>{{ props.row.identity }}</span>
          </el-form-item>
          <el-form-item label="专业">
            <span>{{ props.row.major }}</span>
          </el-form-item>
          <el-form-item label="学历">
            <span>{{ props.row.degree }}</span>
          </el-form-item>
          <el-form-item label="报名时间">
            <span>{{ props.row.regTime|dateFormat }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.description }}</span>
          </el-form-item>
          <el-form-item label="简介">
            <span>{{ props.row.introduction }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!-- 展开结束 -->
    <el-table-column
      prop="activityName"
      label="活动名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="活动状态"
      width="180">
    </el-table-column>
    <el-table-column
      label="报名时间"
      width="auto">
      <template slot-scope="scope">
        {{scope.row.regTime|dateFormat}}
      </template>
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="250">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="keyword"
          size="mini"
          prefix-icon="el-icon-search"
          placeholder="输入关键字搜索">
          <template slot="append">
            <el-button
              @click="handleKeySearch">
              搜索
            </el-button>
          </template>
        </el-input>
      </template>
      <template slot-scope="scope" v-if="scope.row.sid == 1">
        <el-button
          size="small"
          @click="handleEdit(scope.row.userId, scope.row.acid)"
          >编辑</el-button>
        <el-button
          size="small"
          @click="handleDelete(scope.$index, scope.row.userId, scope.row.acid)"
          >取消报名</el-button>
        <!-- <el-button size="small" @click="updateReg({sid: 3,rid: scope.row.rid})">报名不通过</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <el-footer>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="cur"
      @current-change="handleCurrentChange">
    </el-pagination>
  </el-footer>
</el-container>
</template>
<script>
import reg from '@/api/registration'
import {getIdToken} from '@/util/auth'
export default {
  name: 'MyReg',
  data () {
    return {
      list: [],
      one: {
        userId: getIdToken()
      },
      keyword: '',
      total: null,
      pageSize: 5,
      cur: 1
    }
  },
  created () {
    // this.getMyRegList(this.user)
    this.cur = this.$route.params.cur
    this.keyword = this.$route.params.keyword
    if (!this.cur) {
      this.cur = 1
    } else {
      this.cur = Number(this.cur)
    }
    this.getUserRegByPage(this.one, this.cur, this.pageSize, this.keyword)
  },
  methods: {
    // 分页获取用户报名表
    getUserRegByPage (data, cur, limit = 5, keyword = '') {
      reg.getUserRegByPage(data, cur, limit, keyword).then(data => {
        this.total = data.data.data.total
        this.list = data.data.data.list
        this.cur = Number(cur)
      }).catch(err => {
        console.log(err)
      })
    },
    getMyRegList (data) {
      console.log(`data = ${data}`)
      reg.getRegByUser(data).then(data => {
        this.list = data.data.data.list
        console.log(data.data.data)
      }).catch(err => {
        console.log(err)
      })
    },
    //  ----- 重新编辑报名表信息 -----------
    handleEdit (userId, acid) {
      // -- todo --
      this.$router.push({name: 'userUpdateReg', params: {userId, acid}})
    },
    // ------- 删除报名表 --------------
    handleDelete (index, userId, acid) {
      reg.delReg({userId, acid}).then(data => {
        // this.list.splice(index, 1)
        this.$router.push({name: 'refresh', params: {to: 'myReg'}})
        console.log(`myReg handleDelet `, data)
      }).catch(err => {
        console.log(err)
      })
    },
    // 关键字搜索
    handleKeySearch () {
      this.getUserRegByPage(this.one, 1, this.pageSize, this.keyword)
    },
    // 页面的current-change改变事件触发
    handleCurrentChange (cur) {
      console.log('current change == ', cur)
      // this.$router.push({name: 'refresh', params: {to: 'myReg', cur}})
      this.getUserRegByPage(this.one, cur, this.pageSize, this.keyword)
    }
  }
}
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 150px;
  color: #99a9bf;
  border-right: 1px solid gainsboro;
  margin-right: 5px;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
