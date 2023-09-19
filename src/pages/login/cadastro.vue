<!-- <template>
<div class="cadastrar-se">
  <div class="group-29">
    <div class="rectangle-9"></div>

    <div class="group-75">
      <div class="rectangle-92"></div>

      <div class="email">Email</div>

      <input type="email" class="rectangle-31">

      <svg
        class="rectangle-33"
        width="335"
        height="71"
        viewBox="0 0 335 71"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0H334.542V70.1008H0V0Z" fill="#343434" />
      </svg>

      <div class="senha">Senha</div>

      <input type="text" class="rectangle-32">

      <div class="lorem">Lorem</div> -->

      <!-- <div class="lorem2">Lorem</div> -->

      <!-- <div class="nome-completo">Nome Completo</div>

      <input type="text" class="rectangle-34"> -->

      <!-- <div class="lorem3">Lorem</div> -->

      <!-- <div class="cpf">CPF</div>

      <input type="text" class="rectangle-35"> -->

      <!-- <div class="lorem4">Lorem</div> -->

      <!-- <a href="/login" class="criar-conta">Criar conta</a>

      <div class="crie-sua-conta">Crie sua conta</div>
    </div>
  </div>
</div> -->
<!-- </template> -->

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
            this.$router.push('/');
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
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #CACACA;
}
div.side-image{
    background-color: black;
}

div.login-dialog{
    background: #FCFAF1;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.20);
    margin: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 480px;
    height: 1060px;
    :deep(.el-input), :deep(.el-button){
         width: 330px;
         height: 56px;
         margin: 25px;
         color: #FCFAF1;
    }
}

h1{
    color: #1a2930;
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