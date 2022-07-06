<template>
  <div v-if="reference" class="create">
    <Breadcrumb active="Editar caderno de campo" :parent="'/caderno-de-campo/' + reference._id" />
    <CheckListsReferencesForm v-if="reference" :reference="reference" />
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
      reference: null
    }
  },
  async created () {
    this.reference = await this.$axios.$get('/api/check_lists/references/' + this.$route.params.id)
  }
}
</script>
