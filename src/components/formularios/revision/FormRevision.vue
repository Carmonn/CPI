<template>
  <v-form ref="form">
    <div class="d-flex justify-space-between">
      <div class="w-49 rounded-lg">
        <tabla-resumen></tabla-resumen>
      </div>

      <div class="w-49 d-flex align-center justify-center bg-white rounded-lg">
        <div class="w-90">
          <v-textarea
          :disabled="!habilitarCorreccion"
          v-model="comentario"
          label="Agregar comentario" 
          class="h-100"
          bg-color="white"
          rows="13"
          hide-details
          no-resize
          ></v-textarea>
        </div>
        <!-- <div class="h-25 d-flex justify-center align-end">
          <env-can-form-revision></env-can-form-revision>
        </div> -->
      </div>
    </div>
  </v-form>
</template>
   
<script>
import { mapGetters,mapMutations } from 'vuex';
import EnvCanFormRevision from './EnvCanFormRevision.vue';
import TablaResumen from '../../tablas/resumen/TablaResumen.vue';
export default {
  components:{TablaResumen,EnvCanFormRevision},
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
  },
  watch:{
    comentario(){this.guardarComentario() },
  }
}
</script>