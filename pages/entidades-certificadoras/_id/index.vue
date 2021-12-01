<template>
  <div>
    <div v-if="certifying_entity" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === certifying_entity.user"
        :to="'/entidades-certificadoras/'+ certifying_entity._id + '/editar'"
        fab
        top
        right
        fixed
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Unidade de produção" parent="/entidades-certificadoras" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ certifying_entity.name }} </h1>
        <h2 class="mb-6 text-h5"> {{ certifying_entity.city }} - {{ certifying_entity.uf }}</h2>
        <p v-if="certifying_entity.description" class="mt-3">{{ certifying_entity.description }}</p>
        <p v-if="certifying_entity.address"><span class="overline">Endereço:</span><br><strong>{{ certifying_entity.farm_address }}</strong></p>
        <p v-if="certifying_entity.contacts"><span class="overline">Contatos:</span><br><strong>{{ certifying_entity.contacts }}</strong></p>
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(certifying_entity.createdAt).format("DD/MM/YYYY") }}</strong></p>
        <AddressPreview :address="certifying_entity.address" label="Endereço" />
        <Documents :documents="certifying_entity.documents" />
        <Banners v-if="certifying_entity.pictures && certifying_entity.pictures.length" :items="certifying_entity.pictures" />
      </div>
    </div>
    <div v-else class="text-center">
      <v-progress-circular indeterminate small />
    </div>
  </div>
</template>
<script>
export default {
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
