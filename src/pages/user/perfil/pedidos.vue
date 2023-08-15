<template>
  <div class="container">
    <userNavbar />

    <div class="perfil-content">
        <el-table :data="tableData" class="perfil-table" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
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
    date: '2016-05-03',
    name: 'Arthur',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Gabriel',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Aguinaldo',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
</script>

<style>

</style>