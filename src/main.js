import './assets/main.css'
import { initializeApp } from "firebase/app";
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

initializeApp({
    apiKey: "AIzaSyBypZEZr2m2gjmQ3eYxQHTlPU829CTJXxc",
    authDomain: "instagram-clone-bf9ee.firebaseapp.com",
    projectId: "instagram-clone-bf9ee",
    storageBucket: "instagram-clone-bf9ee.appspot.com",
    messagingSenderId: "906259309345",
    appId: "1:906259309345:web:24acf2139c3aee2e0c1460",
    measurementId: "G-5MZ3QV82R4"
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
