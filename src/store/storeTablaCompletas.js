
export default {
    namespaced: true,
  
    state(){return{
      headers: [
        {text:"" , width: 25, orientacion:"left"},
        {text:"Nombre de Archivo" , width: 25, orientacion:"left"},
        {text:"Inicio" , width: 30, orientacion:"center"},
        {text:"Termino" , width: 20, orientacion:"center"},
      ],
      opcionFiltros:[0,0,0,0],
    }},
  
    actions:{},
    mutations:{
      setOpcionesFiltro(state, opcion){
        let arrayOpciones = [0,0,0,0]
        for (let index = 0; index < state.opcionFiltros.length; index++) {
          if(index === opcion.index){ arrayOpciones[index] = opcion.valor}
        }
        state.opcionFiltros=arrayOpciones
      },
      setReinicio(state){
        state.opcionFiltros = [0,0,0,0]
      },
    },
    getters:{
      getHeaders( state, getters, rootState, rootGetters ){
        if(rootGetters["stInicioSesion/esCoordinador"]){state.headers[0].text = "Gestor"}
        else state.headers[0].text = "Coordinador"
        return state.headers
      },
      getOpcionesFiltro(state){return state.opcionFiltros},
    },
    }