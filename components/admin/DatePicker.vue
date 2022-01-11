<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        outlined
        :value="computedDateFormattedMomentjs"
        :label="label"
        append-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      no-title
      scrollable
      locale="pt-br"
      @change="$refs.menu.save(date)"
    >
      <!-- <v-spacer />
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancelar
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(date)"
      >
        OK
      </v-btn> -->
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: 'Data'
    }
  },
  data: () => ({
    date: null,
    menu: false
  }),
  computed: {
    computedDateFormattedMomentjs () {
      return this.date ? this.$moment(this.date).format('DD/MM/YYYY') : ''
    }
  },
  watch: {
    date() {
      this.$emit('input', this.date)
    }
  },
  created() {
    this.date = this.value
  }
}
</script>
