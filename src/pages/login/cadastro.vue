
<template>
  <div class="container">
    <div class="logo-container"><img :src="storeConfig.logo" class="logo"/></div>
    <div class="login-container">
      <div class="side-image">
        <img src="../../assets/img/personni.png" class="img-item"/>
      </div>
    <div class="dialog">
          <h1>Crie sua conta</h1>
            <div class="cadastro-form">
              <el-form-item>
                <el-input v-model="cadastro.name" size="medium" placeholder="Nome"/>
              </el-form-item>
              <el-form-item>
                <el-input v-model="cadastro.email" size="medium" placeholder="Email" />
              </el-form-item>
              <el-form-item >
                <el-input v-model="cadastro.cpf" size="medium" placeholder="CPF" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="cadastro.phoneNumber" size="medium" placeholder="Telefone" />
              </el-form-item>
              <el-form-item>
                <el-input type="password" v-model="cadastro.password" size="medium" placeholder="Senha" />
              </el-form-item>
            </div>
                <el-button color="var(--cta-color)" class="cta" size="large" :loading-icon="Eleme" :loading="carregando" v-on:click="cadastrarUsuario()">Criar Conta</el-button>
        </div>
      </div>
      <h2><router-link class="voltar" to="/login"><el-icon><ArrowLeftBold /></el-icon> Voltar para login</router-link></h2>
  </div>

</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import AuthService from '@/store/authService.js';

export default {
    data() {
        return {
            cadastro:{
              name: "",
              email: "",
              cpf: "",
              phoneNumber: "",
              password: "",
            },
            carregando: false,
            storeConfig: {
              logo: '',
            },
        }
    },
    created() {
      this.getStoreConfig();
    },
    methods: {
        cadastrarUsuario() {
            axios.post('http://localhost:8081/users/create-account', this.cadastro)
            .then(response => {
          if (response.status === 201) {
            ElMessage.success('Cadastro realizado com sucesso!');
            this.$router.push('/login');
          } else {
            console.error('Erro ao realizar cadastro. Código de status:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao realizar cadastro:', error);
        })
    },
    getStoreConfig() {
      const config = { headers: { Authorization: AuthService.getToken() } };
      axios.get(`http://localhost:8081/store`, config)
        .then((response) => {
        if (response.status === 200) {
            this.storeConfig.logo = response.data.storeLogoPath

        } else {
            ElMessage.error('Erro ao receber config da empresa:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
    });
    },
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
  .logo-container{
    width: 25rem;
    margin-bottom: 20px;
    height: 15rem;
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
      background-color: var(--tertiary-color);
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
    font-family: josefin;
    font-size: 4rem;
    font-weight: 400;   
}
h2 {
  text-align: center;
  margin-top: 20px;
  color: var(--cta-color);
  font-weight: 400;

  .voltar{
    display: flex;
    align-items: center;
  }
}
</style>