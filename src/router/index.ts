import { createRouter, createWebHistory } from "vue-router";
import type { NavigationGuardNext } from "vue-router";
import HomeView from "@/views/HomeView.vue"; 
import ChapterView from "@/views/ChapterView.vue"; 
import ChapterDetailView from "@/views/ChapterDetailView.vue";
import ProfileView from "@/views/ProfileView.vue"; 
import { auth } from "@/firebase";
import ApplicationView from "@/views/ApplicationView.vue";

const isAuthenticated = (): boolean => !!auth.currentUser || localStorage.getItem("userToken") !== null;

const routes = [
  { path: "/", component: HomeView },
  { path: "/application", component: ApplicationView },
  { path: "/chapters", component: ChapterView }, 
  { path: "/chapters/:id", component: ChapterDetailView },
  { 
    path: "/profile", 
    component: ProfileView,
    beforeEnter: (_: unknown, __: unknown, next: NavigationGuardNext) => {
      if (!isAuthenticated()) {
        next("/login"); 
      } else {
        next(); 
      }
    }
  },
  { path: "/login", component: () => import("@/views/LoginView.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;