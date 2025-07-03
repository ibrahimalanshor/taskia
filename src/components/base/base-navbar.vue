<script setup>
import BaseContainer from './base-container.vue';

defineProps({
  containerProps: null,
});
</script>

<template>
  <nav
    class="h-14 bg-white border-b border-gray-300 text-gray-900 flex items-center lg:h-16"
  >
    <base-container
      class="flex items-center justify-between"
      v-bind="containerProps"
    >
      <slot name="start" />
      <slot name="end" />
    </base-container>
  </nav>
</template>
