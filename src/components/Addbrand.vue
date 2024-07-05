<template>
    <v-container>
      <v-form @submit.prevent="addBrand">
        <v-text-field v-model="name" label="Brand Name" required></v-text-field>
        <v-text-field v-model="description" label="Description" required></v-text-field>
        <v-btn type="submit" color="primary">Add Brand</v-btn>
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
  
  const addBrand = async () => {
    try {
        await apiClient.post('brandlist', { name: name.value, description: description.value });
        name.value = '';
        description.value = '';
        toast.success('Brand saved successfully.');
    } catch (error) {
        console.error('Error adding brand:', error);
        toast.error('Error adding brand');
    }
};
  </script>