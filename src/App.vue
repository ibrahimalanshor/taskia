<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

router.beforeEach((to) => {
  if (to.meta.title) {
    const appName = import.meta.env.VITE_APP_NAME;

    document.title = `${appName} - ${to.meta.title}`;
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <router-view />
  </div>
</template>
