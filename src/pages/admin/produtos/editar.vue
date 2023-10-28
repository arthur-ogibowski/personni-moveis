<template>
    <div class="admin-container">
        <h1><router-link class="underline-router" to="/admin/produtos">Produtos</router-link> > Editar</h1>
        <el-form :model="product" label-width="*" label-position="top">
            <h2>Produto</h2>
            <!-- Categoria -->
            <el-form-item label="Categoria">
                <el-select v-model="this.selectedCategory" filterable collapse-tags clearable placeholder="Selecione">
                    <el-option v-for="category in this.fetchedCategories" :key="category.id" :label="category.name"
                        :value="category.id" />
                </el-select>
            </el-form-item>
            <!-- Nome -->
            <el-form-item required label="Nome">
                <el-input placeholder="Novo produto" v-model="product.name"></el-input>
            </el-form-item>
            <!-- Preço -->
            <el-form-item required label="Preço">
                <el-input-number :precision="2" :min="1" controls-position="right" v-model="product.value">
                </el-input-number>
            </el-form-item>
            <!-- Estoque -->
            <el-form-item required label="Estoque">
                <el-input-number v-model="product.quantity" :change="manageProdQuantity()" :min="0"
                    controls-position="right">
                </el-input-number>
            </el-form-item>
            <!-- Descrição -->
            <el-form-item required label="Descrição">
                <el-input type="textarea" maxlength="250" placeholder="Descrição..." show-word-limit
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
                    <el-icon v-on:click="removeItem(product.details, detail)"
                        style="margin-right: 35px; float: right; margin-top: 33px; cursor: pointer;" :size="20"
                        color="#FF0000">
                        <CloseBold />
                    </el-icon>
                    <div class="element-card">
                        <h2>{{ detail.detailField.toUpperCase() }}</h2>
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item label="Nome do detalhe">
                                    <el-input v-model="detail.detailField" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="Texto do detalhe">
                                    <el-input type="textarea" maxlength="250" placeholder="Descrição..." show-word-limit
                                        label="Conteúdo" v-model="detail.fieldContent" size="small"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <el-button type="primary" v-on:click="newDetail()"><el-icon>
                        <Plus />
                    </el-icon> Detalhe </el-button>
            </div>
            <!-- Imagem principal -->
            <el-form-item label="Imagem principal">
                <div>
                    <el-upload :show-file-list="true" :auto-upload="false" limit="1" @change="handleImageChange">
                        <el-button size="small" type="primary">Selecionar Imagem</el-button>
                    </el-upload>
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
                                    <el-icon v-on:click="removeItem(product.sections, section)"
                                        style="margin-right:-5px; float: right; margin-top: 10px; cursor: pointer;"
                                        :size="20" color="#A8A8A8">
                                        <CloseBold />
                                    </el-icon>

                                    <h2 v-if="section.name">{{ section.name.toUpperCase() }}</h2>
                                    <h2 v-else>SEÇÃO</h2>

                                    <el-form-item label="Nome">
                                        <el-input v-model="section.name"></el-input>
                                    </el-form-item>

                                    <div class="option-item" v-for="option in section.options" v-bind:key="option">
                                        <el-divider />
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
                                                        <el-icon v-else class="avatar-uploader-icon">
                                                            <Upload />
                                                        </el-icon>
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
            </el-form-item>
        </el-form>
    </div>
    <el-form-item>
        <el-button type="primary" @click="editProduct()">Salvar</el-button>
    </el-form-item>
    <h1>{{ this.product }}</h1>
</template>

<script>
import AuthService from '@/store/authService.js';
import axios from 'axios';
import { ElMessage } from 'element-plus';

