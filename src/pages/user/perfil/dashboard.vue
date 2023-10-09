<template>
  <div class="container">
    <userNavbar />
  </div>
</template>

<script>
import userNavbar from '@/components/user/userNavbar.vue'
import AuthService from '@/store/authService.js';

export default {
    components: {
        userNavbar,
    },
    created() {
      AuthService.redirectToLogin(this.$router);
    }
}
</script>

<style>

</style>