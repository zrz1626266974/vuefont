<template>
    <!-- <div class="layout"> -->
    <!-- <el-container style="height: 720px; border: 1px solid #eee" direction="vertical"></el-container>
      <el-container>
        <nav-menu /> -->
        <!-- <router-view /> -->
      <!-- </el-container> -->
    <!-- </div> -->
    <!-- </el-container> -->
  <el-container style="height: 720px; border: 1px solid #eee" direction="vertical">
    <!-- <admin-header></admin-header> -->
    <!-- <el-container style="height: 90%;">
    <admin-aside></admin-aside>
    <admin-main></admin-main>
    </el-container> -->
    <user-header />
    <nav-menu />
    <user-main />
  </el-container>
</template>

<script>
import NavMenu from '@/components/user/layout/NavMenu'
import UserMain from '@/components/user/layout/UserMain'
import UserHeader from '@/components/user/layout/UserHeader'
export default {
  name: 'Layout',
  components: {
    NavMenu,
    UserHeader,
    UserMain
  }
}
</script>

<style>
.layout {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: aquamarine;
}
</style>
