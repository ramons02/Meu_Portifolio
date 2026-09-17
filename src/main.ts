import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { reveal3d } from './directives/reveal3d'

createApp(App).directive('reveal3d', reveal3d).mount('#app')
