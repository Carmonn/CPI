<template>
    <div class="d-flex flex-wrap w-100 rounded-xl bg-white borde">
      <div v-for="iteracion in item.estatus.iteraciones" :key="iteracion">
        <v-icon :class="iconosColores.uno" :icon="iconos.uno" v-if="iteracion%2 === 0 "></v-icon>
        <v-icon :class="iconosColores.dos" :icon="iconos.dos" v-else></v-icon>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props:["item"],
  computed:{
    ...mapGetters("stInicioSesion",['esCoordinador']),

    iconos(){
      if(this.esCoordinador) return {uno:"mdi-arrow-up-bold",dos:"mdi-arrow-down-bold"}
      else return {uno:"mdi-arrow-down-bold",dos:"mdi-arrow-up-bold"}
    },
    iconosColores(){
      if(this.esCoordinador) return {uno:"icon_enviado",dos:"icon_recibido"}
      else return {uno:"icon_recibido",dos:"icon_enviado"}
    },
  }
}
</script>

<style scoped>
.borde{
  border: 1px solid black;
}
</style>