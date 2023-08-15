<template>
    <div class="container">
        <div class="categorias">
            <el-menu
              class="lista-categorias"
              mode="horizontal"
              @select="handleSelect"
              background-color="transparent"
              active-text-color="#000000"
            >
            <div v-for="categoria in categorias" v-bind:key="categoria">
              <router-link to="/produtos/"><el-menu-item index="1">{{categoria.nome}}</el-menu-item></router-link>
            </div>
            </el-menu>

            <h1>Produtos</h1>

            <router-link to="">
            <el-card :body-style="{ padding: '0px' }" >
                <img
                  src="@/assets/img/cadeira1.png"
                  class="image"
                />
                <div style="padding: 14px">
                  <span>Yummy hamburger</span>
                  <div class="bottom">
                    <time class="time">{{ currentDate }}</time>
                    <el-button text class="button">Operating</el-button>
                  </div>
                </div>
            </el-card>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            categorias: [
                {id: 1, nome: 'Cadeiras'},
                {id: 2, nome: 'Mesas'},
                {id: 3, nome: 'Armários'},
                {id: 4, nome: 'Estantes'},
                {id: 5, nome: 'Racks'},
            ]
        }
    }

}
</script>

<style scoped lang="scss">
ul.lista-categorias {
  display: flex;
  justify-content: center;
  border: 1px solid #A6A6A6;
  border-radius: 5px !important;
}
div.el-card{
    width: fit-content;
}
</style>