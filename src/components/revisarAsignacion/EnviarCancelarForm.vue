<template>
  <v-container fluid class="pa-0">
    <div class="d-flex justify-space-between" v-if="habilitarCorreccion">
      <v-btn class="w-45" prepend-icon="mdi-arrow-left-circle" @click="cancelar">Regresar</v-btn>
      <v-btn class="w-45" @click="enviar" :disabled="habilitarEnvio">Enviar Correccion</v-btn>
    </div>
    <div v-else>
      <v-btn block prepend-icon="mdi-arrow-left-circle" @click="cancelar">Regresar</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  methods:{
    cancelar(){this.$router.push('/mostrarAsignaciones')},
    enviar(){
      const documento = this.getDocumentoRevisado
      documento.historial.push(this.getComentario)
      console.log(documento);
    },
  },
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado","getComentario"]),

    habilitarCorreccion(){
      if(this.getDocumentoRevisado.estatus.valor === "corregir") return true
      else return false
    },

    habilitarEnvio(){
      if(this.getComentario != null){
        if(this.getComentario.comentario === null || this.getComentario.comentario === "")return true
        else return false
      }
      else return true
    }
  }
}
</script>