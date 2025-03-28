<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getChapters } from "../services/api";

// State variables
const chapters = ref<{ id: string; name: string }[]>([]);
const warriorName = ref("");
const isLoggedIn = ref(false); // Login status
const selectedChapter = ref("");

// Check if the user is logged in
onMounted(async () => {
  const userToken = localStorage.getItem("userToken");
  isLoggedIn.value = !!userToken; // Set to true if userToken exists

  if (isLoggedIn.value) {
    try {
      chapters.value = await getChapters(); // Fetch chapters only if logged in
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  }
});

// Handle form submission
const apply = () => {
  if (!warriorName.value) {
    alert("Please enter your Warrior Name.");
    return;
  }
  if (!selectedChapter.value) {
    alert("Please select a chapter.");
    return;
  }
  alert(`Application submitted for ${warriorName.value} in chapter ${selectedChapter.value}`);
};
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Application Form</h1>

    <!-- Show form only if the user is logged in -->
    <div v-if="isLoggedIn">
      <form @submit.prevent="apply" class="space-y-4">
        <!-- Dropdown for chapters -->
        <div>
          <label for="chapter" class="block text-sm font-medium text-gray-700">Select Chapter</label>
          <select
            id="chapter"
            v-model="selectedChapter"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a chapter</option>
            <option v-for="chapter in chapters" :key="chapter.id" :value="chapter.id">
              {{ chapter.name }}
            </option>
          </select>
        </div>

        <!-- Textbox for Warrior Name -->
        <div>
          <label for="warriorName" class="block text-sm font-medium text-gray-700">Warrior Name</label>
          <input
            id="warriorName"
            v-model="warriorName"
            type="text"
            placeholder="Enter your Warrior Name"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <!-- Apply Button -->
        <div>
          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </form>
    </div>

    <!-- Message for users who are not logged in -->
    <div v-else>
      <p class="text-gray-500">Please log in to access the application form.</p>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here if needed */
</style>