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
          <v-text-field v-model="form.name" outlined name="name" label="Nome do Organismo Certificador *" :error-messages="errors" />
        </validation-provider>
        <v-textarea v-model="form.contacts" outlined name="contacts" label="Contatos" rows="2" auto-grow />
        <v-textarea v-model="form.farm_address" outlined name="farm_address" label="Endereço do Organismo Certificador" rows="2" auto-grow />
        <AddressForm v-model="form.address" label="Endereço de correspondência" />
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
        address: null,
        contacts: '',
        pictures: [],
        documents: []
      }
    }
  },
  created() {
    this.toForm(this.form, this.certifyingEntity)
  },
  methods: {
    async save() {
      if (this.certifyingEntity) {
        const certifyingEntity = await this.$axios.$put('/api/certifying_entities/' + this.certifyingEntity._id, this.form)
        if (certifyingEntity) {
          this.$notifier.success('Entidade Certificadora Atualizada!')
          this.$router.push('/entidades-certificadoras/' + certifyingEntity._id)
        }
      } else {
        const certifyingEntity = await this.$axios.$post('/api/certifying_entities', this.form)
        if (certifyingEntity) {
          this.$notifier.success('Unidade cadastrada!')
          this.$router.push('/entidades-certificadoras/' + certifyingEntity._id)
        }
      }
    },
    remove (certifyingEntity) {
      this.$axios.delete('/api/certifying_entities/' + certifyingEntity._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/entidades-certificadoras')
      })
    }
  }
}
</script>
