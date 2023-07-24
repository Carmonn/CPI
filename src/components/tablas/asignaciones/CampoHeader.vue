<template>
  <div class="seleccionable" @click="cambiarFiltro">
    {{ texto }}
    <v-icon :icon="iconos"></v-icon>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  props:["texto","indice"],
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
          case "Estatus": this.filtroStatusAZ(); break;
          case "Ultima modificación": this.filtroFechaAZ(); break;
          default: break;
        }
      }
      if(opcion === 2){
        switch (this.texto) {
          case "Coordinador": this.filtroNombrePersonalZA(); break;
          case "Gestor": this.filtroNombrePersonalZA(); break;
          case "Nombre de Archivo": this.filtroNombreArchivoZA(); break;
          case "Estatus": this.filtroStatusZA(); break;
          case "Ultima modificación": this.filtroFechaZA(); break;
          default: break;
        }
      }
    },
    //filtros par ordenar
    ...mapMutations("stDB",["setAsignacionesPendientes"]),
    filtroNombrePersonalAZ(){
      let asignaciones = this.getAsignacionesPendientes
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
      this.setAsignacionesPendientes(asignaciones)
    },
    filtroNombrePersonalZA(){
      let asignaciones = this.getAsignacionesPendientes
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
      this.setAsignacionesPendientes(asignaciones)
    },
    filtroNombreArchivoAZ(){
      let asignaciones = this.getAsignacionesPendientes
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
      this.setAsignacionesPendientes(asignaciones)
    },
    filtroNombreArchivoZA(){
      let asignaciones = this.getAsignacionesPendientes
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
      this.setAsignacionesPendientes(asignaciones)
    },
    filtroStatusAZ(){
      let asignaciones = this.getAsignacionesPendientes
      asignaciones.sort((a,b) => {
        return this.ordenarAZ(a.estatus.valor,b.estatus.valor)
      })
    },
    filtroStatusZA(){
      let asignaciones = this.getAsignacionesPendientes
      asignaciones.sort((a,b) => {
        return this.ordenarZA(a.estatus.valor,b.estatus.valor)
      })
    },
    filtroFechaAZ(){
      let asignaciones = this.getAsignacionesPendientes
      asignaciones.sort((a,b) => {
        return this.ordenarAZ(a.fechaUltima,b.fechaUltima)
      })
    },
    filtroFechaZA(){
      let asignaciones = this.getAsignacionesPendientes
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
    ...mapGetters("stDB",["getAsignacionesPendientes"]),
    ...mapGetters("stTablaAsignaciones",["getOpcionesFiltro"]),
    iconos(){
      switch (this.getOpcionesFiltro[this.indice]) {
        case 0: return "mdi-unfold-more-horizontal";
        case 1: return "mdi-chevron-up";
        case 2: return "mdi-chevron-down";
        default: return "mdi-unfold-more-horizontal";
      }
    }
  }
}
</script>

<style scoped>
.seleccionable{
  cursor: pointer
}
</style>