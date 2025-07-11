<script setup>
import BaseHeading from 'src/components/base/base-heading.vue';
import BaseButton from 'src/components/base/base-button.vue';
import BaseInput from 'src/components/base/base-input.vue';
import BaseSelect from 'src/components/base/base-select.vue';
import BaseAlert from 'src/components/base/base-alert.vue';
import BaseList from 'src/components/base/base-list.vue';
import { computed, nextTick, reactive, ref, useTemplateRef } from 'vue';
import { useTaskResource } from 'src/features/task/composables/task-resource';

const {
  loading: loadingTasks,
  error: errorTasks,
  tasks,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = useTaskResource();
const newTaskForm = reactive({
  name: null,
});
const newTaskNameInput = useTemplateRef('new-task-name');
const editTaskId = ref(null);
const editTask = reactive({
  name: null,
});
const editTaskNameInput = useTemplateRef('edit-task-name');

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
  await getTasks({
    not_status: 'done',
  });

  await nextTick();

  newTaskNameInput.value.input.focus();
}
async function storeTask(id) {
  const task = tasks.value.find((task) => task.id === id);

  const [res, err] = await createTask({
    name: task.name,
    status: task.status,
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

function onSaveNewTask() {
  const id = Date.now();

  tasks.value.push({
    id,
    name: newTaskForm.name,
    status: 'todo',
  });

  storeTask(id);

  newTaskForm.name = null;
}
async function onEditTask(task) {
  editTaskId.value = task.id;
  editTask.name = task.name;

  await nextTick();

  editTaskNameInput.value.input.focus();
}
function onSaveEditTask() {
  const task = tasks.value.find((task) => task.id === editTaskId.value);

  updateTask(task);

  tasks.value = tasks.value.map((task) => {
    if (task.id !== editTaskId.value) {
      return task;
    }

    return {
      id: task.id,
      name: editTask.name,
      status: task.status,
    };
  });

  editTaskId.value = null;
}
function onChangeTaskStatus(taskId) {
  const task = tasks.value.find((task) => task.id === taskId);

  updateTask(task);

  if (task.status === 'done') {
    tasks.value = tasks.value.filter((task) => task.status !== 'done');
  }
}
function onDeleteTask(deletingTask) {
  tasks.value = tasks.value.filter((task) => {
    return task.id !== deletingTask.id;
  });

  deleteTask(deletingTask.id);
}

loadTasks();
</script>

<template>
  <base-heading
    title="Tasks to Focus On"
    :level="3"
  />

  <base-alert
    v-if="loadingTasks"
    loading
  >
    Bringing Up Your Tasks
  </base-alert>

  <template v-else>
    <base-alert
      v-if="errorTasks"
      color="red"
    >
      Something went wrong while loading tasks.
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
              Uncategorized
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
              @change="onChangeTaskStatus(task.id)"
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
</template>
