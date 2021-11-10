<template>
  <div>
    <div v-if="production_unit" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === production_unit.user"
        :to="'/unidades-de-producao/'+ production_unit._id + '/editar'"
        fab
        top
        right
        fixed
        color="success"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb :active="production_unit.name" parent="/unidades-de-producao" />
      <div>
        <div v-if="production_unit.oembed" class="mb-6" v-html="production_unit.oembed" />
        <Banners v-else-if="production_unit.pictures && production_unit.pictures.length" :items="production_unit.pictures" />
        <p>
          <Tags :tags="production_unit.cultures" />
        </p>
        <h4 class="mb-3">{{ production_unit.city }} - {{ production_unit.uf }}</h4>
        <p v-if="production_unit.farm_address"><small>Endereço: <strong>{{ production_unit.farm_address }}</strong></small></p>
        <p v-if="production_unit.contacts"><small>Contatos: <strong>{{ production_unit.contacts }}</strong></small></p>
        <p><small>Cadastrado em: <strong>{{ $moment(production_unit.createdAt).format("DD/MM/YYYY") }}</strong></small></p>
        <PointPreview :point="production_unit.farm_gate_location" label="Entrada da propriedade" />
        <PointPreview :point="production_unit.farm_house_location" label="Sede da propriedade" />
        <AddressPreview :address="production_unit.correspondence_address" label="Endereço de correspondência" />
        <p v-if="production_unit.description" class="mt-3">{{ production_unit.description }}</p>
        <Documents :documents="production_unit.documents" />
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
      production_unit: null
    }
  },
  async created () {
    this.production_unit = await this.$axios.$get('/api/production_units/' + this.$route.params.id)
  }
}
</script>
