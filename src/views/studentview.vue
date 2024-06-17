<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-alert v-if="all_names.length === 0" type="warning" text>
          Fill the form
        </v-alert>
        <v-alert v-else type="success" text>
          Form successfully filled
        </v-alert>
      </v-col>
      <v-col cols="12">
        <NameList :all_names="all_names" @deleteName="deleteName" @editName="editName" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NameList from '@/components/NameList.vue';
import { useRouter } from 'vue-router';
import { useNameStore } from '@/stores/counter.js';


let all_names = ref([]);
const router = useRouter();
const nameStore = useNameStore();

const api = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

async function fetchNames() {
  try {
    const response = await api.get('students');
    all_names.value = response.data;
  } catch (error) {
    console.error('Error fetching name:', error);
  }
}

async function deleteName(id) {
    console.log('delete');
    try {
       await api.delete(`Student/${id}/`);
        all_names.value = all_names.value.filter(name => name.id !== id);
    } catch (error) {
        console.error('Error deleting name:', error);
    }
}

function editName(id) {
  const name = all_names.value.find(name => name.id === id);
  if (name) {
    nameStore.setSelectedName(name);
    router.push({ name: 'home' });
  } else {
    console.error('Name not found with id:', id);
  }
}

onMounted(() => {
  fetchNames();
});
</script>