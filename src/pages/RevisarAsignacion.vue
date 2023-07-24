<template>
  <teleport to="#menu"><menu-navegacion></menu-navegacion></teleport>
  <log-doc-eliminar v-if="getOpcionLogEliminarDocumento"></log-doc-eliminar>
  <log-doc-completo v-if="getOpcionLogCompletarDocumento"></log-doc-completo>
  <log-correccion-enviada v-if="correccionSubida"></log-correccion-enviada>

  <div v-if="existeDocumento">
    <informacion-de-personal></informacion-de-personal>

    <v-container class="py-1">
      <can-com-revision></can-com-revision>
    </v-container>

    <v-container>
      <mostrar-historial></mostrar-historial>
    </v-container>

    <v-container>
        <form-revision></form-revision>
    </v-container>

    <v-container v-if="habilitarCorreccion">
      <form-checklist>
        <template #tabla>
          <tabla-checklist></tabla-checklist>
        </template>
      </form-checklist>
    </v-container>

    <v-container>
      <env-can-form-revision></env-can-form-revision>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LogDocCompleto from '../components/dialogs/LogDocCompleto.vue';
import LogDocEliminar from '../components/dialogs/LogDocEliminar.vue';
import LogCorreccionEnviada from '../components/dialogs/LogCorreccionEnviada.vue';
import InformacionDePersonal from '../components/revisarAsignacion/InformacionDePersonal.vue';
import FormChecklist from '../components/formularios/checklist/FormChecklist.vue'
import TablaChecklist from '../components/tablas/checklist/TablaChecklist.vue';
import MostrarHistorial from '../components/revisarAsignacion/MostrarHistorial.vue';
import FormRevision from '../components/formularios/revision/FormRevision.vue';
import EnvCanFormRevision from '../components/formularios/revision/EnvCanFormRevision.vue';
import CanComRevision from '../components/formularios/revision/CanComRevision.vue';
export default {
  components:{
    InformacionDePersonal,
    TablaChecklist,
    FormChecklist,
    MostrarHistorial,
    FormRevision,
    EnvCanFormRevision,
    LogCorreccionEnviada,
    CanComRevision,
    LogDocCompleto,
    LogDocEliminar,
  },
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",[
      "getDocumentoRevisado","getOpcionLogEliminarDocumento","getOpcionLogCompletarDocumento"
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
    correccionSubida(){
      if(this.getSubidaDeDocumentoFinalizada){return true}
      else false
    }
  },
  beforeCreate(){
    this.$store.commit("stCombinarPdf/setReinicio")
    this.$store.commit("stTablaChecklist/setReinicio")
    this.$store.commit("stDBArchivos/setReinicio")
  },
}
</script>