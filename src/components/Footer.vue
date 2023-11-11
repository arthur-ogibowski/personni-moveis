<template>
    <div class="footer">
            <h1>Personni Móveis © 2023</h1>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import '@/assets/styles/scss/basics.scss';
div.footer{
    height: 100px;
    background-color: $tertiary-color;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
                
    h1{
        color: $admin-grey;
        font-weight: 300;
    }
}

@media (max-width: 768px) {
    div.footer{
        height: 50px;

        h1{
            font-size: 2rem;
        }
    }
}
</style>