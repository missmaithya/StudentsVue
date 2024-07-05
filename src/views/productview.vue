
<template>
    <v-container>
       <v-row>
         <v-col cols="12">
           <Addproduct ref="addnoteref" @addproduct="addproduct" @updateproduct="updateproduct" />
         </v-col>
       </v-row>
     </v-container>
   </template>
   
   
   <script setup>
   import { ref , onMounted} from 'vue';
   import Addproduct from '@/components/Addproduct.vue';
   import axios from 'axios';
   import { useRouter, useRoute } from 'vue-router';
   import { toast } from 'vue3-toastify';
   import { useProductStore } from '@/stores/Product_Store';
   import apiClient from '@/services/apiClient';

   
   
   let all_products = ref([]);
   const addnoteref = ref(null);
   const productStore = useProductStore();

   
   

   async function fetchProducts() {
     try {
       const response = await apiClient.get('productlist');
       if (Array.isArray(response.data)) {
         console.log('Fetched products',response.data)
         all_products.value = response.data;
       } else {
         console.error('Unexpected API response:', response.data);
       }
     } catch (error) {
       console.error('Error fetching product:', error);
     }
   }

   async function addproduct(product) {
  try {
    const response = await apiClient.post('productlist', product);
    fetchProducts();
    console.log('Product added:', response.data);
    toast.success('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error.response ? error.response.data : error.message);
    toast.error('Failed to add product');
  }
}
   
   async function updateproduct(id, updateproduct) {
         try {
           const response = await apiClient.put(`product/${id}/`, updateproduct);
           fetchProducts(); // Refresh the names list
         } catch (error) {
           console.error('Error updating product:', error);
         }
   }
   
   onMounted(() => {
     fetchProducts();
   
     if (productStore.selectProduct) {
       addnoteref.value.setEditProduct(productStore.state.selectedProduct);
       productStore.clearSelectedProduct();
     }
   });
   
   </script>
   
   