import { PDFDocument } from 'pdf-lib'

export default {
  namespaced: true,
  state() { return {
    archivoCombinadoBlob: null,    

    combinandoArchivo: false,
  }},
  actions: {

    /* async combinarArchivos(){
      const pdfBytes = await this.$store.dispatch("stCombinarPdf/combinarArchivos", {
        archivoPrincipal: this.archivoPrincipal,
        itemsConArchivo: [{id:0, nombre:"prueba", archivo: this.archivoAnexo}],
        paginaFinal: 10,
      })
      const href = URL.createObjectURL( new Blob([pdfBytes], {type: "application/pdf"}) );
      const doc = Object.assign(document.createElement("a"), { href, style: "display:none", download: 'prueba', });
      document.body.appendChild(doc);
      //Descargar archivo
      doc.click();
      URL.revokeObjectURL(href);
      doc.remove();
    }, */

    async combinarArchivos(context, {archivoPrincipal, itemsConArchivo, paginaFinal, nombreArchivo}){
      try {
        context.commit('setCombinandoArchivo', true) 
        const archivoNuevo = await PDFDocument.create()
        const archivoPrincipalPDFDocument = await context.dispatch('transformarArchivoPrincipal', archivoPrincipal)
        const itemsConArchivoPDFDocument = await context.dispatch('transformarArchivosAnexos', itemsConArchivo)
        await context.dispatch('agregarPrincipalAlNuevo', { 
          referencia: archivoNuevo, 
          archivo: archivoPrincipalPDFDocument 
        })
        await context.dispatch('agregarAnexosAlNuevoConPaginacion', { 
          referencia: archivoNuevo, 
          itemsConArchivoPDFDocument: itemsConArchivoPDFDocument,
          paginaFinal: paginaFinal
        })
        const pdfBytes = await archivoNuevo.save()
        const file = new Blob([pdfBytes], {type: "application/pdf"})
        context.commit('setArchivoCombinadoBlob', {archivo: file, nombre: nombreArchivo})
        context.commit('setCombinandoArchivo', false)
      }catch (error) {
        context.commit('setCombinandoArchivo', false)
        context.commit("setErrorGeneral",{ activar:true, info:error}, { root: true })
        console.log(error); 
      }
    },

    async transformarArchivoPrincipal( __ , archivo){
      try {
        const blob = new Blob([archivo[0]], { type: "application/pdf" })
        const href = URL.createObjectURL(blob)
        const pdf  = await fetch(href).then(res => res.arrayBuffer())
        const archivoTransformado = await PDFDocument.load(pdf)
        return archivoTransformado
      } catch (error) {throw error}
    },
    async transformarArchivosAnexos( __ , itemsConArchivo){
      try {
        let archivosTransformados = []
        for( const item of itemsConArchivo ){ 
          const archivoCopia = {}
          Object.assign(archivoCopia, item)
          const blob = new Blob([archivoCopia.archivo[0]], { type: "application/pdf" })
          const href = URL.createObjectURL(blob)
          const pdf  = await fetch(href).then(res => res.arrayBuffer())
          const load = await PDFDocument.load(pdf)
          archivoCopia.archivo = load
          archivosTransformados.push(archivoCopia)
        }
        return archivosTransformados
      } catch (error) {throw error}
    },
    async agregarPrincipalAlNuevo( __ , {referencia, archivo} ){
      try {
        const archivoPaginas = await referencia.copyPages(archivo, archivo.getPageIndices())
        for ( const pagina of archivoPaginas ){ referencia.addPage(pagina) }
      } catch (error) {throw error}
    },
    async agregarAnexosAlNuevoConPaginacion( context , {referencia, itemsConArchivoPDFDocument, paginaFinal} ){
      try {
        const fontSize = 10
        let numeroPagina = parseInt(paginaFinal)
        for ( const item of itemsConArchivoPDFDocument){
          //Agregamos la numeracion a itemsParaExcel
          const itemCopia = {}
          Object.assign(itemCopia, item)
          itemCopia.pagina = numeroPagina+1 
          await context.commit("stTablaChecklist/setItemParaExcel", itemCopia, { root: true })
          //
          const archivoPaginas = await referencia.copyPages(item.archivo, item.archivo.getPageIndices())
          for ( const pagina of archivoPaginas){
            //Agregamos la numeracion y el archivo al documento final
            numeroPagina++;
            const { width } = pagina.getSize();
            pagina.drawText( numeroPagina.toString() , { x: width - fontSize*6, y: fontSize+10, size: fontSize, });
            referencia.addPage(pagina);
          }
        }
      } catch (error) {throw error}
    },

  },
  mutations: {
    setArchivoCombinadoBlob(state, archivo){ state.archivoCombinadoBlob = archivo },
    setCombinandoArchivo(state, cargando){ state.combinandoArchivo = cargando },
    
    setReinicio(state){
      state.archivoCombinadoBlob = null
      state.combinandoArchivo = false
    }
  },
  getters: {
    getArchivoCombinadoBlob(state) { return state.archivoCombinadoBlob },
    getCombinandoArchivo(state){ return state.combinandoArchivo },
  },
}