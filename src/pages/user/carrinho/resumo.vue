<template>
  <div class="container">
    <h1 class="page-title">Carrinho</h1>

    <div class="carrinho-content">
        <div class="listagem-produtos">
            <div class="produto-card" v-for="i in 13" :key="i">
                <el-card class="carrinho-item">
                    <img
                    src="@/assets/img/cadeira1.png"
                    class="image"
                    />
                    <h2>Cadeira Eames</h2>
                    <div class="quantidade">
                        <p>Quantidade</p>
                        <el-input-number v-model="quantidade" size="small" :min="1" :max="10" label="Quantidade"></el-input-number>
                    </div>
                    <div class="preco">
                        <p>Preço</p>
                        <h2>R$ 150</h2>
                    </div>
                    <div class="deletar">
                        <el-icon><Delete /></el-icon>
                    </div>
                </el-card>
            </div>
        </div>
        <div class="preco-final">
            <h2>Total: {{ precoTotal }}</h2>
            <el-button class="cta" color="$cta-color" >Finalizar compra</el-button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            quantidade: 1,
            precoTotal: 0,
        }
    },
    methods: {
        calcularTotal(){
            this.precoTotal = this.quantidade * 150;
        }
    },

}
</script>

<style scoped lang="scss">

@import "@/assets/styles/scss/basics.scss";

div.carrinho-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .carrinho-item{
        width: 70vw;
        margin: 10px 0;

        :deep(.el-card__body){
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
        }

        .image{
            width: 200px;
            height: 200px;
        }
        
        h2{
            font-size: 20px;
        }

        .quantidade, .preco {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            p{
                color: $user-grey;
            }
        }
    }
}

</style>