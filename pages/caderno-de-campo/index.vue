<template>
  <div>
    <Breadcrumb active="Caderno de campo" />
    <v-btn
      to="/caderno-de-campo/cadastrar"
      fab
      top
      right
      fixed
      color="primary"
      class="lighten-2"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="field_notebooks">
      <v-simple-table v-if="field_notebooks.length">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Nome
              </th>
              <th class="text-left">
                Unidade de Produção
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(field_notebook) in field_notebooks"
              :key="field_notebook._id"
            >
              <td><n-link :to="'/caderno-de-campo/' + field_notebook._id" class="text-decoration-none"><strong>{{ field_notebook.name }} </strong></n-link></td>
              <td>{{ field_notebook.productionUnit.name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-alert v-else dark color="tertiary" class="text-center">Nenhum item encontrado</v-alert>
    </div>
    <v-skeleton-loader
      v-else
      type="list-item-two-line@3"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      field_notebooks: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.field_notebooks = await this.$axios.$get('/api/field_notebook')
    },
    remove (fieldNotebook) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/field_notebook/' + fieldNotebook._id).then(() => {
            this.list()
            this.$notifier.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
