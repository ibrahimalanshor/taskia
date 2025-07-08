import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function request(params) {
  try {
    const res = await http(params);

    return [res.data, null];
  } catch (err) {
    return [null, err];
  }
}
