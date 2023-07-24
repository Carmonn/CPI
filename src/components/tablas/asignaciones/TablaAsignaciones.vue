<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th v-for="(header, index) in getHeaders" :key="header.text"
        :class="`text-${header.orientacion}`" 
        :style="`width:${header.width}%`">
          <campo-header :indice="index" :texto="header.text"></campo-header>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for=" asignacion in getAsignacionesPendientes" :key="asignacion.id" 
      @click="detalles(asignacion)">
        <td class="py-1 pr-0">
          <div class="d-flex align-center h-100 w-100 px-2 rounded-lg
          bordes quitar_borde_der"
          :class="{bg_enviado: asignacion.estatus.valor==='enviado',
          bg_recibido: asignacion.estatus.valor==='corregir'}">
            <campo-persona :item="asignacion"></campo-persona>
          </div>
        </td>
        <td class="py-1 px-0">
          <div class="d-flex align-center h-100 w-100 px-2 rounded-lg
          bordes quitar_borde_x"
          :class="{bg_enviado: asignacion.estatus.valor==='enviado',
          bg_recibido: asignacion.estatus.valor==='corregir'}">
            {{ asignacion.archivoNombre }}
          </div>
        </td>
        <td class="py-1 px-0">
          <div class="d-flex align-center h-100 w-100 py-1 px-2 rounded-lg
          bordes quitar_borde_x bg_enviado"
          :class="{bg_enviado: asignacion.estatus.valor==='enviado',
          bg_recibido: asignacion.estatus.valor==='corregir'}">
              <campo-estatus :item="asignacion"></campo-estatus>
          </div>
        </td>
        <td class="py-1 pl-0">
          <div class="d-flex align-center justify-center h-100 w-100 rounded-lg
          bordes quitar_borde_izq"
          :class="{bg_enviado: asignacion.estatus.valor==='enviado',
          bg_recibido: asignacion.estatus.valor==='corregir'}">
            {{ asignacion.fechaUltima }}
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
  
<script>
import { mapGetters } from 'vuex'
import CampoHeader from './CampoHeader.vue'
import CampoPersona from "./CampoPersona.vue"
import CampoEstatus from "./CampoEstatus.vue"

export default {
  components:{CampoPersona,CampoEstatus,CampoHeader},
  data(){return{ }},
  methods:{
    detalles(asignacion){
      this.$store.commit("stRevisionDocumento/setDocumentoRevisado", asignacion)
      this.$router.push("/revisarAsignacion")
    }
  },
  computed:{
    ...mapGetters("stTablaAsignaciones", ["getHeaders"]),
    ...mapGetters("stDB",["getAsignacionesPendientes"]),
  },
}
</script>
  
<style scoped>
tbody tr div{
  cursor: pointer
}
.bordes{
  border: 1px solid rgba(0, 0, 0, .3);
}
.quitar_borde_izq{ 
  border-left: none; 
  border-top-left-radius: unset !important;
  border-bottom-left-radius: unset !important;
}
.quitar_borde_der{ 
  border-right: none; 
  border-top-right-radius: unset !important;
  border-bottom-right-radius: unset !important;
}
.quitar_borde_x{ 
  border-left: none; 
  border-top-left-radius: unset !important;
  border-bottom-left-radius: unset !important;
  border-right: none;
  border-top-right-radius: unset !important;
  border-bottom-right-radius: unset !important;}
</style>