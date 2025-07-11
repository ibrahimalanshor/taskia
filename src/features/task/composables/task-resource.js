import { ref } from 'vue';
import { request } from 'src/lib/http';

export function useTaskResource() {
  const loading = ref(false);
  const error = ref(false);
  const tasks = ref([]);

  async function getTasks(params) {
    loading.value = true;

    const [res, err] = await request({
      url: `/tasks`,
      params,
    });

    if (err) {
      error.value = true;
    } else {
      tasks.value = res;
    }

    loading.value = false;
  }

  async function createTask(task) {
    return await request({
      url: '/tasks',
      method: 'post',
      data: {
        name: task.name,
        status: task.status,
      },
    });
  }

  async function updateTask(task) {
    return await request({
      url: `/tasks/${task.id}`,
      method: 'put',
      data: {
        name: task.name,
        status: task.status,
      },
    });
  }

  async function deleteTask(taskId) {
    await request({
      url: `/tasks/${taskId}`,
      method: 'delete',
    });
  }

  return {
    loading,
    error,
    tasks,
    getTasks,
    createTask,
    updateTask,
    deleteTask,
  };
}
