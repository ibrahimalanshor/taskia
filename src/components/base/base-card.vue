<script setup>
defineProps({
  title: String,
  bordered: {
    type: Boolean,
    default: true,
  },
  shadow: Boolean,
  rounded: {
    type: Boolean,
    default: true,
  },
  striped: {
    type: Boolean,
    default: true,
  },
  paddless: Boolean,
});
</script>

<template>
  <div
    :class="[
      bordered ? 'border border-gray-300' : '',
      shadow ? 'shadow-md' : '',
      rounded ? 'rounded-md' : '',
      'bg-white',
    ]"
  >
    <div
      v-if="title"
      :class="[
        striped ? 'border-b border-gray-300 p-4' : 'px-4 pt-4',
        'flex items-center justify-between',
      ]"
    >
      <h2 class="text-xl font-bold">
        {{ title }}
      </h2>

      <slot name="action" />
    </div>
    <div :class="[paddless ? '' : 'p-4']">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="border-t border-gray-300 p-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>
