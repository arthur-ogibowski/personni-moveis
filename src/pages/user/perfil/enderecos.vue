<template>
    <div class="container">
      <userNavbar />
  
  
      <div class="perfil-content">

        <div class="enderecos-left">
            <h1 class="page-title">Meus endereços</h1>
            <p>Adicione, remova e edite seus endereços de entrega e de cobrança.</p>
            <el-button plain>Novo endereço</el-button>

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
    </div>
  </template>
  
  <script lang="ts">
  import userNavbar from '@/components/user/userNavbar.vue'
  export default {
      components: {
          userNavbar,
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
  <script lang="ts" setup>
  const tableData = [
    {
      id: 1,
      endereco: 'Rua Emanoel Ernesto Bertoldi Campo de Santana 2202 sobrado cinza Curitiba, PR, BR - 81490-532 Tel: (41) 3333-333',
      tipo: 'Entrega',
    },
    {
      id: 2,
      endereco: 'Rua Emanoel Ernesto Bertoldi Campo de Santana 2202 sobrado cinza Curitiba, PR, BR - 81490-532 Tel: (41) 3333-333',
      tipo: 'Entrega',
    },
    
  ]
  </script>
