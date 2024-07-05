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

const signup = async () => {
  try {
    await apiClient.post('signup', {
      username: username.value,
      password: password.value,
    });
    router.push({ name: 'login' });
  } catch (error) {
    console.error('Error signing up:', error);
  }
};
</script>