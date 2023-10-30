<template>
    <div class="container">
      <userNavbar />
      <div class="user-info">
        <h1 class="info-title">Seus Endereços</h1>
        <div v-for="address in addresses" :key="address.addressId" class="address-summary">
          <h2>{{ address.addressNickname }}</h2>
          <p>{{ address.street }}, {{ address.number }}, {{ address.district }}, {{ address.city }}, {{ address.state }}, {{ address.CEP }}</p>
          <el-button @click="editAddress(address)">Editar</el-button>
          <el-button @click="deleteAddress(address)">Excluir</el-button>
        </div>
        <router-link to="/adicionar-endereco">
          <el-button type="primary">Adicionar Novo Endereço</el-button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import AuthService from '@/store/authService.js';
  import userNavbar from '@/components/user/userNavbar.vue';
  
  export default {
    components: {
      userNavbar,
    },
    data() {
      return {
        addresses: [], // Lista de endereços do usuário
      };
    },
    created() {
      AuthService.shouldRedirectToLogin(this.$router);
      this.loadAddresses();
    },
    methods: {
      loadAddresses() {
        // Faça uma solicitação ao servidor para carregar a lista de endereços do usuário
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios.get('http://localhost:8081/users/get-user-address', config)
          .then((response) => {
            this.addresses = response.data;
          })
          .catch((error) => {
            ElMessage.error('Erro ao carregar endereços.');
            console.error('Erro:', error);
          });
      },
      editAddress(address) {
        this.$router.push(`/editar-endereco/${address.addressId}`);
      },
      deleteAddress(address) {
        // Implementar lógica de exclusão de endereço
      },
    },
  };
  </script>
  
  <style>
  .container {
    padding: 20px;
  }
  
  .user-info {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }
  
  .info-title {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .address-summary {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
  }
  
  .address-summary h2 {
    font-size: 18px;
    font-weight: bold;
  }
  
  .address-summary p {
    font-size: 16px;
  }
  
  .address-summary el-button {
    margin-right: 10px;
  }
  
  .after-cep {
    /* Estilos para a seção de endereço após a consulta do CEP */
  }
  </style>