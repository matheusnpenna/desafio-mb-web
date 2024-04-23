import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import components from "@/components"


const app = createApp(App);

for (let key in components) {
  app.component(key, components[key]);
}

app.mount('#app')
