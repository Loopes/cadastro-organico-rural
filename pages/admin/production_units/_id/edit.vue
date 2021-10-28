<template>
  <div class="create">
    <AdminBreadcrumb :items="breadcrumb" />
    <ProductionUnitForm v-if="production_unit" :production-unit="production_unit" />
    <div v-else class="text-center">
      <v-progress-circular indeterminate small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      production_unit: null,
      breadcrumb: [
        { text: 'Dashboard', to: '/admin' },
        { text: 'Unidades de produção', to: '/admin/production_units' },
        { text: 'Editar item', active: true }
      ]
    }
  },
  async created () {
    this.production_unit = await this.$axios.$get('/api/production_units/' + this.$route.params.id)
  }
}
</script>
