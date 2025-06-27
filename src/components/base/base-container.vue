<script setup>
import { computed } from 'vue';

const props = defineProps({
  maxScreen: String,
});

const containerClass = computed(() => {
  if (!props.maxScreen) {
    return '';
  }

  if (props.maxScreen === 'sm') {
    return 'md:max-w-screen-sm lg:max-w-screen-sm xl:max-w-screen-sm 2xl:max-w-screen-sm';
  }

  if (props.maxScreen === 'md') {
    return 'lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md';
  }

  return 'xl:max-w-screen-lg 2xl:max-w-screen-lg';
});
</script>

<template>
  <div :class="['container mx-auto px-4 sm:px-6 lg:px-8', containerClass]">
    <slot />
  </div>
</template>
