<template>
  <div>
    <Breadcrumb active="Unidades de produção" />
    <v-btn
      to="/unidades-de-producao/cadastrar"
      fab
      top
      right
      fixed
      color="primary"
      class="lighten-2"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="production_units">
      <v-simple-table v-if="production_units.length">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Nome
              </th>
              <th class="text-left">
                Município-UF
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(production_unit) in production_units"
              :key="production_unit._id"
            >
              <td><n-link :to="'/unidades-de-producao/' + production_unit._id" class="text-decoration-none"><strong>{{ production_unit.name }} </strong></n-link></td>
              <td>{{ production_unit.city }} - {{ production_unit.uf }}</td>
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
      production_units: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.production_units = await this.$axios.$get('/api/production_units')
    },
    remove (productionUnit) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/production_units/' + productionUnit._id).then(() => {
            this.list()
            this.$notifier.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
