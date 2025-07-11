import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { MotionPlugin } from '@vueuse/motion';
import vClickOutside from 'click-outside-vue3';
import { router } from './router/router';
import vue3GoogleLogin from 'vue3-google-login';
import { store } from './store/store';
import { layouts } from './components/layout';

const app = createApp(App);

for (const layout in layouts) {
  app.component(layout, layouts[layout]);
}

app.use(MotionPlugin);
app.use(vClickOutside);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
});
app.use(store);

app.mount('#app');
