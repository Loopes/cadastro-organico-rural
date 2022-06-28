<template>
  <div class="mb-3">
    <span class="overline">Insumos</span>
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
            <v-icon>mdi-plus</v-icon> Selecionar Insumos Usados
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
            <span>Selecionar Insumos</span>
          </v-toolbar>
          <div class="pa-6">
              <v-form >
                <v-row>
                    <v-col cols="12" md="12">
                      <v-text-field @input="filter(findRawMaterial)" v-model="findRawMaterial" outlined label="Buscar Insumo" />
                    </v-col>
                    <b-container v-if="!unitId" style="width: 100%; height: 30vh; overflow: auto;">
                      <v-col class="text-center" v-for="(material, index) in items" :key="index" cols="12" md="12">
                        <div @click="unitId=material.value; findRawMaterial=material.text" style="cursor: pointer;">
                          <span class="overline">{{material.text}}<br></span>
                        </div>
                      </v-col>
                    </b-container>
                </v-row>
                <div v-if="unitId">
                  <validation-provider v-slot="{ errors }" name="Area Aplicada" rules="required">
                    <v-text-field v-model="appliedArea" outlined label="Área Aplicada: (Ex: 2000 metros)*" :error-messages="errors" />
                  </validation-provider>
                  <validation-provider v-slot="{ errors }" name="Quantidade" rules="required">
                    <v-text-field v-model="qtd" outlined label="Quantidade Aplicada*:" :error-messages="errors" />
                  </validation-provider>
                  Periodo de Aplicação
                  <v-row>
                    <v-col cols="12" md="6">
                      <DatePicker v-model="dateInit" label="Data Inicial" />
                    </v-col>
                    <v-col cols="12" md="6">
                      <DatePicker v-model="dateFinal" label="Data Final" />
                    </v-col>
                  </v-row>
                  <v-textarea v-model="observation" outlined label="Observações" rows="2" auto-grow />
                  <Upload v-model="documents" label="Anexar Notas Fiscais" type="documents" multiple edit-title />
                </div>
                <v-row>
                  <v-col cols="12" md="4">
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-btn v-if="unitId" class="mr-4" @click="save()">
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
import {
  ValidationProvider
} from 'vee-validate'

import mixinForm from '@/mixins/form'
export default {
  components: {
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dialog: false,
      teste: [],
      findRawMaterial: '',
      items: [],
      base: [],
      rawMaterials: [],
      unitId: '',
      appliedArea: '',
      qtd: '',
      dateInit: '',
      dateFinal: '',
      observation: '',
      documents: []
    }
  },
  created() {
    if (this.value && this.value.length) {
      this.base = this.value
    }
    this.list()
  },
  methods: {
    async list () {
      const request = await this.$axios.$get('/api/raw_materials?user=true')
      this.rawMaterials = request
      request.forEach(req => {
        this.items.push({
          text: req.name,
          value: req._id
        })
      })
    },
    filter (name) {
      this.unitId = ''
      this.items = []
      if (name) {
        this.rawMaterials.forEach(material => {
          if (material.name.toUpperCase().search(name.toUpperCase()) >= 0) {
            this.items.push({
              text: material.name,
              value: material._id
            })
          }
        })
      } else {
        this.rawMaterials.forEach(material => {
          this.items.push({
            text: material.name,
            value: material._id
          })
        })
      }
    },
    save () {
      const findMaterial = this.rawMaterials.find(material => material._id === this.unitId)
      if (findMaterial) {
        this.dialog = false
        this.base.push({ ...findMaterial, extra: { appliedArea: this.appliedArea, qtd: this.qtd, dateInit: this.dateInit, dateFinal: this.dateFinal, observation: this.observation, documents: this.documents } })
        this.$emit('input', this.base)
        this.unitId = ''
        this.appliedArea = ''
        this.qtd = ''
        this.dateInit = ''
        this.dateFinal = ''
        this.observation = ''
        this.documents = []
      }
    }
  }
}
</script>
