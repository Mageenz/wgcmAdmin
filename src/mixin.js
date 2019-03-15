export default {
  methods: {
    appendSearchParamsToRoute(query) {
      this.$router.push({
        name: this.$route.name,
        query
      })
    },
    handlePageChange(page) {
      this.form.page = page
      this.appendSearchParamsToRoute({page})
      this.getList()
    }
  },
  watch: {
    $route(val) {
      if(!Object.keys(val.query).length) {
        this.getList()
      }
    }
  },
  mounted() {
    this.getList()
  }
}