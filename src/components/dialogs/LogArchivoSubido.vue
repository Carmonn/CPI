<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" persistent>
      <div class="w-80 mx-auto">
      <v-card class="centrar text-center">
        <v-card-title>Archivo enviado</v-card-title>
        <v-card-text class="text-center pa-2 mx-5 bordes">

          <div class="d-flex align-center justify-center my-3">
            <v-icon icon="mdi-web"></v-icon>
            <p>Nombre del archivo: &nbsp; &nbsp;
              <a :href="urlArchivo" target="_blank">
                {{ nombreArchivo }}
              </a>
            </p>
          </div>

          <div class="d-flex align-center justify-center my-3">
            <v-icon icon="mdi-account"></v-icon>
            <p>Enviado a coordinador: &nbsp; &nbsp;{{ nombreCoordinador }}</p>
          </div>

          <div class="d-flex align-center justify-center my-3">
            <v-icon icon="mdi-email-outline"></v-icon>
            <p>Correo del coordinador: &nbsp; &nbsp;{{ correoCoordinador }}</p>
          </div>

          <div class="d-flex align-center justify-center my-3">
            <v-icon icon="mdi-calendar-range"></v-icon>
            <p>Fecha: {{ fecha }}</p>
          </div>
        </v-card-text>
        <v-container fluid>
          <div class="w-80 mx-auto">
            <v-btn block color="primary" @click="aceptar"> aceptar </v-btn>
          </div>
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
    ...mapGetters("stDB",["getDocumento"]),
    nombreArchivo(){return this.getDocumento.archivoNombre},
    urlArchivo(){return this.getDocumento.archivoURL},
    nombreCoordinador(){return this.getDocumento.supervisorInfo.nombre},
    correoCoordinador(){return this.getDocumento.supervisorInfo.correo},
    fecha(){return this.getDocumento.fechaUltima},
  },
}
</script>

<style scoped>
p{
  font-size: large;
}
.bordes{
  border: 2px dashed var(--secondary);
}
</style>