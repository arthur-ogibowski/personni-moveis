<template>
    <div class="admin-container">
        <h1><router-link class="underline-router" to="/admin/categorias">Categorias</router-link> > Adicionar</h1>
        <el-form :model="categoria" label-width="*" label-position="top">
            <h2>Detalhes da categoria</h2>
            <el-form-item label="Nome" required>
                <el-input v-model="categoria.name"></el-input>
            </el-form-item>
            <hr>
            <h2>Criação</h2>
            <el-form-item label="Possibilitar criação">
                <el-switch v-model="categoria.allow_creation"></el-switch>
            </el-form-item>

            <div class="criar-content" v-if="categoria.allow_creation">

                <div class="section-item" v-for="section in categoria.sectionCmps" v-bind:key="section">
                    <el-form-item label="Seção">
                        <el-input v-model="section.name" class="section-input"></el-input>

                        <el-icon v-on:click="deleteCascade(section, null, null)" style="margin-left: 8px; cursor: pointer;"
                            :size="20" color="#FF0000">
                            <CloseBold />
                        </el-icon>
                    </el-form-item>


                    <div class="elements">
                        <div class="element-item" v-for="element in section.elementCmps" v-bind:key="element">


                            <div class="element-card">
                                <el-icon v-on:click="deleteCascade(section, element, null)"
                                    style="margin-left: 8px; float: right; margin-top: 8px; cursor: pointer;" :size="20"
                                    color="#FF0000">
                                    <CloseBold />
                                </el-icon>
                                <h2>{{ element.name.toUpperCase() }}</h2>

                                <el-form-item label="Nome">
                                    <el-input v-model="element.name"></el-input>
                                </el-form-item>


                                <div class="option-item" v-for="option in element.optionCmps" v-bind:key="option">
                                    <el-icon v-on:click="deleteCascade(section, element, option)"
                                        style="margin-left: 8px; float: right; margin-top: 33px; cursor: pointer;"
                                        :size="20" color="#FF0000">
                                        <CloseBold />
                                    </el-icon>
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
                                    </el-row>


                                </div>

                                <el-button type="primary" v-on:click="newOption(element)"><el-icon>
                                        <Plus />
                                    </el-icon> Opção</el-button>

                            </div>

                        </div>
                        <el-button type="primary" v-on:click="newElement(section)"><el-icon>
                                <Plus />
                            </el-icon> Elemento </el-button>
                    </div>



                    <hr>

                </div>

                <el-button type="primary" v-on:click="newSection"><el-icon>
                        <Plus />
                    </el-icon> Seção</el-button>

            </div>


            <el-form-item>
                <el-button type="primary" @click="criarCategoria" :disabled="!categoria.name">Salvar</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import axios from 'axios';
import AuthService from '@/authService';
import { ElMessage } from 'element-plus'

export default {
    data() {
        return {
            currentSection: 1,
            selected: [],
            categoria: {
                id: 0,
                name: "",
                allow_creation: false,
                sectionCmps: [

                ]
            }

            , // Inicialize como nulo até carregar os dados da API
        };
    },

    methods: {
        deleteCascade(Seccao, Elemento, Option) {
            // Encontre a categoria
            const categoria = this.categoria;
            // Se o ID da seção for fornecido, exclua tudo dentro dessa seção
            if (Seccao != null && Elemento == null && Option == null) {
                const sectionCmpIndex = categoria.sectionCmps.indexOf(Seccao)
                if (sectionCmpIndex != null) {
                    categoria.sectionCmps.splice(sectionCmpIndex, 1);
                }
            } else if (Elemento != null && Option == null) { // Se o ID do elemento for fornecido, exclua todas as opções desse elemento
                const ElementCmpindex = Seccao.elementCmps.indexOf(Elemento)
                if (ElementCmpindex != null) {
                    Seccao.elementCmps.splice(ElementCmpindex, 1);
                }
            } else if (Elemento != null && Option != null) { // Se o ID do elemento e da opção forem fornecidos, exclua a opção específica
                const OptionCmpindex = Elemento.optionCmps.indexOf(Option)
                if (OptionCmpindex != null) {
                    Elemento.optionCmps.splice(OptionCmpindex, 1);
                }

            }
        },

        criarCategoria() {
            // const token = AuthService.getToken();
            axios.post('http://localhost:8081/category', this.categoria, {
                //   headers: {
                //     Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                //   },
            })
                .then((response) => {
                    if (response.status === 201) {
                        // A resposta da API indica que o recurso foi criado com sucesso.
                        // Você pode realizar ações adicionais aqui, se necessário.
                        ElMessage({
                            message: 'Categoria criada com sucesso.',
                            type: 'success',
                        })
                        this.$router.push('/admin/categorias')

                    } else {
                        ElMessage({
                            message: 'Erro ao criar a categoria.',
                            type: 'error',
                        })
                    }
                })
                .catch((error) => {
                    ElMessage({
                        message: 'Erro ao criar a categoria.',
                        type: 'error',
                    })
                })
        },
        newSection() {
            this.categoria.sectionCmps.push({
                name: "Nova seção",
                imgUrl: "",
                elementCmps: []
            })
        },

        newElement(section) {
            section.elementCmps.push({
                name: "Novo elemento",
                type: null,
                optionCmps: []
            })

        },

        newOption(element) {
            element.optionCmps.push({
                name: "Nova opção",
                imgUrl: "",
                price: 0,
            })

        }
    }
};


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