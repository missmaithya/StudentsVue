<template>
    <v-container>
      <v-form @submit.prevent="addCategory">
        <v-text-field v-model="name" label="Category Name" required></v-text-field>
        <v-text-field v-model="description" label="Description" required></v-text-field>
        <v-btn type="submit" color="primary">Add Category</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { toast } from 'vue3-toastify';
  import apiClient from '@/services/apiClient';
  
  const name = ref('');
  const description = ref('');

  
  const addCategory = async () => {
    try {
        await apiClient.post('categories', { name: name.value, description: description.value });
        name.value = '';
        description.value = '';
        toast.success('Category saved successfully.');
    } catch (error) {
        console.error('Error adding category:', error);
        toast.error('Error adding category');
    }
};

  </script>
  