<script setup>
import { ref } from "vue";
import Story from "./Story.vue"
import Post from "./Post.vue"
import { collection, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { storeToRefs } from "pinia";
import { useFollowStore } from "@/stores/follow";

const stories = ref(["sailor", "yoda", "pikachu"])
const posts = ref([])
const {uid} = getAuth().currentUser
const {uids} = storeToRefs(useFollowStore())

let unsubscribe

onSnapshot(
  collection(getFirestore(), `users/${uid}/following`),
  snapshot => {
    uids.value = snapshot.docs.map(doc => doc.id)

    if(unsubscribe) unsubscribe()

    unsubscribe = onSnapshot(
      query(
        collection(getFirestore(), "posts"),
        orderBy("timestamp", "desc"),
        where("uid", "in", [uid, ...uids.value])
      ),
      snapshot => posts.value = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    )
  }
)
</script>

<template>
  <div class="col-span-3 grid gap-4">
    <div class=" bg-white border p-4 rounded-xl flex gap-4">
        <Story v-for="story in stories" :story="story" />
    </div>
    <Post v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>