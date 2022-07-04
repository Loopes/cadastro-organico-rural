<template>
  <div class="mb-3">
    <span class="overline">Atividades</span>
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
            <v-icon>mdi-plus</v-icon> Adicionar Atividades
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
            <span>Atividades</span>
          </v-toolbar>
          <div class="pa-6">
              <v-form >
                <div>
                  <v-text-field v-model="title" outlined label="Título*:" />
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select v-model="status" :items="ativitiesStatus" label="Status:" outlined hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select v-model="category" :items="ativitiesCategory" label="Categoria:" outlined hide-details="auto" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select v-model="period" :items="ativitiesPeriod" label="Período:" outlined hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select v-model="inspect" :items="['Sim', 'Não']" label="Inspecionado:" outlined hide-details="auto" />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="6">
                      <DatePicker v-model="dateInit" label="Data Inicial" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <DatePicker v-model="dateFinal" label="Data Final" />
                    </v-col>
                  </v-row>
                  <v-textarea v-model="observation" outlined label="Observações" rows="2" auto-grow />
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-select v-model="rawMaterialsList" :items="items" label="Selecione Insumos"
                        outlined hide-details="auto"
                        multiple
                      />
                    </v-col>
                    <v-col cols="12" md="12">
                    </v-col>
                  </v-row>
                  <Upload v-model="documents" label="Anexos" type="documents" multiple edit-title />
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn class="mr-4" @click="save()">
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
</template>
<script>
import mixinForm from '@/mixins/form'
import ativitiesStatus from '@/data/atividades-status.json'
import ativitiesCategory from '@/data/atividades-categoria.json'
import ativitiesPeriod from '@/data/periodo.json'

export default {
  mixins: [mixinForm],
  props: {
    rawMaterialsSeleceted: {
      type: Object,
      default: () => {}
    },
    activities: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      ativitiesStatus,
      ativitiesCategory,
      ativitiesPeriod,
      dialog: false,
      status: '',
      category: '',
      title: '',
      period: '',
      inspect: '',
      dateInit: '',
      dateFinal: '',
      observation: '',
      rawMaterialsList: [],
      documents: [],
      items: [],
      base: []
    }
  },
  created() {
    if (this.activities && this.activities.length) {
      this.base = this.activities
    }
    this.list()
  },
  methods: {
    list () {
      this.rawMaterialsSeleceted.forEach(req => {
        this.items.push({
          text: req.name,
          value: req.id
        })
      })
    },
    save () {
      this.dialog = false
      const materialFormat = []
      this.rawMaterialsList.forEach(material => {
        const materialFind = this.rawMaterialsSeleceted.find(selected => selected.id === material)
        materialFormat.push({ id: materialFind.id, name: materialFind.name })
      })
      this.base.push({ status: this.status, category: this.category, title: this.title, period: this.period, inspect: this.inspect, dateInit: this.dateInit, dateFinal: this.dateFinal, observation: this.observation, rawMaterials: materialFormat, documents: this.documents })
      this.$emit('input', this.base)
      this.status = ''
      this.category = ''
      this.observation = ''
      this.documents = []
      this.title = ''
      this.period = ''
      this.inspect = ''
      this.rawMaterialsList = []
    }
  }
}
</script>
