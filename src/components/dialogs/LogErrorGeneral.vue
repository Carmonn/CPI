<template>
  <div class="text-center">
    <v-dialog v-model="getErrorGeneral.activar" persistent>
      <v-card>
        <h1>Un error ha ocurrido</h1>
        <p>{{ getErrorGeneral.info }}</p>
        <v-btn @click="continuar">OK</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
  
<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  methods:{
    ...mapMutations(["setErrorGeneral"]),
    continuar(){this.setErrorGeneral({ activar:false, info:""})},
  },
  computed:{
    ...mapGetters(["getErrorGeneral"])
  }
}
</script>

<style scoped>
</style>