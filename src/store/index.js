import { createStore } from "vuex";

import storeInicioSesion from "./storeInicioSesion"
import storeCombinarPdf from "./storeCombinarPdf"
import storeDB from "./storeDB"
import storeDBArchivos from "./storeDBArchivos"
import storeTablaChecklist from "./storeTablaChecklist"
import storeTablaAsignaciones from "./storeTablaAsignaciones"
import storeRevisionDocumento from "./storeRevisionDocumento";
import storeTablaCompletas from "./storeTablaCompletas";

const store = createStore({
  modules:{
    stInicioSesion: storeInicioSesion,
    stCombinarPdf: storeCombinarPdf,
    stDB: storeDB,
    stDBArchivos: storeDBArchivos,
    stTablaChecklist : storeTablaChecklist,
    stTablaAsignaciones : storeTablaAsignaciones,
    stRevisionDocumento: storeRevisionDocumento,
    stTablaCompletas: storeTablaCompletas,
  },
  state(){return{
    errorGeneral:{ activar:false, info:""},
  }},
  actions:{},
  mutations:{
    setErrorGeneral(state, error){ state.errorGeneral = error },

    setReinicio(state){
      state.errorGeneral = { activar:false, info:""}
    }
  },
  getters:{
    getErrorGeneral(state){return state.errorGeneral},
    getFecha(){
      const today=new Date(); 
      const now=today.toLocaleString();
      const fecha = now.split(',')[0]
      const horaTotal = now.split(', ')[1]
      const horas = horaTotal.split(':')[0]
      const minutos = horaTotal.split(':')[1]
      const hora = horas+':'+minutos
      return {fecha,hora}
    }
  },
})

export default store