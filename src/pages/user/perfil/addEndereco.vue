<template>
    <div class="container">
      <userNavbar />
      <div class="user-info">
        <h1 class="info-title">Adicionar Novo Endereço</h1>
        <form @submit.prevent="addAddress" class="address-form">
          <div class="form-group">
            <label for="addressNickname" class="title">Apelido do Endereço:</label>
            <el-input v-model="newAddress.addressNickname" required />
          </div>
          <div class="form-group">
            <label for="street" class="title">Rua:</label>
            <el-input v-model="newAddress.street" required />
          </div>
          <div class="form-group">
            <label for="number" class="title">Número:</label>
            <el-input v-model="newAddress.number" required />
          </div>
          <div class="form-group">
            <label for="district" class="title">Bairro:</label>
            <el-input v-model="newAddress.district" required />
          </div>
          <div class="form-group">
            <label for="city" class="title">Cidade:</label>
            <el-input v-model="newAddress.city" required />
          </div>
          <div class="form-group">
            <label for="state" class="title">Estado:</label>
            <el-input v-model="newAddress.state" required />
          </div>
          <div class="form-group">
            <label for="CEP" class="title">CEP:</label>
            <el-input v-model="newAddress.cep" required />
          </div>
          <div class="form-group">
            <el-button type="primary" native-type="submit">Adicionar Endereço</el-button>
          </div>
        </form>
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
        newAddress: {
          addressNickname: '',
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          cep: '',
        },
      };
    },
    methods: {
      addAddress() {
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios
          .post('http://localhost:8081/users/create-new-address', this.newAddress, config)
          .then((response) => {
            ElMessage.success('Endereço adicionado com sucesso.');
            this.$router.push('/perfil/enderecos');
          })
          .catch((error) => {
            ElMessage.error('Erro ao adicionar endereço.');
            console.error('Erro:', error);
          });
      },
    },
  };
  </script>

<style scoped>
.user-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.info-title {
  text-align: center;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

.address-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
  width: 100%;
}

.title {
  font-size: 20px; /* Aumente o tamanho do texto (label) */
  padding-right: 20px;
  width: 360px; /* Aumente a largura do label */
}

el-input {
  width: 100%;
  font-size: 16px; /* Aumente o tamanho do texto no input */
}
</style>