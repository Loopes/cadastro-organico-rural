<template>
  <div class="create">
    <Breadcrumb active="Editar insumo" parent="/insumos" />
    <RawMaterialForm v-if="raw_materials" :rawMaterialEntity="raw_materials" />
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
      raw_materials: null
    }
  },
  async created () {
    this.raw_materials = await this.$axios.$get('/api/raw_materials/' + this.$route.params.id)
  }
}
</script>
