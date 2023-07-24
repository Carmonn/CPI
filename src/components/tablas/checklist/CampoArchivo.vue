<template>
  <v-file-input
    v-model="archivo"
    :disabled="habilitarTabla"
    variant="underlined"
    hide-details
    density="compact"
    accept="image/*, .pdf"
    clearable
  >
    <template v-slot:selection>
      {{ cortarNombreDeArchivo }}
    </template>
  </v-file-input>
</template>
  
<script>
import { mapGetters } from 'vuex'
export default {
  props: ['item'],
  data() { return { archivo: null, }},
  methods: { 
    setItemConArchivo(){
      const item = this.item
      if(this.archivo.length != 0){
        item.archivo = this.archivo
        this.$store.commit("stTablaChecklist/setItem", item)
      }
      else{
        item.archivo = null
        this.$store.commit("stTablaChecklist/setItem", item)
      }
    } 
  },
  computed:{
    cortarNombreDeArchivo(){
      const archivo = this.archivo
      if(archivo != null){
        const longitudMaxima = 35
        const extension = archivo[0].type.split("/")[1]
        const nombre = archivo[0].name.split("."+extension)[0]
        if(nombre.length <= longitudMaxima){ return nombre+"."+extension }
        else return nombre.substring(0,longitudMaxima)+"..."+extension
      }
    },
    ...mapGetters("stTablaChecklist",["habilitarTabla"]),
  },
  watch:{ archivo(){this.setItemConArchivo() } }
}
</script>