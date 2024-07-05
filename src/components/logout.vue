<template>
    <v-container>
      <v-form @submit.prevent="signup">
        <v-text-field v-model="username" label="Username" required></v-text-field>
        <v-text-field v-model="email" label="Email" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-btn type="submit" color="primary">Sign Up</v-btn>
      </v-form>
      <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import apiClient from '@/services/apiClient';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const errorMessage = ref('');
  const router = useRouter();
  
  const logout = async () => {
  const refresh = localStorage.getItem('refresh');
  if (refresh) {
    await apiClient.post('logout', { refresh });
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    router.push({ name: 'login' });
  }
};
  </script>