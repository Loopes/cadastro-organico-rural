<template>
  <div>
    <div v-if="reference" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === reference.user"
        :to="'/check-lists/references/'+ reference._id + '/editar'"
        fab
        top
        right
        fixed
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Check Lists Referências" parent="/check-lists/references" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ reference.title }} </h1>
        <br>
        <p v-if="reference.obs"><span class="overline">Observações:</span><br><strong>{{ reference.obs }}</strong></p>
        <br>
        <Documents :documents="reference.documents" label="Baixar Referência" />
        <br>
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(reference.createdAt).format("DD/MM/YYYY") }}</strong></p>
        <br>
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
      reference: null
    }
  },
  async created () {
    this.reference = await this.$axios.$get('/api/check_lists/references/' + this.$route.params.id)
  }
}
</script>
