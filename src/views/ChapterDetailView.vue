<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getChapters, getUsersChapters } from "@/services/api"; // Import API functions

const route = useRoute();
const router = useRouter();
const chapter = ref(null);
const isLoading = ref(true);
const members = ref([]); // Store members for the chapter

onMounted(async () => {
  try {
    console.log("Route params ID:", route.params.id);

    // Fetch chapters from the API
    const chapters = await getChapters();
    console.log("Fetched chapters in detail view:", chapters);

    const chapterId = route.params.id;
    chapter.value = chapters.find(g => String(g.id) === chapterId);

    if (!chapter.value) {
      console.error(`Chapter with ID ${chapterId} not found.`);
    } else {
      console.log("Selected chapter:", chapter.value);

      // Fetch usersChapters from the API
      const usersChapters = await getUsersChapters();
      console.log("Fetched usersChapters:", usersChapters);

      // Filter members for the current chapter and include warriorName and chapter_rank
      members.value = usersChapters
        .filter(uc => uc.chapter_id === chapterId)
        .map(uc => ({
          warriorName: uc.warriorName,
          chapterRank: uc.chapter_rank,
        }));
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false; // Set loading to false after data is fetched
  }
});

// Computed property to sort members by warriorName
const sortedMembers = computed(() => {
  return members.value.slice().sort((a, b) => a.warriorName.localeCompare(b.warriorName));
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
    <!-- Only show the transition when data is loaded -->
    <transition name="fade">
      <div v-if="!isLoading" class="w-full max-w-2xl">
        <!-- Title Area with Fixed Height -->
        <div class="h-16 flex items-center justify-center">
          <h1 class="text-3xl font-bold">{{ chapter?.name || "Chapter Details" }}</h1>
        </div>
        <h2 class="text-xl font-semibold mb-4">Members:</h2>
        <ul v-if="sortedMembers.length > 0" class="list-none space-y-2">
          <li
            v-for="member in sortedMembers"
            :key="member.warriorName"
            class="bg-white shadow p-2 rounded-lg text-left" 
          >
            {{ member.warriorName }} - {{ member.chapterRank }}
          </li>
        </ul>
        <p v-else class="text-gray-500">No members are in this chapter.</p>
        <!-- Back to Chapters Button -->
        <button
          @click="router.back()"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Chapters
        </button>
      </div>
    </transition>
  </div>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>