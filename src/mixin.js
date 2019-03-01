export default {
  methods: {
    appendSearchParamsToRoute(query) {
      this.$router.push({
        name: this.$route.name,
        query
      })
    },
    handlePageChange(page) {
      this.form.currentPage = page
      this.appendSearchParamsToRoute({currentPage: page})
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