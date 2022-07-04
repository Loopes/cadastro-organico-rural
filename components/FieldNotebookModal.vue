<template>
  <div class="mb-3">
    <span class="overline">Caderno de Campo: {{name}}</span>
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
            <v-icon>mdi-plus</v-icon> Selecionar Caderno de Campo
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
            <span>Selecionar Caderno de Campo</span>
          </v-toolbar>
          <div class="pa-6">
            <v-form >
                <validation-provider v-slot="{ errors }" name="Caderno de Campo" rules="required">
                  <v-select
                    v-model="unitId"
                    :items="items"
                    item-text="name"
                    item-value="id"
                    label="Caderno de Campo"
                    outlined
                    hide-details="auto"
                    :error-messages="errors"
                  />
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
      unitId: '',
      items: [],
      name: ''
    }
  },
  created() {
    if (this.value) {
      this.name = this.value.name
    }
    this.list()
  },
  methods: {
    async list () {
      this.items = await this.$axios.$get('/api/field_notebook')
    },
    save () {
      if (this.unitId) {
        const findFieldNotebook = this.items.find(notebook => notebook.id === this.unitId)
        const objectBase = {
          id: findFieldNotebook.id,
          name: findFieldNotebook.name
        }
        this.$emit('input', objectBase)
        this.unitId = ''
        this.name = findFieldNotebook.name
        this.dialog = false
      }
    }
  }
}
</script>
