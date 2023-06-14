import Index from '@/pages/user/index.vue';
import NotFound from '@/pages/user/not-found.vue';
import AdminDashboard from '@/pages/admin/dashboard.vue';
import AdminProdutos from '@/pages/admin/produtos/produtos.vue';
import AdminProdutosEditar from '@/pages/admin/produtos/editar.vue'
import UserPerfil from '@/pages/user/perfil.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/meu-perfil', component: UserPerfil },
  { path: '/:path(.*)', component: NotFound },
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/produtos', component: AdminProdutos },
  { path: '/admin/produtos/editar', component: AdminProdutosEditar}
];

export default routes;
