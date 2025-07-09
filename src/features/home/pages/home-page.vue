<script setup>
import BaseCard from 'src/components/base/base-card.vue';
import BaseContainer from 'src/components/base/base-container.vue';
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import BaseConfirm from 'src/components/base/base-confirm.vue';
import BaseNavbar from 'src/components/base/base-navbar.vue';
import BaseList from 'src/components/base/base-list.vue';
import { nextTick, onMounted, reactive, ref, useTemplateRef } from 'vue';
import dayjs from 'dayjs';
import { request } from 'src/lib/http';

const newTaskForm = reactive({
  name: null,
  dueDate: null,
});
const newTaskNameInput = useTemplateRef('new-task-name');
const editTaskId = ref(null);
const editTask = reactive({
  name: null,
  dueDate: null,
});
const editTaskNameInput = useTemplateRef('edit-task-name');
const loadingTasks = ref(true);
const errorTasks = ref(false);
const visibleLogout = ref(false);
const tasks = ref([]);

const selectColorByStatus = {
  todo: 'white',
  inprogress: 'blue-filled',
  done: 'green-filled',
};

async function loadTasks() {
  loadingTasks.value = true;

  const [res, err] = await request({
    url: `/tasks`,
  });

  if (err) {
    errorTasks.value = true;
  } else {
    tasks.value = res;
  }

  loadingTasks.value = false;
}
async function saveTask(id) {
  const task = tasks.value.find((task) => task.id === id);

  const [res, err] = await request({
    url: '/tasks',
    method: 'post',
    data: {
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
    },
  });

  if (!err) {
    tasks.value = tasks.value.map((task) => {
      if (task.id !== id) {
        return task;
      }

      return {
        ...task,
        id: res.id,
      };
    });
  }
}
async function updateTask(taskId) {
  const task = tasks.value.find((task) => task.id === taskId);

  await request({
    url: `/tasks/${task.id}`,
    method: 'put',
    data: {
      name: task.name,
      dueDate: task.dueDate,
      status: task.status,
    },
  });
}
async function removeTask(taskId) {
  await request({
    url: `/tasks/${taskId}`,
    method: 'delete',
  });
}

function onSaveNewTask() {
  const id = tasks.value.length;

  tasks.value.push({
    id,
    name: newTaskForm.name,
    dueDate: newTaskForm.dueDate,
    status: 'todo',
  });

  saveTask(id);

  newTaskForm.name = null;
  newTaskForm.dueDate = null;
}
async function onEditTask(task) {
  editTaskId.value = task.id;
  editTask.name = task.name;
  editTask.dueDate = task.dueDate;

  await nextTick();

  editTaskNameInput.value.input.focus();
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

  updateTask(editTaskId.value);

  editTaskId.value = null;
}
function onDeleteTask(deleteTask) {
  tasks.value = tasks.value.filter((task) => {
    return task.id !== deleteTask.id;
  });

  removeTask(deleteTask.id);
}

onMounted(() => {
  newTaskNameInput.value.input.focus();
});

loadTasks();
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
          ref="new-task-name"
          v-model="newTaskForm.name"
          type="text"
          placeholder="Type task name"
          fullwidth
        />
        <base-input
          v-model="newTaskForm.dueDate"
          type="date"
          fullwidth
        />
        <base-button
          type="submit"
          color="blue"
          :disabled="!newTaskForm.name || !newTaskForm.dueDate"
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
              ref="edit-task-name"
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
                :color="selectColorByStatus[task.status]"
                @change="updateTask(task.id)"
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
</template>
