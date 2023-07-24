<template>
  <div class="d-flex justify-space-between">
    <div class="w-20">
      <v-btn @click="cancelar" :disabled="getCombinandoArchivo"
      class="rounded-lg h-100"  block color="error">Cancelar</v-btn>
    </div>
    
    <div class="w-70">
      <div v-if="!getSubiendoArchivo && getPorcentajeSubidoDeArchivo != 100"
      class="d-flex justify-space-between">
        <div class="w-74">
          <v-select
          v-model="coordinador"
          item-title="nombre"
          return-object
          :disabled="habilitarTabla"
          label="Coordinador"
          variant="outlined"
          hide-details
          density="compact"
          :items="getUsuariosAsignados"
          ></v-select>
        </div>
        <div class="w-24">
          <v-btn 
          @click="enviar" 
          block 
          class="h-100"
          color="success" 
          :disabled="habilitarTabla || getCombinandoArchivo || !coordinadorSeleccionado"
          :loading="getCombinandoArchivo"
          >Enviar</v-btn>
        </div>
      </div>
      <div v-else>
        <v-progress-linear 
        :model-value="getPorcentajeSubidoDeArchivo" 
        color="green"
        class="rounded-xl" 
        height="44" 
        striped>
        {{getPorcentajeSubidoDeArchivo}}%
      </v-progress-linear>
    </div>
    </div>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data(){return{ coordinador: null, activarDialog: false}},
  methods:{
    ...mapActions("stCombinarPdf",["combinarArchivos"]),
    ...mapActions("stDBArchivos",["subirArchivo","cancelarSubidaDeArchivo"]),
    ...mapActions("stDB",["buscarUsuariosAsignados"]),
    async combinarArchivosPdf(){
      const archivoPrincipal = this.getArchivoPrincipal
      const itemsConArchivo = this.getItemsConArchivo
      const paginaFinal = this.getPaginaFinal
      const nombreArchivo = archivoPrincipal[0].name
      await this.combinarArchivos({archivoPrincipal,itemsConArchivo,paginaFinal,nombreArchivo})
    },

    async enviar(){
      await this.combinarArchivosPdf()
      const historial = this.armarHistorial()
      const documento = this.armarDocumento(historial, this.coordinador)
      await this.subirArchivo(
        {documento, archivo: this.getArchivoCombinadoBlob.archivo, referencia: null}
      )
    },
    armarHistorial(){
      const {fecha,hora} = this.$store.getters.getFecha
      const historial = [{ 
        fecha: fecha, 
        hora: hora, 
        idUsuario: this.getUsuarioLogeado.id,
        comentario: 'Se envio para revisión',
      }]
      return historial
    },
    armarDocumento(historial, coordinador){
      const {fecha} = this.$store.getters.getFecha
      const documento = {
        //ID del archivo, nombre del archivo y nombre con id para manipulacion en base de datos de archivos
        id: null,
        archivoId: null,
        archivoNombre: this.getArchivoCombinadoBlob.nombre,
        archivoURL: null,
        //Informacion para encontrar usuarios
        supervisorId: coordinador.id,
        trabajadorId: this.getUsuarioLogeado.id,
        //Informacion para llenar al momento de traer Documento por si cambia
        supervisorInfo: { 
          nombre: coordinador.nombre, 
          correo: coordinador.correo, 
          rol: coordinador.rol 
        },
        trabajadorInfo: { 
          nombre: this.getUsuarioLogeado.nombre, 
          correo: this.getUsuarioLogeado.correo, 
          rol: this.getUsuarioLogeado.rol 
        },
        //Informacion de trabajo del archivo
        historial: historial,
        estatus: {valor: null, iteraciones: null},
        completo: false,
        fechaInicio: fecha,
        fechaUltima: fecha,
        items: this.getItemsParaExcel
      }
      return documento
    },
    
    
    cancelar(){
      if(this.getSubiendoArchivo){this.cancelarSubidaDeArchivo()}
      this.coordinador = null
      this.$store.commit("stDB/setReinicio")
      this.$store.commit("stDBArchivos/setReinicio")
      this.$store.commit("stTablaChecklist/setReinicio")
      this.$router.push('/mostrarAsignaciones')
    },

    buscarCoordinadoresAsignados(){
      const idUsuario = this.getUsuarioLogeado.id
      this.buscarUsuariosAsignados(idUsuario)
    },
  },
  computed:{
    ...mapGetters("stInicioSesion",["getUsuarioLogeado"]),
    ...mapGetters("stTablaChecklist",[
      "getArchivoPrincipal","getItemsConArchivo","getPaginaFinal","getItemsParaExcel",
      "habilitarTabla"
    ]),
    ...mapGetters("stCombinarPdf",["getCombinandoArchivo","getArchivoCombinadoBlob"]),
    ...mapGetters("stDBArchivos",[
      "getSubiendoArchivo","getPorcentajeSubidoDeArchivo","getUrlDeArchivoSubido"
    ]),
    ...mapGetters("stDB",["getUsuariosAsignados"]),
    coordinadorSeleccionado(){
      if(this.coordinador != null){ return true}
      else return false
    },
  },
  created(){ this.buscarCoordinadoresAsignados() },
}
</script>
  