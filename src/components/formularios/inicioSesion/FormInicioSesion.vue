<template>
  <v-form ref="form">
    <v-text-field
      v-model.trim="usuario"
      class="mx-5 my-2"
      hide-details="auto"
      label="Nombre de usuario"
      :rules="reglasNombreusuario"
      clearable
    ></v-text-field>
    <v-text-field
      v-model.trim="contrasena"
      class="mx-5 my-2"
      hide-details="auto"
      label="Contraseña"
      :type="mostrarContrasena ? 'text' : 'password'"
      :rules="reglasContrasena"
      :append-inner-icon="mostrarContrasena ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="mostrarContrasena = !mostrarContrasena"
      clearable
    ></v-text-field>

    <slot name="EnvCanForm" :form="this.$refs.form"></slot>
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data(){return{ 
    usuario: '', 
    contrasena: '',
    reglasNombreusuario: [v => !!v || 'Nombre de usuario requerido',],
    reglasContrasena: [v => !!v || 'Contraseña requerida',],
    mostrarContrasena: false,
  }},

  methods:{
    ...mapMutations("stInicioSesion", ["setUsuario","setContrasena"]),
    setUsuarioStore(){this.setUsuario(this.usuario)},
    setContrasenaStore(){this.setContrasena(this.contrasena)},
  },

  watch:{
    usuario(){this.setUsuarioStore()},
    contrasena(){this.setContrasenaStore()},
  },
}
</script>