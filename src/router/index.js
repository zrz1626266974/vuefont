import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/Login')
      // component: () => import('@/components/user/layout/Layout'),
      // children: [
      //   {
      //     path: '',
      //     component: () => import('@/components/user/notice/NoticeList')
      //   }
      // ]
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/Register')
    },
    {
      path: '/admin',
      name: 'AdminLayout',
      component: () => import('@/components/admin/layout/AdminLayout'),
      children: [
      // {
      //   path: 'login',
      //   component: () => import('@/components/admin/Login')
      // },
      // ------------ 管理员公告页面 ----------------
        {
          path: 'notice/noticeList/:cur?',
          name: 'noticeList',
          component: () => import('@/components/admin/notice/NoticeList')
        },
        {
          path: 'notice/updateNotice',
          name: 'updateNotice',
          component: () => import('@/components/admin/notice/UpdateNotice')
        },
        {
          path: 'notice/addNotice',
          name: 'addNotice',
          component: () => import('@/components/admin/notice/AddNotice')
        },
        // ------------- 管理员活动页面 -------------------
        {
          path: 'activity/activityList',
          name: 'activityList',
          component: () => import('@/components/admin/activity/ActivityList')
        },
        {
          path: 'activity/updateActivity',
          name: 'updateActivity',
          component: () => import('@/components/admin/activity/UpdateActivity')
        },
        {
          path: 'activity/addActivity',
          name: 'addActivity',
          component: () => import('@/components/admin/activity/AddActivity')
        },
        // ------------相应活动的报名表--------------
        {
          path: 'reg/regList',
          name: 'regList',
          component: () => import('@/components/admin/registration/RegList')
        },
        // --------------- 管理员用户文章列表页面 ---------------------
        {
          path: 'article/articleList/:cur?',
          name: 'articleList',
          component: () => import('@/components/admin/article/ArticleList')
        },
        {
          path: 'article/articleDetail/:cur?',
          name: 'articleDetail',
          component: () => import('@/components/admin/article/ArticleDetail')
        },
        // ------------- 管理员的评论的回复页面 --------------
        {
          path: 'reply/replyList',
          name: 'replyList',
          component: () => import('@/components/admin/reply/ReplyList')
        },
        // ------------- 用户列表 ----------------
        {
          path: 'user/userList',
          name: 'userList',
          component: () => import('@/components/admin/user/UserList')
        }]
    },
    // -------------------用户相关组件页面-----------------------
    {
      path: '/user',
      name: 'Layout',
      component: () => import('@/components/user/layout/Layout'),
      children: [
        // 百度地图组件
        // {
        //   path: 'map',
        //   name: 'userMap',
        //   component: () => import('@/components/user/Map')
        // },
        // {
        //   path: 'login',
        //   name: 'userLogin',
        //   component: () => import('@/components/user/Login')
        // },
        // ------------公告列表页面-------------
        {
          path: 'notice/noticeList/:cur?',
          name: 'userNoticeList',
          component: () => import('@/components/user/notice/NoticeList')
        },
        {
          path: 'notice/noticeDetail',
          name: 'userNoticeDetail',
          component: () => import('@/components/user/notice/NoticeDetail')
        },
        // -------------活动列表页面---------------
        {
          path: 'activity/activityList/:cur?',
          name: 'userActivityList',
          component: () => import('@/components/user/activity/ActivityList')
        },
        // -----------活动详情页面------------------
        {
          path: 'activity/activityDetail',
          name: 'userActivityDetail',
          component: () => import('@/components/user/activity/ActivityDetail')
        },
        // ---------------文章列表页面（非用户本人）---------------------
        {
          path: 'article/articleList/:cur?',
          name: 'userArticleList',
          component: () => import('@/components/user/article/ArticleList')
        },
        {
          path: 'article/articleDetail/:cur?',
          name: 'userArticleDetail',
          component: () => import('@/components/user/article/ArticleDetail')
        },
        {
          path: 'user/myArticle/:cur?',
          name: 'myArticle',
          component: () => import('@/components/user/user/MyArticle')
        },
        // ------------ 用户已报名活动页面 -----------------
        {
          path: 'user/myReg/:cur?',
          name: 'myReg',
          component: () => import('@/components/user/user/MyReg')
        },
        {
          path: 'user/myInfo',
          name: 'myInfo',
          component: () => import('@/components/user/user/MyInfo')
        },
        // ------------- 评论的回复页面 --------------
        {
          path: 'reply/replyList',
          name: 'userReplyList',
          component: () => import('@/components/user/reply/ReplyList')
        },
        {
          path: 'article/addArticle',
          name: 'userAddArticle',
          component: () => import('@/components/user/article/AddArticle')
        },
        // ---------- 填写报名信息界面 -----------------
        {
          path: 'reg/addReg',
          name: 'userAddReg',
          component: () => import('@/components/user/registration/AddReg')
        },
        // ---------------用户排名界面----------------
        {
          path: 'user/userRank',
          name: 'userRank',
          component: () => import('@/components/user/user/UserRank')
        },
        // ---------------用户报名表修改界面 -------------------
        {
          path: 'reg/updateReg',
          name: 'userUpdateReg',
          component: () => import('@/components/user/registration/UpdateReg')
        }]
    },
    // ---------- 刷新页面 -----------------
    {
      path: 'refresh',
      name: 'refresh',
      component: () => import('@/components/admin/registration/Refresh')
    },
    {
      path: '/mapview',
      name: 'mapview',
      component: () => import('@/components/user/Map2')
    }
  ]
})
