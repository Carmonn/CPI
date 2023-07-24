<template>
  <v-form ref="form" class="bg-primary">
    <div class="d-flex justify-space-between bg-white pa-3 rounded-t-lg">
      <div class="w-74">
        <v-file-input
        v-model="archivoPrincipal"
        prepend-icon="mdi-file-plus"
        label="Archivo PIPC"
        variant="outlined"
        hide-details="auto"
        density="compact"
        accept=".pdf"
        >
          <template v-slot:selection> {{ cortarNombreDeArchivo }} </template>
        </v-file-input>
      </div>
      <div class="w-24">
        <v-text-field
        v-model="paginaFinal"
        label="Pagina final"
        type="number"
        variant="outlined"
        hide-details="auto"
        density="compact"
        clearable
        ></v-text-field>
      </div>
    </div>

    <div class="mt-1">
      <slot name="tabla"></slot>
    </div>

    <div class="bg-white pa-3 mt-1 rounded-b-lg">
      <slot name="envcanform"></slot>
    </div>
  </v-form> 
</template>

<script>
export default {
  data(){return{
    archivoPrincipal: null,
    paginaFinal: null,
  }},
  methods:{
    setArchivoPrincipal(){
      if(this.archivoPrincipal.length != 0){  
        this.$store.commit('stTablaChecklist/setArchivoPrincipal', this.archivoPrincipal )
      }
      else{ this.$store.commit('stTablaChecklist/setArchivoPrincipal', null ) }
    },
    setPaginaFinal(){
      if(this.paginaFinal > 0){  
        this.$store.commit('stTablaChecklist/setPaginaFinal', this.paginaFinal )
      }
      else{ this.$store.commit('stTablaChecklist/setPaginaFinal', null ) }
    },
  },
  computed:{
    cortarNombreDeArchivo(){
        const archivo = this.archivoPrincipal
        if(archivo != null){
          const longitudMaxima = 35
          const extension = archivo[0].type.split("/")[1]
          const nombre = archivo[0].name.split("."+extension)[0]
          if(nombre.length <= longitudMaxima){ return nombre+"."+extension }
          else return nombre.substring(0,longitudMaxima)+"..."+extension
        }
    },
  },
  watch:{
    archivoPrincipal(){this.setArchivoPrincipal() },
    paginaFinal(){ this.setPaginaFinal() },
  }
}
</script>