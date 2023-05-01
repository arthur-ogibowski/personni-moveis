<template>
  <div class="container">
  <header>
    <Navbar />
  </header>
  
  </div>


</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}


</script>


<style>
body {
  @apply dark:bg-gray-900 dark:text-gray-50;
}
</style>
