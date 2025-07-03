<script setup>
import BaseCard from './components/base/base-card.vue';
import BaseContainer from './components/base/base-container.vue';
import BaseHeading from './components/base/base-heading.vue';
import BaseButton from './components/base/base-button.vue';
import BaseInput from './components/base/base-input.vue';
import BaseSelect from './components/base/base-select.vue';
import BaseAlert from './components/base/base-alert.vue';
import BaseConfirm from './components/base/base-confirm.vue';
import BaseNavbar from './components/base/base-navbar.vue';
import BaseList from './components/base/base-list.vue';
import { reactive, ref } from 'vue';
import dayjs from 'dayjs';

const newTaskFrom = reactive({
  name: null,
  dueDate: null,
});
const editTaskId = ref(null);
const editTask = reactive({
  name: null,
  dueDate: null,
});
const loadingTasks = ref(false);
const errorTasks = ref(false);
const visibleLogout = ref(false);

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
function onEditTask(task) {
  editTaskId.value = task.id;
  editTask.name = task.name;
  editTask.dueDate = task.dueDate;
}
function onSaveEditTask() {
  tasks.value = tasks.value.map((task) => {
    if (task.id !== editTaskId.value) {
      return task;
    }

    return {
      id: task.id,
      name: editTask.name,
      dueDate: editTask.dueDate,
      status: task.status,
    };
  });

  editTaskId.value = null;
}
function onDeleteTask(deleteTask) {
  tasks.value = tasks.value.filter((task) => {
    return task.id !== deleteTask.id;
  });

  editTaskId.value = null;
}
</script>

<template>
  <base-navbar :container-props="{ maxScreen: 'lg' }">
    <template #start>
      <a href="">Home</a>
    </template>
    <template #end>
      <base-button
        color="transparent-gray"
        @click="visibleLogout = true"
      >
        Logout
      </base-button>
    </template>
  </base-navbar>
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
          class="flex flex-col gap-4 sm:flex-row sm:gap-2"
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

      <base-alert
        v-if="loadingTasks"
        loading
      >
        Loading Tasks
      </base-alert>

      <template v-else>
        <base-alert
          v-if="errorTasks"
          color="red"
        >
          Error loading Tasks
        </base-alert>
        <base-list
          v-else-if="tasks.length"
          :data="tasks"
        >
          <template #item="{ item: task, index }">
            <form
              v-if="editTaskId === task.id"
              class="flex flex-col gap-2 sm:flex-row"
              @submit.prevent="onSaveEditTask"
            >
              <base-input
                v-model="editTask.name"
                type="text"
                placeholder="Edit task name"
                fullwidth
              />
              <base-input
                v-model="editTask.dueDate"
                type="date"
                fullwidth
              />
              <div class="flex gap-2">
                <base-button
                  type="submit"
                  color="blue"
                  :disabled="!editTask.name || !editTask.dueDate"
                >
                  Save
                </base-button>
                <base-button
                  type="button"
                  @click="editTaskId = null"
                >
                  Cancel
                </base-button>
              </div>
            </form>
            <div
              v-else
              class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0"
            >
              <div>
                <p class="font-medium text-gray-900">
                  {{ task.name }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ dayjs(task.dueDate).format('DD MMMM YYYY') }}
                </p>
              </div>
              <div class="flex gap-2 justify-between sm:justify-start">
                <base-select
                  v-model="tasks[index].status"
                  size="sm"
                  :options="[
                    { id: 'todo', name: 'Todo' },
                    { id: 'inprogress', name: 'In Progress' },
                    { id: 'done', name: 'Done' },
                  ]"
                />
                <div class="flex gap-2">
                  <base-button
                    size="sm"
                    color="blue"
                    @click="onEditTask(task)"
                  >
                    Edit
                  </base-button>
                  <base-button
                    size="sm"
                    color="red"
                    @click="onDeleteTask(task)"
                  >
                    Delete
                  </base-button>
                </div>
              </div>
            </div>
          </template>
        </base-list>
      </template>
    </base-container>

    <base-confirm
      v-model:visible="visibleLogout"
      title="Are you sure want to logout?"
      message="Confirm the button if you sure want to logout"
      confirm-text="Logout"
    />
  </div>
</template>
