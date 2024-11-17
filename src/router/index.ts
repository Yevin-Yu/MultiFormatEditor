// src/router/index.ts
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
const JsonPage = () => import('../views/json.vue');
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: JsonPage
  },
  {
    path: '/json',
    name: 'json',
    component: JsonPage
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用哈希模式
  routes
});

export default router;
