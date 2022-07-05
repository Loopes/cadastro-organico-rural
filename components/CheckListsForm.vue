<template>
    <div>
      <validation-provider v-slot="{ errors }" name="Título" rules="required">
        <v-text-field v-model="title" outlined label="Título do Formulário:" :error-messages="errors" />
      </validation-provider>
      <v-row>
        <v-col cols="12" md="6">
          <ProductionUnit v-model="productionUnit"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-if="productionUnit.responsibles && productionUnit.responsibles.length"
            v-model="responsibleId"
            :items="productionUnit.responsibles"
            item-text="name"
            item-value="_id"
            label="Responsável"
            outlined
            hide-details="auto" />
          <span v-else-if="responsible" class="overline">Unidade de Produção: {{responsible.name}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <FieldNotebookModal v-if="productionUnit.id" :value="fieldNotebook" :productionUnitId="productionUnit.id" />
        </v-col>
        <v-col cols="12" md="6">
          <DatePicker v-model="date" label="Data" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="5"></v-col>
        <v-col cols="12" md="7">
            <v-btn
              color="primary"
              class="mb-6 lighten-1"
              @click="addCategory(indexCheckList)"
            >
              <v-icon>mdi-plus</v-icon>
              Adicionar Categoria
            </v-btn>
        </v-col>
      </v-row>
      <div v-for="(checkList, indexCheckList) in checkLists" :key="indexCheckList" style="border: 1.5px solid grey; border-left: 3px solid grey; padding: 4%; margin-top: 2%;">
        <v-row>
          <v-col cols="12" md="11">
            <v-text-field v-model="checkList.category" outlined label="Categoria:" />
          </v-col>
          <v-col cols="12" md="1">
            <v-btn
              v-if="checkLists.length > 1"
              color="primary"
              class="mb-6 lighten-1"
              @click="removeItemList(indexCheckList)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <div v-for="(question, indexQuestion) in checkList.questions" :key="indexQuestion" style="border-bottom: 1.5px solid grey; border-radius: 8%; margin-top: 2%;">
          <v-row>
            <v-col cols="12" md="6">
              <validation-provider v-slot="{ errors }" name="Pergunta" rules="required">
                <v-text-field v-model="question.topic" outlined label="Pergunta:" :error-messages="errors" />
              </validation-provider>
            </v-col>
            <v-col cols="12" md="4">
              <v-textarea v-model="question.obs" outlined label="Observações:" rows="1" auto-grow />
            </v-col>
            <v-col cols="12" md="2">
              <v-btn v-if="indexQuestion === 0"
                color="primary"
                class="mb-6 lighten-1"
                @click="addQuestionList(indexCheckList, indexQuestion)"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn
                v-if="checkList.questions.length > 1"
                color="primary"
                class="mb-6 lighten-1"
                @click="removeQuestionList(indexCheckList, indexQuestion)"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <p v-if="question.answers.length > 0" class="mt-3"><span class="overline">Respostas:</span>
                <br>
                <strong v-for="(answer, index) in question.answers" :key="index">{{ answer }} | </strong>
              </p>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="question.base" outlined label="Nova Resposta:" />
              <v-btn
                color="primary"
                class="mb-6 lighten-1"
                @click="addAnswer(indexCheckList, indexQuestion)"
              >
                <v-icon>mdi-plus</v-icon>
                Adicionar Resposta
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </div>
      {{error}}
      <div @click="save()" style="margin-top: 2%;">
        <Save />
      </div>
    <Remove v-if="checkList" />
    </div>
</template>

<script>
import {
  ValidationProvider
} from 'vee-validate'

import mixinForm from '@/mixins/form'

export default {
  components: {
    ValidationProvider
  },
  props: {
    checkList: {
      type: Object
    }
  },
  mixins: [mixinForm],
  data() {
    return {
      title: '',
      productionUnit: {},
      responsibleId: '',
      responsible: {},
      fieldNotebook: {},
      date: '',
      error: '',
      checkLists: [{
        category: '',
        questions: [{
          topic: '',
          obs: '',
          answers: ['Sim', 'Não'],
          base: ''
        }]
      }]
    }
  },
  created() {
    if (this.checkList) {
      this.title = this.checkList.title && this.checkList.title
      this.date = this.checkList.date && this.checkList.date
      this.fieldNotebook = this.checkList.fieldNotebook && this.checkList.fieldNotebook
      this.checkLists = this.checkList.checkLists && this.checkList.checkLists
      this.productionUnit = this.checkList.productionUnit && this.checkList.productionUnit
      this.responsible = this.checkList.responsible && this.checkList.responsible
    }
  },
  methods: {
    async save() {
      if (!this.checkList) {
        const baseCreate = {
          title: this.title && this.title,
          date: this.date && this.date,
          fieldNotebook: this.fieldNotebook !== {} && this.fieldNotebook,
          checkLists: this.checkLists && this.checkLists
        }
        if (this.productionUnit.id) {
          baseCreate.productionUnit = {
            id: this.productionUnit.id,
            name: this.productionUnit.name
          }
          if (this.productionUnit.responsibles.length > 0) {
            this.responsible = this.productionUnit.responsibles.find(responsible => responsible._id === this.responsibleId)
            if (this.responsible._id) {
              baseCreate.responsible = {
                id: this.responsible._id,
                name: this.responsible.name
              }
            }
          }
        }
        const created = await this.$axios.$post('/api/check_lists', baseCreate)
        if (created) {
          this.$notifier.success('Caderno de Campo Cadastrado!')
          this.$router.push('/check-lists/' + created._id)
        }
      } else {
        const baseCreate = {
          title: this.title,
          date: this.date,
          fieldNotebook: this.fieldNotebook,
          checkLists: this.checkLists,
          productionUnit: this.productionUnit,
          responsible: this.responsible
        }
        const updated = await this.$axios.$put('/api/check_lists/' + this.checkList._id, baseCreate)
        if (updated) {
          this.$notifier.success('Check List Atualizado!')
          this.$router.push('/check-lists/' + updated._id)
        }
      }
    },
    async remove (checkList) {
      await this.$axios.delete('/api/check_lists/' + checkList._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/check-lists')
      })
    },
    removeItemList (index) {
      this.checkLists.splice(index, 1)
    },
    removeQuestionList (indexCategory, indexQuestion) {
      this.checkLists[indexCategory].questions.splice(indexQuestion, 1)
    },
    addCategory (index) {
      this.checkLists.push(
        {
          category: '',
          questions: [{
            topic: '',
            obs: '',
            answers: ['Sim', 'Não'],
            base: ''
          }]
        }
      )
    },
    addQuestionList (indexCategory, indexQuestion) {
      const arrBase = this.checkLists[indexCategory].questions.splice(indexQuestion + 1, this.checkLists[indexQuestion].questions.length)
      this.checkLists[indexCategory].questions.push({
        topic: '',
        obs: '',
        answers: ['Sim', 'Não'],
        base: ''
      })
      Array.prototype.push.apply(this.checkLists[indexCategory].questions, arrBase)
    },
    addAnswer (indexCategory, indexQuestion) {
      this.checkLists[indexCategory].questions[indexQuestion].answers.push(this.checkLists[indexCategory].questions[indexQuestion].base)
      this.checkLists[indexCategory].questions[indexQuestion].base = ''
    }
  }
}
</script>
