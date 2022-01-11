<template>
  <div class="mb-3">
    <span class="overline">Responsáveis: </span>
    <v-list v-if="items && items.length" outlined class="rounded mb-3">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-title><strong>{{ item.name }}</strong></v-list-item-title>
          <v-list-item-subtitle class="mb-1"><small>{{ item.email }}</small></v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1"><small>{{ item.cpf }}</small></v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1"><small>{{ item.gender }}</small></v-list-item-subtitle>
          <v-list-item-subtitle class="mb-1"><small>{{ item.birth_date }}</small></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="danger" icon @click="remove(i)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
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
            <v-icon>mdi-plus</v-icon> Adicionar responsável
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
            <span>Adicionar responsável</span>
          </v-toolbar>
          <div v-if="dialog" class="pa-6">
            <ValidationObserver v-slot="{ validate, invalid }">
              <v-form @submit.prevent="validate().then(save)">
                <validation-provider v-slot="{ errors }" name="nome" rules="required">
                  <v-text-field v-model="form.name" outlined label="Nome" :error-messages="errors" />
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="cpf" rules="required">
                  <v-text-field v-model="form.cpf" v-mask="['###.###.###-##']" outlined label="CPF" :error-messages="errors" />
                </validation-provider>
                <v-text-field v-model="form.email" name="email" label="Email" outlined />
                <DatePicker v-model="form.brith_date" label="Data de nascimento" />
                <v-select
                  v-model="form.gender"
                  :items="['Masculino', 'Feminino', 'Outros']"
                  outlined
                  label="Gênero"
                />
                <v-switch v-model="form.is_owner" :label="'Este responsável é o proprietário? ' + (form.is_owner ? 'Sim' : 'Não')" />
                <Save :invalid="invalid" label="Concluír" />
              </v-form>
            </ValidationObserver>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import mixinForm from '@/mixins/form'
const emptyForm = {
  name: null,
  cpf: null,
  email: null,
  is_owner: false,
  birth_date: null,
  gender: null
}
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      dialog: false,
      items: [],
      form: { ...emptyForm }
    }
  },
  created() {
    if (this.value && this.value.length) {
      this.items = this.value
    }
  },
  methods: {
    save () {
      this.items.push({ ...this.form })
      this.$emit('input', this.items)
      this.dialog = false
      this.form = { ...emptyForm }
    },
    remove (index) {
      this.items = this.items.filter((item, i) => i !== index)
      this.$emit('input', this.items)
    }

  }
}
</script>
