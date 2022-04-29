<template>
  <!-- <el-container> -->
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
  <!-- <div class="admin-aside"> -->
    <el-menu :default-openeds="['1']" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>公告管理</template>
        <el-menu-item-group>
          <el-menu-item index="/admin/notice/noticeList">公告列表</el-menu-item>
          <el-menu-item index="/admin/notice/addNotice">公告发布</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>活动管理</template>
        <el-menu-item-group>
          <el-menu-item index="/admin/activity/activityList">活动列表</el-menu-item>
          <el-menu-item index="/admin/activity/addActivity">发布活动</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>文章浏览</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/admin/article/articleList">文章列表</el-menu-item>
          <!-- <el-menu-item index="3-1">文章列表</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>用户浏览</template>
        <el-menu-item-group>
          <!-- <template slot="title">分组一</template> -->
          <el-menu-item index="/admin/user/userList">用户列表</el-menu-item>
          <!-- <el-menu-item index="3-1">文章列表</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'AdminAside'
}
</script>
<style>
.el-aside {
  color: #333;
  overflow: auto;
}
</style>
