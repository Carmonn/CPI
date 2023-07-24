<template>
  <teleport to='main'><log-cerrar-sesion ref="dialog"></log-cerrar-sesion></teleport>

  <v-toolbar color="secondary">
    <v-toolbar-title class="seleccionable" @click="redirect_home">ADVR-software</v-toolbar-title>
    
    <v-spacer></v-spacer>

    <router-link to="/mostrarAsignaciones">
      <v-btn variant="text" prepend-icon="mdi-file-edit-outline">Pendientes</v-btn>
    </router-link>
    <router-link to="/mostrarAsignacionesCompletas">
      <v-btn variant="text" prepend-icon="mdi-file-outline">Completos</v-btn>
    </router-link>
    <router-link to="/personalAsignado">
      <v-btn variant="text" prepend-icon="mdi-account-child-outline">Personal</v-btn>
    </router-link>

    <v-btn icon @click="activarLogCerrarSesion">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
import LogCerrarSesion from '@/components/dialogs/LogCerrarSesion.vue'
export default {
  components:{ LogCerrarSesion },
  data(){return{
    dialog: false,
  }},
  methods:{
    activarLogCerrarSesion(){ this.$refs.dialog.activarDialog() },
    redirect_home(){ this.$router.push('/mostrarAsignaciones') },
  },
}
</script>

<style scoped>
.seleccionable{
  cursor: pointer;
}
a{
  text-decoration: none;
  background: transparent;
  color: white;
}
a.router-link-active{
  color: #3989e3;
}
</style>