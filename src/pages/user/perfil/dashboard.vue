<template>
  <div class="container">
    <h1 class="page-title">Meu perfil</h1>
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
                <el-table-column prop="orderId" label="Id" width="180" />
                <el-table-column prop="date" label="Date" width="180"/>
                <el-table-column prop="status" label="Status" width="180">
                  <template #default="{ row }">
                  <!-- Mockando o campo status com um texto padrão -->
                    <span>{{ row.status || 'Ativo' }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="totalPrice" label="Preço Total" width="180" />
              </el-table>
              <el-button class="cta" type="primary" @click="activeName = 'pedidos'">Ver todos</el-button>
            </div>

          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Pedidos" name="pedidos"></el-tab-pane>
      <el-tab-pane label="Configurações" name="configuracoes">
        <div>
            <div class="user-info">
              <h1 class="info-title">Suas configurações de conta</h1>
              <!-- <h1 class="section-title">Seus dados:</h1> -->
              <div class="info-box">
                <h2 class="info-item title">Nome: </h2>
                <el-input v-model="editUser.name"></el-input>
              </div>
              <div class="info-box">
                <h2 class="info-item title">Email: </h2>
                <el-input v-model="editUser.email"></el-input>
              </div>
              <div class="info-box">
                <h2 class="info-item title">CPF: </h2>
                <el-input v-model="editUser.cpf"></el-input>
              </div>
              <div class="info-box">
                <h2 class="info-item title">Telefone: </h2>
                <el-input v-model="editUser.phoneNumber"></el-input>
              </div>
              <div class="info-box">
                <h2 class="info-item title">Senha Atual: </h2>
                <el-input v-model="editUser.currentPassword"></el-input>
              </div>
              <div class="info-box">
                <h2 class="info-item title">Nova Senha: </h2>
                <el-input v-model="editUser.newPassword"></el-input>
              </div>
              <el-button type="primary" @click="saveUser">Salvar</el-button>
            </div>
          </div>
      </el-tab-pane>
      <el-tab-pane label="Endereços" name="enderecos">
        <div class="container">
        <userNavbar />
          <div class="user-info">
            <h1 class="info-title">Seus Endereços</h1>
            <div v-if="!showAddAddressForm && !showUserConfigs">
              <div v-for="address in addresses" :key="address.addressId" class="address-summary">
                <h2>{{ address.addressNickname }}</h2>
                <p>{{ address.street }}, {{ address.number }}, {{ address.district }}, {{ address.city }}, {{ address.state }}, {{ address.cep }}</p>
                <el-button @click="editAddress(address)">Editar</el-button>
                <el-button @click="deleteAddress(address)">Excluir</el-button>
              </div>
              <router-link to="/perfil/adicionar-endereco">
                <el-button type="primary" @click="showAddAddressForm = true">Adicionar Novo Endereço</el-button>
              </router-link>
            </div>
          </div>

          <div v-if="showAddAddressForm && !showUserConfigs">
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
          
        </div>
      </el-tab-pane>
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
        user: {},
        enderecosDash:[],
        pedidosDash: [],
        activeName: 'dashboard',
        showAddAddressForm: false,
        showEditAddressForm: false,
        showUserConfigs: false,
        newAddress: {
          addressNickname: '',
          street: '',
          number: '',
          district: '',
          city: '',
          state: '',
          cep: '',
        },
        editUser: {
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
      this.getUserInfo();
      this.loadAddresses();
      this.updateUserInfo();
      this.getPedidos();
      // this.getAddressToEdit();
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

    getPedidos() {
      const config = { headers: { Authorization: AuthService.getToken() } };

      axios.get('http://localhost:8081/orders/client-orders', config) 
        .then((response) => {
          console.log(response);
          this.pedidosDash = response.data;
        })
        .catch((error) => {
          ElMessage.error('Erro ao carregar pedidos.');
          console.error('Erro:', error);
        });
    },

    loadAddresses() {
      // Faça uma solicitação ao servidor para carregar a lista de endereços do usuário
      const config = { headers: { Authorization: AuthService.getToken() } };

      axios.get('http://localhost:8081/users/get-user-address', config)
        .then((response) => {
          this.enderecosDash = response.data;
          this.addresses = response.data;
        })
        .catch((error) => {
          ElMessage.error('Erro ao carregar endereços.');
          console.error('Erro:', error);
        });
    },

    // handleLogout(){  
    //   // Limpar o localStorage
    //   clearLocalStorage();
    // },
    handleLogout() {
      this.$confirm('Tem certeza que deseja sair?', 'Confirmação', {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        // Usuário confirmou a saída, então faz o logout
        AuthService.clearToken();
        clearLocalStorage();
        this.$router.push({ path: '/login' });
      }).catch(() => {
        // Usuário cancelou a saída, não faz nada
      });
    },

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

      updateUserInfo() {
        const config = { headers: { Authorization: AuthService.getToken() } };
  
        axios.get('http://localhost:8081/users/user-info', config)
          .then((response) => {
            this.editUser = response.data;
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

      deleteAddress(address) {
      // Implementar lógica de exclusão de endereço
      const config = { headers: { Authorization: AuthService.getToken() } };
      axios.delete(`http://localhost:8081/users/delete-user-address/${address.addressId}`, config)
      .then(response => {
        this.addresses = response.data;
        ElMessage.success('Endereço deletado com Sucesso!')  
      setTimeout(() => {
            window.location.reload()
      }, 2000);
    })
    .catch(error => {
      ElMessage.error('Erro ao deletar Usuário');
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

// Função para limpar o localStorage
function clearLocalStorage() {
  localStorage.clear();
  console.log('localStorage limpo.');
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