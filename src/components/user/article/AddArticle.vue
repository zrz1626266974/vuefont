<template>
  <el-form
    :model="one">
    <el-form-item label="文章标题">
      <el-input
        v-model="one.articleTitle"
        placeholder="请输入文章标题">
      </el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input
        v-model="one.articleContent"
        type="textarea"
        placeholder="请输入文章内容"
        :autosize="{minRows:15}">
      </el-input>
    </el-form-item>
    <el-form-item>
      <div style="text-align:center">
        <el-button @click="addArticle">发布</el-button>
        <el-button>取消</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script>
import article from '@/api/article'
import {getIdToken} from '@/util/auth'
export default {
  name: 'AddArticle',
  data () {
    return {
      one: {
        userId: getIdToken(),
        articleTitle: '',
        articleContent: ''
      }
    }
  },
  methods: {
    addArticle () {
      article.addArticle(this.one).then(data => {
        this.$router.push({name: 'refresh', params: {to: 'myArticle'}})
      })
    }
  }
}
</script>
