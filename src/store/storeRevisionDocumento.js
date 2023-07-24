
export default {
  namespaced: true,

  state(){return{
    documentoRevisado: null,
    comentario: null,

    headers: [
      { text: 'Nombre', witdh: 80, align: 'left'}, 
      { text: 'No.pagina', witdh: 20, align: 'center'}
    ],

    opcionLogEliminarDocumento: false,
    opcionLogCompletarDocumento: false,
  }},
  actions:{},
  mutations:{
    setDocumentoRevisado(state, documento){state.documentoRevisado = documento},
    setComentario(state, comentario){ state.comentario = comentario },
    setOpcionLogEliminarDocumento(state, opcion){state.opcionLogEliminarDocumento = opcion},
    setOpcionLogCompletarDocumento(state, opcion){state.opcionLogCompletarDocumento = opcion},

    setReinicio(state){
      state.documentoRevisado = null
      state.comentario = null
      state.opcionLogEliminarDocumento = false
      state.opcionLogCompletarDocumento = false
    }
  },
  getters:{
    getDocumentoRevisado(state){return state.documentoRevisado},
    getHeaders(state){return state.headers},
    getItems(state){return state.documentoRevisado === null ? null : state.documentoRevisado.items},
    getComentario(state){return state.comentario},
    getOpcionLogEliminarDocumento(state){return state.opcionLogEliminarDocumento},
    getOpcionLogCompletarDocumento(state){return state.opcionLogCompletarDocumento},
  },
  }