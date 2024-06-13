
<template>
  <main>
    <div class="container mt-4">
      <h1>Home</h1>
      
      <p> Home</p>


      <div class="row">
        <div class="col-6 offset-md-3">
          <div class="card">
            <div class="card-body">
              
              <div class="alert alert-warning text-center" v-if="all_names.length == 0">
                 Fill the form
              </div>

              <div class="alert alert-warning text-center" v-else>
                Form successfully filled
               
                
              </div>

              <AddName ref="addnoteref" @addName="addName" @updateName="updateName"/>

            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</template>


<script setup>
import { ref , onMounted} from 'vue';
import AddName from '@/components/AddName.vue';
import NameList from '@/components/NameList.vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

let all_names = ref([])
const router = useRouter();
const route = useRoute();
const addnoteref = ref(null)

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
  } catch (error) {
    console.error('Error adding student:', error);
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

  // Check for query parameters to populate the form for editing
  const query = route.query;
  if (query.id) {
    addnoteref.value.setEditName({
      id: query.id,
      username: query.username,
      contact: query.contact,
      department: query.department,
      email: query.email
    });
  }
});


</script>

