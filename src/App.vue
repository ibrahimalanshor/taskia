<script setup>
import BaseCard from './components/base/base-card.vue';
import BaseContainer from './components/base/base-container.vue';
import BaseHeading from './components/base/base-heading.vue';
import BaseButton from './components/base/base-button.vue';
import BaseInput from './components/base/base-input.vue';
import BaseSelect from './components/base/base-select.vue';

const tasks = [
  'Vue Component v-model',
  'v-model arguments Vue',
  'Linux setup scrcpy',
];
</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <base-container
      class="py-10 space-y-4"
      max-screen="lg"
    >
      <base-heading
        title="Task List"
        :level="3"
      />

      <base-card
        title="Add New Task"
        :striped="false"
      >
        <div class="flex gap-2">
          <base-input
            placeholder="Type task name"
            fullwidth
          />
          <base-button color="blue">
            Save
          </base-button>
        </div>
      </base-card>

      <base-card paddless>
        <div class="divide-y divide-gray-300">
          <div
            v-for="task in tasks"
            :key="task"
            class="p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900">
                  {{ task }}
                </p>
                <p class="text-sm text-gray-600">
                  22 Mei 2025
                </p>
              </div>
              <div class="flex gap-2">
                <base-select
                  size="sm"
                  :options="[{ id: null, name: 'Todo' }]"
                />
                <base-button
                  size="sm"
                  color="blue"
                >
                  Edit
                </base-button>
                <base-button
                  size="sm"
                  color="red"
                >
                  Delete
                </base-button>
              </div>
            </div>
          </div>
        </div>
      </base-card>
    </base-container>
  </div>
</template>
