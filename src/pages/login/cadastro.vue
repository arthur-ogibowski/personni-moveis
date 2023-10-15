<template>
  <div class="container login">
    <div class="side-image"></div>
    <div class="login-dialog">
          <h1>Crie sua Conta</h1>
            <div class="cadastro-form">
              <el-form-item class="input-label" label="Nome">
                <el-input v-model="cadastro.name" size="large" placeholder="Nome"/>
              </el-form-item>
              <el-form-item class="input-label" label="Email">
                <el-input v-model="cadastro.email" size="large" placeholder="Email" />
              </el-form-item>
              <el-form-item class="input-label" label="CPF">
                <el-input v-model="cadastro.cpf" size="large" placeholder="CPF" />
              </el-form-item>
              <el-form-item class="input-label" label="Telefone">
                <el-input v-model="cadastro.phoneNumber" size="large" placeholder="Telefone" />
              </el-form-item>
              <el-form-item class="input-label" label="Senha">
                <el-input type="password" v-model="cadastro.password" size="large" placeholder="Senha" />
              </el-form-item>
            </div>
                <el-button color="#343434" size="large" :loading-icon="Eleme" :loading="carregando" v-on:click="cadastrarUsuario()">Criar Conta</el-button>
        </div>
  </div>

</template>

<script>
import axios from 'axios';

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
            carregando: false
        }
    },
    methods: {
        cadastrarUsuario() {
            axios.post('http://localhost:8081/users/create-account', this.cadastro)
            .then(response => {
          if (response.status === 201) {
            // Colocar tela de cadastro concluido ou algum aviso
            this.$router.push('/login');
          } else {
            console.error('Erro ao realizar cadastro. Código de status:', response.status);
          }
        })
        .catch(error => {
          console.error('Erro ao realizar cadastro:', error);
        })
    }
  }
};
</script>

<style lang="scss" scoped>

div.login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #112620;
}

.container {
  width: auto;
  padding: 5%;
}

div.side-image{
    background-color: black;
}

div.login-dialog{
    background: #FCFAF1;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.20);
    margin: 160px;
    margin-top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 960px;
    height: 820px;
    padding: 60px;
    margin-bottom: 0;
    :deep(.el-input), :deep(.el-button){
         width: 330px;
         height: 56px;
         margin: 25px;
         color: #FCFAF1;
    }
}

.cadastro-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.cadastro-form .input-label {
  width: 48%;
  margin-bottom: 1rem;
}

.cadastro-form .input-label:last-child {
  width: 100%;
}

h1{
    color: #112620;
    text-align: center;
    font-family: Inter;
    font-size: 41px;
    font-style: normal;
    font-weight: 700;   
    line-height: normal;
}

.cadastro-form {
  margin: 5%;
}

.input-label {
  display: flex;
  flex-direction: column;
  align-items: start;
  font-size: var(--font-size);
}

</style>