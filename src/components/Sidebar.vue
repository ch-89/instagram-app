<script setup>
import { useFollowStore } from '@/stores/follow';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getFirestore, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const {displayName, photoURL, uid} = getAuth().currentUser
const {uids} = storeToRefs(useFollowStore())

// const users = ref([
//     { displayName: "Sailor Moon", photoURL: "/images/sailor.png" },
//     { displayName: "Yoda", photoURL: "/images/yoda.png" },
//     { displayName: "Pikachu", photoURL: "/images/pikachu.png" },
// ])
const users = ref([])

const follow = id => {
    if(uids.value.includes(id)) {
        deleteDoc(doc(getFirestore(), `users/${uid}/following/${id}`))
    }
    else {
        setDoc(doc(getFirestore(), `users/${uid}/following/${id}`), {})
    }
}

onSnapshot(
    query(
        collection(getFirestore(), "users"),
        orderBy("displayName"),
        where("uid", "!=", uid)
    ),
    snapshot => users.value = snapshot.docs.map(doc => doc.data())
)
</script>

<template>
    <div class="col-span-2 text-sm grid gap-4 bg-white p-4 border rounded-xl">
        <div class=" flex items-center gap-4">
            <img :src="photoURL" class=" size-10 rounded-full object-cover">
            <h2 class=" font-semibold">{{ displayName }}</h2>
            <button class=" text-blue-400 font-semibold ml-auto">Change</button>
        </div>
        <h2 class=" font-semibold text-gray-400">Suggestions for you</h2>
        <div v-for="{displayName, photoURL, uid} in users" :key="uid" class=" flex items-center gap-4">
            <img :src="photoURL" class=" size-10 rounded-full object-cover">
            <div>
                <h3 class=" font-semibold">{{ displayName }}</h3>
                <p class=" text-xs text-gray-400">Follows you</p>
            </div>
            <button @click="follow(uid)" :class="{ 'bg-blue-400 text-white border-blue-400': uids.includes(uid) }" class=" border px-4 py-2 rounded-full text-xs font-semibold ml-auto transition-colors">Follow</button>
        </div>
    </div>
</template>