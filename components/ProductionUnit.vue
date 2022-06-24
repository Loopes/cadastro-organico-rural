<template>
  <div class="mb-3">
    <span class="overline">Unidade de Produção: {{name}}</span>
    <div>
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
        scrollable
      >
        <template v-if="!name" #activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            color="primary"
            class="mb-6 lighten-1"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon> Selecionar Unidade de Produção
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
            <span>Escolher Unidade de Produção</span>
          </v-toolbar>
          <div class="pa-6">
              <v-form @submit.prevent="validate().then(save)">
                <validation-provider v-slot="{ errors }" name="unidade de produção" rules="required">
                  <v-select v-model="unitId" :items="items" label="Unidade de Produção" outlined hide-details="auto" :error-messages="errors" />
                </validation-provider>
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
      items: [],
      products: [],
      unitId: '',
      name: ''
    }
  },
  created() {
    if (this.value && this.value.length) {
      this.items = this.value
    }
    this.name = this.value.name
    this.list()
  },
  methods: {
    async list () {
      const request = await this.$axios.$get('/api/production_units?user=true')
      this.products = request
      request.forEach(req => {
        this.items.push({
          text: req.name,
          value: req._id
        })
      })
    },
    save () {
      const findProduct = this.products.find(product => product._id === this.unitId)
      if (findProduct) {
        const ret = {
          id: findProduct._id,
          name: findProduct.name,
          production_activities: findProduct.production_activities
        }
        this.name = ret.name
        this.dialog = false
        this.$emit('input', ret)
      }
    }
  }
}
</script>
