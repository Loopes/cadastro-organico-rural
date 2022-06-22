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
            <v-select v-model="form.uM" name="uM" :items="unidadeMedida" label="Unidade de Medida *" :error-messages="errors" outlined hide-details="auto" />
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
    <Remove v-if="rawMaterialEntity" @confirm="remove(rawMaterialEntity)" />
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
    rawMaterialEntity: {
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
    this.toForm(this.form, this.rawMaterialEntity)
  },
  methods: {
    async save() {
      if (this.rawMaterialEntity) {
        const rawMaterialEntity = await this.$axios.$put('/api/raw_materials/' + this.rawMaterialEntity._id, this.form)
        if (rawMaterialEntity) {
          this.$notifier.success('Insumo Atualizado!')
          this.$router.push('/insumos/' + rawMaterialEntity._id)
        }
      } else {
        const rawMaterialEntity = await this.$axios.$post('/api/raw_materials', this.form)
        if (rawMaterialEntity) {
          this.$notifier.success('Insumo cadastrado!')
          this.$router.push('/insumos/' + rawMaterialEntity._id)
        }
      }
    },
    remove (rawMaterialEntity) {
      this.$axios.delete('/api/raw_materials/' + rawMaterialEntity._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/insumos')
      })
    }
  }
}
</script>
