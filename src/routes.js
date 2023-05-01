import Index from '@/pages/user/index.vue';
import NotFound from '@/pages/user/not-found.vue';
import AdminIndex from '@/pages/admin/index.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/:path(.*)', component: NotFound },
  { path: '/admin', component: AdminIndex },
];

export default routes;
