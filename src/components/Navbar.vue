<script setup>
import { getAuth, signOut } from 'firebase/auth';
import { ref } from 'vue';
import { getFirestore, doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";

const {photoURL, displayName, uid} = getAuth().currentUser
const modal = ref(null)
const photo = ref(null)
const caption = ref("")
const loading = ref(false)

const reader = new FileReader
reader.addEventListener("load", e => photo.value = reader.result)
const preview = e => reader.readAsDataURL(e.target.files[0])

const add = async e => {
    loading.value = true

    const docRef = doc(collection(getFirestore(), "posts"))
    const photoRef = storageRef(getStorage(), docRef.id)

    await uploadString(photoRef, photo.value, "data_url")

    await setDoc(docRef, {
        uid,
        displayName,
        photoURL,
        caption: caption.value,
        photo: await getDownloadURL(photoRef),
        likes: [],
        timestamp: serverTimestamp()
    })

    modal.value.close()
}

const close = e => {
    caption.value = ""
    photo.value = null
    loading.value = false
}
</script>

<template>
  <nav class=" bg-white border-b sticky top-0 z-10">
    <div class=" max-w-4xl mx-auto p-4 grid grid-cols-3 items-center gap-4">
        <img src="/images/logo.png">
        <div class=" border bg-gray-50 px-4 py-2 rounded-md flex items-center gap-2 text-gray-400 text-sm">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input placeholder="Search" class=" flex-1 bg-transparent outline-none">
        </div>
        <div class=" flex items-center gap-4 justify-end text-xl">
            <button>
                <i class="fa-solid fa-home"></i>
            </button>
            <button @click="modal.showModal()">
                <i class="fa-regular fa-paper-plane"></i>
            </button>
            <button>
                <i class="fa-regular fa-compass"></i>
            </button>
            <button>
                <i class="fa-regular fa-heart"></i>
            </button>
            <button @click="signOut(getAuth())">
                <img :src="photoURL" class=" size-8 rounded-full object-cover">
            </button>
        </div>
    </div>
  </nav>

  <dialog ref="modal" @close="close" class=" p-4 rounded-xl backdrop:backdrop-blur-sm shadow-md w-96">
    <form @submit.prevent="add" class=" grid gap-4 grid-cols-2 text-sm">
        <img :src="photo" v-if="photo" @click="photo = null" class=" col-span-2 w-full rounded-xl cursor-pointer">
        <label v-else class=" bg-red-100 size-12 text-red-400 grid place-items-center rounded-full text-xl cursor-pointer place-self-center col-span-2">
            <i class="fa-solid fa-camera"></i>
            <input type="file" hidden required accept="image/*" @change="preview">
        </label>
        <input v-model.trim="caption" required placeholder="Enter a caption" class=" bg-gray-50 border px-4 py-2 rounded-md outline-none col-span-2">
        <button type="button" @click="modal.close()" class=" bg-gray-300 text-white px-4 py-2 rounded-md font-semibold">Close</button>
        <button type="submit" :disabled="loading" :class="{loading}" class=" bg-blue-400 text-white px-4 py-2 rounded-md font-semibold">Post</button>
    </form>
  </dialog>
</template>

<style scoped>
.loading {
    @apply text-transparent cursor-not-allowed grid place-items-center after:absolute after:w-4 after:h-4 after:border-2 after:border-white after:rounded-full after:border-r-transparent after:border-t-transparent after:animate-spin;
}
</style>