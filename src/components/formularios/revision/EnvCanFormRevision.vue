<template>
  <div v-if="habilitarCorreccion">
    <div v-if="esCoordinador" class="d-flex justify-space-between w-100" >
      <v-btn color="info" class="w-49" prepend-icon="mdi-arrow-left-circle" 
      @click="cancelar" :disabled="getSubiendoDocumento">Regresar</v-btn>
      <v-btn color="success" class="w-49" @click="enviar"
      :disabled="habilitarEnvio"
      :loading="getSubiendoDocumento" >Enviar Correccion</v-btn>
    </div>
    <!--  -->
    <div v-else-if="!getSubiendoArchivo && getPorcentajeSubidoDeArchivo != 100" 
    class="d-flex justify-space-between w-100">
      <v-btn color="info" class="w-49" prepend-icon="mdi-arrow-left-circle" 
      @click="cancelar" :disabled="getSubiendoDocumento || getCombinandoArchivo">Regresar</v-btn>
      <v-btn color="success" class="w-49" @click="enviar"
        :disabled="habilitarEnvio"
        :loading="getSubiendoDocumento || getCombinandoArchivo" 
      >Enviar Correccion</v-btn>
    </div>
    <!--  -->
    <div v-else class="d-flex justify-space-between w-100">
        <div class="w-49">
          <v-btn color="error w-100 h-100" 
          @click="cancelar" :disabled="getSubiendoDocumento">Cancelar</v-btn>
        </div>
        <div class="w-49">
          <v-progress-linear 
          :model-value="getPorcentajeSubidoDeArchivo" 
          color="green"
          class="rounded-lg" 
          height="44" 
          striped>
          {{getPorcentajeSubidoDeArchivo}}%
          </v-progress-linear>
        </div>
    </div>
  </div>
  <div v-else>
    <v-btn block color="info" class="w-49" prepend-icon="mdi-arrow-left-circle" 
      @click="cancelar" >Regresar</v-btn>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data(){return{ enviando: false }},
  methods:{
    ...mapActions("stCombinarPdf",["combinarArchivos"]),
    ...mapActions("stDB",["subirDocumento"]),
    ...mapActions("stDBArchivos",["subirArchivo","cancelarSubidaDeArchivo"]),
    cancelar(){
      if(this.getSubiendoArchivo){this.cancelarSubidaDeArchivo()}
      this.$store.commit("stRevisionDocumento/setReinicio")
      this.$store.commit("stTablaChecklist/setReinicio")
      this.$router.push('/mostrarAsignaciones')
    },
    async enviar(){
      this.enviando= true
      let documento = JSON.parse(JSON.stringify(this.getDocumentoRevisado))
      documento.historial.push(this.getComentario)
      documento.fechaUltima = this.getComentario.fecha
      if(this.esCoordinador){ await this.subirDocumento(documento) }
      else{
        if(!this.habilitarTabla){
          await this.combinarArchivosPdf(documento)
          documento.items = this.getItemsParaExcel
          console.log(documento);
          await this.subirArchivo(
            {documento, archivo: this.getArchivoCombinadoBlob.archivo, referencia: documento.id}
          )
        }
        else{
          await this.subirDocumento(documento)
        }
      }
    },
    async combinarArchivosPdf(documento){
      const archivoPrincipal = this.getArchivoPrincipal
      const itemsConArchivo = this.getItemsConArchivo
      const paginaFinal = this.getPaginaFinal
      const nombreArchivo = documento.archivoNombre
      await this.combinarArchivos({archivoPrincipal,itemsConArchivo,paginaFinal,nombreArchivo})
    },
  },
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado","getComentario"]),
    ...mapGetters("stDB",["getSubiendoDocumento"]),
    ...mapGetters("stTablaChecklist",[
      "getArchivoPrincipal","getItemsConArchivo","getPaginaFinal","habilitarTabla","getItemsParaExcel"
    ]),
    ...mapGetters("stCombinarPdf",["getCombinandoArchivo","getArchivoCombinadoBlob"]),
    ...mapGetters("stDBArchivos",["getSubiendoArchivo","getPorcentajeSubidoDeArchivo",]),

    habilitarCorreccion(){
      if(this.getDocumentoRevisado.estatus.valor === "corregir") return true
      else return false
    },

    habilitarEnvio(){
      if(this.getComentario != null){
        if( this.getComentario.comentario === null 
        || this.getComentario.comentario === ""){ return true }
        else return false
      }
      else return true
    },
  }
}
</script>