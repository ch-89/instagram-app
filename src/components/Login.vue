<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const login = async e => {
  const cred = await signInWithPopup(getAuth(), new GoogleAuthProvider)

  if(getAdditionalUserInfo(cred).isNewUser) {
    const {uid, displayName, photoURL} = cred.user

    setDoc(doc(getFirestore(), `users/${uid}`), { uid, displayName, photoURL })
  }
}
</script>

<template>
  <div class=" bg-gray-50 h-screen grid place-items-center">
    <div class=" bg-white border p-8 rounded-xl grid gap-4 w-96 text-sm">
        <img src="/images/logo.png" class=" place-self-center">
        <input class=" bg-gray-50 border px-4 py-2 rounded-md outline-none" type="email" placeholder="Email">
        <input class=" bg-gray-50 border px-4 py-2 rounded-md outline-none" type="password" placeholder="Password">
        <button @click="login" class=" bg-blue-400 text-white px-4 py-2 font-semibold rounded-md">Sign In</button>
    </div>
  </div>
</template>