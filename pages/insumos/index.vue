<template>
  <div>
    <Breadcrumb active="Insumos" />
    <v-btn
      to="/insumos/cadastrar"
      fab
      top
      right
      fixed
      color="primary"
      class="lighten-2"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="raw_materials">
      <v-simple-table v-if="raw_materials.length">
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
              v-for="(raw_material) in raw_materials"
              :key="raw_material._id"
            >
              <td><n-link :to="'/insumos/' + raw_material._id" class="text-decoration-none"><strong>{{ raw_material.name }} </strong></n-link></td>
              <td>{{ raw_material.city }} - {{ raw_material.uf }}</td>
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
      raw_materials: null
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.raw_materials = await this.$axios.$get('/api/raw_materials')
    },
    remove (rawMaterial) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/raw_materials/' + rawMaterial._id).then(() => {
            this.list()
            this.$notifier.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
