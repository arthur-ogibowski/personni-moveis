<template>
  <div v-if="currentUrl.includes('/login')">
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
    }
  }
  
}

</script>
