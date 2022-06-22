<template>
  <div class="mb-3">
    <span class="overline">Atividades de produção atual: </span>
    <v-list v-if="items && items.length" outlined class="rounded mb-3">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-title><strong>{{ item.activity.descricao }}</strong></v-list-item-title>
          <v-list-item-subtitle class="mb-2"><small>{{ item.activity.grupo }}</small></v-list-item-subtitle>
          <div>
            <v-chip v-if="item.quantity" color="primary" class="lighten-2" small><strong>{{ item.quantity }} </strong> &nbsp; {{ item.activity.unidade }} anuais</v-chip>
            <v-chip v-if="item.area" small><strong>{{ item.area }} </strong> &nbsp; hectares</v-chip>
          </div>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn color="danger" icon @click="remove(i)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <span class="overline">Atividades de produção do ano passado: </span>
    <v-list v-if="items && items.length" outlined class="rounded mb-3">
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-title><strong>{{ item.activity.descricao }}</strong></v-list-item-title>
          <v-list-item-subtitle class="mb-2"><small>{{ item.activity.grupo }}</small></v-list-item-subtitle>
          <div>
            <v-chip v-if="item.previous_year_total_quantity_production" color="primary" class="lighten-2" small><strong>{{ item. previous_year_total_quantity_production }} </strong> &nbsp; {{ item.activity.unidade }} anuais</v-chip>
            <v-chip v-if="item.previous_year_area_production" small><strong>{{ item.previous_year_area_production }} </strong> &nbsp; hectares</v-chip>
          </div>
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
            <v-icon>mdi-plus</v-icon> Adicionar atividade produtiva
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
            <span>Adicionar atividade produtiva</span>
          </v-toolbar>
          <div v-if="dialog" class="pa-6">
            <ValidationObserver v-slot="{ validate, invalid }">
              <v-form @submit.prevent="validate().then(save)">
                <validation-provider v-slot="{ errors }" name="atividade produtiva" rules="required">
                  <v-combobox v-model="form.activity" item-text="descricao" name="uf" :items="activities" label="Tipo de atividade produtiva" :error-messages="errors" outlined>
                    <template v-slot:item="{ item }">
                      <div class="py-2">
                        <h4>{{ item.descricao }}</h4>
                        <small>{{ item.grupo }}</small>
                      </div>
                    </template>
                  </v-combobox>
                </validation-provider>
                <div v-if="form.activity">
                  <v-row>
                    <v-col cols="12" sm="6" class="pb-0">
                      <validation-provider v-slot="{ errors }" name="produção anual" rules="min_value: 0">
                        <v-text-field v-model="form.quantity" outlined label="Produção anual estimada desse ano" type="number" step="0.01" lang="nb" min="0" :error-messages="errors">
                          <span slot="append">
                            {{ form.activity.unidade }}
                          </span>
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" class="pb-0">
                      <validation-provider v-slot="{ errors }" name="área de produção" rules="min_value: 0">
                        <v-text-field v-model="form.area" outlined label="Área de produção atual" type="number" step="0.01" lang="nb" min="0" :error-messages="errors">
                          <span slot="append">
                            HECTARES
                          </span>
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" class="pb-0">
                      <validation-provider v-slot="{ errors }" name="área de produção" rules="min_value: 0">
                        <v-text-field v-model="form.previous_year_area_production" outlined label="Total de produção do ano passado" type="number" step="0.01" lang="nb" min="0" :error-messages="errors">
                          <span slot="append">
                            KG
                          </span>
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                    <v-col cols="12" sm="6" class="pb-0">
                      <validation-provider v-slot="{ errors }" name="área de produção" rules="min_value: 0">
                        <v-text-field v-model="form.previous_year_total_quantity_production" outlined label="Total de área do ano passado" type="number" step="0.01" lang="nb" min="0" :error-messages="errors">
                          <span slot="append">
                            HECTARES
                          </span>
                        </v-text-field>
                      </validation-provider>
                    </v-col>
                  </v-row>
                  <Save :invalid="invalid" label="Concluír" />
                </div>
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
import activities from '@/data/atividades-produtivas.json'
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
      form: {
        activity: null,
        quantity: null,
        area: null,
        previous_year_total_quantity_production: null,
        previous_year_area_production: null
      }
    }
  },
  computed: {
    activities() {
      const list = []
      Object.keys(activities).forEach(grupo => {
        activities[grupo].forEach(activity => {
          list.push({ ...activity, grupo, codigo: grupo + '-' + activity.codigo })
        })
      })
      return list.sort((a, b) => a.descricao.localeCompare(b.descricao))
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
      this.form.activity = ''
      this.form.quantity = ''
      this.form.area = ''
      this.previous_year_total_quantity_production = ''
      this.previous_year_area_production = ''
    },
    remove (index) {
      this.items = this.items.filter((item, i) => i !== index)
      this.$emit('input', this.items)
    }
  }
}
</script>
