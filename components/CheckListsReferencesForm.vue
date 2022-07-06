<template>
    <div>
      <validation-provider v-slot="{ errors }" name="Título" rules="required">
        <v-text-field v-model="form.title" outlined label="Título da Referência:" :error-messages="errors" />
      </validation-provider>
      <Upload v-model="form.documents" label="Anexar documentos" type="documents" multiple edit-title />
      <v-textarea v-model="form.obs" outlined label="Observações:" rows="4" auto-grow />
      <div @click="save()" style="margin-top: 2%;">
        <Save />
      </div>
    <Remove v-if="reference" />
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
  props: {
    reference: {
      type: Object
    }
  },
  mixins: [mixinForm],
  data() {
    return {
      form: {
        title: '',
        obs: '',
        documents: []
      }
    }
  },
  created() {
    if (this.reference) {
      this.toForm(this.form, this.reference)
    }
  },
  methods: {
    async save() {
      const created = await this.$axios.$post('/api/check_lists/references', this.form)
      if (created) {
        this.$notifier.success('Referência Cadastrado!')
        this.$router.push('/check-lists/references/' + created._id)
      }
    },
    async remove (reference) {
      await this.$axios.delete('/api/check_lists/references/' + reference._id).then(() => {
        this.$notifier.success('Removido com sucesso!')
        this.$router.push('/check-lists/references')
      })
    }
  }
}
</script>
