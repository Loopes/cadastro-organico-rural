<template>
  <div class="mb-3">
    <span class="overline">Colheitas</span>
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
            <v-icon>mdi-plus</v-icon> Adicionar Colheita
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
            <span>Colheitas</span>
          </v-toolbar>
          <div class="pa-6">
              <v-form >
                <div>
                  <v-text-field v-model="productionActivityName" outlined label="Atividade Produtiva:" disabled/>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-select v-model="type" :items="harvestTypes" label="Tipo:" outlined hide-details="auto" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select v-model="category" :items="harvestCategories" label="Categoria:" outlined hide-details="auto" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <DatePicker v-model="dateHarvest" label="Data de Colheita" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <DatePicker v-model="dateValidity" label="Data de Validade" />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field v-model="qntd" outlined label="Quantidade (Ex: 50):"/>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select v-model="unidMed" :items="unidMeds" label="Unidade de Medida:" outlined hide-details="auto" />
                    </v-col>
                  </v-row>
                  <v-textarea v-model="observation" outlined label="Observações" rows="2" auto-grow />
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
import harvestTypes from '@/data/colheitas-tipos.json'
import unidMeds from '@/data/unidade-medida.json'
import harvestCategories from '@/data/colheitas-categorias.json'

export default {
  mixins: [mixinForm],
  props: {
    productionActivitie: {
      type: Object,
      default: () => {}
    },
    harvests: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      harvestTypes,
      unidMeds,
      harvestCategories,
      dialog: false,
      type: '',
      category: '',
      productionActivityName: '',
      qntd: '',
      unidMed: '',
      dateHarvest: '',
      dateValidity: '',
      observation: '',
      documents: [],
      base: []
    }
  },
  created() {
    if (this.productionActivitie) {
      this.productionActivityName = this.productionActivitie.activity.descricao
    }
    if (this.harvests && this.harvests.length) {
      this.base = this.harvests
    }
  },
  methods: {
    save () {
      this.dialog = false
      this.base.push({ observation: this.observation, productionActivityName: this.productionActivityName, type: this.type, category: this.category, dateHarvest: this.dateHarvest, dateValidity: this.dateValidity, qntd: this.qntd, unidMed: this.unidMed, documents: this.documents })
      this.$emit('input', this.base)
      this.type = ''
      this.category = ''
      this.dateHarvest = ''
      this.dateValidity = ''
      this.qntd = ''
      this.unidMed = ''
      this.observation = ''
      this.documents = []
    }
  }
}
</script>
