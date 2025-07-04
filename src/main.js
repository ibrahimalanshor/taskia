import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { MotionPlugin } from '@vueuse/motion';
import vClickOutside from 'click-outside-vue3';
import { router } from './router/router';
import vue3GoogleLogin from 'vue3-google-login';

const app = createApp(App);

app.use(MotionPlugin);
app.use(vClickOutside);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});

app.mount('#app');
