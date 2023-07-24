<template> 
  <div class="d-flex mt-8">
    <v-btn class="w-50" @click="cancelar" variant="tonal" color="error">Cancelar</v-btn>
    <v-btn class="w-50" @click="enviar" :loading="getCargandoLogin" :disabled="getCargandoLogin"
    variant="tonal" color="success"
    >Iniciar</v-btn>
  </div>
</template>
  
<script>
import { mapActions, mapMutations,mapGetters } from 'vuex'
export default {
  props:["form"],
  methods:{
    ...mapActions("stInicioSesion", ["validarUsuarioContrasena"]),
    async enviar(){
      const { valid } = await this.form.validate()
      const usuario = this.getUsuario
      const contrasena = this.getContrasena
      if (valid) {
        const usuarioContra = {usuario: usuario, contrasena: contrasena}
        await this.validarUsuarioContrasena( usuarioContra ) 
      }
      if(this.getExisteUsuario.valor === 'si' && this.getExisteContrasena.valor === 'si') {
        this.$router.replace('/mostrarAsignaciones')
      }
    },

    ...mapMutations("stInicioSesion", ["setReinicio"]),
    cancelar(){
      this.setReinicio()
      this.form.reset()
    },
  },

  computed:{
    ...mapGetters("stInicioSesion",[
      "getCargandoLogin","getExisteUsuario","getExisteContrasena",
      "getUsuario","getContrasena"
    ]),
  },
}
</script>

<style scoped>
</style>