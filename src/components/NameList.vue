<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  all_names: Array
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
        <div class="card my-3" v-for="name in all_names" :key="name.id">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                    <span>{{ name.username }} | {{ name.contact }} | {{ name.department }} | {{ name.email }}</span>
                    <div>
                        <i class="fa-solid fa-edit me-4" @click="editName(name.id)"></i>
                        <i class="fa-solid fa-trash " @click.stop="deleteName(name.id)"></i>
                    </div>
    
                </div>
            </div>
    </div>
    </div>
</template>

<style lang="">

</style>