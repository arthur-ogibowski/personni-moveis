import Index from '@/pages/user/inicio/index.vue';
import Cadeiras from '@/pages/user/inicio/cadeiras.vue';
import NotFound from '@/pages/user/not-found.vue';

import AdminDashboard from '@/pages/admin/dashboard.vue';
import AdminProdutos from '@/pages/admin/produtos/produtos.vue';
import AdminProdutosEditar from '@/pages/admin/produtos/editar.vue';
import AdminCategorias from '@/pages/admin/categorias/categorias.vue';
import AdminCategoriasEditar from '@/pages/admin/categorias/editar.vue';
import AdminPedidos from '@/pages/admin/pedidos/pedidos.vue';
import AdminOrcamentos from '@/pages/admin/orcamentos/orcamentos.vue';
import AdminOrcamentosDetalhes from '@/pages/admin/orcamentos/detalhes.vue';

import UserPerfil from '@/pages/user/perfil/perfil.vue';
import UserEndereco from '@/pages/user/perfil/enderecos.vue';
import Login from '@/pages/login/login.vue';
import Cadastro from '@/pages/login/cadastro.vue';
import RecuperarSenha from '@/pages/login/recuperarSenha.vue';
import TelaCompra from '@/pages/user/inicio/compra.vue';
import Personalizacao from '@/pages/user/personalizacao/personalizacao.vue';
import ExemploUm from '@/pages/user/personalizacao/exemploUm.vue';
import ExemploDois from '@/pages/user/personalizacao/exemploDois.vue';
import Criacao from '@/pages/user/criacao/criacao.vue';
import CriacaoUm from '@/pages/user/criacao/cmp1.vue';
import CriacaoDois from '@/pages/user/criacao/cmp2.vue';
import CriacaoTres from '@/pages/user/criacao/cmp3.vue';
import CriacaoQuatro from '@/pages/user/criacao/cmp4.vue';
import CriacaoCinco from '@/pages/user/criacao/cmp5.vue';
import CriacaoFinal from '@/pages/user/criacao/cmpFinal.vue';
import Carrinho from '@/pages/user/checkout/carrinho.vue';
import ConfirmarDados from '@/pages/user/checkout/confirmarDados.vue';
import FormaPagamento from '@/pages/user/checkout/formaPagamento.vue';
import Revisao from '@/pages/user/checkout/revisar.vue';
import CompraRealizada from '@/pages/user/checkout/compraRealizada.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/login', component: Login},
  { path: '/login/cadastro', component: Cadastro },
  { path: '/login/recuperar-senha', component: RecuperarSenha },
  { path: '/cadeiras', component: Cadeiras },
  { path: '/compra', component: TelaCompra },
  { path: '/meu-perfil', component: UserPerfil },
  { path: '/meu-perfil/enderecos', component: UserEndereco},
  { path: '/:path(.*)', component: NotFound },
  { path: '/personalizacao', component: Personalizacao},
  { path: '/personalizacao/exemplo1', component: ExemploUm},
  { path: '/personalizacao/exemplo2', component: ExemploDois},
  { path: '/criacao', component: Criacao},
  { path: '/criacao1', component: CriacaoUm},
  { path: '/criacao2', component: CriacaoDois},
  { path: '/criacao3', component: CriacaoTres},
  { path: '/criacao4', component: CriacaoQuatro},
  { path: '/criacao5', component: CriacaoCinco},
  { path: '/criacao-final', component: CriacaoFinal},
  { path: '/carrinho', component: Carrinho},
  { path: '/carrinho/confirmar-dados', component: ConfirmarDados},
  { path: '/carrinho/pagamento', component: FormaPagamento},
  { path: '/carrinho/revisao', component: Revisao},
  { path: '/carrinho/compra-efetuada', component: CompraRealizada},
  { path: '/admin', component: AdminDashboard },
  { path: '/admin/produtos', component: AdminProdutos },
  { path: '/admin/produtos/editar', component: AdminProdutosEditar},
  { path: '/admin/categorias', component: AdminCategorias},
  { path: '/admin/categorias/editar', component: AdminCategoriasEditar},
  { path: '/admin/pedidos', component: AdminPedidos},
  { path: '/admin/orcamentos', component: AdminOrcamentos},
  { path: '/admin/orcamentos/detalhes', component: AdminOrcamentosDetalhes},
];

export default routes;
