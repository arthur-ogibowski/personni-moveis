<template v-cloak>
  <div v-if="!currentUrl.includes('/admin')">
    <Navbar />
  </div>
  <div v-else>
    <Sidenav />
  </div>
  <router-view />
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidenav from '@/components/Sidenav.vue';

export default {
  components: {
    Navbar,
    Sidenav
  },
  data() {
    isAdminPage: false
  },
  computed: {
    currentUrl() {
      return this.$route.path;
    }
  }
  
}

</script>
