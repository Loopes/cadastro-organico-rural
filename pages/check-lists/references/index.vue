<template>
  <div>
    <Breadcrumb active="Check Lists | Referências" />
    <v-btn
      to="/check-lists/references/cadastrar"
      fab
      top
      right
      fixed
      color="primary"
      class="lighten-2"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="checkLists">
      <v-simple-table v-if="checkLists.length">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Título
              </th>
              <th class="text-left">
                Observações
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(check) in checkLists"
              :key="check._id"
            >
              <td><n-link :to="'/check-lists/references/' + check._id" class="text-decoration-none"><strong>{{ check.title }} </strong></n-link></td>
              <td><n-link :to="'/check-lists/references/' + check._id" class="text-decoration-none"><strong>{{ check.obs }} </strong></n-link></td>
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
      checkLists: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.checkLists = await this.$axios.$get('/api/check_lists/references')
    },
    remove (checkLists) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/check_lists/references' + checkLists._id).then(() => {
            this.list()
            this.$notifier.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
