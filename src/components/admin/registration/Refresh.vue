<template>
<div></div>
</template>
<script>
export default {
  name: 'Refresh',
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.data = this.$route.params
    this.redirect()
  },
  methods: {
    redirect () {
      this.$router.push({name: this.data.to, params: this.data})
    }
  }
}
</script>
