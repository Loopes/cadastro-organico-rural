<template>
  <div v-if="check_lists" class="create">
    <Breadcrumb active="Check List" :parent="'/check-lists/' + check_lists._id" />
    <CheckListsForm v-if="check_lists" :check-list="check_lists" />
    <div v-else class="text-center">
      <v-progress-circular indeterminate small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data () {
    return {
      check_lists: null
    }
  },
  async created () {
    this.check_lists = await this.$axios.$get('/api/check_lists/' + this.$route.params.id)
  }
}
</script>
