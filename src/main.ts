import 'vue-toast-notification/dist/theme-bootstrap.css'
import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import ToastPlugin from 'vue-toast-notification'

import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.use(ToastPlugin)

app.mount('#app')
