<template>
  <div class="container">
    <userNavbar />


    <div class="perfil-content">
      <h1 class="page-title">Meus pedidos</h1>
        <el-table :data="tableData" class="perfil-table" style="width: 100%">
            <el-table-column prop="id" label="#" width="100" />
            <el-table-column prop="data" label="Data" />
            <el-table-column prop="produtos" label="Produtos"/>
            <el-table-column prop="pagamento" label="Método de pagamento" />
            <el-table-column prop="valor" label="Valor total" />
            <el-table-column prop="status" label="Status" />
            <el-table-column>
              <el-button plain>Detalhes</el-button>
            </el-table-column>
        </el-table>
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
<script lang="ts" setup>
const tableData = [
  {
    id: 1,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 2,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 3,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 4,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 5,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 6,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 7,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  {
    id: 8,
    data: '15/04/2023',
    produtos: 'Cadeira Eames, Mesa de Jantar, Rack',
    pagamento: 'Cartão de crédito',
    valor: 'R$ 1.300,00',
    status: 'Aguardando pagamento'
  },
  
]
</script>

<style>

</style>