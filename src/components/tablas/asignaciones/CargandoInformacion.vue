<template>
  <v-table>
    <tbody>
      <tr>
        <td colspan="3">
          <h4 class="text-center">Cargando la informacion</h4>
        </td>
      </tr>
      <td colspan="3" class="pa-0">
        <v-progress-linear
          indeterminate 
          height="6" 
          color="secondary"
        ></v-progress-linear>
      </td>
    </tbody>
  </v-table>
</template>
    
<script>
export default {
    data(){return{}},
    methods:{},
    computed:{},
    mounted(){},
}
</script>