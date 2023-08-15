import Index from '@/pages/user/index.vue';
import NotFound from '@/pages/user/not-found.vue';
import UserDashboard from '@/pages/user/perfil/dashboard.vue';
import UserListarPedidos from '@/pages/user/perfil/pedidos.vue';

import ProdutosListar from '@/pages/user/produtos/listagem.vue';
import ProdutosSingle from '@/pages/user/produtos/single.vue'

import AdminDashboard from '@/pages/admin/dashboard.vue';
import AdminListarProdutos from '@/pages/admin/produtos/listagem.vue';
import AdminEditarProduto from '@/pages/admin/produtos/editar.vue';
import AdminListarCategorias from '@/pages/admin/categorias/listagem.vue';
import AdminEditarCategoria from '@/pages/admin/categorias/editar.vue';
import AdminListarPedidos from '@/pages/admin/pedidos/listagem.vue';


import Login from '@/pages/login/login.vue';
import Cadastro from '@/pages/login/cadastro.vue';
import RecuperarSenha from '@/pages/login/recuperarSenha.vue';

export const routes = [
  { path: '/login', component: Login},
  { path: '/login/cadastro', component: Cadastro },
  { path: '/login/recuperar-senha', component: RecuperarSenha },

  { path: '/', component: Index },
  { path: '/perfil', component: UserDashboard},
  { path: '/perfil/pedidos', component: UserListarPedidos},
  { path: '/produtos', component: ProdutosListar },
  { path: '/produtos/:id', component: ProdutosSingle },


  { path: '/admin', component: AdminDashboard },
  { path: '/admin/produtos', component: AdminListarProdutos },
  { path: '/admin/produtos/:id', component: AdminEditarProduto },
  { path: '/admin/categorias', component: AdminListarCategorias },
  { path: '/admin/categorias/:id', component: AdminEditarCategoria },
  { path: '/admin/pedidos', component: AdminListarPedidos },

  { path: '/:path(.*)', component: NotFound },
];

export default routes;
