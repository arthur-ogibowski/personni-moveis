<template>
    <div class="container">
      <img src="../../assets/img/personniLogo-Green.png" alt="Personni Móveis" class="logo"/>
      <div class="login-container">
      <div class="side-image">
        <img src="../../assets/img/personni.png" alt="Personni Móveis" class="img-item"/>
      </div>
      <!-- <div class="blue-rectangle"> -->
          <div class="dialog">
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
                    <router-link class="recuperar-senha" to="/login/recuperar-senha"><el-link size="small">Esqueci minha senha</el-link></router-link>
                  <el-button color="$cta-color" class="cta" size="large" :loading-icon="Eleme" :loading="carregando" v-on:click="fazerLogin()">Entrar</el-button>
                  <div class="register">
                            <el-divider>Ou</el-divider>
                    <!-- <h2>Não possui uma conta?</h2> -->
                    <router-link class="criar-conta" to="/login/cadastro"><el-link>Criar Conta</el-link></router-link>
                  </div>
          </div>
      </div>
      <h2><router-link class="voltar" to="/"><el-icon><ArrowLeftBold /></el-icon> Voltar</router-link></h2>
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

            this.$router.push(this.$router.options.history.state.back || '/');
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
   justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background-color: #CECECE;
  padding-top: 0;
  padding-bottom: 0;
  .logo{
    width: 25rem;
    margin-bottom: 20px;
  }
}

div.login-container{
    img {
      object-fit: cover;
      height: 100%;
    }

    :deep(.side-image) {
      flex-basis: 50%;
    }
    .dialog{
      flex-basis: 70%;
    }
}


div.dialog{
    .el-link{
      color: $admin-grey;
      text-decoration: underline;
    }
    .el-link.is-underline:hover::after {
      border-bottom:none;
    }
    .recuperar-senha{
      text-align: right;

      .el-link{
        font-size: 12px;
      }
    }
    :deep(.el-divider){
      border-top: 1px solid $admin-grey;
    }
    :deep(.el-divider__text) {
      background-color: $tertiary-color;
      color: $admin-grey;
    }
    .register{
      text-align: center;

      .el-link{
        font-size: 16px;
      }
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
  margin-top: 20px;
  color: $cta-color;
  font-weight: 400;

  .voltar{
    display: flex;
    align-items: center;
  }
}

</style>