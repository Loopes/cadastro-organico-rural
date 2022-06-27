<template>
  <div v-if="field_notebook" class="create">
    <Breadcrumb active="Editar caderno de campo" :parent="'/caderno-de-campo/' + field_notebook._id" />
    <FieldNotebookForm v-if="field_notebook" :fieldNotebookEntity="field_notebook" />
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
      field_notebook: null
    }
  },
  async created () {
    this.field_notebook = await this.$axios.$get('/api/field_notebook/' + this.$route.params.id)
  }
}
</script>
