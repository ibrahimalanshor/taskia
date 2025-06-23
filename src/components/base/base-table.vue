<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <table class="w-full">
    <thead>
      <tr>
        <th
          v-for="column in columns"
          :key="column.id"
          class="text-left text-gray-900 border border-gray-300 py-2 px-2.5"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in data"
        :key="item.id"
      >
        <td
          v-for="column in columns"
          :key="column.id"
          class="text-gray-900 border border-gray-300 py-2 px-2.5"
        >
          <component
            :is="column.render"
            v-if="column.render"
            :item="item"
            :index="index"
          />
          <template v-else-if="column.value">
            {{ column.value(item) }}
          </template>
          <template v-else>
            {{ item[column.id] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
