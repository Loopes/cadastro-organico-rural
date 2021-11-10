<template>
  <div class="create">
    <Breadcrumb active="Editar unidade de produção" parent="/unidades-de-producao" />
    <ProductionUnitForm v-if="production_unit" :production-unit="production_unit" />
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
      production_unit: null
    }
  },
  async created () {
    this.production_unit = await this.$axios.$get('/api/production_units/' + this.$route.params.id)
  }
}
</script>
