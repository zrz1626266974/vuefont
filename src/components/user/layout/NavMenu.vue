<template>
    <!-- <div class="menu-container"> -->
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect" router>
            <el-menu-item index="/user/notice/noticeList">公告中心</el-menu-item>
            <el-menu-item index="/user/activity/activityList">活动中心</el-menu-item>
            <el-menu-item index="/user/article/articleList">文章中心</el-menu-item>
            <!-- <el-menu-item index="/user/user">用户中心</el-menu-item> -->
            <el-submenu index="1">
            <template slot="title">用户中心</template>
            <el-menu-item index="/user/user/myInfo">我的信息</el-menu-item>
            <el-menu-item index="/user/user/myArticle">我的文章</el-menu-item>
            <el-menu-item index="/user/user/myReg">我的活动</el-menu-item>
            <el-menu-item index="/user/user/userRank">积分榜单</el-menu-item>
            </el-submenu>
        </el-menu>
    <!-- </div> -->
</template>
<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: '/user/notice/noticeList'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<style>
.menu-container {
    /* display: flex;
    justify-content: center; */
    position: relative;
    left: 0px;
    right: 0px;
    bottom: 0px;
}
</style>
