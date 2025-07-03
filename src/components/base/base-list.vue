<script setup>
import BaseCard from './base-card.vue';

defineProps({
  data: Array,
});
</script>

<template>
  <base-card paddless>
    <div class="divide-y divide-gray-300">
      <slot :classes="{ item: 'p-4' }">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          class="p-4"
        >
          <slot
            name="item"
            :index="index"
            :item="item"
          />
        </div>
      </slot>
    </div>
  </base-card>
</template>
