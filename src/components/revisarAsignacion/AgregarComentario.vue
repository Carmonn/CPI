<template>
 <v-form ref="form" class="h-100">
    <v-textarea
      :disabled="!habilitarCorreccion"
      v-model="comentario"
      @blur="guardarComentario"
      label="Agregar comentario" 
      class="h-100"
      bg-color="white"
      rows="9"
      hide-details
      no-resize
    ></v-textarea>
  </v-form>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex';
export default {
  data(){return{ comentario:null }},
  methods:{
    ...mapMutations("stRevisionDocumento",["setComentario"]),
    guardarComentario(){
      const {fecha,hora} = this.$store.getters.getFecha
      const historial = {
        comentario: this.comentario,
        hora: hora,
        fecha: fecha,
        idUsuario: this.getUsuarioLogeado.id
      }
      this.setComentario(historial)
    }
  },
  computed:{
    ...mapGetters("stInicioSesion",["getUsuarioLogeado"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado"]),

    habilitarCorreccion(){
      if(this.getDocumentoRevisado.estatus.valor === "corregir") return true
      else return false
    },
  }
}
</script>