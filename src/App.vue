<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { request } from './lib/http';
import { useAuthStore } from './features/auth/auth.store';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const loadingMe = ref(true);

async function loadMe() {
  loadingMe.value = true;

  const [res, err] = await request({
    url: '/me',
  });

  if (err) {
    authStore.logout();
    router.push({ name: 'login' });
  } else {
    // authStore.
  }

  loadingMe.value = false;
}

router.beforeEach((to) => {
  if (to.meta.title) {
    const appName = import.meta.env.VITE_APP_NAME;

    document.title = `${appName} - ${to.meta.title}`;
  }
});

if (authStore.loggedIn) {
  loadMe();
} else {
  loadingMe.value = false;
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <div
      v-if="loadingMe"
      class="bg-white h-screen flex flex-col items-center justify-center gap-2 text-gray-900"
    >
      <Icon
        icon="tabler:loader"
        class="size-12 animate-spin"
      />
      <p>Getting things ready...</p>
    </div>
    <component
      :is="route.meta.layout || 'div'"
      v-else
    >
      <router-view />
    </component>
  </div>
</template>
