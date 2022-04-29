<template>
  <div class="my-info">
    <div>
    <el-tag>
      我的帐号
    </el-tag>
      {{one.id}}
    </div>
    <div>
      <el-tag>
        我的性别
      </el-tag>
      {{one.sex|isMan}}
    </div>
    <div>
      <el-tag>
        出生年月
      </el-tag>
      {{one.birthday|dateFormat}}
    </div>
    <div>
      <el-tag>
        我的积分
      </el-tag>
      {{one.point}}
    </div>
  </div>
</template>

<script>
import user from '@/api/user'
import {getIdToken} from '@/util/auth'
export default {
  name: 'MyInfo',
  data () {
    return {
      one: {},
      id: getIdToken()
    }
  },
  created () {
    this.getUserById(this.id)
  },
  methods: {
    getUserById (id) {
      user.getUserById(id).then(data => {
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
