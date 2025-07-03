import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { MotionPlugin } from '@vueuse/motion';
import vClickOutside from 'click-outside-vue3';

const app = createApp(App);

app.use(MotionPlugin);
app.use(vClickOutside);

app.mount('#app');
