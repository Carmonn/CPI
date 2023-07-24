<template>
  <div class="text-center">
    <v-dialog v-model="dialog" transition="dialog-top-transition">
      <v-card class="centrar text-center">
        <v-card-title>Esta apunto de cerrar sesión</v-card-title>
        
        <!-- Acciones del formulario -->
        <v-container>
          <v-row>
            <v-col class="px-0 pb-0">
              <v-btn
                @click="cerrarSesion"
                variant="tonal"
                color="primary"
                block
              >Continuar</v-btn>
            </v-col>
            <v-col class="px-0 pb-0">
              <v-btn
                @click="desactivarDialog"
                variant="tonal"
                color="error"
                block
              >Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data(){return{
    dialog: false
  }},
  methods:{
    desactivarDialog(){this.dialog = false},
    activarDialog(){this.dialog = true},
    cerrarSesion(){
      this.$store.commit('stInicioSesion/setReinicio')
      this.$router.replace('/inicioSesion') 
      this.desactivarDialog()
    }
  }
}
</script>

<style scoped>
.centrar{
  width: 50%;
  margin: 0 auto;
}
</style>