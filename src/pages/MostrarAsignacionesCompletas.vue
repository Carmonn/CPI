<template>
    <teleport to="#menu"><menu-navegacion></menu-navegacion></teleport>
  
    <v-container class="bg-white rounded-lg">
      <div>  
        <cargando-informacion v-if="getCargandoAsignacionesCompletas"></cargando-informacion>
        <tabla-completas v-else-if="hayAsignaciones"></tabla-completas>
        <sin-completos v-else></sin-completos>
      </div>
    </v-container>
  </template>
  
  <script>
  import TablaCompletas from '../components/tablas/completas/TablaCompletas.vue';
  import CargandoInformacion from '../components/tablas/asignaciones/CargandoInformacion.vue';
  import SinCompletos from '../components/tablas/completas/SinCompletos.vue'
  import { mapGetters } from 'vuex'
  export default {
    components:{TablaCompletas,CargandoInformacion,SinCompletos},
    data(){return{}},
    computed:{
      ...mapGetters('stInicioSesion', ['esCoordinador',"getUsuarioLogeado"]),
      ...mapGetters("stDB",["getAsignacionesCompletas","getCargandoAsignacionesCompletas"]),
      hayAsignaciones(){
        if(this.getAsignacionesCompletas.length != 0) return true
        else return false
      }
    },
    beforeCreate(){
      this.$store.commit("stDB/setReinicio")
      this.$store.commit("stRevisionDocumento/setReinicio")
    },
    created(){
      this.$store.dispatch("stDB/buscarAsignacionesCompletasRealtime",this.getUsuarioLogeado.id)
    }
  }
  </script>