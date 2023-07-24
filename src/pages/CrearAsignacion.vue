<template>
  <teleport to="#menu"><menu-navegacion></menu-navegacion></teleport>
  <log-archivo-subido v-if="archivoSubido"></log-archivo-subido>

  <v-container>
    <form-checklist>
      <template #tabla>
        <tabla-checklist></tabla-checklist>
      </template>

      <template #envcanform>
        <env-can-form-checklist></env-can-form-checklist>
      </template>
    </form-checklist>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import FormChecklist from '../components/formularios/checklist/FormChecklist.vue';
import EnvCanFormChecklist from '../components/formularios/checklist/EnvCanFormChecklist.vue';

import LogArchivoSubido from '../components/dialogs/LogArchivoSubido.vue';
import TablaChecklist from '../components/tablas/checklist/TablaChecklist.vue';
export default {
  components:{
    FormChecklist,
    EnvCanFormChecklist,
    TablaChecklist,
    LogArchivoSubido
  },
  data(){return{}},
  computed:{
    ...mapGetters("stDB",["getSubidaDeDocumentoFinalizada"]),
    archivoSubido(){
      if(this.getSubidaDeDocumentoFinalizada){return true}
      else false
    },
  },
  beforeCreate(){
    this.$store.commit("stDB/setReinicio")
    this.$store.commit("stDBArchivos/setReinicio")
    this.$store.commit("stTablaChecklist/setReinicio")
  }
}
</script>

<style scoped>
.prueba{
  border: 1px solid red;
}
</style>