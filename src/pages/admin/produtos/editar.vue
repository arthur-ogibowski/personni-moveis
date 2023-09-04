<template>
  <div class="admin-container">
    <h1><router-link class="underline-router" to="/admin/produtos">Produtos</router-link> > Editar</h1>
    <el-form :model="form" label-width="120px">
        <el-form-item label="Nome do produto">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Preço">
            <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="Estoque">
            <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="Descrição">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="Detalhes">
            <el-select v-model="form.details" multiple placeholder="Selecione">
            </el-select>
        </el-form-item>
        <el-form-item label="Materiais">
            <el-select v-model="form.materials" multiple placeholder="Selecione">
            </el-select>
        </el-form-item>
        <el-form-item label="Tags">
            <el-select multiple
                       filterable
                       collapse-tags
                       v-model="form.tags" placeholder="Selecione">
                       <el-option
                            v-for="tag in form.tags"
                            :key="tag.tagId"
                            :label="tag.tagName"
                            :value="tag.tagId"/>
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
        <el-form-item label="Personalizável">
            <el-switch inline-prompt active-text="Sim" inactive-text="Não" v-model="form.editable"></el-switch>
        </el-form-item>
        <el-form-item label="Seções">
            <el-select v-model="form.sections" multiple placeholder="Selecione">
            </el-select>
        </el-form-item>
        <el-form-item>
            <template #default="scope">
                <el-button type="primary" @click="editProduct">Editar</el-button>
            </template>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

//const ruleFormRef = ref<FormInstance>();

export default {
    data() {
        return {
            form: {
                name: '',
                price: 0,
                stock: 0,
                description: '',
                editable: true,
                image: '',
                secondaryImages: {
                    imgId: 0,
                    imgIndex: 0,
                    imgUrl: ''
                },
                details: {
                    detailId: 0,
                    detailField: '',
                    detailContent: ''
                },
                materials: {
                    materialId: 0,
                    materialName: '',
                    price: 0,
                    imgUrl: ''
                },
                sections: {
                    sectionId: 0,
                    name: '',
                    imgUrl: '',

                },
                tags: {
                    tagId: 0,
                    tagName: ''
                },
            },
            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_67908583.jpg'
                }
            ]
        }
    },
    created() {
        // Id é adquirido do parâmetro da URL.
        const productId = this.$route.params.id;
        if (productId != null) {
            // Faz requisição para adquirir produto "convencional" se o id não for nulo.
            axios.get('http://localhost:8081/products/' + productId)
                .then(response => {
                    const product = response.data;
                    // Preencha o formulário com os dados do produto
                    this.form.name = product.name;
                    this.form.price = product.value;
                    this.form.stock = product.quantity;
                    this.form.description = product.description;
                    this.form.editable = product.editable;
                    this.form.image = product.image;
                    this.form.description = product.description;
                    this.form.details = product.details;
                    this.form.materials = product.materials;
                    this.form.sections = product.sections;
                })
                .catch(error => {
                    console.error('Erro ao obter dados da API:', error);
                });
            //Adquire todas as tags desse produto
            axios.get('http://localhost:8081/products/' + productId + '/tags')
                .then(response => {
                    this.form.tags = response.data;
                }).catch(error => {
                    console.error('Erro ao obter tags do produto:', error);
                });
        }
    },
    methods: {
        editProduct() {
            // Adquirindo id da URL.
            const productId = this.$route.params.id;
            if(productId != null) {
                // Se id do produto na URl não é nulo, manda requisição para editar produto.
                axios.put('http://localhost:8081/category/save-full-product/?productId=' + productId, this.form)
                .then(response => {
                    ElMessage({
                        message: 'Produto editado com sucesso!',
                        type: 'success',
                    });
                    console.log(Object.values(response.data));
                })
                .catch(error => {
                    ElMessage.error('Erro ao editar produto! Entre em contato com os administradores do sistema.')
                    console.error('Erro ao editar produto:', error);
                    console.log(JSON.stringify(this.form));
                });

                // A fazer.. Se o produto estiver fora de estoque, fica indisponível. Se retornar ao estoque, os clientes que tem o produto na lista de espera devem receber uma notificação via email.
            }
        }
    }
}
</script>

<script setup>

</script>

<style>

</style>