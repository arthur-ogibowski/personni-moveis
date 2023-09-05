<template>
    <div class="login">
        <div class="blue-rectangle">
            <div class="login-dialog">
                <h1>Login</h1>
                    <el-input
                      v-model="email"
                      size="large"
                      placeholder="Email"
                    />
                    <el-input
                      v-model="senha"
                      size="large"
                      placeholder="Senha"
                      type="password"
                      show-password
                    />
                    <el-button color="#343434" size="large" :loading-icon="Eleme" :loading="carregando" v-on:click="processarLogin()">Entrar</el-button>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data() {
        return {
            email: '',
            senha: '',
            carregando: false
        }
    },
    methods: {
        processarLogin() {
            console.log(this.email)
            console.log(this.senha)
            this.carregando = true
        }
    }
}
</script>

<style lang="scss" scoped>

div.login{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}
div.blue-rectangle{
    width: 100%;
    margin: 50%;
    background: #2A58E1;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.el-input), :deep(.el-button){
        width: 330px;
        height: 56px;
        margin: 25px;
        color: #FCFAF1;
        text-align: center;
        font-size: 26px;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.333px;
    }
}

div.login-dialog{
    background: #FCFAF1;
    box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.50);
    margin: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 480px;
    height: 480px;
}

h1{
    color: #2A58E1;
    text-align: center;
    font-family: Inter;
    font-size: 41px;
    font-style: normal;
    font-weight: 700;   
    line-height: normal;
}

</style>