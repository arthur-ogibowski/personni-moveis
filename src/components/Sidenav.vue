<template>
    <div>
        <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical"
            >
               <router-link to="/admin"><h1>Personni Moveis</h1></router-link>

            <router-link to="/admin/produtos">
              <el-menu-item index="1">
                  <el-icon><Handbag /></el-icon>
                  <span>Produtos</span>
              </el-menu-item>
            </router-link>

            <router-link to="/admin/categorias">
              <el-menu-item index="2">
                  <el-icon><Menu /></el-icon>
                  <span>Categorias</span>
              </el-menu-item>
            </router-link> 

            <router-link to="/admin/pedidos">
              <el-menu-item index="3">
                  <el-icon><List /></el-icon>
                  <span>Pedidos</span>
              </el-menu-item>
            </router-link> 

              <el-menu-item index="4">
                <router-link to="/admin/usuarios">
                  <el-icon><UserFilled /></el-icon>
                  <span>Usuarios</span>
                </router-link>
              </el-menu-item>

              <el-menu-item index="5">
                <router-link to="/admin/configuracoes">
                  <el-icon><setting /></el-icon>
                  <span>Configuracoes</span>
                </router-link>
              </el-menu-item>

            </el-menu>
        </el-col>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss"  scoped>
.el-menu-vertical {
    width: 200px;
    height: 100vh;
    background-color: #112620;
    position: fixed;
    z-index: 999;

    h1 {
        color: #fff;
        font-size: 20px;
        text-align: center;
        margin: 0;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-menu-item {
        color: #fff;
        font-size: 16px;
        text-align: center;
        margin: 0;

        &:hover{
            color: #545c64;
        }
    }

    a.router-link-active {
        color: #B68D40 !important;
    
    }

}

</style>