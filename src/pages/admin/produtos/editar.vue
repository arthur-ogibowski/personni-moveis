<template>
    <div class="admin-container">
        <h1><router-link class="underline-router" to="/admin/produtos">Produtos</router-link> > Adicionar</h1>
        <el-form :model="product" label-width="*" label-position="top">
            <h2>Produto</h2>
            <!-- Categoria -->
            <el-form-item label="Categoria">
                <el-select
                    filterable
                    collapse-tags
                    clearable
                    v-model="this.selectedCategory"
                    placeholder="Selecione">
                    <el-option v-for="category in this.fetchedCategories"
                        :key="category.id"
                        :label="category.name"
                        :value="category.id" />
                </el-select>
            </el-form-item>
            <!-- Nome -->
            <el-form-item required label="Nome">
                <el-input placeholder="Novo produto" v-model="product.name"></el-input>
            </el-form-item>
            <!-- Preço -->
            <el-form-item required label="Preço">
                <el-input-number 
                    :precision="2" 
                    :min="1"
                    controls-position="right"
                    v-model="product.value">
                </el-input-number>
            </el-form-item>
            <!-- Estoque -->
            <el-form-item required label="Estoque">
                <el-input-number 
                    v-model="product.quantity"
                    :min="0"
                    controls-position="right">
                </el-input-number>
            </el-form-item>
            <!-- Descrição -->
            <el-form-item required label="Descrição">
                <el-input 
                    type="textarea" 
                    maxlength= "250"
                    placeholder="Descrição..."
                    show-word-limit
                    v-model="product.description"></el-input>
            </el-form-item>
            <!-- Disponível -->
            <el-form-item required label="Produto esta disponível">
                <el-switch active-text="Sim" inactive-text="Não" v-model="product.available"></el-switch>
            </el-form-item>
            <!-- Detalhes do produto -->
            <h2>Detalhes do produto</h2>
            <div class="elements">
                <div class="element-item" v-for="detail in product.details" v-bind:key="detail">
                    <el-icon v-on:click="removeItem(product.details, detail)" style="margin-right: 35px; float: right; margin-top: 33px; cursor: pointer;" :size="20" color="#FF0000"><CloseBold /></el-icon>
                    <div class="element-card">
                        <h2>{{ detail.fieldContent.toUpperCase() }}</h2>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="Nome do detalhe">
                                    <el-input v-model="detail.fieldContent" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Texto do detalhe">
                                    <el-input 
                                        type="textarea" 
                                        maxlength= "250"
                                        placeholder="Descrição..."
                                        show-word-limit label="Conteúdo"
                                        v-model="detail.detailContent" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <el-button type="primary" v-on:click="newDetail()"><el-icon>
                            <Plus />
                        </el-icon> Detalhe </el-button>
            </div>
            <!-- Tags -->
            <el-form-item label="Tags">
                <el-select
                    filterable
                    clearable
                    multiple
                    allow-create
                    collapse-tags
                    collapse-tags-tooltip
                    :max-collapse-tags="3"
                    v-model="this.selectedTags"
                    placeholder="Selecione">
                    <el-option v-for="tag in this.fetchedTags"
                        :key="tag.tagId"
                        :label="tag.tagName"
                        :value="tag.tagId" />
                </el-select>
            </el-form-item>
            <!-- Material -->
            <el-form-item required label="Material">
                <el-select
                    filterable
                    clearable
                    v-model="this.product.material"
                    placeholder="Selecione">
                    <el-option v-for="material in this.fetchedMaterials"
                        :key="material.materiald"
                        :label="material.materialName"
                        :value="material.materiald" />
                    </el-select>
            </el-form-item>
            <!-- Imagem principal -->
            <el-form-item label="Imagem principal">
                <div>
                    <el-upload
                        :show-file-list="true"
                        :auto-upload="false"
                        limit="1"
                        @change="handleImageChange">
                        <el-button size="small" type="primary">Selecionar Imagem</el-button>
                    </el-upload>
                </div>
            </el-form-item>
            <!-- <el-form-item label="Imagens secundárias">

            </el-form-item> -->
            <hr>
            <h2>Edição</h2>
            <el-form-item label="Possibilitar edição">
                <el-switch v-model="product.editable"></el-switch>
            </el-form-item>

            <div class="criar-content" v-if="product.editable">

                <div class="elements">
                    <div class="element-item" v-for="section in product.sections" v-bind:key="section">


                        <div class="element-card">
                            <el-icon v-on:click="removeItem(product.sections, section)" style="margin-right:-5px; float: right; margin-top: 10px; cursor: pointer;" :size="20" color="#FF0000"><CloseBold /></el-icon>

                            <h2>{{ section.name.toUpperCase() }}</h2>

                            <el-form-item label="Nome">
                                <el-input v-model="section.name"></el-input>
                            </el-form-item>


                            <div class="option-item" v-for="option in section.options" v-bind:key="option">

                                <el-row :gutter="20">
                                    <el-col :span="12">
                                        <el-form-item label="Opção">
                                            <el-input v-model="option.name" size="small"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="Preço">
                                            <el-input v-model="option.price" size="small"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="Imagem">
                                            <el-input v-model="option.image" size="small"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>


                            </div>

                            <el-button type="primary" v-on:click="newOption(section)"><el-icon>
                                    <Plus />
                                </el-icon> Opção</el-button>

                        </div>

                    </div>
                    <el-button type="primary" v-on:click="newSection()"><el-icon>
                            <Plus />
                        </el-icon> Elemento </el-button>
                </div>

            </div>
            <el-form-item>
                <el-button type="primary" @click="createProduct">Salvar</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            product: {
                productId: null,
                name: '',
                value: 0,
                quantity: 1,
                editable: false,
                mainImgUrl: '',
                description: '',
                available: true,
                sections: [],
                details: [],
                material: '',
                tags: []
            },
            fetchedCategories: [],
            materials: [],
            fetchedTags: [],
            selectedTags: [],
            fetchedMaterials: [],
            selectedCategory: null,
            selectedMaterial: null,
            wasCurrentlyUnavailable: false,
            fileList: [
                {
                    name: 'food.jpeg',
                    url: 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_67908583.jpg'
                }
            ]
        }
    },
    created() {
        // Adquire dados para permitir edição.
        this.getProduct();
    },
    methods: {
        getProduct() {
            // Id é adquirido do parâmetro da URL.
            const productId = this.$route.params.id;
            if (productId != null) {
                // Faz requisição para adquirir produto "convencional" se o id não for nulo.
                axios.get('http://localhost:8081/products/' + productId)
                    .then(response => {
                        this.product = response.data;
                        this.currentlyUnavailable = !this.product.available; // Seta condição de disponibilidade para identificar se produto estava indisponível.
                    })
                    .catch(error => {
                        console.error('Erro ao obter dados da API:', error);
                    });
            } else {
                ElMessage.error('Id do produto é nulo. Não é possível fazer requsição para adquirir produto.');
            }
        },
        editProduct() {
            // Se id do produto na URl não é nulo, manda requisição para editar produto.
            if(this.product.productId != null) {
                axios.put('http://localhost:8081/category/save-full-product/', this.products, config)
                .then(response => {
                    ElMessage('Produto editado com sucesso!');
                })
                .catch(error => {
                    ElMessage.error('Erro ao editar produto! Entre em contato com os administradores do sistema.')
                });

                // Se o produto estava indisponível e passou a estar disponível, 
                // iniciar fluxo de envio de emails aos clientes que estavam na lista de espera pelo produto.
                // if (this.product.quantity > 0 && this.wasCurrentlyUnavailable && this.product.available) {
                //     axios.post('http://localhost:8081/')
                //         .then(reponse => {
                            
                //         })
                //         .catch(error => [

                //         ]);
                // }
            }
        }
    }
}
</script>

<style>

</style>