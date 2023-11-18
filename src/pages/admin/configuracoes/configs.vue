<template>
    <div class="admin-container">
      <h1><router-link class="underline-router" to="/admin/configuracoes">Configurações</router-link></h1>
      <el-form :model="user" label-width="*" label-position="top">
        <h2>Configurações do Site</h2>
        <el-form-item label="Nome da Empresa">
          <el-input v-model="user.storeName"></el-input>
        </el-form-item>
        <el-form-item label="Logomarca da Empresa">
          <el-input v-model="user.storeLogoPath"></el-input>
        </el-form-item>
        <el-form-item label="Email da Empresa">
          <el-input v-model="user.storeEmail"></el-input>
        </el-form-item>
        <el-form-item label="Sobre Nós">
          <el-input v-model="user.aboutUsInfo"></el-input>
        </el-form-item>
        <el-form-item label="Contato da Empresa">
          <el-input v-model="user.storePhone"></el-input>
        </el-form-item>
        <el-form-item label="Cor Primária do Site">
            <el-color-picker class="cor-pick" v-model="user.primaryColor" show-alpha :predefine="predefineColors" />
        </el-form-item>
        <el-form-item label="Cor Secundária do Site">
            <el-color-picker v-model="user.secondaryColor" show-alpha :predefine="predefineColors" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="editarUsuario">Salvar</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>

  <script>
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import AuthService from '@/store/authService';
  
  export default {
    data() {
      return {
        user: {
          storeId: "",
          storeName: "",
          storeLogoPath: "",
          storeEmail: "",
          aboutUsInfo: "",
          storePhone: "",
          primaryColor: "",
          secondaryColor: "",
        }
      }
    },
    mounted() {
        // this.user.storeId = 1;
        const config = { headers: { Authorization: AuthService.getToken() } };
      // Fazer uma solicitação GET para buscar dados do usuário por ID
      axios.get(`http://localhost:8081/store`, config)
        .then((response) => {
        if (response.status === 200) {
            this.user = response.data;
            console.log('Dados recebidos do backend:', this.user);
        } else {
            ElMessage.error('Erro ao buscar dados da API:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
    });
    },
    methods: {
      editarUsuario() {
        this.user.storeId = 1;
        console.log('Dados a serem enviados:', this.user);

        const config = { headers: { Authorization: AuthService.getToken() } };

        axios.put(`http://localhost:8081/store/update-store`, this.user, config)
          .then((response) => {
            if (response.status === 200) {
              console.log('Usuário editado com sucesso', response.data);
              this.$router.push('/admin/configuracoes');
            } else {
              console.error('Erro ao editar dados de configuração:', response.statusText);
            }
          })
          .catch((error) => {
            console.error('Erro ao editar usuário:', error);
          });
      }
    }
  }
  </script>

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";
hr{
  border: 1px solid $admin-grey;
  margin: 30px 0;
}
.el-input.section-input {
    width: 50%;
}
.elements{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.element-card{
    border: 2px solid $admin-grey;
    padding: 0 20px 20px 20px;
    width: 300px;
    margin: 20px 20px 0 0;
    h2{
        text-align: center;
        color: $admin-grey;
    }
}

.cor-pick {
    background-color: #000;
}
</style>