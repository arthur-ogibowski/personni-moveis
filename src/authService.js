const AuthService = {
    setToken: (token) => {
      localStorage.setItem('token', token); // Armazena o token no localStorage
    },
  
    getToken: () => {
      return localStorage.getItem('token'); // Obtém o token do localStorage
    },
  
    clearToken: () => {
      localStorage.removeItem('token'); // Remove o token do localStorage
    },
  
    // ... outras funções de autenticação, se necessário ...
  };
  
  export default AuthService;