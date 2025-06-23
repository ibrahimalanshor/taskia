<script setup>
import BaseContainer from './components/base/base-container.vue';
import BaseHeading from './components/base/base-heading.vue';
import BaseButton from './components/base/base-button.vue';
import BaseTable from './components/base/base-table.vue';
import BaseSelect from './components/base/base-select.vue';
import BaseInput from './components/base/base-input.vue';
import { h, ref } from 'vue';
import dayjs from 'dayjs';

const tasks = ref([
  {
    id: 'Setup linter',
    name: 'Setup linter',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Setup tailwind',
    name: 'Setup tailwind',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Home page',
    name: 'Home page',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Task table',
    name: 'Task table',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Task table from store',
    name: 'Task table from store',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Store task',
    name: 'Store task',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Edit task',
    name: 'Edit task',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Delete task',
    name: 'Delete task',
    deadline: new Date(),
    status: 'todo',
  },
  {
    id: 'Update task status',
    name: 'Update task status',
    deadline: new Date(),
    status: 'todo',
  },
]);

const columns = [
  {
    id: 'name',
    name: 'Name',
    render: ({ item }) =>
      item.id
        ? h('p', item.name)
        : h(BaseInput, { placeholder: 'Enter task name' }),
  },
  {
    id: 'deadline',
    name: 'Deadline',
    render: ({ item }) =>
      item.id
        ? h('p', dayjs(item.deadline).format('DD MMMM YYYY'))
        : h(BaseInput, { placeholder: 'Enter task name', type: 'date' }),
  },
  {
    id: 'status',
    name: 'Status',
    render: ({ item, index }) =>
      h(BaseSelect, {
        options: [
          { id: 'todo', name: 'To Do' },
          { id: 'progress', name: 'In Progress' },
          { id: 'done', name: 'Done' },
        ],
        modelValue: tasks.value[index].status,
        'update:modelValue': (value) => (tasks.value[index].status = value),
      }),
  },
];

function onNewTask() {
  tasks.value.push({
    id: null,
    name: null,
    deadline: null,
    status: 'todo',
  });
}
</script>

<template>
  <base-container class="py-10 space-y-4">
    <base-heading
      title="Task List"
      :level="3"
    >
      <template #action>
        <base-button
          color="blue"
          @click="onNewTask"
        >
          New Task
        </base-button>
      </template>
    </base-heading>

    <base-table
      :columns="columns"
      :data="tasks"
    />
  </base-container>
</template>
