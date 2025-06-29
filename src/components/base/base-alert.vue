<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import BaseSpinner from './base-spinner.vue';

const props = defineProps({
  color: {
    type: String,
    default: 'blue',
  },
  loading: Boolean,
});

const color = computed(() => {
  return {
    blue: 'bg-blue-100 border-blue-300 text-blue-500',
    red: 'bg-red-100 border-red-300 text-red-500',
    yellow: 'bg-yellow-100 border-yellow-300 text-yellow-500',
    green: 'bg-green-100 border-green-300 text-green-500',
    gray: 'bg-gray-100 border-gray-300 text-gray-500',
  }[props.color || 'blue'];
});
const icon = computed(() => {
  return {
    blue: 'tabler:info-circle-filled',
    red: 'tabler:alert-circle-filled',
    yellow: 'tabler:alert-circle-filled',
    green: 'tabler:check-circle-filled',
    gray: 'tabler:info-circle-filled',
  }[props.color || 'blue'];
});
</script>

<template>
  <div :class="['p-4 rounded-md border flex items-center gap-2', color]">
    <base-spinner
      v-if="loading"
      :color="props.color"
    />
    <Icon
      v-else
      :icon="icon"
      class="size-4"
    />
    <slot />
  </div>
</template>
