<template>
    <div class="admin-container">
        <h1><router-link class="underline-router" to="/admin/produtos">Produtos</router-link> > Adicionar</h1>
        <el-form :model="product" label-width="*" label-position="top">

            <div class="product-content">
                <div class="left-content">
                    <h2>Produto</h2>
                    <el-form-item required label="Nome" size="large">
                        <el-input placeholder="Novo produto" v-model="product.name"></el-input>
                    </el-form-item>
                    <!-- Preço -->
                    <el-form-item label="Preço">
                        <el-input
                            controls-position="right"
                            v-model="product.value"
                            class="preco-input">
                            <template #prepend>R$</template> 
                        </el-input>
                    </el-form-item>
                    <!-- Estoque -->
                    <el-form-item label="Estoque">
                        <el-input-number 
                            v-model="product.quantity"
                            :min="0"
                            controls-position="right">
                        </el-input-number>
                    </el-form-item>
                    <!-- Descrição -->
                    <el-form-item label="Descrição">
                        <el-input 
                            type="textarea" 
                            placeholder="Descrição..."
                            v-model="product.description"></el-input>
                    </el-form-item>
                    <!-- Disponível -->
                    <el-form-item label="Mostrar no catálogo">
                        <el-switch active-text="Sim" inactive-text="Não" v-model="product.available"></el-switch>
                    </el-form-item>
                    <!-- Imagem principal -->
                    <el-form-item label="Imagem principal">
                        <div>
                            <el-upload class="avatar-uploader" :auto-upload="false" limit="1"
                                                            @change="handleImageChange">
                                                            <img v-if="product.mainImg" :src="product.mainImg" class="avatar" />
                                                            <el-icon v-else class="avatar-uploader-icon"><Upload /></el-icon>
                                                        </el-upload>
                        </div>
                    </el-form-item>
                    <!-- Imagens secundárias -->
                    <el-form-item label="Imagens secundárias">
                        <div>
                            <el-upload class="avatar-uploader" :auto-upload="false" list-type="picture-card" v-model:file-list="product.secondaryImages"
                                                            @change="handleSecondaryImagesChange">
                                                            <img v-if="product.secondaryImages" :src="product.secondaryImages" class="avatar" />
                                                            <el-icon v-else class="avatar-uploader-icon"><Upload /></el-icon>
                                                        </el-upload>
                        </div>
                    </el-form-item>
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
                    <!-- <el-form-item label="Imagens secundárias">

                    </el-form-item> -->
                </div>

                <el-divider direction="vertical" />

                <!-- Detalhes do produto -->
                <div class="center-content">
                    <h2>Detalhes do produto</h2>
                    <div class="details">
                        <div class="detail-item" v-for="detail in product.details" v-bind:key="detail">
                            <el-divider/>
                            <el-icon v-on:click="removeItem(product.details, detail)" style="margin-right: 35px; float: right; margin-top: 33px; cursor: pointer;" :size="20" color="#A8A8A8"><CloseBold /></el-icon>
                            <div>
                                        <el-form-item label="Título">
                                            <el-input v-model="detail.fieldContent" placeholder="Novo título"></el-input>
                                        </el-form-item>
                                        <el-form-item label="Descrição">
                                            <el-input 
                                                type="textarea" 
                                                maxlength= "250"
                                                placeholder="Descrição..."
                                                show-word-limit label="Conteúdo"
                                                v-model="detail.detailContent"></el-input>
                                        </el-form-item>
                            </div>
                        </div>
                        <el-divider class="divider-button" v-on:click="newDetail()">
                                    <el-icon><Plus /></el-icon> Detalhe
                        </el-divider>
                    </div>
                </div>

                <el-divider direction="vertical" />

                <div class="right-content">
                    <h2>Personalização</h2>
                    <el-form-item>
                        <el-switch v-model="product.editable"></el-switch>
                    </el-form-item>

                    <div class="criar-content" v-if="product.editable">

                        <div class="elements">
                            <div class="element-item" v-for="section in product.sections" v-bind:key="section">


                                <div class="element-card">
                                    <el-icon v-on:click="removeItem(product.sections, section)" style="margin-right:-5px; float: right; margin-top: 10px; cursor: pointer;" :size="20" color="#A8A8A8"><CloseBold /></el-icon>

                                    <h2 v-if="section.name">{{ section.name.toUpperCase() }}</h2>
                                    <h2 v-else>SEÇÃO</h2>

                                    <el-form-item label="Nome">
                                        <el-input v-model="section.name"></el-input>
                                    </el-form-item>



                                    <div class="option-item" v-for="option in section.options" v-bind:key="option">
                                        <el-divider/>
                                        <div class="inputs">
                                            <div class="basic-inputs">
                                                    <el-form-item label="Opção">
                                                        <el-input v-model="option.name" size="small"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="Preço">
                                                        <el-input v-model="option.price" size="small">
                                                            <template #prepend>R$</template></el-input>
                                                    </el-form-item>
                                            </div>
                                            <el-form-item label="Imagem">
                                                <div>
                                                    <el-upload class="avatar-uploader" :auto-upload="false" limit="1"
                                                        @change="handleOptionImageChange($event, option)">
                                                        <img v-if="option.mainImg" :src="option.mainImg" class="avatar" />
                                                        <el-icon v-else class="avatar-uploader-icon"><Upload /></el-icon>
                                                    </el-upload>
                                                </div>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <el-divider class="divider-button" v-on:click="newOption(section)">
                                            <el-icon>
                                                <Plus />
                                            </el-icon> Opção
                                        </el-divider>

                                </div>

                            </div>

                            
                            <el-divider class="divider-button" v-on:click="newSection()">
                                    <el-icon>
                                        <Plus />
                                    </el-icon> Seção
                                </el-divider>
                        </div>

                    </div>
                </div>
            </div>
            <el-form-item>
                <el-button class="cta" type="primary" @click="createProduct" :disabled="!product.name">Salvar</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus'
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
        const loading = ElLoading.service({
            lock: true,
            text: 'Carregando',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        this.getCategories();
        setTimeout(() => {
            loading.close()
          }, 250)
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
        async handleOptionImageChange(file, option) {
            try {
                // Adquire imagem como string base64.
                console.log(option)
                option.mainImg = await imgConverter.fileToBase64String(file.raw);
            } catch(error) {
                ElMessage.error('Erro - não foi possível fazer o upload da imagem.')
            }
        },
        async handleSecondaryImagesChange(file, fileList) {
            try {
                // Adquire imagem como string base64.
                this.product.secondaryImages.push(await imgConverter.fileToBase64String(file.raw));
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
                fieldContent: '',
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

h2{
    font-size: 20px;
    font-weight: 400;
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
    border: 1px solid $admin-grey;
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

:deep(.el-upload){
    border: 1px dotted $admin-grey;

    &:hover{
        border: 1px dotted $cta-color;
    }
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;

    &:hover{
        color: $cta-color;
    }
}

.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
  min-width: 100px;
  min-height: 100px;
}
:deep(ul.el-upload-list){
    display: none;
}

.product-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .left-content, .right-content, .center-content{
    flex-basis: 30%;
  }
  .el-divider--vertical{
    height: auto;
    border-left: 2px var(--el-border-color) var(--el-border-style);
  }
}
.preco-input{
    width: 50%;
}

:deep(.el-divider__text.is-center) {
  display: flex;
  align-items: center;
  color: $cta-color;

    .el-icon {
        margin-right: 10px;
    }
}
.divider-button{
    border-top: 1px solid $cta-color;
    cursor: pointer;
    height: 10px;
}

.detail-item{
    width: 100%;

    & > i{
        margin: 0 !important
    }
}

.inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

div.element-card{
    width: 100%;
    margin: 0 0 20px 0 ;
}

div.element-item{
    width: 100%;
}

.basic-inputs {
  padding-right: 15%;
}
</style>