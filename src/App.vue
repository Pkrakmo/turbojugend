<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const menuOpen = ref(false); // For responsive toggle
</script>

<template>
  <div class="flex min-h-screen">

    <aside
      class="bg-gray-800 text-white w-64 p-4 space-y-4 transition-transform duration-300"
      :class="{ '-translate-x-full': !menuOpen, 'md:translate-x-0': true }"
    >
      <h2 class="text-xl font-bold text-center">Navigation</h2>
      <nav class="space-y-2">
        <router-link
          to="/"
          class="block py-2 px-4 rounded-lg hover:bg-gray-700"
          :class="{ 'bg-gray-700': route.path === '/' }"
        >
          Home
        </router-link>
        <router-link
          to="/chapters"
          class="block py-2 px-4 rounded-lg hover:bg-gray-700"
          :class="{ 'bg-gray-700': route.path.startsWith('/chapters') }"
        >
          Chapters
        </router-link>
        <router-link
          to="/profile"
          class="block py-2 px-4 rounded-lg hover:bg-gray-700"
          :class="{ 'bg-gray-700': route.path === '/profile' }"
        >
          My Profile
        </router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1">
      <header class="bg-blue-600 text-white text-center py-4">
        <h1 class="text-2xl font-bold">Turbojugend Test Site</h1>
      </header>

      <main class="p-6">
        <keep-alive>
          <router-view />
        </keep-alive>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* For smooth sidebar animation */
@media (max-width: 768px) {
  aside {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    z-index: 10;
  }
  .-translate-x-full {
    transform: translateX(-100%);
  }
}
</style>
