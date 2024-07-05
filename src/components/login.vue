<template>
    <v-container>
      <v-form @submit.prevent="login">
        <v-text-field v-model="username" label="Username" required></v-text-field>
        <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        <v-row class="mt-4">
        <v-col cols="6" class="text-center">
        <v-btn type="submit" color="primary">Login</v-btn>
      </v-col>
      <v-col cols="6" class="d-flex justify-start">
        <v-btn @click="goToSignup" color="secondary">Sign Up</v-btn>
      </v-col>
        </v-row>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import apiClient from '@/services/apiClient';
  import { useRouter } from 'vue-router';
  
  const username = ref('');
  const password = ref('');
  const router = useRouter();
  const errorMessage = ref('');
  
  const login = async () => {
  try {
    const response = await apiClient.post('login', {
      username: username.value,
      password: password.value,
    });
    const { access, refresh } = response.data;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    router.push({ name: 'home' });
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

const goToSignup = () => {
  router.push({ name: 'signup' });
};
  </script>