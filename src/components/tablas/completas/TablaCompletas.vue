<template>
  <v-table density="comfortable" class="py-1">
    <thead>
      <tr>
        <th v-for="(header, index) in getHeaders" :key="header.nombre"
          :class="`text-${header.align}`" 
          :style="`width:${header.witdh}%`"
        >
          <campo-header :texto="header.text" 
          :indice="index" :orientacion="header.orientacion">
          </campo-header>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(asignacion, index) in getAsignacionesCompletas" :key="asignacion.id" 
      @click="detalles(asignacion)" class="point">
        <td><campo-persona :item="asignacion"></campo-persona></td>
        <td>{{ asignacion.archivoNombre }}</td>
        <td class="text-center">{{ asignacion.fechaInicio }}</td>
        <td class="text-center">{{ asignacion.fechaUltima }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { mapGetters } from 'vuex';
import CampoHeader from './CampoHeader.vue';
import CampoPersona from './CampoPersona.vue';

export default {
  components:{CampoHeader,CampoPersona},
  methods:{
    detalles(asignacion){
      this.$store.commit("stRevisionDocumento/setDocumentoRevisado", asignacion)
      this.$router.push("/revisarCompleto")
    },
  },
  computed:{
    ...mapGetters("stTablaCompletas",["getHeaders"]),
    ...mapGetters("stDB",["getAsignacionesCompletas"])
  }
}
</script>

<style scoped>
.point{
  cursor: pointer
}
</style>