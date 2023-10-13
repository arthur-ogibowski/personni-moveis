<template>
  <div v-if="currentUrl.includes('/login') || currentUrl.includes('/checkout') || currentUrl.includes('/modelar')">
    <router-view />
  </div>
  <div v-else-if="!currentUrl.includes('/admin')">
    <Navbar />
      <router-view />
    <Footer />
  </div>
  <div v-else class="admin-page">
    <Sidenav/>
    <router-view />
  </div>
  
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Sidenav from '@/components/Sidenav.vue';

export default {
  components: {
    Navbar,
    Footer,
    Sidenav
  },
  computed: {
    currentUrl() {
      return this.$route.path;
    }
  },
  watch: {
    $route(to, from) {
      const isAdminPage = to.path.includes('/admin');

      if (isAdminPage) {
        document.body.classList.add('admin-body');
      } else {
        document.body.classList.remove('admin-body');
      }


      const isCheckoutPage = to.path.includes('/checkout');

      if (isCheckoutPage) {
        document.body.classList.add('checkout-body');
      } else {
        document.body.classList.remove('checkout-body');
      }


      const isCMP = to.path.includes('/modelar');

      if (isCMP) {
        document.body.classList.add('cmp-body');
      } else {
        document.body.classList.remove('cmp-body');
      }
    }
  }
  
}

</script>
