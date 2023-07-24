import { createApp } from 'vue'
import App from './App.vue'

//Vuex
import router from "./router"
//Vue-router
import store from './store/index'
//CSS 
import './assets/css/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { default as aliases, defaults, theme } from './plugins/vuetify'
// Add icons 'npm install @mdi/font -D'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({ 
    components, directives, aliases, 
    defaults, theme, icons: { iconfont: 'mdi' },
})

//Componentes globales
import LogErrorGeneral from './components/dialogs/LogErrorGeneral.vue'
import MenuNavegacion from './components/layout/MenuNavegacion.vue'

const app = createApp(App)

app.component('menu-navegacion', MenuNavegacion)
app.component('log-error-general', LogErrorGeneral)
app.use(store)
app.use(router)
app.use(vuetify)
app.mount('#app')
