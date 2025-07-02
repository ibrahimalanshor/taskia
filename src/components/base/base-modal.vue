<script setup>
import BaseContainer from './base-container.vue';
import BaseCard from './base-card.vue';

defineProps({
  withContainer: {
    type: Boolean,
    default: true,
  },
  classes: {
    type: Object,
    default: () => ({
      container: '',
    }),
  },
  cardProps: null,
});

const visible = defineModel('visible');
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 bg-black/30 py-20"
  >
    <component
      :is="withContainer ? BaseContainer : 'div'"
      :class="classes.container"
    >
      <base-card
        :bordered="false"
        v-bind="cardProps"
      >
        <slot />
      </base-card>
    </component>
  </div>
</template>
