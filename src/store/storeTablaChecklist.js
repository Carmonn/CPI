
export default {
  namespaced: true,

  state(){return{
    archivoPrincipal:null,
    paginaFinal:null,

    items: [
      { index: 0,  nombre: 'Plan de contingencias',                  existe: 'N/A', archivo: null, pagina: null},
      { index: 1,  nombre: 'Plan de continuidad de operaciones',     existe: 'N/A', archivo: null, pagina: null},
      { index: 2,  nombre: 'Registros/datos del tercer acreditado',  existe: 'N/A', archivo: null, pagina: null},
      { index: 3,  nombre: 'Atención de mergencia COVID19',          existe: 'N/A', archivo: null, pagina: null},
      { index: 4,  nombre: 'Acta constitutiva de la UIPC',           existe: 'N/A', archivo: null, pagina: null},
      { index: 5,  nombre: 'Constancias de capacitación',            existe: 'N/A', archivo: null, pagina: null},
      { index: 6,  nombre: 'Brigadistas',                            existe: 'N/A', archivo: null, pagina: null},
      { index: 7,  nombre: 'Simulacros',                             existe: 'N/A', archivo: null, pagina: null},
      { index: 8,  nombre: 'Dictamen eléctrico',                     existe: 'N/A', archivo: null, pagina: null},
      { index: 9,  nombre: 'Dictamen estructural',                   existe: 'N/A', archivo: null, pagina: null},
      { index: 10, nombre: 'Evidencia de extintores',                existe: 'N/A', archivo: null, pagina: null},
      { index: 11, nombre: 'Planos',                                 existe: 'N/A', archivo: null, pagina: null},
      { index: 12, nombre: 'Fotos de sucursal',                      existe: 'N/A', archivo: null, pagina: null},
    ],
    itemsParaExcel: [
      { index: 0,  nombre: 'Plan de contingencias',                 pagina: null},
      { index: 1,  nombre: 'Plan de continuidad de operaciones',    pagina: null},
      { index: 2,  nombre: 'Registros/datos del tercer acreditado', pagina: null},
      { index: 3,  nombre: 'Atención de mergencia COVID19',         pagina: null},
      { index: 4,  nombre: 'Acta constitutiva de la UIPC',          pagina: null},
      { index: 5,  nombre: 'Constancias de capacitación',           pagina: null},
      { index: 6,  nombre: 'Brigadistas',                           pagina: null},
      { index: 7,  nombre: 'Simulacros',                            pagina: null},
      { index: 8,  nombre: 'Dictamen eléctrico',                    pagina: null},
      { index: 9,  nombre: 'Dictamen estructural',                  pagina: null},
      { index: 10, nombre: 'Evidencia de extintores',               pagina: null},
      { index: 11, nombre: 'Planos',                                pagina: null},
      { index: 12, nombre: 'Fotos de sucursal',                     pagina: null},
    ],
    headers: [
      { text: 'Nombre', witdh: 30, align: 'left'},
      { text: '¿Dentro del documento?', witdh: 20, align: 'center'},
      { text: 'Archivo', witdh: 40, align: 'center'}, 
      { text: 'No.pagina', witdh: 10, align: 'center'}
    ],
  }},

  actions:{},
  mutations:{
    setItem(state, item){ state.items[item.index] = item},
    setItemParaExcel(state, item){ state.itemsParaExcel[item.index].pagina = item.pagina},
    setArchivoPrincipal(state, archivo){state.archivoPrincipal = archivo},
    setPaginaFinal(state, paginaFinal){state.paginaFinal = paginaFinal},

    setReinicio(state){
      state.archivoPrincipal= null
      state.paginaFinal= null
      state.items = [
        { index: 0, nombre: 'Plan de contingencias',                  existe: 'N/A', archivo: null, pagina: null},
        { index: 1, nombre: 'Plan de continuidad de operaciones',     existe: 'N/A', archivo: null, pagina: null},
        { index: 2, nombre: 'Registros/datos del tercer acreditado',  existe: 'N/A', archivo: null, pagina: null},
        { index: 3, nombre: 'Atención de mergencia COVID19',          existe: 'N/A', archivo: null, pagina: null},
        { index: 4, nombre: 'Acta constitutiva de la UIPC',           existe: 'N/A', archivo: null, pagina: null},
        { index: 5, nombre: 'Constancias de capacitación',            existe: 'N/A', archivo: null, pagina: null},
        { index: 6, nombre: 'Brigadistas',                            existe: 'N/A', archivo: null, pagina: null},
        { index: 7, nombre: 'Simulacros',                             existe: 'N/A', archivo: null, pagina: null},
        { index: 8, nombre: 'Dictamen eléctrico',                     existe: 'N/A', archivo: null, pagina: null},
        { index: 9, nombre: 'Dictamen estructural',                   existe: 'N/A', archivo: null, pagina: null},
        { index: 10, nombre: 'Evidencia de extintores',               existe: 'N/A', archivo: null, pagina: null},
        { index: 11, nombre: 'Planos',                                existe: 'N/A', archivo: null, pagina: null},
        { index: 12, nombre: 'Fotos de sucursal',                     existe: 'N/A', archivo: null, pagina: null},
      ]
      state.itemsParaExcel= [
        { index: 0, nombre: 'Plan de contingencias',                 pagina: null},
        { index: 1, nombre: 'Plan de continuidad de operaciones',    pagina: null},
        { index: 2, nombre: 'Registros/datos del tercer acreditado', pagina: null},
        { index: 3, nombre: 'Atención de mergencia COVID19',         pagina: null},
        { index: 4, nombre: 'Acta constitutiva de la UIPC',          pagina: null},
        { index: 5, nombre: 'Constancias de capacitación',           pagina: null},
        { index: 6, nombre: 'Brigadistas',                           pagina: null},
        { index: 7, nombre: 'Simulacros',                            pagina: null},
        { index: 8, nombre: 'Dictamen eléctrico',                    pagina: null},
        { index: 9, nombre: 'Dictamen estructural',                  pagina: null},
        { index: 10, nombre: 'Evidencia de extintores',              pagina: null},
        { index: 11, nombre: 'Planos',                               pagina: null},
        { index: 12, nombre: 'Fotos de sucursal',                    pagina: null},
      ]
    }
  },
  getters:{
    getItems(state){return state.items},
    getItemsParaExcel(state){return state.itemsParaExcel},
    getHeaders(state){return state.headers},

    getArchivoPrincipal(state){return state.archivoPrincipal},
    getPaginaFinal(state){return state.paginaFinal},
    habilitarTabla(state){return state.archivoPrincipal != null && state.paginaFinal != null ? false : true},
    getItemsConArchivo(state) {return state.items.filter(item => item.archivo)},
  },
}