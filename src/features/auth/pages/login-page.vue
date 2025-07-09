<script setup>
import BaseContainer from 'src/components/base/base-container.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import { googleAuthCodeLogin } from 'vue3-google-login';
import { reactive, ref } from 'vue';
import { request } from 'src/lib/http';
import { useAuthStore } from 'src/features/auth/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const loadingGoogleLogin = ref(false);
const error = reactive({
  visible: false,
  message: null,
});

async function onGoogleLogin() {
  loadingGoogleLogin.value = true;

  const googleInfo = await googleAuthCodeLogin();
  const [res, err] = await request({
    url: '/login/google',
    method: 'post',
    data: {
      code: googleInfo.code,
    },
  });

  if (err) {
    error.visible = true;
    error.message = err;
  } else {
    authStore.login(res.accessToken);

    router.push({ name: 'home' });
  }

  loadingGoogleLogin.value = false;
}
</script>

<template>
  <base-container max-screen="sm">
    <div class="h-screen flex flex-col justify-center">
      <base-card
        title="Login"
        :striped="false"
      >
        <div class="space-y-4">
          <p class="text-gray-900">
            Welcome! Log in with your social account to begin. It's quick and
            easy.
          </p>
          <base-alert
            v-if="error.visible"
            with-close
            color="red"
            @close="error.visible = false"
          >
            {{ error.message }}
          </base-alert>
          <base-button
            color="white-bordered"
            fullwidth
            icon="tabler:brand-google-filled"
            :loading="loadingGoogleLogin"
            @click="onGoogleLogin"
          >
            Login using Google
          </base-button>
        </div>
      </base-card>
    </div>
  </base-container>
</template>
