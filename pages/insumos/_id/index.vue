<template>
  <div>
    <div v-if="raw_materials" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === raw_materials.user"
        :to="'/insumos/'+ raw_materials._id + '/editar'"
        fab
        top
        right
        fixed
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Insumos" parent="/insumos" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ raw_materials.name }} </h1>
        <h2 class="mb-6 text-h5">{{ raw_materials.category }}</h2>
        <p v-if="raw_materials.uM"><span class="overline">Unidade de Medida:</span><br><strong>{{ raw_materials.uM }}</strong></p>
        <p v-if="raw_materials.guidelines"><span class="overline">Orientações:</span><br><strong>{{ raw_materials.guidelines }}</strong></p>
        <p v-if="raw_materials.restrictions"><span class="overline">Restrições:</span><br><strong>{{ raw_materials.restrictions }}</strong></p>
        <p v-if="raw_materials.reference"><span class="overline">Referências Legais:</span><br><strong>{{ raw_materials.reference }}</strong></p>
        <p v-if="raw_materials.allowed"><span class="overline">Permitido:</span><br><strong> Sim </strong></p>
        <p v-if="!raw_materials.allowed"><span class="overline">Permitido:</span><br><strong> Não </strong></p>
        <p><span class="overline">Data de Vigencia:</span><br>Inicial:<br/><strong>{{ raw_materials.validityDateInit.toString().slice(0,10) }}</strong><br>Final:<br/><strong>{{ raw_materials.validityDateInit.toString().slice(0,10) }}</strong></p>
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(raw_materials.createdAt).format("DD/MM/YYYY") }}</strong></p>
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
      raw_materials: null
    }
  },
  async created () {
    this.raw_materials = await this.$axios.$get('/api/raw_materials/' + this.$route.params.id)
  }
}
</script>
