<template>
    <div class="user-edit-container">
      <h1>Edit Your Data</h1>
      <el-form :model="user" label-width="150px">
        <el-form-item class="label" label="Name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
  
        <el-form-item class="label" label="Email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
  
        <el-form-item class="label" label="Phone Number">
          <el-input v-model="user.phoneNumber"></el-input>
        </el-form-item>
  
        <el-form-item class="label" label="CPF">
          <el-input v-model="user.cpf"></el-input>
        </el-form-item>

        <el-form-item class="label" label="Senha Atual">
          <el-input v-model="user.currentPassword"></el-input>
        </el-form-item>

        <el-form-item class="label" label="Nova Senha">
          <el-input v-model="user.newPassword"></el-input>
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="saveUser">Save</el-button>
        </el-form-item>
      </el-form>
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
        }
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
            ElMessage.error('Error loading user data.');
            console.error('Error:', error);
          });
      },
      saveUser() {
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios.put('http://localhost:8081/users/update-user', this.user, config)
          .then((response) => {
            if (response.status === 204) {
              ElMessage.success('User data updated successfully!');
              this.$router.push('/perfil');
            } else {
              console.error('Error updating user data:', response.statusText);
            }
          })
          .catch((error) => {
            ElMessage({
              message: 'Error updating user data.',
              type: 'error',
            });
            console.error('Error:', error);
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

.user-edit-form {
  max-width: 400px;
  margin: 0 auto;
}

/* el-form-item {
  width: 200px;
} */

.user-edit-form .el-form-item {
  margin-bottom: 15px;
}

.user-edit-form .el-button {
  width: 100%;
}

.user-edit-form .el-input {
  width: 100%;
}

.user-edit-form .el-input__inner {
  border-radius: 5px;
}

/* .label {
  width: 300px;
} */

</style>