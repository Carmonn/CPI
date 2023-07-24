<template>
  <v-container class="text-white">
    <h2>Informacion del PIPC</h2>

    <v-row no-gutters class="justify-center">
      <div class="d-flex">
        <v-icon icon="mdi-account"></v-icon>
        <p>{{ titulo }} : &nbsp; &nbsp;{{ nombreDePersonal }}</p>
      </div>
    </v-row>

    <v-row no-gutters class="justify-center">
      <div class="d-flex">
        <v-icon icon="mdi-email-outline"></v-icon>
        <p>Contacto: &nbsp; &nbsp;{{ contacto }}</p>
      </div>
    </v-row>

    <v-row no-gutters class="justify-center">
      <div class="d-flex">
        <v-icon icon="mdi-web"></v-icon>
        <p>Documento: &nbsp; &nbsp;
          <a class="link" :href="urlArchivo" target="_blank">
            {{ nombreArchivo }}
          </a>
        </p>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data(){return{}},
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado"]),
    
    
    titulo(){
      if(this.esCoordinador){return "Gestor a cargo"}
      else return "Coordinador a cargo"
    },
    nombreDePersonal(){
      if(this.esCoordinador){return this.getDocumentoRevisado.trabajadorInfo.nombre}
      else return this.getDocumentoRevisado.supervisorInfo.nombre
    },
    contacto(){
      if(this.esCoordinador){return this.getDocumentoRevisado.trabajadorInfo.correo}
      else return  this.getDocumentoRevisado.supervisorInfo.correo
    },
    urlArchivo(){return this.getDocumentoRevisado.archivoURL},
    nombreArchivo(){return this.getDocumentoRevisado.archivoNombre},
  }
}
</script>