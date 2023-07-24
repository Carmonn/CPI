<template>
  <v-card>
    <div v-for="(item, index) in historial" :key="index">
      <div>
        <small>
          <v-icon :class="iconosColores.uno" :icon="iconos.uno" v-if="index%2 === 0"></v-icon>
          <v-icon :class="iconosColores.dos" :icon="iconos.dos" v-else></v-icon>
          <span>{{ item.fecha }}</span>
          <span>&nbsp;--&nbsp;</span>
          <span>{{ item.hora }}&nbsp;hrs</span>
        </small>
      </div>
      <div> 
        {{ item.comentario }} 
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters("stInicioSesion",["esCoordinador"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado"]),

    historial(){return this.getDocumentoRevisado.historial},
    iconos(){
      if(this.esCoordinador) return {uno:"mdi-arrow-down-bold",dos:"mdi-arrow-up-bold"}
      else return {uno:"mdi-arrow-up-bold",dos:"mdi-arrow-down-bold"}
    },
    iconosColores(){
      if(this.esCoordinador) return {uno:"icon_recibido",dos:"icon_enviado"}
      else return {uno:"icon_enviado",dos:"icon_recibido"}
    },
  }
}
</script>