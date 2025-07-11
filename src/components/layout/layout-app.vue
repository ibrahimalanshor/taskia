<script setup>
import BaseContainer from 'src/components/base/base-container.vue';
import BaseNavbar from 'src/components/base/base-navbar.vue';
import BaseConfirm from 'src/components/base/base-confirm.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const visibleLogout = ref(false);

const menus = [
  { id: 'focus', name: 'Focus', to: { name: 'focus' } },
  { id: 'backlog', name: 'Backlog', to: { name: 'backlog' } },
];
</script>

<template>
  <base-navbar
    :container-props="{ maxScreen: 'lg' }"
    :menus="menus"
    :active-menu="route.name"
  >
    <template #end>
      <button
        class="cursor-pointer text-gray-900 hover:underline"
        @click="visibleLogout = true"
      >
        Sign Out
      </button>
    </template>
  </base-navbar>

  <base-container
    class="py-10 space-y-4"
    max-screen="lg"
  >
    <slot />
  </base-container>

  <base-confirm
    v-model:visible="visibleLogout"
    title="Are you sure you want to sign out?"
    message="Click confirm if you're sure you want to sign out."
    confirm-text="Sign Out"
  />
</template>
