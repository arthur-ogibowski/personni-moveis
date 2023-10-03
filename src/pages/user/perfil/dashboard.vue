<template>
  <div class="container">
    <userNavbar />
  </div>
</template>

<script>
import userNavbar from '@/components/user/userNavbar.vue'
import AuthService from '@/authService';

export default {
    components: {
        userNavbar,
    },
    // created() {
    //   const token = AuthService.getToken();
    //   if (!token) {
    //     this.$router.push('/login');
    //   }
    // }
}
</script>

<style>

</style>