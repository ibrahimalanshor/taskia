import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const loggedIn = ref(false);
    const accessToken = ref('null');

    function login(token) {
      loggedIn.value = true;
      accessToken.value = token;
    }
    function logout() {
      loggedIn.value = false;
      accessToken.value = null;
    }

    return {
      accessToken,
      loggedIn,
      login,
      logout,
    };
  },
  { persist: true },
);
