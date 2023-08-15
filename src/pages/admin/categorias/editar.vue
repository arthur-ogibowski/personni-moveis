<template>
    <div class="admin-container">
      <h1><router-link class="underline-router" to="/admin/categorias">Categorias</router-link > > Editar</h1>
      <el-form :model="form" label-width="120px">
          <el-form-item label="Nome do produto">
              <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="Descrição">
              <el-input v-model="form.description"></el-input>
          </el-form-item>
          <el-form-item label="Preço">
              <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="Estoque">
              <el-input v-model="form.stock"></el-input>
          </el-form-item>
          <el-form-item label="Categorias">
              <el-select v-model="form.categories" multiple placeholder="Selecione">
                  <el-option label="Categoria 1" value="1"></el-option>
                  <el-option label="Categoria 2" value="2"></el-option>
                  <el-option label="Categoria 3" value="3"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="Imagem">
              <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button size="small" type="primary">Fazer upload</el-button>
                  <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">Salvar</el-button>
          </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
      data() {
          return {
              form: {
                  name: '',
                  description: '',
                  price: '',
                  stock: '',
                  categories: [],
                  image: ''
              },
              fileList: [
                  {
                      name: 'food.jpeg',
                      url: 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_67908583.jpg'
                  },
                  {
                      name: 'food2.jpeg',
                      url: 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_67908583.jpg'
                  }
              ]
          }
      },
  
  }
  </script>
  
  <style>
  
  </style>