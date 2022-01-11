<template>
  <div class="mb-6">
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
      </v-list-item>
    </v-list>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
