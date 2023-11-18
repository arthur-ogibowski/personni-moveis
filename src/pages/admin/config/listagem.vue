<template>
  <div class="admin-container">
    <h1>Configurações</h1>
        {{ config }}
  </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            config: {}
        }
    },
    created() {
        this.getConfig();
    },
    methods: {
        getConfig() {
            axios.get('http://localhost:3000/store')
            .then((response) => {
                this.config = response.data;
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

}
</script>

<style>

</style>