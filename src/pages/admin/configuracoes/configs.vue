<template>
    <div class="admin-container">
      <h1>Configurações</h1>
      <el-form :model="user" label-width="*" label-position="top">
        <h2>Configurações da empresa</h2>
        <el-form-item label="Nome da Empresa">
          <el-input v-model="user.storeName"></el-input>
        </el-form-item>
        <div class="images">
          <el-form-item label="Logomarca da Empresa">
            <el-upload class="avatar-uploader" :auto-upload="false" limit="1" @change="handleImageChange">
                <img v-if="user.storeLogoPath" :src="user.storeLogoPath" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Upload />
                </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="Logomarca alternativa da Empresa">
            <el-upload class="avatar-uploader" :auto-upload="false" limit="1" @change="handleImageChange">
                <img v-if="user.storeSecondaryImgPath" :src="user.storeSecondaryImgPath" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Upload />
                </el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="Placeholder para produtos sem imagem">
            <el-upload class="avatar-uploader" :auto-upload="false" limit="1" @change="handleImageChange">
                <img v-if="user.storeTertiaryImgPath" :src="user.storeTertiaryImgPath" class="avatar" />
                <el-icon v-else class="avatar-uploader-icon">
                    <Upload />
                </el-icon>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item label="Email da Empresa">
          <el-input v-model="user.storeEmail"></el-input>
        </el-form-item>
        <el-form-item label="Sobre Nós">
          <el-input v-model="user.aboutUsInfo" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="Contato da Empresa">
          <el-input v-model="user.storePhone"></el-input>
        </el-form-item>
        <el-form-item label="Endereço da Empresa">
          <!--<vue-google-autocomplete
            id="address-input"
            placeholder=""
            v-on:placechanged="getAddressData"
            :options="options"
            class="el-input el-input_wrapper"
          ></vue-google-autocomplete>-->
        <div id="infowindow-content">
          <span id="place-name" class="title"></span><br />
          <span id="place-address"></span>
        </div>
        </el-form-item>
        <h2>Configurações do site</h2>
        <el-form-item label="Cor principal do Site">
            <el-color-picker class="cor-pick" v-model="user.primaryCollor" color-format="hex" />
            <h2>{{ user.primaryCollor  }}</h2>
        </el-form-item>
        <el-form-item label="Cor secundária do Site">
            <el-color-picker v-model="user.secondaryCollor" class="cor-pick" color-format="hex" />

            <h2>{{ user.secondaryCollor   }}</h2>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="cta" @click="editarUsuario">Salvar</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>


  <script>
  import axios from 'axios';
  import { ElMessage } from 'element-plus';
  import AuthService from '@/store/authService';
  //import VueGoogleAutocomplete from "vue-google-autocomplete";
  
  export default {
    //components: { VueGoogleAutocomplete },
    data() {
      return {
        user: {
          storeId: "1",
          storeName: "Personni móveis",
          storeLogoPath: "",
          storeSecondaryImgPath: "",
          storeTertiaryImgPath: "",
          storeEmail: "personni@gmail.com",
          aboutUsInfo: "Bem-vindo à Personni móveis, onde a personalização e modelagem de móveis são a essência do nosso trabalho. Transformamos espaços com soluções sob medida, refletindo o estilo de cada cliente. ",
          storeAddress: "",
          storePhone: "41 99999-9999",
          primaryCollor: " var(--cta-color) ",
          secondaryCollor: " var(--tertiary-color)",
        },
        options: {
          types: ["geocode"]
        },
      }
    },
    mounted() {

      /*const mapsScript = document.createElement('script');
      mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAN8WuBocaymoMHLv-iSkench1O6hVrOVY&libraries=places';
      document.body.appendChild(mapsScript);*/

      

        // this.user.storeId = 1;
        const config = { headers: { Authorization: AuthService.getToken() } };
      // Fazer uma solicitação GET para buscar dados do usuário por ID
      axios.get(`http://localhost:8081/store`, config)
        .then((response) => {
        if (response.status === 200) {
            this.user = response.data;
            if (this.user.primaryCollor === null || this.user.primaryCollor === '') {
                this.user.primaryCollor = 'var(--cta-color)';
            }
            if (this.user.secondaryCollor === null || this.user.secondaryCollor === '') {
                this.user.secondaryCollor = 'var(--tertiary-color)';
            }
            console.log('Dados recebidos do backend:', this.user);
        } else {
            ElMessage.error('Erro ao buscar dados da API:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
    });
    },
    computed: {
      /*autocomplete() {
        const autocomplete = new google.maps.places.Autocomplete(
          input,
          options
        );
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry || !place.geometry.location) {
            return;
          }
          this.user.storeAddress = place.formatted_address;
        });
        
      }*/
    },
    methods: {
      getAddressData(place) {
        // Handle the selected place data
        console.log(place);
      },
      editarUsuario() {
        this.user.storeId = 1;
        console.log('Dados a serem enviados:', this.user);

        const config = { headers: { Authorization: AuthService.getToken() } };

        axios.put(`http://localhost:8081/store/update-store  `, this.user, config)
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
h1{
  margin: 0 0 2.5% 0 !important;
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
    background-color: #000 !important;
}
.el-form-item__content{
  h2{
    color: $text-color;
    margin: 0 5px;
    font-weight: 400;
  }
}
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

:deep(.el-upload) {
    border: 1px dashed $admin-grey;

    &:hover {
        border: 1px dashed var(--cta-color);
    }
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    text-align: center;

    &:hover {
        color: var(--cta-color);
    }
}
body :deep(.el-popper.is-light) {
  background-color: $primary-color !important;; 
  border: none;
}

.avatar-uploader .avatar {
    width: 100px;
    height: 100px;
    display: block;
    min-width: 100px;
    min-height: 100px;
}
:deep(.el-color-picker__trigger) {
  height: 100px !important;
  width: 100px !important;
}
.images{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.el-input_wrapper{
  border: 1px solid $grey-border;
}
</style>