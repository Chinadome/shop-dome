<template>
    <div>
        home 页面
        <el-button type="info" plain @click="close()">退出</el-button>
    </div>
</template>
<script>
export default {
  methods: {
    close () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>
<style scoped>

</style>
