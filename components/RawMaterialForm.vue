<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <v-form @submit.prevent="validate().then(save)">
      <v-row>
        <v-col cols="12" md="10">
          <validation-provider v-slot="{ errors }" name="categoria" rules="required">
              <v-select v-model="form.category" name="cat" :items="insumos" label="Categoria do Insumo *" :error-messages="errors" outlined hide-details="auto" />
          </validation-provider>
        </v-col>
        <v-col cols="12" md="2">
          <validation-provider v-slot="{ errors }" name="um" rules="required">
            <v-select v-model="form.uM" name="uf" :items="unidadeMedida" label="Unidade de Medida *" :error-messages="errors" outlined hide-details="auto" />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12">
          <validation-provider v-slot="{ errors }" name="nome" rules="required">
            <v-text-field v-model="form.name" outlined label="Nome do Insumo *" :error-messages="errors" />
          </validation-provider>
        </v-col>
      </v-row>

      <div>
        <v-textarea v-model="form.guidelines" outlined label="Orientações" rows="3" auto-grow />
        <v-checkbox v-model="restriction" :label="`Contém Restrições`" />
        <v-textarea v-if="restriction" v-model="form.restrictions" outlined label="Restrições" rows="3" auto-grow />
        <v-row>
          <v-col cols="12" md="10">
            <v-text-field v-model="form.reference" outlined name="reference" label="Referências Legais" />
          </v-col>
          <v-col cols="12" md="2">
            <v-select v-model="form.allowed" name="uf" :items="bool" label="Permitido" outlined hide-details="auto" />
          </v-col>
        </v-row>
        Data de Vigencia
        <v-row>
          <v-col cols="12" md="6">
            <DatePicker v-model="form.validityDateInit" label="Data Inicial" />
          </v-col>
          <v-col cols="12" md="6">
            <DatePicker v-model="form.validityDateFinal" label="Data Final" />
          </v-col>
        </v-row>
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
import insumos from '@/data/insumos.json'
import unidadeMedida from '@/data/unidade-medida.json'
import bool from '@/data/sim-nao.json'

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
      insumos,
      unidadeMedida,
      bool,
      restriction: false,
      form: {
        category: '',
        uM: '',
        name: '',
        reference: '',
        guidelines: '',
        restrictions: '',
        allowed: false,
        validityDateInit: null,
        validityDateFinal: null
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
