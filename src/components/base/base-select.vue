<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
});

const selected = defineModel();
</script>

<template>
  <div class="relative w-fit">
    <select
      v-model="selected"
      class="border border-gray-300 h-10 px-2.5 pr-10 rounded-md appearance-none text-gray-900 focus:outline-blue-600"
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
      class="size-4 absolute top-3 right-2.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  </div>
</template>
