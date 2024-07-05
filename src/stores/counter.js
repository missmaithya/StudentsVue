import { ref, computed } from 'vue';
import { defineStore } from 'pinia';



export const useCounterStore = defineStore('counter', () => {

  let state = ref({
    count: 0
  })
   

  return { state }
});
export const useNameStore = defineStore('nameStore', {
  state: () => ({
    selectedName: null
  }),
  actions: {
    setSelectedName(name) {
      this.selectedName = name;
    },
    clearSelectedName() {
      this.selectedName = null;
    }
  }
});
