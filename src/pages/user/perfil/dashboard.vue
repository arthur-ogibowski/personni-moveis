<template>
  <div class="container">
    <h1 class="page-title">Minha Conta</h1>
    <el-tabs class="profile-links" v-model="activeName" @tab-click="handleClick">

      <el-tab-pane label="Geral" name="dashboard">
        <div class="dashboard-container">
          <div class="dashboard-left">
            <div class="user-info">
              <h2>Meus dados</h2>
  
              <div class="info-box">
                <h3 class="info-item title">Email: </h3>
                <h3 class="info-item text">{{ user.email }}</h3>
              </div>
              <div class="info-box">
                <h3 class="info-item title">CPF: </h3>
                <h3 class="info-item text">{{ formatCPF(user.cpf) }}</h3>
              </div>
              <div class="info-box">
                <h3 class="info-item title">Telefone: </h3>
                <h3 class="info-item text">{{ formatPhoneNumber(user.phoneNumber) }}</h3>
              </div>
              <el-button class="cta" type="primary" @click="activeName = 'configuracoes'">Editar</el-button>  
            </div>
            <el-text class="sair-text" type="info" @click="handleLogout">Fazer logout</el-text>
          </div>
          <div class="dashboard-right">
            <div class="dashboard-enderecos">
              <h2> Meus Endereços </h2>
              <el-table :data="enderecosDash" style="width: 100%">
                <el-table-column prop="addressNickname" label="Apelido" width="*" />
                <el-table-column label="Rua" width="*">
                  <template #default="{ row }">
                    <span>{{ row.street }}, {{ row.number }}, {{ row.details }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="cep" label="CEP" width="*" />
                <el-table-column prop="city" label="Cidade" width="*" />
                <el-table-column prop="state" label="Estado" width="*" />
              </el-table>
              <el-button class="cta" type="primary" @click="activeName = 'enderecos'">Ver todos</el-button>
            </div>
            <div class="dashboard-pedidos">
              <h2> Meus Pedidos </h2>
              <el-table :data="pedidosDash" style="width: 100%">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
              </el-table>
              <el-button class="cta" type="primary" @click="activeName = 'pedidos'">Ver todos</el-button>
            </div>

          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Pedidos" name="pedidos"></el-tab-pane>
      <el-tab-pane label="Configurações" name="configuracoes"></el-tab-pane>
      <el-tab-pane label="Endereços" name="enderecos"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import AuthService from '@/store/authService.js';
import { ElMessage } from 'element-plus';

export default {
    data() {
      return {
        user: {
        },
        enderecosDash:[
        ],
        activeName: 'dashboard'
      };
    },
    created() {
      AuthService.shouldRedirectToLogin(this.$router);
      //this.getUserInfo();
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

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";


div.dashboard-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 20px;

  div.dashboard-left{
    flex-basis: 30%;
  }
  div.dashboard-right{
    flex-basis: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    div.dashboard-enderecos, div.dashboard-pedidos{
      width: 100%;
      background-color: $primary-color;
      border: 1px solid $grey-border;
      margin-bottom: 50px;
      padding: 20px;

    }
  }

}
h2{
        font-size: 2rem;
        font-weight: 400;
        margin-top: 0;
      }
.user-info {
  background-color: $primary-color;
  padding: 20px;
  border: 1px solid $grey-border;
  margin-bottom: 20px;
  box-shadow: none !important;
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
  font-size: 14px;
  /* font-weight: bold; */
  margin: 0;
}

.text {
  font-weight: 400;
}

.title {
  font-size: 16px;
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
}

.cta{
  margin-top: 20px;
}
.sair-text{
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  text-decoration: underline;
  margin-top: 20px;
  cursor: pointer;
  display: inline-block;
  width: 100%;
}
</style>