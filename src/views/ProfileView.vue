<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { auth, signOut } from '@/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';
import { getChapters, getUsersChapters } from '@/services/api'; // Import API functions

const router = useRouter();
const userId = ref<string | null>(null);
const userName = ref<string | null>(null);
const userChapters = ref<Array<{ chapterName: string; chapterRank: string; warriorName: string }>>([]);

// Fetch user chapters based on userId
const fetchUserChapters = async (id: string) => {
  try {
    const usersChapters = await getUsersChapters(); // Fetch usersChapters from API
    const chapters = await getChapters(); // Fetch chapters from API

    const userChaptersData = usersChapters.filter((uc: any) => uc.user_id === id);

    userChapters.value = userChaptersData.map((uc: any) => {
      const chapter = chapters.find((ch: any) => ch.id === uc.chapter_id);
      return {
        chapterName: chapter?.name || 'Unknown Chapter',
        chapterRank: uc.chapter_rank,
        warriorName: uc.warriorName, // Include warriorName
      };
    });
  } catch (error) {
    console.error("Error fetching user chapters:", error);
  }
};

// Get user info when the component mounts
onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userId.value = user.uid;
      userName.value = user.displayName;
      await fetchUserChapters(user.uid); // Fetch chapters for the logged-in user
    } else {
      router.push('/login'); // Redirect if not logged in
    }
  });
});

// Logout function
const logout = async () => {
  await signOut(auth);
  router.push('/login'); // Redirect to login
};
</script>

<template>
  <div>
    <h1> Welcome {{ userName }} </h1>
    <p v-if="userId">Your User ID: {{ userId }}</p>
    <div v-if="userChapters.length">
      <h2>Your Chapters:</h2>
      <ul class="space-y-2 list-none">
        <li v-for="(chapter, index) in userChapters" :key="index">
          {{ "Turbojugend " + chapter.chapterName }} - {{ chapter.chapterRank }} ({{ chapter.warriorName }})
        </li>
      </ul>
    </div>
    <button @click="logout">Logout</button>
  </div>
</template>