import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

createApp({
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      api: 'https://vue-course-api.hexschool.io/admin/signin',
    };
  },
  methods: {
    login() {
      const vm = this;
      axios
        .post(vm.api, vm.user)
        .then((res) => {
          if (!res.data.success) return;

          const { token, expired } = res.data;
          document.cookie = `token=${token};expires=${new Date(
            expired,
          )}; path=/`;
          window.location = 'products.html';
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}).mount('#app');
