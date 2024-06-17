<template>


    <div>
        Your count is {{ counterStore.state.count }}
    </div>
  


</template>
<script setup>
import { ref, onMounted, watch, computed, watchEffect } from 'vue';
// import { globalStore } from '@/stores/globalStore'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import { useCounterStore } from '@/stores/counter'



const route = useRoute()
const router = useRouter();
// const g_Store = globalStore()
const counterStore = useCounterStore()





const currentRouteName = computed(() => {
  return route.meta.title;
})

</script>
<style>

</style>
