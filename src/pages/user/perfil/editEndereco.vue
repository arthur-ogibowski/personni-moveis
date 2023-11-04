<template>
    <div class="container">
      <userNavbar />
      <div class="user-info">
        <h1 class="info-title">Editar Endereço</h1>
        <div class="info-box">
          <h2 class="info-item title">Apelido: </h2>
          <el-input v-model="editedAddress.addressNickname"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Rua: </h2>
          <el-input v-model="editedAddress.street"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Número: </h2>
          <el-input v-model="editedAddress.number"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Bairro: </h2>
          <el-input v-model="editedAddress.district"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Cidade: </h2>
          <el-input v-model="editedAddress.city"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">Estado: </h2>
          <el-input v-model="editedAddress.state"></el-input>
        </div>
        <div class="info-box">
          <h2 class="info-item title">CEP: </h2>
          <el-input v-model="editedAddress.cep"></el-input>
        </div>
        <el-button type="primary" @click="saveAddress">Salvar</el-button>
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
        editedAddress: {
          addressId: null, // O ID do endereço a ser editado
          addressNickname: "",
          street: "",
          number: "",
          district: "",
          city: "",
          state: "",
          cep: ""
        },
      };
    },
    created() {
      AuthService.shouldRedirectToLogin(this.$router);
      // Recupere os dados do endereço com base no ID e atualize editedAddress
      this.getAddressToEdit();
    },
    methods: {
      getAddressToEdit() {
        // Faça uma solicitação ao servidor para carregar os dados do endereço com base no ID
        const addressId = this.$route.params.addressId; // Pode ser recuperado dos parâmetros de rota
        const config = { headers: { Authorization: AuthService.getToken() } };

        console.log("Endereço ID:", addressId);
  
        axios.get(`http://localhost:8081/users/get-user-address/${addressId}`, config)
          .then((response) => {
            console.log("Resposta da API:", response);
            this.editedAddress = response.data;
          })
          .catch((error) => {
            ElMessage.error('Erro ao carregar os dados do endereço.');
            console.error('Erro:', error);
          });
      },
      saveAddress() {
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios.put('http://localhost:8081/users/update-address', this.editedAddress, config)
          .then((response) => {
            if (response.status === 204) {
              ElMessage.success('Dados do endereço atualizados com sucesso!');
              this.$router.push('/perfil/enderecos'); // Redirecione para a lista de endereços
            } else {
              console.error('Erro ao atualizar os dados do endereço:', response.statusText);
            }
          })
          .catch((error) => {
            ElMessage({
              message: 'Erro ao atualizar os dados do endereço.',
              type: 'error',
            });
            console.error('Erro:', error);
          });
      },
    },
  };
  </script>
  
  <style>
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
  </style>