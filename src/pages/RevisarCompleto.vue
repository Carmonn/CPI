<template>
  <teleport to="#menu"><menu-navegacion></menu-navegacion></teleport>

  <div v-if="existeDocumento">
    <informacion-de-personal></informacion-de-personal>

    <v-container>
      <mostrar-historial></mostrar-historial>
    </v-container>

    <v-container>
      <tabla-resumen></tabla-resumen>
    </v-container>

    <v-container>
      <v-btn block color="info" class="w-49" prepend-icon="mdi-arrow-left-circle" 
      @click="cancelar">Regresar</v-btn>
    </v-container>
  </div>
</template>
  
<script>
import { mapGetters } from 'vuex';
import InformacionDePersonal from '../components/revisarAsignacion/InformacionDePersonal.vue';
import MostrarHistorial from '../components/revisarAsignacion/MostrarHistorial.vue';
import TablaResumen from '../components/tablas/resumen/TablaResumen.vue';
export default {
  components:{
    InformacionDePersonal,
    MostrarHistorial,
    TablaResumen,
  },
  methods:{
    cancelar(){
      this.$store.commit("stRevisionDocumento/setReinicio")
      this.$store.commit("stTablaChecklist/setReinicio")
      this.$router.push('/mostrarAsignacionesCompletas')
    },
  },
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",[
      "getDocumentoRevisado"
    ]),
    ...mapGetters("stDB",["getSubidaDeDocumentoFinalizada"]),

    coordinadorACargo(){return this.getDocumentoRevisado.supervizorInfo},
    nombreArchivo(){return this.getDocumentoRevisado.archivoNombre},

    existeDocumento(){
      if(this.getDocumentoRevisado === null)return false
      else return true
    },
    habilitarCorreccion(){
      if(this.getDocumentoRevisado.estatus.valor === "corregir" && !this.esCoordinador) return true
      else return false
    },
  },
  beforeCreate(){
    this.$store.commit("stCombinarPdf/setReinicio")
    this.$store.commit("stTablaChecklist/setReinicio")
    this.$store.commit("stDBArchivos/setReinicio")
  },
}
</script>