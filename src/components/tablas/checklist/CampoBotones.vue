<template>
  <v-btn-toggle
    v-model="seleccionDefault"
    :disabled="habilitarTabla"
    class="bg" 
    rounded="xl" 
    color="primary"
    density="compact"
    variant="outlined"
  >
    <v-btn @click="existeEnDocumento('SI')">Si</v-btn>
    <v-btn @click="existeEnDocumento('N/A')">N/A</v-btn>
    <v-btn @click="existeEnDocumento('NO')">No</v-btn>
  </v-btn-toggle>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['item'],
  data(){return{ seleccionDefault: 1 }},
  methods:{
    existeEnDocumento(valor){
      const item = this.item
      if(valor === "SI"){item.archivo = null}
      else if(valor === "NO"){item.pagina = null}
      else{item.archivo = null; item.pagina = null}
      item.existe = valor
      this.$store.commit("stTablaChecklist/setItem", item)
    },
  },
  computed:{
    ...mapGetters("stTablaChecklist",["habilitarTabla"]),
  }
}
</script>