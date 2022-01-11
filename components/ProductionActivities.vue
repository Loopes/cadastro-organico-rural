<template>
  <div class="mb-6">
    <span class="overline">Atividades de produção: </span>
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
