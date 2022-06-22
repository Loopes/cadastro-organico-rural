<template>
  <div>
    <Breadcrumb active="Entidades certificadoras" />
    <v-btn
      to="/entidades-certificadoras/cadastrar"
      fab
      top
      right
      fixed
      color="primary"
      class="lighten-2"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="certifying_entities">
      <v-simple-table v-if="certifying_entities.length">
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
              v-for="(certifying_entitiy) in certifying_entities"
              :key="certifying_entitiy._id"
            >
              <td><n-link :to="'/entidades-certificadoras/' + certifying_entitiy._id" class="text-decoration-none"><strong>{{ certifying_entitiy.name }} </strong></n-link></td>
              <td>{{ certifying_entitiy.city }} - {{ certifying_entitiy.uf }}</td>
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
      certifying_entities: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.certifying_entities = await this.$axios.$get('/api/certifying_entities')
    },
    remove (certifyingEntity) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/certifying_entities/' + certifyingEntity._id).then(() => {
            this.list()
            this.$notifier.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
