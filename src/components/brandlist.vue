<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  all_brandnames: Array
});

const emit = defineEmits(['deleteName', 'editName']);

function deleteName(id) {
  // Emit delete event to parent
  console.log('delete');
  emit('deleteName', id);
}

function editName(id) {
  console.log('edit name', id);

  // Emit edit event to parent
  emit('editName', id);
}
</script>


<template>
    <div>
        <div class="card my-3" v-for="Brandname in all_brandnames" :key="Brandname.id">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <span>{{ Brandname.name }} | {{ Brandname.description }} </span>
                    <div>
                        <i class="fa-solid fa-edit me-4" @click="editName(Brandname.id)"></i>
                        <i class="fa-solid fa-trash " @click.stop="deleteName(Brandname.id)"></i>
                    </div>
    
                </div>
            </div>
    </div>
    </div>
</template>

<style lang="">

</style>