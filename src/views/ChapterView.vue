<template>
  <div class="container mx-auto p-6">
    <!-- Title Area with Fixed Height -->
    <div class="h-16 flex items-center justify-center">
      <h1 class="text-3xl font-bold">Chapters</h1>
    </div>
    <ul v-if="chapters.length" class="space-y-2 list-none">
      <li v-for="chapter in chapters" :key="chapter.id">
        <router-link
          :to="`/chapters/${chapter.id}`"
          class="block p-4 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          {{ chapter.name }}
        </router-link>
      </li>
    </ul>
    <p v-else class="text-gray-500">Loading chapters...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getChapters } from "@/services/api"; // Import the getChapters function

const chapters = ref<{ id: string; name: string }[]>([]);

onMounted(async () => {
  try {
    chapters.value = await getChapters();
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }
});
</script>

<style scoped>
/* Add any specific styles you want for the Chapter page */
</style>