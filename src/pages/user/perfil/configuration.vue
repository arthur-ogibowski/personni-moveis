<template>
    <div class="container">
      <div class="user-info">
        <h1 class="info-title">Suas configurações de conta</h1>
        <!-- <h1 class="section-title">Seus dados:</h1> -->
        <div class="info-box">
          <h2 class="info-item title">Name: </h2>
          <el-input v-model="user.name"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Email: </h2>
          <el-input v-model="user.email"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">CPF: </h2>
          <el-input v-model="user.cpf"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Telefone: </h2>
          <el-input v-model="user.phoneNumber"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Senha Atual: </h2>
          <el-input v-model="user.currentPassword"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Nova Senha: </h2>
          <el-input v-model="user.newPassword"></el-input>
        </div>
        <el-button type="primary" @click="saveUser">Salvar</el-button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import AuthService from '@/store/authService.js';
  
  export default {
    data() {
      return {
        user: {
          name: "",
          email: "",
          phoneNumber: "",
          cpf: "",
          currentPassword: "",
          newPassword: ""
        },
      };
    },
    created() {
      AuthService.shouldRedirectToLogin(this.$router);
      this.updateUserInfo();
    },
    methods: {
      updateUserInfo() {
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios.get('http://localhost:8081/users/user-info', config)
          .then((response) => {
            this.user = response.data;
          })
          .catch((error) => {
            ElMessage.error('Erro ao carregar os dados do usuário.');
            console.error('Erro:', error);
          });
      },
      saveUser() {
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios.put('http://localhost:8081/users/update-user', this.user, config)
          .then((response) => {
            if (response.status === 204) {
              ElMessage.success('Dados do usuário atualizados com sucesso!');
              this.$router.push('/perfil');
            } else {
              console.error('Erro ao atualizar os dados do usuário:', response.statusText);
            }
          })
          .catch((error) => {
            ElMessage({
              message: 'Erro ao atualizar os dados do usuário.',
              type: 'error',
            });
            console.error('Erro:', error);
          });
      },
    },
  };
  </script>
  
  <style>
  .user-edit-container {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .user-info {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .section-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .info-box {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 26px;
  }
  
  .info-item {
    font-size: 18px;
    margin: 0;
  }
  
  .title {
    font-size: 18px;
    padding-right: 20px;
    width: 100px;
  }
  
  .info-title {
    text-align: center;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  </style>