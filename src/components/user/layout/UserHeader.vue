<template>
  <!-- <el-container direction="horizontal" width="100%"> -->
    <div>
  <el-header class="user-header" width="80%">
    <!-- user header -->
    <!-- <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">黄金糕</el-dropdown-item>
        <el-dropdown-item command="b">狮子头</el-dropdown-item>
        <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <!-- <el-button @click="onClick">登录/注册</el-button> -->
  </el-header>
</div>
<!-- </el-container> -->
</template>

<script>
export default {
  name: 'UserHeader',
  methods: {}
}
</script>

<style>
.user-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>
