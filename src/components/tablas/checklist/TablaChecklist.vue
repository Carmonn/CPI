<template>
  <v-table density="comfortable" class="py-1">
    <thead>
      <tr>
        <th v-for="header in getHeaders" :key="header.nombre"
          :class="`text-${header.align}`" 
          :style="`width:${header.witdh}%`"
        >
          <span :class="{'deshabilitar': habilitarTabla}">{{header.text}}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in getItems" :key="item.id" >
        <td :class="{'deshabilitar': habilitarTabla}">{{ item.nombre }}</td>
        <td><campo-botones :item="item"></campo-botones></td>
        <td><campo-archivo v-if="item.existe === 'NO'" :item="item"></campo-archivo></td>
        <td><campo-pagina v-if="item.existe === 'SI'" :item="item"></campo-pagina></td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { mapGetters } from 'vuex';
import CampoArchivo from './CampoArchivo.vue';
import CampoBotones from './CampoBotones.vue';
import CampoPagina from './CampoPagina.vue';

export default {
  components:{CampoArchivo,CampoBotones,CampoPagina},
  computed:{
    ...mapGetters("stTablaChecklist",["getItems","getHeaders","habilitarTabla"]),
  }
}
</script>