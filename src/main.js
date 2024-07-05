import './assets/main.css';
import 'vue3-toastify/dist/index.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { configure } from 'vee-validate';

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
  });

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')

configure({
  generateMessage: ({ field, rule, params }) => {
    switch (rule) {
      case 'required':
        return `${field} is required`;
      case 'min':
        return `${field} must be at least ${params[0]} characters`;
      case 'email':
        return `Must be a valid email address`;
      default:
        return `${field} is not valid`;
    }
  },
});
