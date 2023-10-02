<template>
    <div>
        <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical"
            >

               <div class="menu-items">         
                
                <router-link to="/admin/produtos"><h1>Personni Moveis</h1></router-link>


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

                <router-link to="/admin/materiais">
                  <el-menu-item index="4">
                      <el-icon><ElementPlus /></el-icon>
                      <span>Materiais</span>
                  </el-menu-item>
                </router-link> 
              
                  <el-menu-item index="5">
                    <router-link to="/admin/usuarios">
                      <el-icon><UserFilled /></el-icon>
                      <span>Usuários</span>
                    </router-link>
                  </el-menu-item>
                
                  <el-menu-item index="6">
                    <router-link to="/admin/configuracoes">
                      <el-icon><setting /></el-icon>
                      <span>Configurações</span>
                    </router-link>
                  </el-menu-item></div>


                <router-link to="/" class="voltar">
                  <el-icon><Back /></el-icon>
                  <span>Voltar ao site</span>
                </router-link>

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
    display: flex;
    flex-direction: column;
    justify-content: space-between;

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

    .voltar{
        color: #fff;
      font-size: 16px;
      text-align: center;
      margin: 0;


      display: flex;
      align-items: center;
      height: var(--el-menu-item-height);
      line-height: var(--el-menu-item-height);

      padding: 0 var(--el-menu-base-level-padding);
      list-style: none;
      cursor: pointer;
      position: relative;
      box-sizing: border-box;
    }

  


}

</style>