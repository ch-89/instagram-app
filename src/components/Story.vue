<script setup>
defineProps(["story"])
</script>

<template>
  <div class=" size-14 bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-0.5 rounded-full">
    <img :src="`/images/${story}.png`" class=" rounded-full p-0.5 bg-white">
  </div>
</template>