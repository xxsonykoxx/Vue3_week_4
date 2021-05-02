import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
const apiPath = `ototoki`;
const apiUrl = `https://vue-course-api.hexschool.io/api/${apiPath}/admin`;

createApp({
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
    };
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
  .component('addModal', {
    template: '#addModal',
    props: ['product', 'isNew'],
    methods: {
      addProduct() {
        const vm = this;
        let api = `${apiUrl}/product`;
        let method = 'post';

        if (vm.isNew === true) {
          api = `${apiUrl}/product/${this.product.id}`;
          method = 'put';
        }
        axios[method](api, { data: vm.product }).then((res) => {
          if (!res.data.success) return;
          $('.modale').removeClass('opened');
          vm.$emit('update');

          if (vm.isNew === true) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              width: 300,
              title: '変更しました',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
            });
          } else if (vm.isNew === false) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              width: 300,
              title: '追加しました',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
            });
          }
        });
      },
    },
  })
  .component('deleteModal', {
    template: '#deleteModal',
    props: ['item'],
    methods: {
      delProduct() {
        const url = `${apiUrl}/product/${this.item.id}`;
        axios
          .delete(url)
          .then((res) => {
            if (!res.data.success) return;
            $('.delmodale').removeClass('opened');
            this.$emit('update');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              width: 300,
              title: '削除しました',
              showConfirmButton: false,
              timerProgressBar: true,
              timer: 1500,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
  })
  .mount('#app');
