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
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Unidade de produção" parent="/unidades-de-producao" />
      <div>
        <h1 class="mb-0 text-h3"> {{ production_unit.name }} </h1>
        <h2 class="mb-6 text-h4"> {{ production_unit.city }} - {{ production_unit.uf }}</h2>
        <p v-if="production_unit.description" class="mt-3">{{ production_unit.description }}</p>
        <div class="mb-6">
          <ProductionActivities :items="production_unit.production_activities" />
        </div>
        <p v-if="production_unit.farm_address">Endereço: <br><strong>{{ production_unit.farm_address }}</strong></p>
        <p v-if="production_unit.contacts">Contatos: <br><strong>{{ production_unit.contacts }}</strong></p>
        <p>Cadastrado em: <br><strong>{{ $moment(production_unit.createdAt).format("DD/MM/YYYY") }}</strong></p>
        <PointPreview v-if="production_unit.farm_gate_location && production_unit.farm_gate_location.coordinates.length" :point="production_unit.farm_gate_location" label="Entrada da propriedade" />
        <PointPreview v-if="production_unit.farm_house_location && production_unit.farm_house_location.coordinates.length" :point="production_unit.farm_house_location" label="Sede da propriedade" />
        <AddressPreview :address="production_unit.correspondence_address" label="Endereço de correspondência" />
        <Documents :documents="production_unit.documents" />
        <Banners v-if="production_unit.pictures && production_unit.pictures.length" :items="production_unit.pictures" />
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
