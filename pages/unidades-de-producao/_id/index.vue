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
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ production_unit.name }} </h1>
        <h2 class="mb-6 text-h5"> {{ production_unit.city }} - {{ production_unit.uf }}</h2>
        <p v-if="production_unit.description" class="mt-3">{{ production_unit.description }}</p>
        <div class="mb-6">
          <ProductionActivities :items="production_unit.production_activities" />
        </div>
        <p v-if="production_unit.farm_address"><span class="overline">Endereço:</span><br><strong>{{ production_unit.farm_address }}</strong></p>
        <PointPreview v-if="production_unit.farm_gate_location && production_unit.farm_gate_location.coordinates.length" :point="production_unit.farm_gate_location" label="Entrada da propriedade" />
        <PointPreview v-if="production_unit.farm_house_location && production_unit.farm_house_location.coordinates.length" :point="production_unit.farm_house_location" label="Sede da propriedade" />
        <AddressPreview :address="production_unit.correspondence_address" label="Endereço de correspondência" />
        <p v-if="production_unit.access_route"><span class="overline">Como chegar na propriedade:</span><br><strong>{{ production_unit.access_route }}</strong></p>
        <p v-if="production_unit.contacts"><span class="overline">Contatos:</span><br><strong>{{ production_unit.contacts }}</strong></p>
        <p v-if="production_unit.total_area"><span class="overline">Área total:</span><br><strong>{{ production_unit.total_area }} hectares</strong></p>
        <p v-if="production_unit.organic_production_area"><span class="overline">Área destinada a produção orgânica:</span><br><strong>{{ production_unit.organic_production_area }} hectares</strong></p>
        <p v-if="production_unit.permanent_preservation_area"><span class="overline">Área de preservação permanente - APP:</span><br><strong>{{ production_unit.permanent_preservation_area }} hectares</strong></p>
        <p v-if="production_unit.legal_reservea_area"><span class="overline">Área da reserva legal:</span><br><strong>{{ production_unit.legal_reservea_area }} hectares</strong></p>
        <p v-if="production_unit.previous_year_total_production"><span class="overline">Produção total no ano anterior:</span><br><strong>{{ production_unit.previous_year_total_production }} KG</strong></p>
        <p v-if="production_unit.current_year_estimated_production"><span class="overline">Estimativa da produção desse ano:</span><br><strong>{{ production_unit.current_year_estimated_production }} KG</strong></p>
        <p><span class="overline">Certificado orgânico desde:</span><br><strong>{{ $moment(production_unit.organic_since).format("DD/MM/YYYY") }}</strong></p>
        <Documents :documents="production_unit.documents" />
        <Banners v-if="production_unit.pictures && production_unit.pictures.length" :items="production_unit.pictures" />
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(production_unit.createdAt).format("DD/MM/YYYY") }}</strong></p>
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
