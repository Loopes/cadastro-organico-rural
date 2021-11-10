<template>
  <div>
    <Breadcrumb active="Unidades de produção" />
    <v-btn
      to="/unidades-de-producao/cadastrar"
      fab
      top
      right
      fixed
      color="success"
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <div v-if="production_units">
      <v-list v-if="production_units.length" class="rounded lighten-1" color="primary">
        <template v-for="(production_unit, index) in production_units">
          <v-list-item :key="production_unit._id" :to="'/unidades-de-producao/' + production_unit._id ">
            <v-list-item-avatar>{{ production_unit.uf }}</v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ production_unit.name }}</v-list-item-title>
              <v-list-item-subtitle v-if="production_unit.city && production_unit.uf">
                {{ production_unit.city }} - {{ production_unit.uf }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider
            v-if="index < production_units.length - 1"
            :key="index"
          />
        </template>
      </v-list>
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
