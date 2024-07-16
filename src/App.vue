<script setup>
import Navbar from "./components/Navbar.vue"
import Feed from "./components/Feed.vue"
import Sidebar from "./components/Sidebar.vue"
import Login from "./components/Login.vue"
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const user = ref(null)

onAuthStateChanged(getAuth(), u => user.value = u)
</script>

<template>
  <div v-if="user" class=" bg-gray-50 min-h-screen text-gray-600">
    <Navbar/>
    <main class=" max-w-4xl mx-auto p-4 grid grid-cols-5 gap-4 items-start">
      <Feed/>
      <Sidebar/>
    </main>
  </div>
  <Login v-else />
</template>