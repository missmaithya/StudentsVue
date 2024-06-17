<template>
  

  <div>
    <button class="btn btn-outline-dark" @click="Increment">
        Add 1 
    </button>
  </div>


</template>
<script setup>
import { ref, onMounted, watch, computed, watchEffect } from 'vue';
// import { globalStore } from '@/stores/globalStore'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import { useCounterStore } from '@/stores/counter'



const emit = defineEmits(['Increment'])



const route = useRoute()
const router = useRouter();
const counterStore = useCounterStore()



toast.success('added  1')

function Increment(){


  counterStore.state.count += 1
    
}




const currentRouteName = computed(() => {
  return route.meta.title;
})

</script>
<style>

</style>
