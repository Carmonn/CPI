<template>

  <div class="w-50 mx-auto">
    <img src="@/assets/imagenes/ADVR_Consultores.png">
  </div>
  
  <v-card class="w-50 mx-auto" color="secondary">
    <template #title v-if="!getExisteUsuario.booleano & !getExisteContrasena.booleano"> Inicio de sesión </template>
    <v-alert v-if="getExisteUsuario.booleano" color="error" class="pa-1 mx-10 mt-3 text-center"> El usuario no existe </v-alert>
    <v-alert v-if="getExisteContrasena.booleano" color="error" class="pa-1 mx-10 mt-3 text-center"> Contraseña incorrecta </v-alert>
    
    <form-inicio-sesion>
      <template #EnvCanForm="{form}">
        <env-can-form-inicio-sesion :form="form"></env-can-form-inicio-sesion>
      </template>
    </form-inicio-sesion>

  </v-card>

</template>

<script>
import { mapGetters } from 'vuex';
import FormInicioSesion from '../components/formularios/inicioSesion/FormInicioSesion.vue';
import EnvCanFormInicioSesion from '../components/formularios/inicioSesion/EnvCanFormInicioSesion.vue';
export default {
  components:{ FormInicioSesion,EnvCanFormInicioSesion },
  computed:{
    ...mapGetters('stInicioSesion', [ 'getExisteUsuario','getExisteContrasena' ]),
  },
  beforeCreate(){
    this.$store.commit("stInicioSesion/setReinicio")
  }
}
</script>

<style scoped>

</style>