<template>
  <v-app>  
    <log-error-general v-if="this.$store.state.errorGeneral.activar"></log-error-general>
    <div id="menu"></div>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed:{...mapGetters('stInicioSesion', ['getExisteUsuario','getExisteContrasena']),}
}
</script>
