<template>
    <div>
        <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical"
            >
                <h1 >Personni Moveis</h1>
              <el-menu-item index="1">
              <el-icon><location /></el-icon>
                  <span>Produtos</span>
              </el-menu-item>
              <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <span>Categorias</span>
              </el-menu-item>
              <el-menu-item index="3">
                <el-icon><document /></el-icon>
                <span>Usuarios</span>
              </el-menu-item>
              <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>Configuracoes</span>
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
    background-color: #545c64;

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

}

</style>