import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import CreateTaskPage from "../pages/tasks/create.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/tasks",
    name: "Home",
    component: CreateTaskPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
