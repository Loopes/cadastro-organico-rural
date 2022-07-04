<template>
  <div v-if="check_lists" class="create">
    <Breadcrumb active="Editar caderno de campo" :parent="'/caderno-de-campo/' + check_lists._id" />
    <CheckListsForm v-if="check_lists" :checkList="check_lists" />
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
