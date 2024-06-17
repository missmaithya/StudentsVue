<template>
  


<div class="container">
    <div class="card">
        <div class="card-body">

            <router-link :to="{name: 'summary'}">

                Go To Summary
            </router-link>
            This is a counter. Your count is {{ counterStore.state.count }}
        </div>
    
        <ButtonCounter/>


    
    </div>

</div>

</template>
<script setup>
import { ref, onMounted, watch, computed, watchEffect } from 'vue';
import { useCounterStore } from '@/stores/counter'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify';
import ButtonCounter from '@/components/ButtonCounter.vue'


const route = useRoute()
const router = useRouter();
const counterStore = useCounterStore()


let count = ref(0)




const currentRouteName = computed(() => {
  return route.meta.title;
})

</script>
<style>

</style>
