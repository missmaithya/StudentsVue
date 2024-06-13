<template>
     <main>
  <h1 >Student Names</h1>
    <div class="row mt-4">
      <div class="col-12 col-md-6 offset-md-3">
        <div class="card">
          <div class="card-body">
              <!--This div container contains the list of memebrs registered-->
              <div>
                <div v-if="all_names.length === 0" class="alert alert-warning text-center">
                No students found
              </div>
                <NameList :all_names="all_names"  @deleteName="deleteName" @editName="editName"/>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div>
       
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NameList from '@/components/NameList.vue';
import { useRouter } from 'vue-router';


let all_names = ref([]);
const router = useRouter();

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
    router.push({ name: 'home', query: { ...name } });
  } else {
    console.error('Name not found with id:', id);
  }
}
onMounted(()=>{
  fetchNames()
});
</script>