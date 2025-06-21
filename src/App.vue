<script setup>
import BaseContainer from './components/base/base-container.vue';
import BaseHeading from './components/base/base-heading.vue';
import BaseButton from './components/base/base-button.vue';
import BaseTable from './components/base/base-table.vue';
import { h } from 'vue';
import dayjs from 'dayjs';

const columns = [
  { id: 'name', name: 'Name' },
  {
    id: 'deadline',
    name: 'Deadline',
    value: (item) => dayjs(item.deadline).format('DD MMMM YYYY'),
  },
  {
    id: 'status',
    name: 'Status',
    render: ({ item }) =>
      h(
        'select',
        { value: item.status },
        [
          { id: 'todo', name: 'To Do' },
          { id: 'progress', name: 'In Progress' },
          { id: 'done', name: 'Done' },
        ].map((option) => h('option', { value: option.id }, option.name)),
      ),
  },
];
const tasks = [
  {
    name: 'Setup linter',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Setup tailwind',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Home page',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Task table',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Task table from store',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Store task',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Edit task',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Delete task',
    deadline: new Date(),
    status: 'todo',
  },
  {
    name: 'Update task status',
    deadline: new Date(),
    status: 'todo',
  },
];
</script>

<template>
  <base-container class="py-10 space-y-4">
    <base-heading
      title="Task List"
      :level="3"
    >
      <template #action>
        <base-button color="blue">
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
