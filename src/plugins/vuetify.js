/* import { VBtn } from 'vuetify/components' */

const alias = { 
  /* MyButton: VBtn,  */
}

const defaults = {
  /* MyButton: { variant: 'outlined' }, */
}

const theme = {
  themes: {
    light: {
      colors: {
        //primary: '#1867C0',
        //secondary: '#5CBBF6',

        primary: '#2c6aaf',
        primary_light: '#3989e3',
        secondary: '#123451',
        secondary_light: '#1e588a',
        
        error: '#EB5A59',//'#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
}

export {alias as default, defaults, theme};