<template>
<header>
  <div id="sidenav" class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px;">

    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">MyMoveis - Admin</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link class="nav-link text-white" active-class="active" to="/admin" exact><a>Dashboard</a></router-link>
      </li>
      <li>
        <router-link class="nav-link text-white" active-class="active" to="/admin/produtos" exact><a>Produtos</a></router-link>
      </li>
      <li>
        <router-link class="nav-link text-white" active-class="active" to="/admin/clientes" exact><a>Clientes</a></router-link>
      </li>
      <li>
        <router-link class="nav-link text-white" active-class="active" to="/admin/pedidos" exact><a>Pedidos</a></router-link>
      </li>
      <li>
        <router-link class="nav-link text-white" active-class="active" to="/admin/categorias" exact><a>Categorias</a></router-link>
      </li>
      <li>
        <router-link class="nav-link text-white" active-class="active" to="/admin/users" exact><a>Usuarios</a></router-link>
      </li>
    </ul>
    <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        
        <strong>Arthur</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1"> 
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  

  </div>
  
  </header>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  components: {
    FontAwesomeIcon
  },

}
</script>

<style>
div#sidenav{
  height: 100vh;
  position: fixed;
}
</style>