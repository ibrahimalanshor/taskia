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
import { computed, nextTick, reactive, ref, useTemplateRef } from 'vue';
import dayjs from 'dayjs';
import { request } from 'src/lib/http';

const newTaskForm = reactive({
  name: null,
});
const newTaskNameInput = useTemplateRef('new-task-name');
const editTaskId = ref(null);
const editTask = reactive({
  name: null,
});
const editTaskNameInput = useTemplateRef('edit-task-name');
const loadingTasks = ref(true);
const errorTasks = ref(false);
const visibleLogout = ref(false);
const tasks = ref([]);

const sortedTasks = computed(() =>
  [...tasks.value].sort((a, b) => {
    const weight = {
      todo: 2,
      inprogress: 1,
      done: 3,
    };

    return weight[a.status] - weight[b.status];
  }),
);

const selectColorByStatus = {
  todo: 'white',
  inprogress: 'blue-filled',
  done: 'green-filled',
};

async function loadTasks() {
  loadingTasks.value = true;

  const [res, err] = await request({
    url: `/tasks`,
    params: {
      not_status: 'done',
    },
  });

  if (err) {
    errorTasks.value = true;
  } else {
    tasks.value = res;
  }

  loadingTasks.value = false;

  await nextTick();

  newTaskNameInput.value.input.focus();
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

  if (task.status === 'done') {
    tasks.value = tasks.value.filter((task) => task.status !== 'done');
  }

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
  const id = Date.now();

  tasks.value.push({
    id,
    name: newTaskForm.name,
    dueDate: dayjs().format('YYYY-MM-DD'),
    status: 'todo',
  });

  saveTask(id);

  newTaskForm.name = null;
}
async function onEditTask(task) {
  editTaskId.value = task.id;
  editTask.name = task.name;

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
      dueDate: task.dueDate,
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
      title="Tasks for Today"
      :level="3"
    />

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
      <base-list :data="sortedTasks">
        <template #header="{ classes }">
          <div :class="classes.item">
            <form
              class="flex flex-col gap-4 sm:flex-row sm:gap-2"
              @submit.prevent="onSaveNewTask"
            >
              <base-input
                ref="new-task-name"
                v-model="newTaskForm.name"
                type="text"
                placeholder="What do you want to get done?"
                fullwidth
              />
            </form>
          </div>
        </template>
        <template #item="{ item: task }">
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
            <div class="flex gap-2">
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
                v-model="task.status"
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
                  icon="tabler:edit"
                  icon-only
                  @click="onEditTask(task)"
                />
                <base-button
                  size="sm"
                  color="red"
                  icon="tabler:trash"
                  icon-only
                  @click="onDeleteTask(task)"
                />
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
