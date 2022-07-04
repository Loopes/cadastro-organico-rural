<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="5">
          <validation-provider v-slot="{ errors }" name="tipo" rules="required">
            <v-select v-model="form.type" :items="fieldNotebookType" label="Selecione o tipo"
              :error-messages="errors"
              outlined hide-details="auto"
              multiple
            />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="2">
        </v-col>
        <v-col v-if="form.type.find(type => type === 'Lote')" cols="12" md="5">
          <validation-provider v-slot="{ errors }" name="status" rules="required">
            <v-select v-model="form.status" :items="fieldNotebookStatusLote" label="Selecione o status" :error-messages="errors" outlined hide-details="auto" />
          </validation-provider>
        </v-col>
        <v-col v-else cols="12" md="5">
          <validation-provider v-slot="{ errors }" name="status" rules="required">
            <v-select v-model="form.status" :items="fieldNotebookStatus" label="Selecione o status" :error-messages="errors" outlined hide-details="auto" />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <ProductionUnit v-model="form.productionUnit"/>
        </v-col>
        <v-col cols="12" md="6">
      <span v-if="fieldNotebookEntity" class="overline">Atividade Produtiva: {{ fieldNotebookEntity.productionActivitie.descricao }}</span>
      <div v-if="form.productionUnit.production_activities" class="mb-3">
        <span class="overline">Atividade Produtiva: {{form.productionActivitie ? form.productionActivitie.activity.descricao : ''}}</span>
        <div>
          <v-dialog
            v-model="dialog"
            transition="dialog-bottom-transition"
            max-width="600"
            scrollable
          >
            <template #activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  color="primary"
                  class="mb-6 lighten-1"
                  v-on="on"
                >
                  <v-icon>mdi-plus</v-icon> Selecionar Atividade Produtiva
                </v-btn>
            </template>
            <v-card>
              <v-toolbar
                color="primary"
                dark
              >
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <span>Selecionar Atividade Produtiva</span>
              </v-toolbar>
              <div v-if="dialog" class="pa-6">
                  <v-form @submit.prevent="validate().then(save)">
                    <validation-provider v-slot="{ errors }" name="Atividade Produtiva" rules="required">
                      <v-select
                        v-model="productionId"
                        :items="form.productionUnit.production_activities"
                        label="Atividade Produtiva"
                        outlined hide-details="auto"
                        :error-messages="errors"
                        item-text="activity.descricao"
                        item-value="_id"
                      >
                        <template v-slot:item="{ item }">
                          <div class="py-2">
                            <h4>{{ item.activity.descricao }}</h4>
                            <small>{{ item.activity.codigo }}</small>
                          </div>
                        </template>
                      </v-select>
                    </validation-provider>
                    <v-row>
                      <v-col cols="12" md="4">
                      </v-col>
                      <v-col cols="12" md="4">
                        <v-btn class="mr-4" @click="selectActivity()">
                          Confirmar
                        </v-btn>
                      </v-col>
                      <v-col cols="12" md="4">
                      </v-col>
                    </v-row>

                  </v-form>
              </div>
            </v-card>
          </v-dialog>
        </div>
      </div>
        </v-col>
      </v-row>

      <div>
        <validation-provider v-slot="{ errors }" name="Título" rules="required">
          <v-text-field v-model="form.name" outlined label="Título (Ex: Cultivo de Tomate - Junho/2022)*" :error-messages="errors" />
        </validation-provider>
        <v-textarea v-model="form.observation" outlined label="Observações" rows="3" auto-grow />
        <v-row>
          <v-col cols="12" md="12">
          </v-col>
          <v-col cols="12" md="12">
            <RawMaterialModal v-model="form.rawMaterial"/>
          </v-col>
        </v-row>
        <v-row  v-for="(a, index) in form.rawMaterial" :key="index" class="table">
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Nome | Categoria: <br></span>
              {{ a.name }} | {{ a.category }}
            </v-col>
            <v-col cols="12" md="6">
              <div v-if="a.extra">
                <span class="overline">Observações: <br></span>
                {{ a.extra.observation ? a.extra.observation : '' }}
              </div>
              <div v-else>
                <span class="overline">Observações: <br></span>
                {{ a.observation ? a.observation : '' }}
              </div>
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Quantidade (Em {{a.uM}}): <br></span>
              {{ a.qtd ? a.qtd : a.extra.qtd }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Área Aplicada: <br></span>
              {{ a.appliedArea ? a.appliedArea : a.extra.appliedArea }}
            </v-col>
          </v-col>
          <v-col cols="12" md="4">
            <v-col cols="12" md="6">
              <span class="overline">Data de Aplicação Inicial <br></span>
              {{ a.dateInit ? a.dateInit : a.extra.dateInit }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Data de Aplicação Final: <br></span>
              {{ a.dateFinal ? a.dateFinal : a.extra.dateFinal }}
            </v-col>
          </v-col>
          <v-col cols="12" md="1">
            <v-col cols="12" md="8">
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="removeRaw(index)">
                Retirar da lista
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <ActivitiesForm v-model="form.activities" :rawMaterialsSeleceted="form.rawMaterial" :activities="form.activities"/>
          </v-col>
        </v-row>
        <v-row  v-for="(a, index) in form.activities" :key="index" class="table">
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Título: <br></span>
              {{ a.title }}
            </v-col>
            <v-col cols="12" md="6">
              <div >
                <span class="overline">Observações: <br></span>
                {{ a.observation ? a.observation : '' }}
              </div>
            </v-col>
          </v-col>
          <v-col cols="12" md="3">
            <v-col cols="12" md="6">
              <span class="overline">Status | Categoria: <br></span>
              {{ a.status }} | {{ a.category }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Periodo | Inspecionado: <br></span>
              {{ a.period }} | {{ a.inspect }}
            </v-col>
          </v-col>
          <v-col cols="12" md="2">
            <v-col cols="12" md="6">
              <span class="overline">Data Inicial <br></span>
              {{ a.dateInit ? a.dateInit : a.extra.dateInit }}
            </v-col>
            <v-col cols="12" md="6">
              <span class="overline">Data Final: <br></span>
              {{ a.dateFinal ? a.dateFinal : a.extra.dateFinal }}
            </v-col>
          </v-col>
          <v-col cols="12" md="2">
            <v-col cols="12" md="6">
              <span class="overline">Insumos: <br></span>
              <div v-for="(raw, index) in a.rawMaterials" :key="index" >{{ raw.name }}</div>
            </v-col>
          </v-col>
          <v-col cols="12" md="1">
            <v-col cols="12" md="8">
            </v-col>
            <v-col cols="12" md="4">
              <v-btn @click="removeActivity(index)">
                Retirar da lista
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
        <Save :invalid="invalid" />
      </div>
    </v-form>
    <Remove v-if="fieldNotebookEntity" @confirm="remove(fieldNotebookEntity)" />
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import mixinForm from '@/mixins/form'
import fieldNotebookType from '@/data/fieldNotebookType.json'
import fieldNotebookStatusLote from '@/data/fieldNotebookStatus.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    fieldNotebookEntity: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      fieldNotebookType,
      fieldNotebookStatusLote,
      fieldNotebookStatus: [fieldNotebookStatusLote[0]],
      restriction: false,
      dialog: false,
      form: {
        type: [],
        status: '',
        productionUnit: {},
        rawMaterial: [],
        activities: [],
        productionActivitie: null,
        productionId: '',
        name: '',
        codTraceability: '',
        observation: ''
      }
    }
  },
  created() {
    this.toForm(this.form, this.fieldNotebookEntity)
  },
  methods: {
    async save() {
      if (this.fieldNotebookEntity && this.form.rawMaterial) {
        this.form.rawMaterial = this.form.rawMaterial.map(material => {
          if (material.extra) {
            return {
              id: material._id,
              name: material.name,
              category: material.category,
              uM: material.uM,
              ...material.extra
            }
          }
          return {
            id: material._id,
            ...material
          }
        })
        const fieldNotebookEntity = await this.$axios.$put('/api/field_notebook/' + this.fieldNotebookEntity._id, this.form)
        if (fieldNotebookEntity) {
          this.$notifier.success('Caderno de Campo Atualizado!')
          this.$router.push('/caderno-de-campo/' + fieldNotebookEntity._id)
        }
      } else {
        this.form.productionUnit = {
          id: this.form.productionUnit.id,
          name: this.form.productionUnit.name
        }
        this.form.rawMaterial = this.form.rawMaterial.map(material => {
          return {
            id: material._id,
            name: material.name,
            category: material.category,
            uM: material.uM,
            ...material.extra
          }
        })
        const fieldNotebookEntity = await this.$axios.$post('/api/field_notebook', this.form)
        if (fieldNotebookEntity) {
          this.$notifier.success('Caderno de Campo cadastrado!')
          this.$router.push('/caderno-de-campo/' + fieldNotebookEntity._id)
        }
      }
    },
    remove (fieldNotebookEntity) {
      this.$axios.delete('/api/field_notebook/' + fieldNotebookEntity._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/caderno-de-campo')
      })
    },
    removeRaw (index) {
      this.form.rawMaterial.splice(index, 1)
    },
    removeActivity (index) {
      this.form.activities.splice(index, 1)
    },
    selectActivity () {
      this.dialog = false
      this.form.productionActivitie = this.form.productionUnit.production_activities.find(activities => activities._id === this.productionId)
      this.form.codTraceability = this.form.productionUnit.id + this.form.productionActivitie._id
    }
  }
}
</script>
