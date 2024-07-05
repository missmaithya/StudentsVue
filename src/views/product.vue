<template>
    <v-container>
      <v-row>
        <v-col cols="12">
            <v-alert v-if="all_products.length === 0" type="warning" text>
          Fill the form
        </v-alert>
        <v-alert v-else type="success" text>
          Form successfully filled
        </v-alert>
        </v-col>
        <v-col cols="12">
          <productlist :all_products="all_products" @deleteProduct="deleteProduct" @editProduct="editProduct" />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import productlist from '@/components/productlist.vue';
  import { useRouter } from 'vue-router';
  import { useProductStore } from '@/stores/Product_Store.js';
  import { toast } from 'vue3-toastify';
  import apiClient from '@/services/apiClient';
  
  
  let all_products = ref([]);
  const router = useRouter();
  const productList = useProductStore();
  
  
  async function fetchProducts() {
    try {
      const response = await apiClient.get('productlist');
      all_products.value = response.data;
      console.log('Fetched products');
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
  
  async function deleteProduct(id) {
      console.log('delete');
      try {
         await apiClient.delete(`product/${id}/`);
          all_products.value = all_products.value.filter(product => product.id !== id);
          toast.warn("Products deleted!!")
      } catch (error) {
          console.error('Error deleting product:', error);
      }
  }
  
  function editProduct(id) {
    const product = all_products.value.find(product => product.id === id);
    if (product) {
      productList.setSelectedProduct(product);
      router.push({ name: 'product' });
    } else {
      console.error('Product not found with id:', id);
    }
  }
  
  onMounted(() => {
    fetchProducts();
  });
  </script>