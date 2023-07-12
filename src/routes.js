import Index from '@/pages/user/inicio/index.vue';
import NotFound from '@/pages/user/not-found.vue';

import AdminDashboard from '@/pages/admin/dashboard.vue';

import Login from '@/pages/login/login.vue';
import Cadastro from '@/pages/login/cadastro.vue';
import RecuperarSenha from '@/pages/login/recuperarSenha.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login},
  { path: '/login/cadastro', component: Cadastro },
  { path: '/login/recuperar-senha', component: RecuperarSenha },
  { path: '/admin', component: AdminDashboard },

  { path: '/:path(.*)', component: NotFound },
];

export default routes;
