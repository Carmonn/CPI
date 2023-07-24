<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
      <div class="w-80 mx-auto">
        <v-card class="centrar text-center" v-if="!getCompletadoDeDocumentoFinalizada">
          <v-card-title>¿Esta seguro de completarlo?</v-card-title>
          <v-card-text class="text-center pa-2 mx-5 bordes">
            <div>
              <p>
                El seguimiento del archivo se marcara como completo y no podra hacer
                comentarios o enviar correcciones
              </p>
            </div>
          </v-card-text>
          <v-container>
            <div class="d-flex justify-space-between">
              <div class="w-49">
                <v-btn :disabled="getCompletandoDocumento"
                block color="error" @click="cancelar"> cancelar </v-btn>
              </div>
              <div class="w-49">
                <v-btn :loading="getCompletandoDocumento" 
                block color="success" @click="aceptar"> aceptar </v-btn>
              </div>
            </div>
          </v-container>
        </v-card>
        <v-card v-else>
          <v-card-title>Documento completado exitosamente</v-card-title>
          <v-btn @click="ok" block color="primary"> ok </v-btn>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
      
<script>
import { mapGetters ,mapMutations, mapActions } from 'vuex'
export default {
  data(){return{
    dialog: true
  }},
  methods:{
    ...mapActions("stDB",["completarDocumento"]),
    ...mapMutations("stRevisionDocumento",["setOpcionLogCompletarDocumento"]),
    async aceptar(){
      let documento = JSON.parse(JSON.stringify(this.getDocumentoRevisado))
      documento.completo = true 
      const {fecha} = this.$store.getters.getFecha
      documento.fechaUltima = fecha
      await this.completarDocumento(documento)
    },
    cancelar(){this.setOpcionLogCompletarDocumento(false)},
    ok(){
      this.setOpcionLogCompletarDocumento(false)
      this.$router.push('/mostrarAsignaciones')
    }
  },
  computed:{
    ...mapGetters("stDB",["getCompletadoDeDocumentoFinalizada","getCompletandoDocumento"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado"]),
  },
}
</script>
<style scoped>
</style>