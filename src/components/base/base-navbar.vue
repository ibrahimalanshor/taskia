<script setup>
import BaseContainer from './base-container.vue';

defineProps({
  containerProps: null,
  menus: Array,
  activeMenu: String,
});
</script>

<template>
  <nav
    class="h-14 bg-white border-b border-gray-300 text-gray-900 flex items-center lg:h-16"
  >
    <base-container
      class="flex items-center justify-between"
      v-bind="containerProps"
    >
      <slot name="start">
        <div class="flex items-center gap-4">
          <router-link
            v-for="menu in menus"
            :key="menu.id"
            :to="menu.to"
            :class="[
              'relative',
              activeMenu === menu.id
                ? 'font-bold text-blue-600'
                : 'text-gray-900 hover:text-blue-600',
            ]"
          >
            {{ menu.name }}
          </router-link>
        </div>
      </slot>
      <slot name="end" />
    </base-container>
  </nav>
</template>
