<script setup>
import BaseContainer from './components/base/base-container.vue';
import BaseHeading from './components/base/base-heading.vue';
import BaseButton from './components/base/base-button.vue';
import BaseTable from './components/base/base-table.vue';
import BaseSelect from './components/base/base-select.vue';
import BaseInput from './components/base/base-input.vue';
import { computed, h, nextTick, ref } from 'vue';
import dayjs from 'dayjs';

const taskNameInput = ref({});
const tasks = ref([
  {
    id: 'Setup linter',
    name: 'Setup linter',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Setup tailwind',
    name: 'Setup tailwind',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Home page',
    name: 'Home page',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Task table',
    name: 'Task table',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Task table from store',
    name: 'Task table from store',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Store task',
    name: 'Store task',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Edit task',
    name: 'Edit task',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Delete task',
    name: 'Delete task',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
  {
    id: 'Update task status',
    name: 'Update task status',
    deadline: new Date(),
    status: 'todo',
    saved: true,
  },
]);

const columns = [
  {
    id: 'name',
    name: 'Name',
    render: ({ item, index }) =>
      item.saved
        ? h('p', item.name)
        : h(BaseInput, {
            ref: (el) => setTaskNameInputRef(el, item.id),
            placeholder: 'Enter task name',
            modelValue: tasks.value[index].name,
            'onUpdate:modelValue': (value) => (tasks.value[index].name = value),
          }),
  },
  {
    id: 'deadline',
    name: 'Deadline',
    render: ({ item, index }) =>
      item.saved
        ? h('p', dayjs(item.deadline).format('DD MMMM YYYY'))
        : h(BaseInput, {
            placeholder: 'Enter task name',
            type: 'date',
            modelValue: tasks.value[index].deadline,
            'onUpdate:modelValue': (value) =>
              (tasks.value[index].deadline = value),
          }),
  },
  {
    id: 'status',
    name: 'Status',
    render: ({ index }) =>
      h(BaseSelect, {
        options: [
          { id: 'todo', name: 'To Do' },
          { id: 'progress', name: 'In Progress' },
          { id: 'done', name: 'Done' },
        ],
        modelValue: tasks.value[index].status,
        'onUpdate:modelValue': (value) => (tasks.value[index].status = value),
      }),
  },
  {
    id: 'action',
    name: 'Action',
    render: ({ item, index }) =>
      h(
        'div',
        { class: 'flex gap-1' },
        !item.saved
          ? [
              h(
                BaseButton,
                { color: 'blue', size: 'sm', onClick: () => onSaveTask(index) },
                () => 'Save',
              ),
              h(BaseButton, { size: 'sm' }, () => 'Cancel'),
            ]
          : [],
      ),
  },
];

function setTaskNameInputRef(el, index) {
  taskNameInput.value[index] = el;
}

async function onNewTask() {
  const id = Date.now();

  tasks.value.push({
    id,
    name: null,
    deadline: null,
    status: 'todo',
    saved: false,
  });

  await nextTick();

  taskNameInput.value[id].input.focus();
}
function onSaveTask(index) {
  tasks.value[index].saved = true;
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
