<template>
  <!-- 头部导航 -->
  <Header></Header>
  <div class="container">
    <!-- 侧边栏 -->
    <Aside></Aside>
    <!-- 内容区 -->
    <router-view class="main-view"></router-view>
  </div>
</template>
<script setup lang="ts">
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
</script>


<style scoped>
.container {
  display: flex;
  width: 100%;
  margin: 0 auto;
  height: calc(100% - 70px);
}


.container .main-view {
  flex: 1;
  margin: 18px;
  border-radius: 12px;
}
</style>
