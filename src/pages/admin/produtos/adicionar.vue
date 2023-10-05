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
import imgConverter from '@/store/imgConverter.js';

export default {
    data() {
        return {
            product: {
                name: '',
                value: 0,
                quantity: 1,
                editable: false,
                mainImg: null,
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
                    console.error('Erro ao obter materiais do produto:', error);
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
        /** Faz requisição para criar produto. */
        createProduct() {
            // Produto deve ter ao menos 1 em qtde para ser disponível.
            if(this.product.quantity < 1 && this.product.available) {
                ElMessage.error('Para que o produto esteja "disponível", é necessário ter ao menos 1 em estoque');
                return;
            }
            // Setando valores das tags como atributo no produto.
            if (this.selectedTags != null && this.selectedTags.length > 0) {
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

            // Se nehuma imagem foi selecionada, coloca imagem default - a fazer....
            //imgConverter.isSettingDefaultImage();

            // Se categoria foi atribuida, adquire id e seta na requisição como parâmetro opcional.
            const config = { params: { categoryId: this.selectedCategory ? this.selectedCategory : null } }
            // Fazendo requisição para criação do produto e seus subitens, redireciona para página de listagem.
            axios.post('http://localhost:8081/products/save-full-product', this.product, config)
                .then((response) => {
                    ElMessage.success('Produto criado com sucesso.')
                    this.$router.push('/admin/produtos')
                })
                .catch((error) => {
                    ElMessage.error('Erro ao criar produto.');
                });
        },
        async handleImageChange(file, fileList) {
            try {
                // Adquire imagem como string base64.
                this.product.mainImg = await imgConverter.fileToBase64String(file.raw);
            } catch(error) {
                ElMessage.error('Erro - não foi possível fazer o upload da imagem.')
            }
        },
        /**
         * Adiciona seção no produto
         * @param {Product} product Produto onde será adicionado a seção.
         */
        newSection() {
            this.product.sections.push({
                name: "Nova seção",
                mainImg: "",
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
                mainImg: '',
                price: 0
            });
        },
        /**Insere novo detalhe do produto */
        newDetail() {
            this.product.details.push({
                fieldContent: 'Novo detalhe',
                detailContent: ''
            })
        },
        /** Deleta o item selecionado de qualquer coleção com itens. */
        removeItem(itemList, itemToBeRemoved) {
            // Encontra índice do item a ser removido e faz splice removendo.
            const index = itemList.indexOf(itemToBeRemoved);
            itemList.splice(index, 1);
        },
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

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>