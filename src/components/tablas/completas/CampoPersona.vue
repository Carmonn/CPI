<template>
  <span v-if="esCoordinador">{{ item.trabajadorInfo.nombre }}</span>
  <span v-else>{{ item.supervisorInfo.nombre }}</span>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
props:["item"],
computed:{
  ...mapGetters("stInicioSesion",['esCoordinador']),
}
}
</script>