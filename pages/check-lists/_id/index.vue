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
        <p v-if="check_lists.responsible.name"><span class="overline">Responsável:</span><br><strong>{{ check_lists.responsible.name }}</strong></p>
        <p v-if="check_lists.fieldNotebook.name"><span class="overline">Caderno de Campo:</span><br><strong>{{ check_lists.fieldNotebook.name }}</strong></p>
        <br>
        <div v-for="(category, indexCategory) in check_lists.checkLists" :key="indexCategory">
          <p v-if="category"><strong>{{indexCategory + 1}}. {{category.category}}</strong></p>
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
                  <th width="40%" class="text-left">
                    Observações
                  </th>
                  <th class="text-left">
                    Respostas
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
                  <td><strong>{{ question.obs }} </strong></td>
                  <td><p/><p v-for="(answers, indexAnswers) in question.answers" :key="indexAnswers">{{ answers }} [ &nbsp; ]</p></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
        <br>
        <p><span class="overline">Cadastrado em:</span><br><strong>{{ $moment(check_lists.createdAt).format("DD/MM/YYYY") }}</strong></p>
        <br>
        <qrcode-vue :value="route" :level="H" :size="250" :render-as="'canva'"/>
        <div style="width: 12vw;">
          <Documents :documents="qr" />
        </div>

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
  }
}
</script>
