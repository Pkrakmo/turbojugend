import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue"; // Updated to match the new naming convention
import ChapterView from "@/views/ChapterView.vue"; // Ensure this is the correct filename
import ChapterDetailView from "@/views/ChapterDetailView.vue";
import ProfileView from "@/views/ProfileView.vue"; // Updated to match the new naming convention
import { auth } from "@/firebase";

const isAuthenticated = () => !!auth.currentUser || localStorage.getItem("userToken");

const routes = [
  { path: "/", component: HomeView },
  { path: "/chapters", component: ChapterView }, // Route for the chapters list
  { path: "/chapters/:id", component: ChapterDetailView }, // Route for individual chapter details
  { 
    path: "/profile", 
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      if (!isAuthenticated()) {
        next("/login"); // Redirect if not logged in
      } else {
        next(); // Allow access
      }
    }
  },
  { path: "/login", component: () => import("@/views/LoginView.vue") } // Lazy-loaded login view
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;



