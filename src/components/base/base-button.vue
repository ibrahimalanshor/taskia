<script setup>
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: String,
    default: 'gray',
    validator: (value) =>
      ['gray', 'blue', 'white', 'yellow', 'green', 'red'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

const color = computed(() => {
  return {
    gray: 'bg-gray-100 text-gray-900 border border-gray-200 hover:bg-gray-200 hover:border-gray-300',
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    white: 'bg-white text-gray-900 hover:bg-gray-50',
    yellow: 'bg-yellow-600 text-white hover:bg-yellow-700',
    green: 'bg-green-600 text-white hover:bg-green-700',
    red: 'bg-red-600 text-white hover:bg-red-700',
  }[props.color || 'gray'];
});
const size = computed(() => {
  return {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 px-4',
    lg: 'h-12 text-lg px-5',
  }[props.size || 'md'];
});
</script>

<template>
  <button
    type="button"
    :class="[
      color,
      size,
      'rounded-md font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    ]"
  >
    <slot />
  </button>
</template>
