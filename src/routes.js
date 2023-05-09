import Index from '@/pages/user/index.vue';
import NotFound from '@/pages/user/not-found.vue';
import AdminDashboard from '@/pages/admin/dashboard.vue';
import AdminProdutos from '@/pages/admin/produtos.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/:path(.*)', component: NotFound },
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/produtos', component: AdminProdutos },
];

export default routes;
