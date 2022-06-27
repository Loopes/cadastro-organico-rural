<template>
  <div>
    <div v-if="field_notebook" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === field_notebook.user"
        :to="'/caderno-de-campo/'+ field_notebook._id + '/editar'"
        fab
        top
        right
        fixed
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Caderno de campo" parent="/caderno-de-campo" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ field_notebook.name }} </h1>
        <br>
        <p class="mt-3"><span class="overline">Código de Rastreabilidade:</span><br><strong>{{ field_notebook.codTraceability }}</strong></p>
        <p class="mt-3"><span class="overline">Tipos:</span><br>
          <strong v-for="(item, index) in field_notebook.type" :key="index">
            {{ item }} <br>
          </strong>
        </p>
        <p v-if="field_notebook.productionUnit" class="mt-3"><span class="overline">Status:</span><br><strong>{{ field_notebook.status }}</strong></p>
        <p v-if="field_notebook.productionUnit" class="mt-3"><span class="overline">Unidade de Produção:</span><br><strong>{{ field_notebook.productionUnit.name }}</strong></p>
        <br>
        <p v-if="certifying_entity" class="mt-3"><span class="overline">Entidade certificadora</span><br>
          <p v-if="certifying_entity.name" class="mt-3"><span class="overline">Nome: </span><strong>{{ certifying_entity.name }}</strong></p>
          <p v-if="certifying_entity.phone" class="mt-3"><span class="overline">Telefone: </span><strong>{{ certifying_entity.phone }}</strong></p>
          <p v-if="certifying_entity.email" class="mt-3"><span class="overline">Email: </span><strong>{{ certifying_entity.email }}</strong></p>
          <p v-if="certifying_entity.contacts" class="mt-3"><span class="overline">Outros Contatos: </span><strong>{{ certifying_entity.contacts }}</strong></p>
        </p>
        <br>
        <p v-if="field_notebook.productionUnit" class="mt-3"><span class="overline">Atividade de Produção:</span><br>
          <strong>{{ field_notebook.productionActivitie.descricao }}</strong> <br>
          <strong>{{ field_notebook.productionActivitie.codigo }}</strong>
        </p>
        <p v-if="field_notebook.observation" class="mt-3" style="white-space: pre-line;"><span class="overline">Observações:</span><br><strong>{{ field_notebook.observation }}</strong></p>
        <br>
        <p v-if="field_notebook.rawMaterial[0]" class="mt-3"><strong>Insumos:</strong></p>
        <v-row  v-for="(a, index) in field_notebook.rawMaterial" :key="index" class="table">
            <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Nome | Categoria: <br></span>
              {{ a.name }} | {{a.category}}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Observações: <br></span>
              {{ a.observation && a.observation }}
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Quantidade (Em {{a.uM}}): <br></span>
              {{ a.qtd }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Área Aplicada: <br></span>
              {{ a.appliedArea }}
            </v-col>
          </v-col>
          <v-col cols="12" md="4">
            <v-col cols="12" md="6">
              <span class="overline">Data de Aplicação Inicial <br></span>
              {{ a.dateInit }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Data de Aplicação Final: <br></span>
              {{ a.dateFinal }}
            </v-col>
          </v-col>
          <Documents v-if="a.documents" :documents="a.documents" />
        </v-row>
        <br>
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(field_notebook.createdAt).format("DD/MM/YYYY") }}</strong></p>
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
      field_notebook: null,
      certifying_entity: {},
      production_unity: null
    }
  },
  async created () {
    this.field_notebook = await this.$axios.$get('/api/field_notebook/' + this.$route.params.id)
    this.production_unity = await this.$axios.$get('/api/production_units/' + this.field_notebook.productionUnit.id)
    this.certifying_entity = await this.$axios.$get('/api/certifying_entities/' + this.production_unity.certifying_entity)
  }
}
</script>
