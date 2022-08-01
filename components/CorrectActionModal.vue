<template>
  <div class="mb-3">
    <div>
      <v-dialog
        v-model="dialog"
        transition="dialog-bottom-transition"
        max-width="600"
        scrollable
      >
        <template #activator="{ on, attrs }">
          <span class="overline" v-bind="attrs" v-on="on">Visualizar</span>
        </template>
        <v-card>
          <v-toolbar
            color="primary"
            dark
          >
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <span>Ação Corretiva</span>
          </v-toolbar>
          <div class="pa-6">
            <v-form>
              <div>
                <v-textarea v-model="value" outlined label="Ação Corretiva" rows="3" auto-grow />
              </div>
              <v-row>
                <v-col cols="12" md="4" />
                <v-col cols="12" md="4">
                  <v-btn class="mr-4" @click="save()">
                    Confirmar
                  </v-btn>
                </v-col>
                <v-col cols="12" md="4" />
              </v-row>
            </v-form>
          </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>
<script>

import mixinForm from '@/mixins/form'
export default {
  mixins: [mixinForm],
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    save () {
      this.dialog = false
      this.$emit('input', this.value)
    }
  }
}
</script>
