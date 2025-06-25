<script setup>
import { ref } from 'vue';

const value = defineModel();
const input = ref();

defineExpose({ input });
</script>

<template>
  <input
    ref="input"
    v-model="value"
    type="text"
    class="border border-gray-300 h-10 px-2.5 rounded-md appearance-none text-gray-900 focus:outline-blue-600"
  >
</template>
