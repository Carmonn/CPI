<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
      <div class="w-80 mx-auto">
        <v-card class="centrar text-center" v-if="!getEliminacionDeDocumentoFinalizada">
          <v-card-title>¿Esta seguro de elimnarlo?</v-card-title>
          <v-card-text class="text-center pa-2 mx-5 bordes">
            <div>
              <p>
                El seguimiento del archivo se eliminara junto con los archivos 
                y no podra volver a recuperarlo
              </p>
            </div>
          </v-card-text>
          <v-container>
            <div class="d-flex justify-space-between">
              <div class="w-49">
                <v-btn @click="cancelar" :disabled="getEliminandoDocumento"
                block color="error" > cancelar </v-btn>
              </div>
              <div class="w-49">
                <v-btn :loading="getEliminandoDocumento" @click="aceptar"
                block color="warning" 
                > aceptar </v-btn>
              </div>
            </div>
          </v-container>
        </v-card>
        <v-card v-else>
          <v-card-title>Eliminacion exitosa</v-card-title>
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
    ...mapActions("stDB",["eliminarDocumento"]),
    ...mapMutations("stRevisionDocumento",["setOpcionLogEliminarDocumento"]),
    async aceptar(){
      await this.eliminarDocumento(this.getDocumentoRevisado.id)
    },
    cancelar(){
      this.setOpcionLogEliminarDocumento(false)
    },
    ok(){
      this.setOpcionLogEliminarDocumento(false)
      this.$router.push('/mostrarAsignaciones')
    }
  },
  computed:{
    ...mapGetters("stDB",["getEliminandoDocumento","getEliminacionDeDocumentoFinalizada"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado"]),
  },
}
</script>
<style scoped>
</style>