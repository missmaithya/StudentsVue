<template>
    <v-form @submit.prevent="submitForm">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-alert v-if="editing_mode" type="info">
            Edit clicked Name
          </v-alert>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="username" label="Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="contact" label="Contact" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="department" label="Department"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="email" label="Email" required></v-text-field>
        </v-col>
      </v-row>
      <v-row class="mt-4">
        <v-col cols="12">
          <v-btn :color="editing_mode ? 'warning' : 'primary'" type="submit">
            {{ editing_mode ? 'Update' : 'Add Name' }}
          </v-btn>
          <v-btn v-if="editing_mode" color="dark" class="mt-2" @click="discardEdit">
            Cancel
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useNameStore } from '@/stores/counter';
  import { useRouter } from 'vue-router';

  
  const emit = defineEmits(['addName', 'updateName']);
  const nameStore = useNameStore();
  const router = useRouter();
  
  let username = ref('');
  let contact = ref('');
  let department = ref('');
  let email = ref('');
  let editing_mode = ref(false);
  let selectedName = ref(null);
  
  function submitForm(e) {

    e.preventDefault()
    if (!username.value || !contact.value || !department.value || !email.value) {
      return alert('Please fill out all fields');
    }
  
    
    const name = {
      username: username.value,
      contact: contact.value,
      department: department.value,
      email: email.value
    };
  
    if (editing_mode.value) {
      emit('updateName', selectedName.value.id, name);
      editing_mode.value = false;
      selectedName.value = null;
    } else {
      emit('addName', name);
    }
  
    resetForm();
  }
  
  function setEditName(name) {
    username.value = name.username;
    contact.value = name.contact;
    department.value = name.department;
    email.value = name.email;
    selectedName.value = name;
    editing_mode.value = true;
  }
  
  function discardEdit() {
    resetForm();
    editing_mode.value = false;
    selectedName.value = null;
  }
  
  function resetForm() {
    username.value = '';
    contact.value = '';
    department.value = '';
    email.value = '';
  }
  
  defineExpose({
    setEditName
  });
  // Watch for changes in the selectedName from the store
watch(() => useNameStore.selectedName, (newName) => {
  if (newName) {
    setEditName(newName);
  }
});
  </script>
  