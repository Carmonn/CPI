<template>
  <teleport to="#menu"><menu-navegacion></menu-navegacion></teleport>

  <div class="w-50 mx-auto">
    <lista-personal-asignado
      :titulo="tituloDelListado"
    ></lista-personal-asignado>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
import ListaPersonalAsignado from '../components/personalAsignado/ListaPersonalAsignado.vue'
export default {
  components:{ ListaPersonalAsignado },
  data(){return{}},
  methods:{},
  computed:{
    ...mapGetters("stInicioSesion", ["esCoordinador"]),
    
    tituloDelListado(){
      if(this.esCoordinador){ return "Gestores asignados"}
      else{ return "Coordinadores asignados"}
    }
  },
}
</script>