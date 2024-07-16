<script setup>
import { getAuth } from 'firebase/auth';
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { onBeforeUnmount, ref } from 'vue';

const props = defineProps(["post"])
const {uid, photoURL, displayName} = getAuth().currentUser
const message = ref("")
const comments = ref([])

const like = e => {
    updateDoc(doc(getFirestore(), `posts/${props.post.id}`), {
        likes: props.post.likes.includes(uid) ? arrayRemove(uid) : arrayUnion(uid)
    })
}

const add = e => {
    addDoc(collection(getFirestore(), `posts/${props.post.id}/comments`), {
        displayName,
        photoURL,
        message: message.value,
        timestamp: serverTimestamp()
    })

    message.value = ""
}

const remove = id => deleteDoc(doc(getFirestore(), `posts/${props.post.id}/comments/${id}`))

const unsubscribe = onSnapshot(
    query(
        collection(getFirestore(), `posts/${props.post.id}/comments`),
        orderBy("timestamp", "desc")
    ),
    snapshot => comments.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
)

onBeforeUnmount(unsubscribe)
</script>

<template>
  <div class=" bg-white border rounded-xl">
    <div class=" p-4 flex items-start gap-4">
        <img :src="post.photoURL" class=" size-12 rounded-full object-cover">
        <div>
            <h3 class=" font-semibold">{{ post.displayName }}</h3>
            <p class=" text-sm text-gray-400">{{ moment(post.timestamp?.toDate()).fromNow() }}</p>
        </div>
        <button class=" ml-auto text-xl">
            <i class="fa-solid fa-ellipsis"></i>
        </button>
    </div>
    <img :src="post.photo" class=" w-full">
    <div class=" p-4 grid gap-2">
        <div class=" flex gap-4 text-xl">
            <button @click="like">
                <i :class="post.likes.includes(uid) ? 'fa-solid text-red-400' : 'fa-regular'" class="fa-heart"></i>
            </button>
            <button>
                <i class="fa-regular fa-comment"></i>
            </button>
            <button>
                <i class="fa-regular fa-paper-plane"></i>
            </button>
            <button class=" ml-auto">
                <i class="fa-regular fa-bookmark"></i>
            </button>
        </div>
        <p v-if="post.likes.length" class=" font-semibold">{{ post.likes.length }} likes</p>
        <div class=" flex gap-2">
            <h3 class=" font-semibold">{{ post.displayName }}</h3>
            <p>{{ post.caption }}</p>
        </div>
        <div v-for="{id, displayName, photoURL, message} in comments" :key="id" class=" flex items-center gap-2 text-sm">
            <img :src="photoURL" class=" size-8 rounded-full object-cover">
            <h3 class=" font-semibold">{{ displayName }}</h3>
            <p>{{ message }}</p>
            <button @click="remove(id)" class=" ml-auto">
                <i class="fa-regular fa-heart"></i>
            </button>
        </div>
    </div>
    <form @submit.prevent="add" class=" border-t p-4 flex gap-4">
        <button class=" text-xl">
            <i class="fa-regular fa-smile"></i>
        </button>
        <input v-model.trim="message" required placeholder="Add a comment" class=" flex-1 outline-none">
        <button class=" text-blue-400 font-semibold text-sm">Post</button>
    </form>
  </div>
</template>