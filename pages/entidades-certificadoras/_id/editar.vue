<template>
  <div class="create">
    <Breadcrumb active="Editar entidade de certificação" parent="/entidades-certificadoras" />
    <CertifyingEntityForm v-if="certifying_entity" :certifying-entity="certifying_entity" />
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
      certifying_entity: null
    }
  },
  async created () {
    this.certifying_entity = await this.$axios.$get('/api/certifying_entities/' + this.$route.params.id)
  }
}
</script>
