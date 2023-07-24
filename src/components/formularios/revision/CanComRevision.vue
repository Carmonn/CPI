<template>
  <div class="d-flex justify-center">
    <div class="mr-3">
      <v-btn @click="eliminarDocumento" color="error" variant="tonal" icon="mdi-trash-can-outline"></v-btn>
    </div>
    <div class="ml-3" v-if="esCoordinador">
      <v-btn @click="marcarCompletoDocumento" color="success" variant="tonal" icon="mdi-file-check-outline"></v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
export default {
  methods:{
    ...mapMutations("stRevisionDocumento",["setOpcionLogEliminarDocumento","setOpcionLogCompletarDocumento"]),
    async eliminarDocumento(){
      this.setOpcionLogEliminarDocumento(true)
    },
    marcarCompletoDocumento(){
      this.setOpcionLogCompletarDocumento(true)
    },
  },
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
  }
}
</script>