<template>
  <div v-if="!currentUrl.includes('/admin')">
    <Navbar />
    <router-view />
  </div>
  <div v-else class="admin-page">
    <Sidenav/>
    <router-view />
  </div>
  
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Sidenav from '@/components/Sidenav.vue';

export default {
  components: {
    Navbar,
    Sidenav
  },
  computed: {
    currentUrl() {
      return this.$route.path;
    }
  }
  
}

</script>
