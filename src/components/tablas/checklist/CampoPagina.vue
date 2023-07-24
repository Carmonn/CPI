<template>
  <v-text-field
    v-model="pagina"
    :disabled="habilitarTabla"
    class="centered-input"
    type="number"
    variant="underlined"
    hide-details
    density="compact"
    @blur="setPagina"
    tabindex="0"
  ></v-text-field>
</template>
  
<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: ['item'],
  data() { return { pagina: null}},
  methods: {
    ...mapMutations("stTablaChecklist",["setItem","setItemParaExcel"]),
    setPagina(){
      const item = this.item
      if(this.pagina > 0){
        item.pagina = this.pagina
        this.setItem(item)
        this.setItemParaExcel(item)
      }
      else{
        item.pagina = null
        this.setItem(item)
        this.setItemParaExcel(item)
      }
    },
  },
  computed:{
    ...mapGetters("stTablaChecklist",["habilitarTabla"]),
  },
}
</script>
  
<style scoped>
.centered-input:deep(input){text-align: center}
</style>