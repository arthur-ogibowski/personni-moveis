import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import '@/assets/styles/fonts.css';
import '@/assets/styles/main.css';
import App from '@/app.vue';
import { routes } from '@/routes.js';
import '@/assets/styles/scss/styles.scss'
import * as bootstrap from 'bootstrap'
import { Tooltip, Toast, Popover } from 'bootstrap';
import * as mdb from 'mdb-ui-kit';
window.mdb = mdb;

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';
library.add(faUserSecret)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.mount('#app');
