<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="categoria" rules="required">
            <v-select v-model="form.uf" name="uf" :items="estados" label="Estado *" :error-messages="errors" outlined />
          </validation-provider>
        </v-col>
        <v-col v-if="form.uf" cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="categoria" rules="required">
            <v-select v-model="form.city" name="city" :items="cidades[form.uf]" label="Município *" :error-messages="errors" outlined />
          </validation-provider>
        </v-col>
      </v-row>
      <div v-if="form.uf && form.city">
        <validation-provider v-slot="{ errors }" name="nome" rules="required">
          <v-text-field v-model="form.name" outlined name="name" label="Nome da propriedade *" :error-messages="errors" />
        </validation-provider>
        <v-textarea v-model="form.contacts" outlined name="contacts" label="Contatos" rows="2" auto-grow />
        <v-textarea v-model="form.farm_address" outlined name="farm_address" label="Endereço da propriedade" rows="2" auto-grow />
        <PointForm v-model="form.farm_gate_location" label="Entrada da propriedade" />
        <PointForm v-model="form.farm_house_location" label="Sede da propriedade" />
        <AddressForm v-model="form.correspondence_address" label="Endereço de correspondência" />
        <ProductionActivitiesForm v-model="form.production_activities" label="Atividades produtivas" />
        <Upload v-model="form.documents" label="Anexar documentos" type="documents" multiple edit-title />
        <Upload v-model="form.pictures" label="Anexar imagens" type="images" multiple edit-title />
        <Save :invalid="invalid" />
      </div>
    </v-form>
    <Remove v-if="productionUnit" @confirm="remove(productionUnit)" />
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import mixinForm from '@/mixins/form'
import estados from '@/data/estados.json'
import cidades from '@/data/cidades.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    productionUnit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      cidades,
      form: {
        uf: '',
        city: '',
        name: '',
        farm_address: '',
        farm_gate_location: {
          type: 'Point',
          coordinates: []
        },
        farm_house_location: {
          type: 'Point',
          coordinates: []
        },
        correspondence_address: null,
        access_route: '',
        contacts: '',
        total_area: '',
        organic_production_area: '',
        permanent_preservation_area: '',
        legal_reservea_area: '',
        organic_since: '',
        production_activities: [],
        previous_year_total_production: '',
        current_year_estimated_production: '',
        certifying_entity_type: '',
        certifying_entity: '',
        pictures: [],
        documents: []
      }
    }
  },
  created() {
    this.toForm(this.form, this.productionUnit)
  },
  methods: {
    async save() {
      if (this.productionUnit) {
        const productionUnit = await this.$axios.$put('/api/production_units/' + this.productionUnit._id, this.form)
        if (productionUnit) {
          this.$notifier.success('Unidade atualizada!')
          this.$router.push('/unidades-de-producao/' + productionUnit._id)
        }
      } else {
        const productionUnit = await this.$axios.$post('/api/production_units', this.form)
        if (productionUnit) {
          this.$notifier.success('Unidade cadastrada!')
          this.$router.push('/unidades-de-producao/' + productionUnit._id)
        }
      }
    },
    remove (productionUnit) {
      this.$axios.delete('/api/production_units/' + productionUnit._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/unidades-de-producao')
      })
    }
  }
}
</script>
