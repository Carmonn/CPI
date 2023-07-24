<template>
  <h2>Sin Pendientes</h2>
  <v-card class="bg-success pa-6 my-5">
    <p class="text-center">No hay asignaciones pendientes ¡Bien hecho!</p>
    <div class="d-flex justify-center mt-5">
      <v-icon icon="mdi-check-bold" size="x-large"></v-icon>
    </div>
  </v-card>
  <!-- <div>
    <v-btn variant="tonal" color="primary">Ver asignaciones completas</v-btn>
  </div> -->
</template>
  
<script>
export default {
    data(){return{}},
    methods:{},
    computed:{},
    mounted(){},
}
</script>

<style scoped>
p{
  font-size: large;
}
</style>