<template lang="pug">
  .page-container
    table.page-table-info.mb30
      tr
        th
        td
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        userStatus: '',
        userType: '',
        banType: 'hour'
      }
    }
  },
  methods: {
    async userDetail() {
      this.form.id = this.$route.query.id
      this.form.userType = this.$route.query.userType

      const res = await API.user.userDetail({
        id: this.form.id,
        userType: this.form.userType
      })
    }
  },
  mounted() {
    this.userDetail()
  }
}
</script>

