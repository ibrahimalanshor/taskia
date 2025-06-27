<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
});

const selected = defineModel();

const size = computed(() => {
  return {
    sm: 'h-8 text-sm px-2 pr-10',
    md: 'h-10 px-2.5 pr-10',
    lg: 'h-12 text-lg px-4 pr-10',
  }[props.size || 'md'];
});
const chevronSize = computed(() => {
  return {
    sm: 'size-3 absolute top-2.5 right-2',
    md: 'size-4 absolute top-3 right-2.5',
    lg: 'size-4 absolute top-4 right-3',
  }[props.size || 'md'];
});
</script>

<template>
  <div class="relative w-fit">
    <select
      v-model="selected"
      :class="[
        'border border-gray-300 rounded-md appearance-none text-gray-900 focus:outline-blue-600',
        size,
      ]"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </select>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      :class="chevronSize"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </div>
</template>
