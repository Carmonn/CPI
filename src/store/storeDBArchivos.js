import { default as db, storage } from '@/firebase'
import { collection, doc } from "firebase/firestore"

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage"

export default {
  namespaced: true,
  state() { return {
    referenciaDeArchivo: null,

    subiendoArchivo: false,
    porcentajeSubidoDeArchivo: null,
  }},
  actions: {
    cancelarSubidaDeArchivo(context){ context.state.referenciaDeArchivo.cancel() },
    async subirArchivo(context, {documento, archivo, referencia}){
      try {
        context.commit('setSubiendoArchivo', true)
        let DBPipcId = null
        if(referencia === null) {DBPipcId = doc(collection(db, 'pipc')).id}
        else { DBPipcId = referencia}
        const DBArchivos = ref(storage, DBPipcId+"/"+documento.archivoNombre)
        context.state.referenciaDeArchivo = uploadBytesResumable(DBArchivos, archivo)
        context.state.referenciaDeArchivo.on('state_changed', snapshot => {
          const porcentaje = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          context.commit("setPorcentajeSubidoDeArchivo", porcentaje)
          switch (snapshot.state) {
            case 'paused': console.log('Upload is paused'); break;
            case 'running': console.log('Upload is running'); break;
          }
        },
        (error) => { console.log(error,'interno'); context.commit('setSubiendoArchivo', false)  },
        async () => { 
          const url = await getDownloadURL(context.state.referenciaDeArchivo.snapshot.ref)
          //Sube el documento a la base de datos
          documento.id = DBPipcId
          documento.archivoId = DBPipcId
          documento.archivoURL = url
          await context.dispatch("stDB/subirDocumento", documento, { root: true })
          //
          context.commit('setSubiendoArchivo', false)
        }
        )
      }catch(error){
        context.commit('setSubiendoArchivo', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },
  },
  mutations: {
    setSubiendoArchivo(state, cargando){state.subiendoArchivo=cargando},
    setPorcentajeSubidoDeArchivo(state, porcentaje){state.porcentajeSubidoDeArchivo = porcentaje},

    setReinicio(state){
      state.referenciaDeArchivo = null
      state.subiendoArchivo = false
      state.porcentajeSubidoDeArchivo = null
    }
  },
  getters: {
    getSubiendoArchivo(state){return state.subiendoArchivo},
    getPorcentajeSubidoDeArchivo(state){return Math.trunc(state.porcentajeSubidoDeArchivo)},
  },
}