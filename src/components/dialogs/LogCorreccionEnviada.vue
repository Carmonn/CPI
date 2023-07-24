<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
      <div class="w-80 mx-auto">
        <v-card class="centrar text-center">
          <v-card-title>{{ titulo }}</v-card-title>
          <v-card-text class="text-center pa-2 mx-5 bordes">

            <div v-if="!opcionArchivo">
              <div class="d-flex align-center justify-center mt-3">
                <v-icon icon="mdi-comment-outline" color="primary"></v-icon>
              </div>
              <div class="d-flex align-center justify-center mb-5">
                <p class="colorP">"&nbsp; {{getComentario.comentario}} &nbsp;"</p>
              </div>
            </div>
              
              <div class="d-flex align-center justify-center my-3">
              <v-icon icon="mdi-account"></v-icon>
              <p>{{ tituloPersonal }}: &nbsp; &nbsp;{{ nombrePersonal }}</p>
            </div>

            <div class="d-flex align-center justify-center my-3">
              <v-icon icon="mdi-calendar-range"></v-icon>
              <p>Fecha: {{ fecha }}</p>
            </div>

          </v-card-text>
          <v-container>
            <v-row justify="space-around" align-content="center">
              <v-col cols="6">
                <v-btn block color="primary" @click="aceptar"> aceptar </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-dialog>
  </div>
</template>
    
<script>
import { mapGetters } from 'vuex'
export default {
  data(){return{
    dialog: true
  }},
  methods:{
    aceptar(){
      this.dialog = false
      this.$router.push('/mostrarAsignaciones')
    },
  },
  computed:{
    ...mapGetters("stDBArchivos",["getSubiendoArchivo","getPorcentajeSubidoDeArchivo",]),
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado","getComentario"]),
    opcionArchivo(){
      if(this.getPorcentajeSubidoDeArchivo === 100){return true}
      else return false
    },
    titulo(){
      if(this.getPorcentajeSubidoDeArchivo === 100){return "Correccion enviada"}
      else return "Comentario enviado"
    },
    tituloPersonal(){
      if(this.esCoordinador)return "Enviado a gestor"
      else return "Enviado a coordinador"
    },
    nombrePersonal(){
      if(this.esCoordinador)return this.getDocumentoRevisado.trabajadorInfo.nombre
      else return this.getDocumentoRevisado.supervisorInfo.nombre
    },
    fecha(){return this.getDocumentoRevisado.fechaUltima},
  },
}
</script>
<style scoped>
p{
  font-size: large;
}
.colorP{
  color: var(--primary);
}
.bordes{
  border: 2px dashed var(--secondary);
}
</style>