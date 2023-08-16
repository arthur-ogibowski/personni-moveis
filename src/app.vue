<template>
  <div v-if="!currentUrl.includes('/admin')">
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
  }
  
}

</script>
