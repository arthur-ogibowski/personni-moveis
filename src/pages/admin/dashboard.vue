<template>
  <div class="container-admin">

    <h1 class="page-title">Dashboard</h1>

    <div id="dashboard">

        <div class="card text-center" style="background-color:#ffffff;">
            <div class="card-body">
            <h5 class="card-title"><router-link class="dashboard-router-link" to="/admin/produtos">2 Produtos</router-link></h5>
            </div>
            <div class="card-footer">
                Acessos
                <Bar
                  id="my-chart-id"
                  :options="chartOptions1"
                  :data="chartData1"
                />
            </div>
        </div>

        <div class="card text-center" style="background-color:#ffffff;">
            <div class="card-body">
            <h5 class="card-title"><router-link class="dashboard-router-link" to="/admin/clientes">281 Clientes</router-link></h5>
            </div>
        </div>

        <div class="card text-center" style="background-color:#ffffff;">
            <div class="card-body">
            <h5 class="card-title"><router-link class="dashboard-router-link" to="/admin/pedidos">308 Pedidos</router-link></h5>
            </div>

            <div class="card-footer">
                <Line 
                    :data="chartData2" 
                    :options="chartOptions2" 
                />
            </div>
        </div>

        <div class="card text-center" style="background-color:#ffffff;">
            <div class="card-body">
            <h5 class="card-title"><router-link class="dashboard-router-link" to="/admin/users">2 Usuarios</router-link></h5>
            </div>
        </div>





    </div>

  </div>
</template>

<script>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LineElement, LinearScale, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, PointElement, CategoryScale, LineElement, LinearScale)

export default {
    data () {
        return {
            chartData1: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                        label: 'Mesas',
                        backgroundColor: ['lightblue'],
                        data: [0, 10, 5, 2, 20, 30, 45],
                    },
                    {
                        label: 'Cadeiras',
                        backgroundColor: ['purple'],
                        data: [0, 10, 5, 2, 20, 30, 45],
                    }
                ]
            },
            chartOptions1: {
              responsive: true
            },

            chartData2:{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                  {
                    label: 'Numero de pedidos',
                    backgroundColor: ['purple'],
                    data: [40, 39, 10, 40, 39, 80, 40]
                  },
                ]
            },
            chartOptions2: {
                responsive: true,
            }

        }
    },
    components: {
        Bar,
        Line
        
    },
}
</script>

<style scoped lang="scss">
.dashboard-router-link{
    color: rgb(90, 102, 113);
    &:hover{
        color: rgb(10, 11, 11);
    }
}
#dashboard {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
}



</style>