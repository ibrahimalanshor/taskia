<script setup>
import BaseContainer from 'src/components/base/base-container.vue';
import BaseCard from 'src/components/base/base-card.vue';
import BaseButton from 'src/components/base/base-button.vue';
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
          <base-button
            color="white-bordered"
            fullwidth
            icon="tabler:brand-google-filled"
          >
            Login using Google
          </base-button>
        </div>
      </base-card>
    </div>
  </base-container>
</template>
