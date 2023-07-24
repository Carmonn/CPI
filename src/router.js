import { createRouter, createWebHistory } from "vue-router";

//Paginas
import InicioSesion from "@/pages/InicioSesion.vue"
import MostrarAsignaciones from "@/pages/MostrarAsignaciones.vue"
import MostrarAsignacionesCompletas from "@/pages/MostrarAsignacionesCompletas.vue"
import CrearAsignacion from "@/pages/CrearAsignacion.vue"
import PersonalAsignado from "@/pages/PersonalAsignado.vue"
import RevisarAsignacion from "@/pages/RevisarAsignacion.vue"
import RevisarCompleto from "@/pages/RevisarCompleto.vue"

const router = createRouter({
  history: createWebHistory(),
  routes:[
    {path:'/', redirect:'/inicioSesion'},
    {path:'/inicioSesion', name:'inicioSesion', component: InicioSesion},
    {path:'/mostrarAsignaciones', name:'mostrarAsignaciones', component: MostrarAsignaciones},
    {path:'/mostrarAsignacionesCompletas', name:'mostrarAsignacionesCompletas', component: MostrarAsignacionesCompletas},
    {path:'/crearAsignacion', name:'crearAsignacion', component: CrearAsignacion}, 
    {path:'/personalAsignado', name:'personalAsignado', component: PersonalAsignado},
    {path:'/revisarAsignacion', name:'revisarAsignacion', component: RevisarAsignacion},
    {path:'/revisarCompleto', name:'revisarCompleto', component: RevisarCompleto},
  ]
})

export default router