export default {
    data() {
        return {
            config: { headers: { Authorization: AuthService.getToken() } },
            product: {
                productId: null,
                name: '',
                value: 0,
                quantity: 1,
                editable: false,
                mainmainImg: '',
                description: '',
                available: true,
                sections: [],
                details: [],
            },
            fetchedCategories: [],
            selectedCategory: null,
            productWasAvailable: null
        }
    },
    created() {
        // Adquire dados.
        this.getProduct();
        this.getCategories();
    },
    methods: {
        getCategories() {
            axios.get('http://localhost:8081/category')
                .then(response => {
                    this.fetchedCategories = response.data;
                }).catch(error => {
                    console.error('Erro ao obter categorias: ', error);
                });
        },
        getProduct() {
            // Id é adquirido do parâmetro da URL.
            const productId = this.$route.params.id;
            if (productId != null) {
                // Faz requisição para adquirir produto "convencional" se o id não for nulo.
                axios.get('http://localhost:8081/products/' + productId)
                    .then(response => {
                        this.product = response.data;
                        this.selectedCategory = this.product.categoryId;
                        // Seta se produto estava indisponível no inicio da edição. Se mudar para disponível passa no fluxo de notificação dos clientes.
                        this.productWasAvailable = this.product.available;
                    })
                    .catch(error => {
                        console.error('Erro ao obter dados da API:', error);
                    });
            } else {
                ElMessage.error('Id do produto é nulo. Não é possível fazer requsição para adquirir produto.');
            }
        },
        getCategories() {
            axios.get('http://localhost:8081/category')
                .then(response => {
                    this.fetchedCategories = response.data;
                }).catch(error => {
                    console.error('Erro ao obter categorias: ', error);
                });

        },
        editProduct() {
            // Produto deve ter ao menos 1 em qtde para ser disponível.
            if (this.product.quantity < 1 && this.product.available) {
                ElMessage.error('Para que o produto esteja "disponível", é necessário ter ao menos "1" em estoque');
                return;
            }

            // Se id do produto na URl não é nulo, manda requisição para editar produto.
            if (this.product.productId != null) {
                axios.put(`http://localhost:8081/products/${this.product.productId}`, this.product)
                    .then(response => {
                        ElMessage.success('Produto editado com sucesso!');
                        this.$router.replace('/admin/produtos')
                    })
                    .catch(error => {
                        ElMessage.error('Erro ao editar produto.')
                        console.error(error);
                    });

                // Se o produto estava indisponível e passou a estar disponível, 
                // iniciar fluxo de envio de emails aos clientes que estavam na lista de espera pelo produto.
                if (this.product.quantity > 0 && this.product.available && this.productWasUnavailable()) {
                    const productUrl = `${window.location.origin}/produtos/${this.product.productId}`;
                    console.log("trigger")
                    // axios.post(`http://localhost:8081/products/notify-clients-email/${this.product.productId}/${productUrl}`)
                    //     .then(reponse => {
                    //         // Não faz nada.
                    //     })
                    //     .catch(error => {
                    //         ElMessage.error('Erro ao enviar e-mails de notificação aos clientes.')
                    //         console.error(error);
                    //     });
                }
            }
        },
        /** Identifica se produto estava indisponível e ficou disponível. */
        productWasUnavailable() {
            return !this.productWasAvailable && this.product.available;
        },
        newDetail() {
            this.product.details.push({
                detailField: 'Novo detalhe',
                fieldContent: ''
            });
        },
        newSection() {
            this.product.sections.push({
                name: 'Nova seção',
                imgUrl: '',
                options: []
            });
        },
        newOption(section) {
            section.options.push({
                name: 'Nova opção',
                imgUrl: '',
                price: 0
            });
        },
        /** Deleta o item selecionado de qualquer coleção com itens. */
        removeDetail(details, detailToBeRemoved) {
            // Se o detalhe já existia no banco e foi possível resgatar o id do produto para encontrar o indice na lista, faz req para remover.
            if (this.shouldMakeDeleteReq(details, detailToBeRemoved, detailToBeRemoved.detailId)) {
                axios.delete(`http://localhost:8081/details/${detailToBeRemoved.detailId}`)
                    .then(response => {
                        // Se removido com sucesso não faz nada.
                    })
                    .catch(error => {
                        ElMessage.error('Erro ao remover detalhe do produto.');
                    });
            }
            this.removeItem(details, detailToBeRemoved);
        },
        removeSection(sections, sectionToBeRemoved) {
            if (this.shouldMakeDeleteReq(sections, sectionToBeRemoved, sectionToBeRemoved.sectionId)) {
                axios.delete(`http://localhost:8081/sections/${sectionToBeRemoved.sectionId}`)
                    .then(response => {
                        ElMessage.error("asd")
                        // Se removido com sucesso não faz nada.
                    })
                    .catch(error => {
                        ElMessage.error('Erro ao remover seção do produto.');
                    });
            }
            this.removeItem(sections, sectionToBeRemoved);
        },
        removeOption(options, optionToBeRemoved) {
            if (this.shouldMakeDeleteReq(options, optionToBeRemoved, optionToBeRemoved.optionId)) {
                axios.delete(`http://localhost:8081/options/${optionToBeRemoved.optionId}`)
                    .then(response => {
                        // Se removido com sucesso não faz nada.
                    })
                    .catch(error => {
                        ElMessage.error('Erro ao remover opção do produto.');
                    });
            }
            this.removeItem(options, optionToBeRemoved);
        },
        /** Encontra e faz splice removendo o item da lista recebida. */
        removeItem(items, item) {
            items.splice(this.getItemIndex(items, item), 1);
        },
        /** Encontra item na lista e retorna índice (-1 se não existir na lista). */
        getItemIndex(items, itemToBeRemoved) {
            return items.findIndex(item => item == itemToBeRemoved);
        },
        /**
         * Identifica se deve fazer requisição para exclusão.
         * Se foi possível resgatar o index para encontrar o item na lista, o item já existia no banco (tem id) e o produto tem id, faz req para remover.
         */
        shouldMakeDeleteReq(items, item, itemId) {
            const itemIndex = this.getItemIndex(items, item);
            if (itemIndex != -1 && itemId != null && this.product.productId != null) {
                return true;
            }
            return false;
        },
        /** Se quantidade do produto é zero, torna indisponível. */
        manageProdQuantity() {
            if (this.product.quantity < 1) {
                this.product.available = false;
            }
        },
        async handleImageChange(file, fileList) {
            try {
                // Adquire imagem como string base64.
                this.product.mainImg = await imgConverter.fileToBase64String(file.raw);
            } catch (error) {
                ElMessage.error('Erro - não foi possível fazer o upload da imagem.')
            }
        },
        async handleOptionImageChange(file, option) {
            try {
                // Adquire imagem como string base64.
                option.mainImg = await imgConverter.fileToBase64String(file.raw);
            } catch (error) {
                ElMessage.error('Erro - não foi possível fazer o upload da imagem.')
            }
        },
        async handleSecondaryImagesChange(file, fileList) {
            try {
                // Adquire imagem como string base64.
                this.product.secondaryImages.push(await imgConverter.fileToBase64String(file.raw));
            } catch (error) {
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


h2 {
    text-align: center;
    color: $admin-grey;
}

</style>