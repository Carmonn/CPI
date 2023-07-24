import {query, collection, getDocs, where } from "firebase/firestore"
import db from "@/firebase"

export default {
  namespaced: true,
  state(){return{
    /* Variables locales de FormInicioSesion */
    usuario: null,
    contrasena: null,
    
    /* usuarioLogeado: {
      correo:"marisela@advr.com",
      id:"AA1VvRdxIqh3bX4eloBM",
      nombre:"Marisela Beltran Beltran",
      rol:"gestor",
    }, */
    /* usuarioLogeado: {
      correo:"luiscarmona@advr.com",
      id:"eFZBIcPj8Z4GD1nZ6Dn2",
      nombre:"Luis Enrique Carmona Beltran",
      rol:"coordinador",
    }, */
   usuarioLogeado: null,

    existeUsuario: 'ok',
    existeContrasena: 'ok',

    cargandoLogin:  false,
  }},
  actions:{
    async validarUsuarioContrasena(context, infoUsuario){
      context.commit('setCargandoLogin', true)
      try {
        const usuarioExiste = 
          await context.dispatch("verificarUsuario", infoUsuario.usuario)
        if(usuarioExiste){
          context.commit('setExisteUsuario', 'si')
          const contrasenaConcuerda = 
            await context.dispatch("verificarContrasenaDeUsuario", infoUsuario)
          if (contrasenaConcuerda) {
            const usuarioLog = await context.dispatch("obtenerUsuarioArmarData", infoUsuario.usuario)
            context.commit('setCargandoLogin', false)
            context.commit('setExisteContrasena', 'si')
            context.commit('setUsuarioLogeado', usuarioLog)
          } else {
            context.commit('setCargandoLogin', false)
            context.commit('setExisteContrasena', 'no')
          }
        }else{
          context.commit('setCargandoLogin', false)
          context.commit('setExisteUsuario', 'no')
          context.commit('setExisteContrasena', 'ok')
        }
      } catch (error) {
        context.commit('setCargandoLogin', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error)
      }
    },

    async verificarUsuario( __ , usuario){
      const dbRef = query( collection(db, "usuarios"), where("nombre", "==", usuario) );
      try {
        const response = await getDocs(dbRef)
        if (!response.empty){ return true }
        else{ return false }
      } catch (error) {throw error}
    },
    async verificarContrasenaDeUsuario( __ , infoUsuario){
      const dbRef = query(
        collection(db, "usuarios"),
        where("nombre", "==", infoUsuario.usuario),
        where("contrasena", "==", infoUsuario.contrasena)
      )
      try {
        const response = await getDocs(dbRef)
        if (!response.empty){ return true }
        else{ return false }
      } catch (error) {throw error}
    },
    async obtenerUsuarioArmarData( __ , usuario ){
      const dbRef = query( collection(db, "usuarios"), where("nombre", "==", usuario) );
      try {
        const response = await getDocs(dbRef)
        let usuarioLog = null
        response.forEach( doc => { usuarioLog = {
          id: doc.data().id,
          nombre: doc.data().nombre,
          correo: doc.data().correo,
          rol: doc.data().rol,
        }})
        return usuarioLog
      } catch (error) {throw error}
    }
  },
  mutations:{
    /* Variables locales de FormInicioSesion */
    setUsuario(state, usuario){state.usuario = usuario},
    setContrasena(state, contrasena){state.contrasena = contrasena},

    setUsuarioLogeado(state, payload){ state.usuarioLogeado = payload },

    setExisteUsuario(state, payload){ state.existeUsuario = payload },
    setExisteContrasena(state, payload){ state.existeContrasena = payload },
    setCargandoLogin(state, payload){ state.cargandoLogin = payload },

    setReinicio(state){
      state.usuario=null
      state.contrasena=null
      state.usuarioLogeado=null
      state.existeUsuario='ok'
      state.existeContrasena='ok'
      state.cargandoLogin=false
    }
  },
  getters:{
    /* Variables locales de FormInicioSesion */
    getUsuario(state){return state.usuario},
    getContrasena(state){return state.contrasena},

    getUsuarioLogeado(state){ return state.usuarioLogeado },
    esCoordinador(state){ 
      if(state.usuarioLogeado != null) return state.usuarioLogeado.rol === 'coordinador' ? true : false 
    },

    getExisteUsuario(state){
      switch (state.existeUsuario) {
        case 'ok': return {valor: 'ok', booleano: false}
        case 'si': return {valor: 'si', booleano: false}
        case 'no': return {valor: 'no', booleano: true}
        default: break
      } 
    },
    getExisteContrasena(state){
      switch (state.existeContrasena) {
        case 'ok': return {valor: 'ok', booleano: false}
        case 'si': return {valor: 'si', booleano: false}
        case 'no': return {valor: 'no', booleano: true}
        default: break
      }
    },
    getCargandoLogin(state){ return state.cargandoLogin },
  },
}