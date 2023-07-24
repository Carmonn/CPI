import { default as db} from '@/firebase'
import { 
  collection, doc, getDoc, getDocs, deleteDoc,
  query, where, setDoc, updateDoc, onSnapshot,
} from "firebase/firestore"

export default {
  namespaced: true,
  state() { return {
    usuarioBuscado: null,
    cargandoUsuario: false,

    usuariosAsignados: null,
    cargandoUsuariosAsignados: false,

    asignacionesPendientes: [],
    cargandoAsignacionesPendientes: false,
    asignacionARevisar: null,

    asignacionesCompletas: [],
    cargandoAsignacionesCompletas: false,
    asignacionARevisarCompleta: null,

    documento: null,
    subiendoDocumento: false,
    subidaDeDocumentoFinalizada: false,

    eliminandoDocumento: false,
    eliminacionDeDocumentoFinalizada: false,

    completandoDocumento: false,
    completadoDeDocumentoFinalizada: false,

    subiendoComentario: false,
    subidaDeComentarioFinalizada: false,
  }},
  actions: {
    async buscarUsuario( context , idUsuario){
      try {
        context.commit('setCargandoUsuario', true)
        context.commit('setUsuarioBuscado', null)
        const response = await getDoc( doc(db, `usuarios/${idUsuario}`) );
        const usuario = {
          id : response.data().id,
          nombre : response.data().nombre,
          correo : response.data().correo,
          rol : response.data().rol
        }
        context.commit('setUsuarioBuscado', usuario)
        context.commit('setCargandoUsuario', false)
      }catch (error) {
        context.commit('setCargandoUsuario', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error)
      }
    },
    async buscarUsuarioReturn( __ , idUsuario){
      try {
        const response = await getDoc( doc(db, `usuarios/${idUsuario}`) );
        const usuario = {
          id : response.data().id,
          nombre : response.data().nombre,
          correo : response.data().correo,
          rol : response.data().rol
        }
        return usuario
      }catch (error) { throw(error) }
    },

    async buscarUsuariosAsignados(context, idUsuario){
      try {
        context.commit('setCargandoUsuariosAsignados', true)
        context.commit("setUsuariosAsignados", null)
        const usuario = await context.dispatch("buscarUsuarioReturn", idUsuario)
        const idUsuariosAsignados = await context.dispatch("buscarAsignadosEnCoordinadorOGestor",{
          idUsuario: usuario.id, rol:usuario.rol
        })
        if (idUsuariosAsignados != null) {
          const usuariosAsignados = await context.dispatch("buscarUsuarios", idUsuariosAsignados)
          context.commit("setUsuariosAsignados", usuariosAsignados)
          context.commit('setCargandoUsuariosAsignados', false)
        }
        else{ 
          context.commit("setUsuariosAsignados", null)
          context.commit('setCargandoUsuariosAsignados', false)
        }
      }catch(error){
        context.commit('setCargandoUsuariosAsignados', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },
    async buscarUsuarios( __ , idUsuarios){
      try {
        let usuariosAsignados = []
        for (const idUsuario of idUsuarios) {
          const response = await getDoc( doc(db, `usuarios/${idUsuario}`) );
          const usuario = {
            id : response.data().id,
            nombre : response.data().nombre,
            correo : response.data().correo,
            rol : response.data().rol
          }
          usuariosAsignados.push(usuario)
        }
        return usuariosAsignados
      }catch (error) { throw(error) }
    },
    async buscarAsignadosEnCoordinadorOGestor( __ , {idUsuario, rol}){
      try {
        let idUsuariosAsignados = []
        if(rol === "coordinador"){
          const dbRef = query(collection(db, "asignaciones"), where("idCoordinador", "==", idUsuario));
          const response = await getDocs(dbRef);
          if(!response.empty){
            response.forEach( doc => { idUsuariosAsignados.push(doc.data().idGestor) });
            return idUsuariosAsignados
          }else{ return null } 
        }
        if(rol === "gestor"){ 
          const dbRef = query(collection(db, "asignaciones"), where("idGestor", "==", idUsuario));
          const response = await getDocs(dbRef);
          if(!response.empty){
            response.forEach( doc => { idUsuariosAsignados.push(doc.data().idCoordinador) });
            return idUsuariosAsignados
          }else{ return null } 
        }
      }catch(error){ throw(error) }
    },

    async buscarAsignacionesPendientesRealtime( context, idUsuario ){
      try {
        context.commit('setCargandoAsignacionesPendientes', true)
        const usuario = await context.dispatch("buscarUsuarioReturn", idUsuario)
        const dbRef = await context.dispatch("generarRefCoordinadorOGestor", 
        {idUsuario:usuario.id, rol:usuario.rol, completo:false})
        const asignaciones = onSnapshot(dbRef, async (response) => {
          context.commit('setCargandoAsignacionesPendientes', true)
          let asignacionesPendientes = []
          if(!response.empty){ response.forEach(doc=>{asignacionesPendientes.push(doc.data())})
          }else{ asignacionesPendientes = []  }
          for( const index in asignacionesPendientes){
            const idSupervizor = asignacionesPendientes[index].supervisorId
            const idTrabajador =  asignacionesPendientes[index].trabajadorId
            const supervizor = await context.dispatch("buscarUsuarioReturn", idSupervizor)
            const trabajador = await context.dispatch("buscarUsuarioReturn", idTrabajador)
            const historial = asignacionesPendientes[index].historial
            const estatus = await context.dispatch("determinarStatus", {idUsuario, historial})
            asignacionesPendientes[index].supervisorInfo = supervizor
            asignacionesPendientes[index].trabajadorInfo = trabajador
            asignacionesPendientes[index].estatus = estatus
          }
          context.commit("setAsignacionesPendientes", asignacionesPendientes)
          context.commit('setCargandoAsignacionesPendientes', false)
        });
      }catch(error){
        context.commit('setCargandoAsignacionesPendientes', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },
    async generarRefCoordinadorOGestor( __ , {idUsuario,rol,completo}){
      if (rol === "coordinador") {
        const dbRef = query(collection(db, "pipc"), 
          where("supervisorId", "==", idUsuario),
          where("completo", "==", completo)
        )
        return dbRef
      }
      if(rol === "gestor"){
        const dbRef = query(collection(db, "pipc"), 
          where("trabajadorId", "==", idUsuario),
          where("completo", "==", completo)
        )
        return dbRef
      }
    },

    async buscarAsignacionesPendientes( context, idUsuario ){
      try {
        context.commit('setCargandoAsignacionesPendientes', true)
        const usuario = await context.dispatch("buscarUsuarioReturn", idUsuario)
        const asignaciones = await context.dispatch("buscarAsignacionesEnCoordinadorOGestor",{
          idUsuario:usuario.id, rol:usuario.rol
        })
        for( const index in asignaciones){
          const idSupervizor = asignaciones[index].supervisorId
          const idTrabajador =  asignaciones[index].trabajadorId
          const supervizor = await context.dispatch("buscarUsuarioReturn", idSupervizor)
          const trabajador = await context.dispatch("buscarUsuarioReturn", idTrabajador)
          const historial = asignaciones[index].historial
          const estatus = await context.dispatch("determinarStatus", {idUsuario, historial})
          asignaciones[index].supervisorInfo = supervizor
          asignaciones[index].trabajadorInfo = trabajador
          asignaciones[index].estatus = estatus
        }
        context.commit("setAsignacionesPendientes", asignaciones)
        context.commit('setCargandoAsignacionesPendientes', false)
      }catch(error){
        context.commit('setCargandoAsignacionesPendientes', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },
    async determinarStatus( __ , {idUsuario, historial } ){
      const dimension = historial.length
      const ultimaAccion = historial[dimension - 1]
      if(idUsuario === ultimaAccion.idUsuario){return{valor: "enviado", iteraciones:dimension}}
      else{ return{valor: "corregir", iteraciones:dimension}}
    },
    async buscarAsignacionesEnCoordinadorOGestor( __ , {idUsuario, rol}){
      try {
        let asignacionesPendientes = []
        if (rol === "coordinador") {
          const dbRef = query(collection(db, "pipc"), 
            where("supervisorId", "==", idUsuario),
            where("completo", "==", false)
          )
          const response = await getDocs(dbRef);
          //Agrega todos los pipc a un arreglo local
          if(!response.empty){ response.forEach(doc=>{asignacionesPendientes.push(doc.data())})
          }else{ asignacionesPendientes = [] }
          return asignacionesPendientes
        }
        if(rol === "gestor"){
          const dbRef = query(collection(db, "pipc"), 
            where("trabajadorId", "==", idUsuario),
            where("completo", "==", false)
          )
          const response = await getDocs(dbRef);
          //Agrega todos los pipc a un arreglo local
          if(!response.empty){ response.forEach(doc=>{asignacionesPendientes.push(doc.data())})
          }else{ asignacionesPendientes = []  } 
          return asignacionesPendientes
        }
      }catch(error){ throw(error) }
    },

    async buscarAsignacionesCompletasRealtime( context, idUsuario ){
      try {
        context.commit('setCargandoAsignacionesCompletas', true)
        const usuario = await context.dispatch("buscarUsuarioReturn", idUsuario)
        const dbRef = await context.dispatch("generarRefCoordinadorOGestor", {
          idUsuario:usuario.id, rol:usuario.rol, completo:true
        })
        const asignaciones = onSnapshot(dbRef, async (response) => {
          context.commit('setCargandoAsignacionesCompletas', true)
          let asignacionesCompletas = []
          if(!response.empty){ response.forEach(doc=>{asignacionesCompletas.push(doc.data())})
          }else{ asignacionesCompletas = []  }
          for( const index in asignacionesCompletas){
            const idSupervizor = asignacionesCompletas[index].supervisorId
            const idTrabajador =  asignacionesCompletas[index].trabajadorId
            const supervizor = await context.dispatch("buscarUsuarioReturn", idSupervizor)
            const trabajador = await context.dispatch("buscarUsuarioReturn", idTrabajador)
            asignacionesCompletas[index].supervisorInfo = supervizor
            asignacionesCompletas[index].trabajadorInfo = trabajador
          }
          context.commit("setAsignacionesCompletas", asignacionesCompletas)
          context.commit('setCargandoAsignacionesCompletas', false)
        });
      }catch(error){
        context.commit('setCargandoAsignacionesCompletas', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },

    async completarDocumento( context , documento ){
      try {
        context.commit('setCompletandoDocumento', true)
        const referencia = doc(db, "pipc", documento.id)
        await setDoc(referencia, documento)
        /* context.commit("setDocumento", documento) */
        context.commit('setCompletadoDeDocumentoFinalizada', true)
        context.commit('setCompletandoDocumento', false)
      }catch(error){
        context.commit("setCompletadoDeDocumentoFinalizada", false)
        context.commit('setCompletandoDocumento', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },
    async subirDocumento( context , documento ){
      try {
        context.commit('setSubiendoDocumento', true)
        const referencia = doc(db, "pipc", documento.id)
        await setDoc(referencia, documento)
        context.commit("setDocumento", documento)
        context.commit('setSubidaDeDocumentoFinalizada', true)
        context.commit('setSubiendoDocumento', false)
      }catch(error){
        context.commit("setSubidaDeDocumentoFinalizada", false)
        context.commit('setSubiendoDocumento', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },
    async eliminarDocumento( context , id ){
      try {
        context.commit('setEliminandoDocumento', true)
        const referencia = doc(db, "pipc", id)
        await deleteDoc(referencia)
        context.commit('setEliminacionDeDocumentoFinalizada', true)
        context.commit('setEliminandoDocumento', false)
      }catch(error){
        context.commit("setEliminacionDeDocumentoFinalizada", false)
        context.commit('setEliminandoDocumento', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    },

    async modificarHistorial(context, documento ){
      try {
        context.commit('setSubiendoComentario', true)
        const referencia = doc(db, "pipc", documento.id)
        await updateDoc(referencia, { historial: documento.historial })
        context.commit("setDocumento", documento)
        context.commit('setSubiendoComentario', false)
        context.commit('setSubidaDeComentarioFinalizada', true)
      }catch(error){
        context.commit('setSubiendoComentario', false)
        context.commit('setSubidaDeComentarioFinalizada', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error);
      }
    }
  },
  mutations: {
    setUsuarioBuscado(state, usuario){ state.usuarioBuscado = usuario },
    setCargandoUsuario(state, cargando){ state.cargandoUsuario = cargando},

    setUsuariosAsignados(state, usuarios){ state.usuariosAsignados = usuarios},
    setCargandoUsuariosAsignados(state, cargando){ state.cargandoUsuariosAsignados = cargando},

    setAsignacionesPendientes(state, asignaciones){ state.asignacionesPendientes = asignaciones},
    setCargandoAsignacionesPendientes(state, cargando){ state.cargandoAsignacionesPendientes = cargando},
    setAsignacionARevisar(state, asignacion){ state.asignacionARevisar = asignacion},

    setAsignacionesCompletas(state, asignaciones){state.asignacionesCompletas = asignaciones},
    setCargandoAsignacionesCompletas(state, cargando){state.cargandoAsignacionesCompletas = cargando},
    setAsignacionARevisarCompleta(state, asignacion){state.asignacionARevisarCompleta = asignacion},

    setDocumento(state, documento){state.documento = documento},
    setSubiendoDocumento(state, cargando){state.subiendoDocumento = cargando},
    setSubidaDeDocumentoFinalizada(state, status){ state.subidaDeDocumentoFinalizada = status},

    setCompletandoDocumento(state, cargando){state.completandoDocumento = cargando},
    setCompletadoDeDocumentoFinalizada(state, status){state.completadoDeDocumentoFinalizada = status},

    setEliminandoDocumento(state, cargando){state.eliminandoDocumento=cargando},
    setEliminacionDeDocumentoFinalizada(state, status){state.eliminacionDeDocumentoFinalizada=status},

    setSubiendoComentario(state, cargando){state.subiendoComentario = cargando},
    setSubidaDeComentarioFinalizada(state, status){state.subidaDeComentarioFinalizada = status},

    setReinicio(state){
      state.usuarioBuscado = null
      state.cargandoUsuario = false
      state.usuariosAsignados = null
      state.cargandoUsuariosAsignados = false
      state.asignacionesPendientes = []
      state.cargandoAsignacionesPendientes = false
      state.documento = null
      state.subiendoDocumento = false
      state.subidaDeDocumentoFinalizada = false
      state.subiendoComentario = false
      state.subidaDeComentarioFinalizada = false
      state.eliminandoDocumento = false
      state.eliminacionDeDocumentoFinalizada =false
      state.completandoDocumento= false
      state.completadoDeDocumentoFinalizada= false
      state.asignacionesCompletas= []
      state.cargandoAsignacionesCompletas= false
      state.asignacionARevisarCompleta= null
    },
  },
  getters: {
    getUsuariosAsignados(state){return state.usuariosAsignados},
    getCargandoUsuariosAsignados(state){return state.cargandoUsuariosAsignados},
    
    getAsignacionesPendientes(state){return state.asignacionesPendientes},
    getCargandoAsignacionesPendientes(state){return state.cargandoAsignacionesPendientes},
    
    getAsignacionARevisar(state){ return state.asignacionARevisar},

    getAsignacionesCompletas(state){return state.asignacionesCompletas},
    getCargandoAsignacionesCompletas(state){return state.cargandoAsignacionesCompletas},
    getAsignacionARevisarCompleta(state){return state.asignacionARevisarCompleta},
   
    getDocumento(state){return state.documento},
    getSubiendoDocumento(state){return state.subiendoDocumento},
    getSubidaDeDocumentoFinalizada(state){return state.subidaDeDocumentoFinalizada},
    
    getCompletandoDocumento(state){return state.completandoDocumento},
    getCompletadoDeDocumentoFinalizada(state){return state.completadoDeDocumentoFinalizada},

    getEliminandoDocumento(state){return state.eliminandoDocumento},
    getEliminacionDeDocumentoFinalizada(state){return state.eliminacionDeDocumentoFinalizada},
    
    getSubiendoComentario(state){return state.subiendoComentario},
    getSubidaDeComentarioFinalizada(state){return state.subidaDeComentarioFinalizada},
  },
}