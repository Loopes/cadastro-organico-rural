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
      <Breadcrumb active="Entidade certificadora" parent="/entidades-certificadoras" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ certifying_entity.name }} </h1>
        <h2 class="mb-6 text-h5"> {{ certifying_entity.city }} - {{ certifying_entity.uf }}</h2>
        <p class="mt-3">{{ certifying_entity.cnpj }}</p>
        <p v-if="certifying_entity.phone"><span class="overline">Telefone:</span><br><strong>{{ certifying_entity.phone }}</strong></p>
        <p v-if="certifying_entity.email"><span class="overline">E-mail:</span><br><strong>{{ certifying_entity.email }}</strong></p>
        <p v-if="certifying_entity.contacts"><span class="overline">Outros contatos:</span><br><strong>{{ certifying_entity.contacts }}</strong></p>
        <AddressPreview v-if="certifying_entity.address" :address="certifying_entity.address" label="Endereço" />
        <div v-if="certifying_entity.responsibles && certifying_entity.responsibles.length" class="mb-6">
          <Responsibles :items="certifying_entity.responsibles" />
        </div>
        <Documents :documents="certifying_entity.documents" />
        <Banners v-if="certifying_entity.pictures && certifying_entity.pictures.length" :items="certifying_entity.pictures" />
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(certifying_entity.createdAt).format("DD/MM/YYYY") }}</strong></p>
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
