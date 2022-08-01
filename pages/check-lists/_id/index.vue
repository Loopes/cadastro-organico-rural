<template>
  <div>
    <div v-if="check_lists" class="create">
      <v-btn
        v-if="$auth.user && $auth.user._id === check_lists.user"
        :to="'/check-lists/'+ check_lists._id + '/editar'"
        fab
        top
        right
        fixed
        color="primary"
        class="lighten-2"
      >
        <v-icon dark>mdi-pencil</v-icon>
      </v-btn>
      <Breadcrumb active="Check Lists" parent="/check-lists" />
      <div>
        <h1 class="mb-0 text-h4 font-weight-bold"> {{ check_lists.title }} </h1>
        <br>
        <p v-if="check_lists.productionUnit.name"><span class="overline">Unidade Produtora:</span><br><strong>{{ check_lists.productionUnit.name }}</strong></p>
        <p v-if="check_lists.responsible"><span class="overline">Responsável:</span><br><strong>{{ check_lists.responsible.name }}</strong></p>
        <p v-if="check_lists.fieldNotebook"><span class="overline">Caderno de Campo:</span><br><strong>{{ check_lists.fieldNotebook.name }}</strong></p>
        <br>
        <div v-for="(category, indexCategory) in check_lists.checkLists" :key="indexCategory">
          <p v-if="category"><strong>{{ indexCategory + 1 }}. {{ category.category }}</strong></p>
          <v-simple-table v-if="category.questions.length">
            <template v-slot:default>
              <thead>
                <tr>
                  <th width="6%" class="text-left">
                    Item
                  </th>
                  <th width="40%" class="text-left">
                    Título
                  </th>
                  <th width="30%" class="text-left">
                    Observações
                  </th>
                  <th class="text-left">
                    Respostas
                  </th>
                  <th width="12%" class="text-left">
                    Ações Corretivas
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(question, indexQuestion) in category.questions"
                  :key="indexQuestion"
                >
                  <td>{{ indexCategory + 1 }}.{{ indexQuestion + 1 }}</td>
                  <td><strong>{{ question.topic }} </strong></td>
                  <td>
                    <strong>{{ question.obs }} </strong>
                    <v-textarea v-if="question.obs" v-model="question.obsAnswer" outlined rows="2" auto-grow />
                  </td>
                  <td><v-select v-model="question.selected" :items="question.answers" outlined hide-details="auto" /></td>
                  <td>
                    <v-switch v-model="question.switch" flat:label="`Switch 2: ${switch2.toString()}`" />
                    <CorrectActionModal v-if="question.switch" v-model="question.correctActions" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <br>
        <v-row>
          <v-col cols="12" md="6">
            <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(check_lists.createdAt).format("DD/MM/YYYY") }}</strong></p>
          </v-col>
          <v-col cols="12" md="6">
            <p><span class="overline">Respondido em:</span><br><strong>{{ $moment(check_lists.updatedAt).format("DD/MM/YYYY") }}</strong></p>
          </v-col>
        </v-row>
        <br>
      </div>
      <Documents v-if="check_lists.reference" :documents="check_lists.reference.documents" label="Baixar Referência" />
      <div style="margin-top: 2%;" @click="save()">
        <Send :label="'SALVAR RESPOSTAS'" />
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
      check_lists: null
    }
  },
  async created () {
    this.check_lists = await this.$axios.$get('/api/check_lists/' + this.$route.params.id)
  },
  methods: {
    async save () {
      const updated = await this.$axios.$put('/api/check_lists/' + this.check_lists._id, this.check_lists)
      if (updated) {
        this.$notifier.success('Respostas Salvas!')
        this.$router.push('/check-lists/' + updated._id)
      }
    }
  }
}
</script>
