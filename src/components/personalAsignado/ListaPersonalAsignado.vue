<template>
  <v-card>
    <v-list>
      <v-list-subheader>{{ titulo }}</v-list-subheader>
      <v-list-item v-for="usuario in getUsuariosAsignados" :key="usuario.id">
        <template v-slot:prepend> <v-icon>mdi-account</v-icon> </template>
        <v-list-item-title>{{ usuario.nombre }}</v-list-item-title>
        <v-list-item-subtitle>{{ usuario.correo }}</v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-card-actions>
      <v-btn 
        @click="searchUsuariosAsignados"
        :loading="getCargandoUsuariosAsignados"
        color="primary"
        variant="tonal"
        block 
      >Actualizar</v-btn>
    </v-card-actions>
  </v-card>
</template>
  
  <script>
  import { mapGetters } from 'vuex'
  export default {
    props:["titulo"],
    data(){return{}},
    methods:{
      searchUsuariosAsignados(){
        const usuario = this.$store.getters['stInicioSesion/getUsuarioLogeado']
        this.$store.dispatch('stDB/buscarUsuariosAsignados', usuario.id)
      },
    },
    computed:{ 
      ...mapGetters('stDB', ['getUsuariosAsignados','getCargandoUsuariosAsignados']),
    },
    mounted(){ this.searchUsuariosAsignados() },
  }
  </script>