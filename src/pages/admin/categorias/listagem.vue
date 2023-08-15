<template>
    <div class="admin-container">
      <h1>Categorias</h1>
      <el-button class="admin-cta" color="$admin-cta">+ Novo produto</el-button>
  
      <el-table :data="tableData" style="width: 100%;" class="admin-table">
          <el-table-column type="selection" width="50"/>
          <el-table-column prop="id" label="ID" sortable width="80" />
          <el-table-column prop="nome" label="Nome" sortable width="250"/>
          <el-table-column prop="quantidade" sortable label="Produtos Cadastrados" width="250"/>
          <el-table-column prop="criacao" sortable label="Possibilitar Criação"/>
          <el-table-column prop="acoes" label="Ações"> 
              <el-button class="table-edit" color="#A8A8A8" to="/admin/categorias/:id" plain>Editar</el-button>
              <el-button class="table-delete" color="#F56C6C" plain>...</el-button>
          </el-table-column>
    </el-table>
  
    </div>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <script setup>
  const tableData = [
    {
      id: '1',
      nome: 'CATEGORIA 1',
      quantidade: '23',
    },
    {
      id: '2',
      nome: 'CATEGORIA 2',
      quantidade: '12',
    }
  ]
  </script>
  
  <style>
  
  </style>