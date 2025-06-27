<script setup>
import BaseCard from './components/base/base-card.vue';
import BaseContainer from './components/base/base-container.vue';
import BaseHeading from './components/base/base-heading.vue';
import BaseButton from './components/base/base-button.vue';
import BaseInput from './components/base/base-input.vue';
import BaseSelect from './components/base/base-select.vue';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';

const newTaskFrom = reactive({
  name: null,
  dueDate: null,
});

const tasks = ref([
  { id: 1, name: 'Belajar JavaScript', dueDate: '2025-07-01', status: 'todo' },
  {
    id: 2,
    name: 'Baca dokumentasi Vue',
    dueDate: '2025-07-02',
    status: 'inprogress',
  },
  {
    id: 3,
    name: 'Push project ke GitHub',
    dueDate: '2025-07-03',
    status: 'done',
  },
  {
    id: 4,
    name: 'Desain UI halaman login',
    dueDate: '2025-07-04',
    status: 'todo',
  },
  {
    id: 5,
    name: 'Implementasi API login',
    dueDate: '2025-07-05',
    status: 'inprogress',
  },
  { id: 6, name: 'Testing login form', dueDate: '2025-07-06', status: 'todo' },
  { id: 7, name: 'Deploy ke staging', dueDate: '2025-07-07', status: 'done' },
  {
    id: 8,
    name: 'Fix bug validasi form',
    dueDate: '2025-07-08',
    status: 'inprogress',
  },
  {
    id: 9,
    name: 'Update dokumentasi project',
    dueDate: '2025-07-09',
    status: 'done',
  },
  {
    id: 10,
    name: 'Meeting review sprint',
    dueDate: '2025-07-10',
    status: 'todo',
  },
]);

function onSaveNewTask() {
  tasks.value.push({
    id: tasks.value.length,
    name: newTaskFrom.name,
    dueDate: newTaskFrom.dueDate,
    status: 'todo',
  });

  newTaskFrom.name = null;
  newTaskFrom.dueDate = null;
}
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
        <form
          class="flex gap-2"
          @submit.prevent="onSaveNewTask"
        >
          <base-input
            v-model="newTaskFrom.name"
            type="text"
            placeholder="Type task name"
            fullwidth
          />
          <base-input
            v-model="newTaskFrom.dueDate"
            type="date"
            fullwidth
          />
          <base-button
            type="submit"
            color="blue"
            :disabled="!newTaskFrom.name || !newTaskFrom.dueDate"
          >
            Save
          </base-button>
        </form>
      </base-card>

      <base-card paddless>
        <div class="divide-y divide-gray-300">
          <div
            v-for="(task, index) in tasks"
            :key="task.id"
            class="p-4"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-900">
                  {{ task.name }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ dayjs(task.dueDate).format('DD MMMM YYYY') }}
                </p>
              </div>
              <div class="flex gap-2">
                <base-select
                  v-model="tasks[index].status"
                  size="sm"
                  :options="[
                    { id: 'todo', name: 'Todo' },
                    { id: 'inprogress', name: 'In Progress' },
                    { id: 'done', name: 'Done' },
                  ]"
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
