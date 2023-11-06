<template>
  <div class="container">
    <userNavbar />
    <div class="user-info" v-if="user">
      <h1 class="info-title">Seja bem-vindo {{ user.name }}!</h1>
      <h1 class="section-title">Seus dados:</h1>
      <div class="info-box">
        <h2 class="info-item title">Email: </h2>
        <h2 class="info-item text">{{ user.email }}</h2>
      </div>
      <div class="info-box">
        <h2 class="info-item title">CPF: </h2>
        <h2 class="info-item text">{{ formatCPF(user.cpf) }}</h2>
      </div>
      <div class="info-box">
        <h2 class="info-item title">Telefone: </h2>
        <h2 class="info-item text">{{ formatPhoneNumber(user.phoneNumber) }}</h2>
      </div>
    </div>
    <div v-else class="loading-message">
      Loading user information...
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import userNavbar from '@/components/user/userNavbar.vue'
import AuthService from '@/store/authService.js';

export default {
    components: {
        userNavbar,
    },
    data() {
      return {
        user: {},
      };
    },
    created() {
      AuthService.shouldRedirectToLogin(this.$router);
      this.getUserInfo();
    },
    methods: {
    getUserInfo() {
      const config = { headers: { Authorization: AuthService.getToken() } };

      axios.get('http://localhost:8081/users/user-info', config)
        .then((response) => {
          this.user = response.data;
          ElMessage.success('User loaded successfully!');
          this.$emit('user-loaded', this.user.name); // Emitir o nome do usuário para a Navbar
        })
        .catch((error) => {
          ElMessage.error('Error loading user.');
          console.error('Error:', error);
        });
    },
    formatPhoneNumber(phoneNumber) {
      if (!phoneNumber) return '';
      return `+55 (${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2, 7)}-${phoneNumber.substring(7)}`;
    },
    formatCPF(cpf) {
      if (!cpf) return '';
      return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
    },
  },
}
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

.section-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.info-box {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
}

.info-item {
  font-size: 18px;
  /* font-weight: bold; */
  margin: 0;
}

.text {
  font-weight: 400;
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

.loading-message {
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}
</style>