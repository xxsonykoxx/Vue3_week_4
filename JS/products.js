import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const apiPath = `ototoki`;
const apiUrl = `https://vue-course-api.hexschool.io/api/${apiPath}/admin`;

import deleteModal from './modal/deleteModal.js';
import addModal from './modal/productModal.js';

createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
    };
  },
  components: {
    addModal,
    deleteModal,
  },
  created() {
    /* 偷啃 */
    const vm = this;
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    if (token === '') {
      window.location = 'index.html';
    }
    axios.defaults.headers.common.Authorization = token;
    vm.getDatas();
  },
  methods: {
    openAddModal() {
      $('.modale').addClass('opened');
      const vm = this;
      vm.isNew = false;
      vm.tempProduct = {};
      vm.tempProduct.image = 'https://upload.cc/i1/2021/04/30/G6ABXL.png';
    },
    getDatas(page = 1) {
      const vm = this;
      const url = `${apiUrl}/products?page=${page}`;
      axios.get(url).then((response) => {
        console.log(response);
        const { products, pagination, message } = response.data;
        if (message === '禁止使用, 請確認 api_path 是否為本人使用。') {
          window.location = 'index.html';
        }
        vm.products = products;
        vm.pagination = pagination;
      });
    },
    openDelModal(item) {
      $('.delmodale').addClass('opened');
      const vm = this;
      vm.tempProduct = { ...item };
    },
    openEditModal(item) {
      $('.modale').addClass('opened');
      const vm = this;
      vm.isNew = true;
      vm.tempProduct = { ...item };
    },
  },
  mounted() {
    $('.closemodale').click((e) => {
      e.preventDefault();
      $('.delmodale').removeClass('opened');
    });
    $('.closemodale').click((e) => {
      $('.modale').removeClass('opened');
    });
  },
})
  .component('pagination', {
    template: '#pagination',
    props: ['pages'],
    methods: {
      emitPages(item) {
        this.$emit('emit-pages', item);
      },
    },
  })
  .mount('#app');
