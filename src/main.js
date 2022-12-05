import { createApp } from 'vue'
import App from './App.vue'
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLocationCrosshairs, faLocationArrow, faChevronRight, faMagnifyingGlass, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { dom } from '@fortawesome/fontawesome-svg-core'

library.add({faLocationCrosshairs, faLocationArrow, faChevronRight, faMagnifyingGlass, faLocationDot})


createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
dom.watch()