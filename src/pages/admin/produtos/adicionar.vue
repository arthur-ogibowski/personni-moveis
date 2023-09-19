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
                    :min="1"
                    controls-position="right">
                </el-input-number>
            </el-form-item>
            <!-- Descrição -->
            <el-form-item label="Descrição">
                <el-input 
                    type="textarea" 
                    maxlength= "250"
                    placeholder="Descrição..."
                    show-word-limit
                    v-model="product.description"></el-input>
            </el-form-item>
            <h2>Detalhes do produto</h2>
            <div class="elements">
                <div class="element-item" v-for="detail in product.details" v-bind:key="detail">
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
            <el-form-item label="Material">
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
            <h1>{{ product }}</h1>
            
            <el-form-item>
                <el-button type="primary" @click="createProduct">Salvar</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            product: {
                name: '',
                value: 0,
                quantity: 1,
                editable: false,
                imgUrl: '',
                description: '',
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
        };
    },

    created() {
        // Carrega dados necessários ao entrar na tela.
        this.getCategories();
        this.getTags();
        this.getMaterials();
    },

    methods: {

        /** Faz requisição para adquirir todas categorias. Produto só deve ter UMA CATEGORIA. */
        getCategories() {
            axios.get('http://localhost:8081/category')
                .then(response => {
                    this.fetchedCategories = response.data;
                }).catch(error => {
                    console.error('Erro ao obter categorias: ', error);
                });
        },

        getMaterials() {
            axios.get('http://localhost:8081/materials')
                .then(response => {
                    this.fetchedMaterials = response.data;
                }).catch(error => {
                    console.error('Erro ao obter tags do produto:', error);
                });
        },

        /** Faz requisição para adquirir todas tags. */
        getTags() {
            axios.get('http://localhost:8081/tags')
                .then(response => {
                    this.fetchedTags = response.data;
                }).catch(error => {
                    console.error('Erro ao obter tags do produto:', error.response);
                });
        },

        /** Faz requisição para criar categoria e seta categoria criada como selecionada. */
        createCategory() {
            axios.post('http://localhost:8081/category')
                .then(response => {
                    this.selectedCategory = response.data[0].id // Setando id da categoria criada para selecionada.
                }).catch(error => {
                    console.error('Erro ao obter tags do produto:', error);
                });
        },

        /** Faz requisição para criar tag e seta tag criada como selecionada. */
        createTag() {
            axios.get('http://localhost:8081/tags')
                .then(response => {
                    this.product.tags = response.data;
                }).catch(error => {
                    console.error('Erro ao obter tags: ', error);
                });
        },

        /** Faz requisição para criar produto. */
        createProduct() {
            // Adquirindo id caso selecionado, caso contrário torna valor null.
            let categoryId = this.selectedCategory != null ? this.selectedCategory : null;

            // Setando valores das tags como atributo no produto.
            if(this.selectedTags != null && this.selectedTags.length > 0) {
                this.selectedTags.forEach(id => {
                    // Checa se valor é int (é id e já existe).
                    if (Number.isInteger(id)) {
                        this.product.tags.push({ tagId: id });
                    }
                    // Senão é adição de nova tag. Atributo enviado como tagName sem id criará tag no BD.
                    else {
                        this.product.tags.push({ tagName: id });
                    }
                });
            }

            // Fazendo requisição para criação do produto e seus subitens.
            axios.put('http://localhost:8081/products/save-full-product', this.product, { params: categoryId })
                .then((response) => {
                    console.log('Sucesso: ' + response.statusText);
                })
                .catch((error) => {
                    console.error('Erro ao criar recurso:', error);
                })
        },

        /**
         * Adiciona seção no produto
         * @param {Product} product Produto onde será adicionado a seção.
         */
        newSection() {
            this.product.sections.push({
                name: "Nova seção",
                imgUrl: "",
                options: []
            })
        },

        /**
         * Adiciona a opção na seção.
         * @param {Section} section Seção onde será adicionada a opção.
         */
        newOption(section) {
            section.options.push({
                name: '',
                imgUrl: '',
                price: 0
            });
        },

        handleImageChange(file, fileList) {
            //'Somente uma imagem principal permitida.'
            this.product.imgUrl = `C:/personniMoveis/personniMoveisFront/src/assets/img/${file.name}`;
        },

        /**Insere novo detalhe do produto */
        newDetail() {
            this.product.details.push({
                fieldContent: 'Novo detalhe',
                detailContent: ''
            })
        }
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/scss/basics.scss";

hr {
    border: 1px solid $admin-grey;
    margin: 30px 0;
}

.el-input.section-input {
    width: 50%;
}

.elements {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}

.element-card {
    border: 2px solid $admin-grey;
    padding: 0 20px 20px 20px;
    width: 300px;
    margin: 20px 20px 0 0;

    h2 {
        text-align: center;
        color: $admin-grey;
    }
}
</style>