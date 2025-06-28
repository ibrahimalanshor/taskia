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
const editTaskId = ref(null);
const editTask = reactive({
  name: null,
  dueDate: null,
});
const loadingTasks = ref(false);

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

      <div
        v-if="loadingTasks"
        class="p-4 bg-blue-100 rounded-md border border-blue-300 text-blue-500 flex items-center gap-2"
      >
        <svg
          aria-hidden="true"
          :class="['animate-spin', 'w-4 h-4', 'text-blue-200 fill-blue-600']"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        Loading Tasks
      </div>

      <base-card
        v-else
        paddless
      >
        <div class="divide-y divide-gray-300">
          <div
            v-for="(task, index) in tasks"
            :key="task.id"
            class="p-4"
          >
            <form
              v-if="editTaskId === task.id"
              class="flex gap-2"
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
            </form>
            <div
              v-else
              class="flex items-center justify-between"
            >
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
        </div>
      </base-card>
    </base-container>
  </div>
</template>
