
<template>
 <v-container>
  <v-btn @click="logoutUser" color="primary">Logout</v-btn>
    <v-row>
      <v-col cols="12">
        <AddName ref="addnoteref" @addName="addName" @updateName="updateName" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script setup>
import { ref , onMounted} from 'vue';
import AddName from '@/components/AddName.vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useNameStore } from '@/stores/counter';
import { logout } from '@/services/authService';

const logoutUser = async () => {
  await logout();}

onMounted(() => {
  const token = localStorage.getItem('access');
  if (!token) {
    router.push({ name: 'login' });
  }
});

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

let all_names = ref([])
const router = useRouter();
const route = useRoute();
const addnoteref = ref(null);
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
    if (Array.isArray(response.data)) {
      console.log('Fetched names',response.data)
      all_names.value = response.data;
    } else {
      console.error('Unexpected API response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching name:', error);
  }
}

async function addName (name) {
  // create a new name object
  try {
    const response = await api.post('students', name);
    fetchNames();
    toast.success('student added succesfully')
  } catch (error) {
    console.error('Error adding students:', error);
    
  }
}

async function updateName(id, updatedName) {
      try {
        const response = await api.put(`Student/${id}/`, updatedName);
        fetchNames(); // Refresh the names list
      } catch (error) {
        console.error('Error updating student:', error);
      }
}

async function deleteName(id) {
    console.log('delete');
    try {
       await api.delete(`Student/${id}/`);
        all_names.value = all_names.value.filter(name => name.id !== id);
    } catch (error) {
        console.error('Error deleting student:', error);
    }
}

function editName(id){
  const name = all_names.value.find(name => name.id === id);
  if (name) {
    addnoteref.value.setEditName(name);
  } else {
    console.error('Name not found with id:', id);
  }
}
onMounted(() => {
  fetchNames();

  if (nameStore.selectedName) {
    addnoteref.value.setEditName(nameStore.selectedName);
    nameStore.clearSelectedName();
  }
});

</script>

