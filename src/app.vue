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
import axios from 'axios';
import AuthService from '@/store/authService';

export default {
  data() {
    return {
      primaryColor: "#B68D40",
      secondaryColor: "#112620",
      user: {
          primaryCollor: "",
          secondaryCollor: "",
      },
    }
  },
  components: {
    Navbar,
    Footer,
    Sidenav,
  },
  created() {
    this.getStoreConfig;
  },
  computed: {
    currentUrl() {
      return this.$route.path;
    },
    getStoreConfig() {
      const config = { headers: { Authorization: AuthService.getToken() } };
      axios.get(`http://localhost:8081/store`, config)
        .then((response) => {
        if (response.status === 200) {
            this.user = response.data;
          console.log(this.user.primaryCollor)

          if (this.user.primaryCollor === null || this.user.primaryCollor === '') {
            this.user.primaryCollor = this.primaryColor;
          }
          if (this.user.secondaryCollor === null || this.user.secondaryCollor === '') {
            this.user.secondaryCollor = this.secondaryColor;
          }

            document.documentElement.style.setProperty(
                '--cta-color',
                this.user.primaryCollor
            );
            document.documentElement.style.setProperty(
                '--tertiary-color',
                this.user.secondaryCollor
            );
          
        } else {
            ElMessage.error('Erro ao receber config da empresa:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
    });
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

<style lang="scss" scoped>
// Import your SCSS file
@import '@/assets/styles/scss/basics.scss';
</style>
