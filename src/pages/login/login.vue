<template>
    <div class="container">
      <div class="login">
      <div class="side-image">
        <img src="../../assets/img/personni.png" alt="Personni Móveis" class="img-item"/>
      </div>
      <!-- <div class="blue-rectangle"> -->
          <div class="login-dialog">
              <h1>Login</h1>
                  <el-input
                    v-model="login.email"
                    size="large"
                    placeholder="Email"
                    label="Email"
                  />
                    <el-input
                      v-model="login.password"
                      size="large"
                      placeholder="Senha"
                      type="password"
                      show-password
                    />
                  <el-button color="$cta-color" class="cta" size="large" :loading-icon="Eleme" :loading="carregando" v-on:click="fazerLogin()">Entrar</el-button>
                  <router-link to="/login/recuperar-senha"><el-link>Esqueci minha senha</el-link></router-link>
                  <div class="register">
            <!-- <h2>Não possui uma conta?</h2> -->
            <router-link to="/login/cadastro"><el-link>Criar Conta</el-link></router-link>
          </div>
          </div>
      </div>
    </div>
  
  </template>


<script>
import axios from 'axios';
import AuthService from '@/store/authService.js';
import jwtDecode from 'jwt-decode';

export default {
    data() {
        return {
            login:{
            email: "",
            password: "",
        },
            carregando: false,
            usuario: null,
        }
    },
    created() {
      // VERIFICA USUARIO LOGADO, PEGA O TOKEN E PASSA PELA VERIFICAÇÃO, CASO ESTEJA LOGADO REDIRECIONA PARA PAGINA INICIAL.
      const token = AuthService.getToken();
      if (token) {
        this.$router.push('/');
      }
    },
    methods: {
        fazerLogin() {
            axios.post('http://localhost:8081/login', this.login)
            .then(response => {
          if (response.status === 200) {
            const token = response.data.token;
            AuthService.setToken(token);

            // Decodifica o token para obter as informações do usuário
            const usuario = jwtDecode(token);
            console.log('Informações do usuário:', usuario);

            this.$router.push('/');
          } else {
            console.error('Erro ao fazer login. Código de status:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao fazer login:', error);
        })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/scss/basics.scss';

div.container{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #CECECE;
}

div.login{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50vw;
    max-height: 500px;
    height: 500px;

    img {
      object-fit: cover;
      height: 100%;
    }

    .side-image, .login-dialog {
      flex-basis: 50%;
    }
}


div.login-dialog{
    background: $tertiary-color;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    padding: 4rem;
    justify-content: space-around;
    width: 100%;
    .el-link{
      color: $admin-grey;
      text-decoration: underline;
    }
    .el-link.is-underline:hover::after {
      border-bottom:none;
    }
}

h1{
    color: $primary-color;
    text-align: center;
    font-family: shadows-into-light;
    font-size: 4rem;
    font-weight: 400;   
}

h2 {
  text-align: center;
  color: #FFF;
}

</style>