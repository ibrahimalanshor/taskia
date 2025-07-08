import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false);

    function login() {
      loggedIn.value = true;
    }

    return {
      loggedIn,
      login,
    };
  },
  { persist: true },
);
