import './assets/main.css'

import { Quasar, Notify } from 'quasar'
import { createApp } from 'vue'

import '@quasar/extras/material-icons/material-icons.css'

import 'quasar/src/css/index.sass'

import App from './App.vue'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
  },
})

app.mount('#app')
