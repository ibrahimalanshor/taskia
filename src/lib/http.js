import axios from 'axios';
import { useAuthStore } from 'src/features/auth/auth.store';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function request(params = {}) {
  const authStore = useAuthStore();
  try {
    const res = await http({
      ...params,
      headers: {
        ...params.headers,
        Authorization: authStore.accessToken,
      },
    });

    return [res.data, null];
  } catch (err) {
    return [null, err];
  }
}
