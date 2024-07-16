import { defineStore } from "pinia";
import { ref } from "vue";

export const useFollowStore = defineStore("follow", () => {
    const uids = ref([])

    return { uids }
})