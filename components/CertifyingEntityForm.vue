<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="6">
          <validation-provider v-slot="{ errors }" name="categoria" rules="required">
            <v-select v-model="form.uf" name="uf" :items="estados" label="Estado *" :error-messages="errors" outlined hide-details="auto" />
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
          <v-text-field v-model="form.name" outlined label="Nome da entidade *" :error-messages="errors" />
        </validation-provider>
        <validation-provider v-slot="{ errors }" name="cnpj" rules="required">
          <v-text-field v-model="form.cnpj" v-mask="['##.###.###/####-##']" outlined label="CNPJ" :error-messages="errors" />
        </validation-provider>
        <v-text-field v-model="form.phone" v-mask="['(##) ####-####', '(##) #####-####']" outlined name="phone" placeholder="(99) 99999-9999" label="Telefone *" />
        <v-text-field v-model="form.email" name="email" label="Email" outlined />
        <v-textarea v-model="form.contacts" outlined label="Outros contatos" rows="3" auto-grow />
        <AddressForm v-model="form.address" label="Endereço de correspondência" />
        <ResponsibleForm v-model="form.responsibles" />
        <Upload v-model="form.documents" label="Anexar documentos" type="documents" multiple edit-title />
        <Upload v-model="form.pictures" label="Anexar imagens" type="images" multiple edit-title />

        <Save :invalid="invalid" />
      </div>
    </v-form>
    <Remove v-if="certifyingEntity" @confirm="remove(certifyingEntity)" />
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
    certifyingEntity: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      cidades,
      form: {
        uf: 'GO',
        city: 'Alto Paraíso de Goiás',
        name: '',
        cnpj: null,
        phone: '',
        email: '',
        contacts: '',
        address: null,
        responsibles: [],
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
          this.$notifier.success('Entidade certificadora Atualizada!')
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
