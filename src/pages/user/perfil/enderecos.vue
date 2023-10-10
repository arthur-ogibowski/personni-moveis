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
          <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="endereco" label="Endereço" width="*"/>
              <el-table-column prop="type" label="Tipo"/>
              <el-table-column >
                <el-button plain>Detalhes</el-button>
              </el-table-column>
          </el-table>
        </div>
      </div>

      <div class="endereco" >
        <h1>Endereço de entrega</h1>
        <el-form :model="endereco">
          <el-form-item label="Apelido">
                <el-input v-model="endereco.addressNickname" v-mask="'#####-###'" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="CEP">
                <el-input v-model="endereco.cep" @blur="consultarCEP" v-mask="'#####-###'" maxlength="9"></el-input>
            </el-form-item>
            <el-form-item label="Rua">
                <el-input v-model="endereco.street" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Número">
                <el-input v-model="endereco.number"></el-input>
            </el-form-item>
            <el-form-item label="Complemento">
                <el-input v-model="endereco.details"></el-input>
            </el-form-item>
            <el-form-item label="Bairro">
                <el-input v-model="endereco.district" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Cidade">
                <el-input v-model="endereco.city" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="Estado">
                <el-input v-model="endereco.state" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
      </div>
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
        renderNewAddressTable: false,
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
        tableData: [
          {
            //Rua Emanoel Ernesto Bertoldi Campo de Santana 2202 sobrado cinza Curitiba, PR, BR - 81490-532 Tel: (41) 3333-333
            endereco: '',
            tipo: 'Entrega',
          }
        ],
        token: {
          userId: ''
        }
      }
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
        const config = { headers: { Authorization: AuthService.getToken() } }
        
        axios.post('http://localhost:8081/users/create-new-address', this.endereco, config)
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
        axios.get(`http://localhost:8081/users/get-user-address/${AuthService.getTokenClaim('userId')}`)
          .then(response => {
            this.tableData = response.data;
          })
          .catch(error => {
            ElMessage.error('Erro ao adquirir endereços cadastrados.');
            console.log('Erro ao adquirir endereços: ', error);
          });
      }
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
