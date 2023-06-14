<template>
    <div class="container-admin">
        <h1 class="page-title">Produtos</h1>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Categorias</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><div class="table-inner listagem">1</div></td>
              <td><div class="table-inner">Cadeira vermelha</div></td>
              <td><div class="table-inner"><span class="badge rounded-pill bg-secondary">Cadeiras</span></div></td>
              <td><div class="table-inner" style="color:green">Em estoque (22)</div></td>
              <td>
                <div class="table-inner">
                  <button type="button" class="btn btn-outline-warning">editar</button>
                </div>
              </td>
            </tr>
            <tr>
              <td><div class="table-inner listagem">2</div></td>
              <td><div class="table-inner">Mesa Roxa</div></td>
              <td><div class="table-inner"><span class="badge rounded-pill bg-secondary">Mesas</span></div></td>
              <td><div class="table-inner" style="color:red">Fora de estoque</div></td>
              <td>
                <div class="table-inner">
                  <button type="button" class="btn btn-outline-warning">editar</button>
                </div>
              </td>
            </tr>
            <tr>
              <td><div class="table-inner listagem">3</div></td>
              <td><div class="table-inner">Conjunto cozinha</div></td>
              <td><div class="table-inner"><span class="badge rounded-pill bg-secondary">Cadeiras</span><span class="badge rounded-pill bg-secondary">Mesas</span></div></td>
              <td><div class="table-inner" style="color:green">Em estoque (4)</div></td>
              <td>
                <div class="table-inner">
                <button type="button" class="btn btn-outline-warning">editar</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
