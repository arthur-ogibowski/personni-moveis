<template>
    <div class="admin-container">
        <h1><router-link class="underline-router" to="/admin/categorias">Categorias</router-link> > Adicionar</h1>
        <el-form :model="categoria" label-width="*" label-position="top">
            <h2>Detalhes da categoria</h2>
            <el-form-item label="Nome" required>
                <el-input v-model="categoria.name"></el-input>
            </el-form-item>
            <hr>
            <h2>Modelagem</h2>
            <el-form-item>
                <el-switch v-model="categoria.allow_creation"></el-switch>
            </el-form-item>

            <div class="criar-content" v-if="categoria.allow_creation">

                <div class="section-item" v-for="section in categoria.sectionCmp" v-bind:key="section">
                    <el-divider></el-divider>
                    <el-form-item label="Seção">
                        <el-input v-model="section.name" class="section-input"></el-input>

                        <el-icon v-on:click="deleteCascade(section, null, null)" style="margin-left: 8px; cursor: pointer;"
                            :size="20" color="#A8A8A8">
                            <Delete />
                        </el-icon>
                    </el-form-item>
                    <el-form-item label="Ordem">
                        <el-input-number 
                            :precision="0" 
                            :min="1"
                            :max="categoria.sectionCmp.length"
                            v-model="section.index">
                        </el-input-number>
                    </el-form-item>


                    <div class="elements">
                        <div class="element-item" v-for="element in section.elementCmps" v-bind:key="element">


                            <div class="element-card">
                                <el-icon v-on:click="deleteCascade(section, element, null)"
                                    style="margin-left: 8px; float: right; margin-top: 8px; cursor: pointer;" :size="20"
                                    color="#A8A8A8">
                                    <Delete />
                                </el-icon>
                                <h2 v-if="element.name">{{ element.name.toUpperCase() }}</h2>
                                <h2 v-else>ELEMENTO</h2>

                                <el-form-item label="Nome">
                                    <el-input v-model="element.name"></el-input>
                                </el-form-item>


                                <div class="option-item" v-for="option in element.optionCmps" v-bind:key="option">
                                    <el-divider></el-divider>
                                    <el-icon v-on:click="deleteCascade(section, element, option)"
                                        style="margin-left: 8px; float: right; cursor: pointer;"
                                        :size="20" color="#A8A8A8">
                                        <Delete />
                                    </el-icon>
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
                                                    @change="handleImageChange($event, option)">
                                                    <img v-if="option.img" :src="option.img" class="avatar" />
                                                    <el-icon v-else class="avatar-uploader-icon"><Upload /></el-icon>
                                                </el-upload>
                                            </div>
                                        </el-form-item>
                                    </div>


                                </div>

                                <el-divider class="divider-button" v-on:click="newOption(element)">
                                    <el-icon>
                                        <Plus />
                                    </el-icon> Opção
                                </el-divider>

                            </div>

                        </div>
                        <el-button class="cta" type="primary" v-on:click="newElement(section)"><el-icon>
                                <Plus />
                            </el-icon> Elemento </el-button>
                    </div>


                </div>

                <el-divider class="divider-button" v-on:click="newSection">
                                    <el-icon>
                                        <Plus />
                                    </el-icon> Seção
                                </el-divider>

            </div>


            <el-form-item>
                <el-button class="cta" type="primary" @click="criarCategoria" :disabled="!categoria.name">Salvar</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script>
import axios from 'axios';
import AuthService from '@/store/authService.js';
import { ElMessage } from 'element-plus'
import imgConverter from '@/store/imgConverter.js';

export default {
    data() {
        return {
            currentSection: 1,
            selected: [],
            categoria: {
                id: 0,
                name: "",
                allow_creation: false,
                sectionCmp: [

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
                const sectionCmpIndex = categoria.sectionCmp.indexOf(Seccao)
                if (sectionCmpIndex != null) {
                    categoria.sectionCmp.splice(sectionCmpIndex, 1);
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

        async handleImageChange(file, option) {
            try {
                // Adquire imagem como string base64.
                option.img = await imgConverter.fileToBase64String(file.raw);
            } catch (error) {
                ElMessage.error('Erro - não foi possível fazer o upload da imagem.')
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
            this.categoria.sectionCmp.push({
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
                img: "",
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
    width: 400px;
    margin: 0px 20px 20px 0;

    h2 {
        text-align: center;
        color: $admin-grey;
    }
}

:deep(.avatar-uploader .el-upload) {
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
  width: 100px;
  height: 100px;
  text-align: center;
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
.inputs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.basic-inputs {
  padding-right: 40px;
}
div.admin-container button.el-button{
    margin-top: 0;
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
</style>