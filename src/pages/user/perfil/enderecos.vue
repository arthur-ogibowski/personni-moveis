<template>
  <div class="container">
    <userNavbar />


    <div class="perfil-content">

      <div class="enderecos-left">
          <h1 class="page-title">Meus endereços</h1>
          <p>Adicione, remova e edite seus endereços de entrega e de cobrança.</p>
          <el-button @click="createNewAddress()" plain>Novo endereço</el-button>

      </div>

      <div class="enderecos-right">
        <el-table :data="userAddresses" style="width: 100%">
            <el-table-column prop="endereco" label="Endereço" width="*"/>
            <el-table-column prop="type" label="Tipo"/>
            <el-table-column>
              <el-button plain @click="addressModalVisible = true">Detalhes</el-button>
            </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- Modal de edição e visualização do endereço -->
    <el-dialog v-model="addressModalVisible" title="Editar endereço">    
      <el-form :model="endereco">
        <el-form-item required label="Apelido">
            <el-input v-model="endereco.addressNickname" v-mask="'#####-###'" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item required label="CEP">
            <el-input v-model="endereco.cep" @blur="consultarCEP()" v-mask="'#####-###'" maxlength="9"></el-input>
        </el-form-item>
        <el-form-item required label="Rua">
            <el-input v-model="endereco.street" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item required label="Número">
            <el-input v-model="endereco.number"></el-input>
        </el-form-item>
        <el-form-item label="Complemento">
            <el-input v-model="endereco.details"></el-input>
        </el-form-item>
        <el-form-item required label="Bairro">
            <el-input required v-model="endereco.district" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item required label="Cidade">
            <el-input v-model="endereco.city" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item required label="Estado">
            <el-input v-model="endereco.state" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="removeAddress()">Cancelar</el-button>
          <el-button type="primary" @click="editAddress()">Confirmar</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- <el-dialog v-model="addressModalVisible" title="Seus endereços">
      <div class="endereco" >
        <h1>Endereço de entrega</h1>
        <el-form :model="endereco">
            <el-form-item required label="Apelido">
                <el-input v-model="endereco.addressNickname" v-mask="'#####-###'" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item required label="CEP">
                <el-input v-model="endereco.cep" @blur="consultarCEP()" v-mask="'#####-###'" maxlength="9"></el-input>
            </el-form-item>
            <el-form-item required label="Rua">
                <el-input v-model="endereco.street" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item required label="Número">
                <el-input v-model="endereco.number"></el-input>
            </el-form-item>
            <el-form-item label="Complemento">
                <el-input v-model="endereco.details"></el-input>
            </el-form-item>
            <el-form-item required label="Bairro">
                <el-input required v-model="endereco.district" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item required label="Cidade">
                <el-input v-model="endereco.city" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item required label="Estado">
                <el-input v-model="endereco.state" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
      </div>
    </el-dialog> -->
  </div>
</template>


<script>
import axios from 'axios';
import userNavbar from '@/components/user/userNavbar.vue'
import { ElMessage } from 'element-plus';
import AuthService from '@/store/authService.js';

export default {
  components: {
    userNavbar,
  },
  data() {
    return {
      config: { headers: { Authorization: AuthService.getToken() } },
      addressModalVisible: false,
      endereco: {
        addressNickname: '',
        cep: '',
        street: '',
        number: '',
        details: '',
        district: '',
        city: '',
        state: ''
      },
      editedAddress: {
        ...this.endereco,
        addressId: null,
      },
      userAddresses: [
        {
          //Rua Emanoel Ernesto Bertoldi Campo de Santana 2202 sobrado cinza Curitiba, PR, BR - 81490-532 Tel: (41) 3333-333
          endereco: '',
          tipo: 'Entrega',
          addressId: ''
        }
      ],
    }
  },
  created() {
    // Carrega endereços cadastrados do user.
    //this.getUserAddresses();
  },
  methods: {
    /** Faz requisição para API viacep adquirindo dados do endereço via CEP. */
    consultarCEP() {
      // Verifique se o CEP foi fornecido antes de fazer a solicitação
      if (this.endereco.cep) {
        axios.get(`https://viacep.com.br/ws/${this.endereco.cep}/json/`)
          .then((response) => {
            const data = response.data;
            // Preencha os campos com os dados retornados pela API
            this.endereco.street = data.logradouro;
            this.endereco.district = data.bairro;
            this.endereco.city = data.localidade;
            this.endereco.state = data.uf;                        
          })
          .catch((error) => {
            ElMessage.error('CEP não encontrado.');
          });
      }
    },
    /** Cria endereço com os dados inseridos na modal. */
    createNewAddress() {
      // Adquire o token do usuário logado e prepara config da requisição.
      //const config = { headers: { Authorization: AuthService.getToken() } }
      axios.post('http://localhost:8081/users/create-new-address', this.endereco, this.config)
        .then(response => {
          ElMessage.success("Endereço cadastrado com sucesso!");
          console.log(response.data)
        })
        .catch(error => {
          ElMessage.error("Erro ao cadastrar endereço.");
          console.log('erro: ', error);
        })
    },
    /** Adquire todos endereços cadastrados do usuário. */
    getUserAddresses() {
      // Adquire o token do usuário logado e prepara config da requisição.
      //const config = { headers: { Authorization: AuthService.getToken() } }
      axios.get(`http://localhost:8081/users/get-user-address/`, this.config)
        .then(response => {
          this.userAddresses = response.data;
        })
        .catch(error => {
          ElMessage.error('Erro ao adquirir endereços cadastrados.');
          console.log('Erro ao adquirir endereços: ', error);
        });
    },
    /** Faz req para editar endereço e fecha modal. */
    editAddress() {
      this.addressModalVisible = false;
      //const config = { headers: { Authorization: AuthService.getToken() } }
      axios.post('http://localhost:8081/users/edit-address/', this.editedAddress, this.config)
        .then(response => {
          /** Deleta o item selecionado de qualquer coleção com itens. */
        
          ElMessage.success('Endereço editado com sucesso.');
        }).catch(error => {
          ElMessage.error('Não foi possível editar o endereço.');
        });
    },
    removeAddress(address) {
      this.addressModalVisible = false;
      //const config = { headers: { Authorization: AuthService.getToken() } }
      axios.delete('http://localhost:8081/users/remove-address/', this.editedAddress, this.config)
        .then(response => {
          ElMessage.success('Endereço removido com sucesso.');
        })
        .catch(error => {
          ElMessage.error('Erro ao deletar endereço.');
        })
      // Encontra índice do item a ser removido e faz splice removendo.
      const index = this.endereco.indexOf(address);
      itemList.splice(index, 1);
    },
  }
}
</script>
 
<style scoped lang="scss">
div.perfil-content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div.enderecos-right{
      width: 50vw;
  }
}
</style>
