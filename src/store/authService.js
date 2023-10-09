/** Gerencia autenticação, acessos e redirecionamentos no front. */

import jwtDecode from "jwt-decode";

const AuthService = {
  setToken(token) {
    localStorage.setItem('token', token); // Armazena o token no localStorage
  },
  getToken() {
    return localStorage.getItem('token'); // Obtém o token do localStorage
  },
  clearToken() {
    localStorage.removeItem('token'); // Remove o token do localStorage
  },
  /** Retorna true se usuário esta logado (tem token), senão falso. */
  isUserLoggedIn() {
    return (!this.getToken());
  },
  /** Checa se usuário está logado (deve ter feito login para poder acessar a página.) */
  redirectToLogin(router) {
    // Se ainda não tem token (user não logado) redireciona para fazer login.
    if (this.isUserLoggedIn()) {
      router.replace('/login');
    }
  },

  // Nas seguintes funções, em todas checagens em que é necessário identificar o role (papel do usuário), retornará
  // true para usuários admin, porque admin pode fazer tudo.

  /** Se usuário tem permissão de colab, retorna true */
  isUserColaborator() {
    if(this.getToken()) {
      const usuario = jwtDecode(this.getToken);
      console.log('Informações do usuário:', usuario);
    }
    return false;
  }
};

export default AuthService;