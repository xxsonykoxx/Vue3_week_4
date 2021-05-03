const apiPath = `ototoki`;
const apiUrl = `https://vue-course-api.hexschool.io/api/${apiPath}/admin`;

export default {
  name: 'deleteModal',
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
};
