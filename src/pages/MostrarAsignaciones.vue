<template>
  <teleport to="#menu"><menu-navegacion></menu-navegacion></teleport>

  <div class="mb-5 mx-auto w-50">
    <v-btn v-if="!esCoordinador" to="/crearAsignacion" prepend-icon="mdi-file-plus" block
    >Agregar PIPC para revisión</v-btn>
  </div>

  <v-container class="bg-white rounded-lg">
    <div>  
      <cargando-informacion v-if="getCargandoAsignacionesPendientes"></cargando-informacion>
      <tabla-asignaciones v-else-if="hayAsignaciones"></tabla-asignaciones>
      <sin-pendientes v-else></sin-pendientes>
    </div>
  </v-container>
</template>

<script>
import TablaAsignaciones from '../components/tablas/asignaciones/TablaAsignaciones.vue';
import CargandoInformacion from '../components/tablas/asignaciones/CargandoInformacion.vue';
import SinPendientes from '../components/tablas/asignaciones/SinPendientes.vue';
import { mapGetters } from 'vuex'
export default {
  components:{TablaAsignaciones,CargandoInformacion,SinPendientes},
  data(){return{}},
  computed:{
    ...mapGetters('stInicioSesion', ['esCoordinador',"getUsuarioLogeado"]),
    ...mapGetters("stDB",["getAsignacionesPendientes","getCargandoAsignacionesPendientes"]),
    hayAsignaciones(){
      if(this.getAsignacionesPendientes.length != 0) return true
      else return false
    }
  },
  beforeCreate(){
    this.$store.commit("stTablaAsignaciones/setReinicio")
    this.$store.commit("stDB/setReinicio")
    this.$store.commit("stRevisionDocumento/setReinicio")
  },
  created(){
    this.$store.dispatch("stDB/buscarAsignacionesPendientesRealtime",this.getUsuarioLogeado.id)
  }
}
</script>