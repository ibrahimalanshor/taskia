<script setup>
import BaseCard from './base-card.vue';

defineProps({
  data: Array,
});

const classes = {
  item: 'p-4',
};
</script>

<template>
  <base-card paddless>
    <div class="divide-y divide-gray-300">
      <slot
        name="header"
        :classes="{ item: classes.item }"
      />
      <slot :classes="{ item: classes.item }">
        <div
          v-for="(item, index) in data"
          :key="item.id"
          :class="classes.item"
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
