<template>
    <nav class="navbar bg-dark  navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <router-link class="nav-link active" aria-current="page" :to="{name: 'home'}">Home</router-link>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/student">Student</RouterLink>
                </li>
                <li class="nav-item">
                  <RouterLink class="nav-link" to="/product">Product</RouterLink>
                </li>
            </ul>
           

            </div>
        </div>
    </nav>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const  handleLoginOrRegister = () => {
  router.push({ name: 'login' });
};

</script>