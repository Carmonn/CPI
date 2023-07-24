<template>
  <div class="seleccionable" @click="cambiarFiltro" :class="alineacion">
    {{ texto }}
    <v-icon :icon="iconos"></v-icon>
  </div>
</template>
  
<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  props:["texto","indice","orientacion"],
  methods:{
    ...mapMutations("stTablaAsignaciones",["setOpcionesFiltro"]),
    cambiarFiltro(){
      switch (this.getOpcionesFiltro[this.indice]) {
        case 0: this.setOpcionesFiltro({index: this.indice, valor: 1}); this.determinarFiltro(1); break;
        case 1: this.setOpcionesFiltro({index: this.indice, valor: 2}); this.determinarFiltro(2); break;
        case 2: this.setOpcionesFiltro({index: this.indice, valor: 0}); this.determinarFiltro(0); break;
        default: this.setOpcionesFiltro({index: this.indice, valor: 0}); this.determinarFiltro(0); break;
      }
    },
    determinarFiltro(opcion){
      if(opcion === 1){
        switch (this.texto) {
          case "Coordinador": this.filtroNombrePersonalAZ(); break;
          case "Gestor": this.filtroNombrePersonalAZ(); break;
          case "Nombre de Archivo": this.filtroNombreArchivoAZ(); break;
          case "Inicio": this.filtroStatusAZ(); break;
          case "Termino": this.filtroFechaAZ(); break;
          default: break;
        }
      }
      if(opcion === 2){
        switch (this.texto) {
          case "Coordinador": this.filtroNombrePersonalZA(); break;
          case "Gestor": this.filtroNombrePersonalZA(); break;
          case "Nombre de Archivo": this.filtroNombreArchivoZA(); break;
          case "Inicio": this.filtroStatusZA(); break;
          case "Termino": this.filtroFechaZA(); break;
          default: break;
        }
      }
    },
    //filtros par ordenar
    ...mapMutations("stDB",["setAsignacionesCompletas"]),
    filtroNombrePersonalAZ(){
      let asignaciones = this.getAsignacionesCompletas
      if(this.esCoordinador){
        asignaciones.sort((a,b) => {
          return this.ordenarAZ(a.trabajadorInfo.nombre,b.trabajadorInfo.nombre)
        })
      }
      else{
        asignaciones.sort((a,b) => {
          return this.ordenarAZ(a.supervisorInfo.nombre,b.supervisorInfo.nombre)
        })
      }
      this.setAsignacionesCompletas(asignaciones)
    },
    filtroNombrePersonalZA(){
      let asignaciones = this.getAsignacionesCompletas
      if(this.esCoordinador){
        asignaciones.sort((a,b) => {
          return this.ordenarZA(a.trabajadorInfo.nombre,b.trabajadorInfo.nombre)
        })
      }
      else{
        asignaciones.sort((a,b) => {
          return this.ordenarZA(a.supervisorInfo.nombre,b.supervisorInfo.nombre)
        })
      }
      this.setAsignacionesCompletas(asignaciones)
    },
    filtroNombreArchivoAZ(){
      let asignaciones = this.getAsignacionesCompletas
      if(this.esCoordinador){
        asignaciones.sort((a,b) => {
          return this.ordenarAZ(a.archivoNombre,b.archivoNombre)
        })
      }
      else{
        asignaciones.sort((a,b) => {
          return this.ordenarAZ(a.archivoNombre,b.archivoNombre)
        })
      }
      this.setAsignacionesCompletas(asignaciones)
    },
    filtroNombreArchivoZA(){
      let asignaciones = this.getAsignacionesCompletas
      if(this.esCoordinador){
        asignaciones.sort((a,b) => {
          return this.ordenarZA(a.archivoNombre,b.archivoNombre)
        })
      }
      else{
        asignaciones.sort((a,b) => {
          return this.ordenarZA(a.archivoNombre,b.archivoNombre)
        })
      }
      this.setAsignacionesCompletas(asignaciones)
    },
    filtroStatusAZ(){
      let asignaciones = this.getAsignacionesCompletas
      asignaciones.sort((a,b) => {
        return this.ordenarAZ(a.fechaInicio,b.fechaInicio)
      })
    },
    filtroStatusZA(){
      let asignaciones = this.getAsignacionesCompletas
      asignaciones.sort((a,b) => {
        return this.ordenarZA(a.fechaInicio,b.fechaInicio)
      })
    },
    filtroFechaAZ(){
      let asignaciones = this.getAsignacionesCompletas
      asignaciones.sort((a,b) => {
        return this.ordenarAZ(a.fechaUltima,b.fechaUltima)
      })
    },
    filtroFechaZA(){
      let asignaciones = this.getAsignacionesCompletas
      asignaciones.sort((a,b) => {
        return this.ordenarZA(a.fechaUltima,b.fechaUltima)
      })
    },

    ordenarZA(a,b){
      if(a>b){return -1}
      if(b>a){return 1}
      return 0
    },
    ordenarAZ(a,b){
      if(a<b){return -1}
      if(b<a){return 1}
      return 0
    },
  },
  computed:{
    ...mapGetters("stInicioSesion",['esCoordinador']),
    ...mapGetters("stDB",["getAsignacionesCompletas"]),
    ...mapGetters("stTablaAsignaciones",["getOpcionesFiltro"]),
    iconos(){
      switch (this.getOpcionesFiltro[this.indice]) {
        case 0: return "mdi-unfold-more-horizontal";
        case 1: return "mdi-chevron-up";
        case 2: return "mdi-chevron-down";
        default: return "mdi-unfold-more-horizontal";
      }
    },
    titulo(){
      if(this.text === ""){
        if(this.esCoordinador)return "Gestor"
        else return "Coordinador"
      }
      else return this.text
    },
    alineacion(){
      return "text-"+this.orientacion
    }
  }
}
</script>
  
  <style scoped>
  .seleccionable{
    cursor: pointer
  }
  </style>