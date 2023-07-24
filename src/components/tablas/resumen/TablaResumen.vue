<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th v-for="header in getHeaders" :key="header.nombre" 
          :class="`text-${header.align}`" 
          :style="`width:${header.witdh}%`"
        >
          {{header.text}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in getItems" :key="item.id" >
        <td :class="{ bg_blanco2: index%2 === 0 }">{{ item.nombre }}</td>
        <td v-if="item.pagina != null" :class="{ bg_blanco2: index%2 === 0 }" class="text-center">{{ item.pagina }}</td>
        <td v-else :class="{ bg_blanco2: index%2 === 0 }" class="text-center">-</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed:{
    ...mapGetters("stInicioSesion",["getUsuarioLogeado"]),
    ...mapGetters("stRevisionDocumento",["getDocumentoRevisado","getHeaders","getItems"]),
  },
}
</script>

<style scoped>
td{ height: 5px !important; }
.bg_blanco2{background-color: var(--blanco2);}
</style>