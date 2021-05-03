const apiPath = `ototoki`;
const apiUrl = `https://vue-course-api.hexschool.io/api/${apiPath}/admin`;

export default {
  name: 'addModal',
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
};
