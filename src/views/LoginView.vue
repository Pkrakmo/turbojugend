<script setup lang="ts">
import { useRouter } from 'vue-router';
import { auth, provider, signInWithPopup } from '@/firebase';

const router = useRouter();

const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Save user info in localStorage (or Vuex/Pinia)
    localStorage.setItem("userToken", user.uid);
    localStorage.setItem("userName", user.displayName || "");
    
    // Redirect to profile
    router.push('/profile');
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <button @click="loginWithGoogle">Login with Google</button>
  </div>
</template>