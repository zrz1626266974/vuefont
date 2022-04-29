<template>
  <el-container style="height: 720px; border: 1px solid #eee" direction="vertical">
    <admin-header></admin-header>
    <el-container style="height: 90%;">
    <admin-aside></admin-aside>
    <admin-main></admin-main>
    </el-container>
  </el-container>
</template>

<script>
import AdminHeader from '@/components/admin/layout/AdminHeader'
import AdminAside from '@/components/admin/layout/AdminAside'
// import AdminMain from '@/components/layout/admin/AdminMain'
export default {
  name: 'AdminLayout',
  components: {
    AdminHeader,
    AdminAside,
    AdminMain: () => import('@/components/admin/layout/AdminMain')
  }
}
</script>

<style>
.adminlayout {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: aquamarine;
}
</style>
