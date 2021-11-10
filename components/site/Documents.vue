<template>
  <div>
    <div v-if="documents && documents.length > 0" class="documents mt-4">
      <p v-if="label">{{ label }}:</p>
      <v-list color="primary" class="rounded darken-1" dark>
        <v-list-item v-for="doc in documents" :key="doc._id" :href="doc.url" target="_blank" class="mr-1 mb-1">
          <v-list-item-avatar><v-icon>mdi-paperclip</v-icon></v-list-item-avatar>
          <v-list-item-title>{{ doc.title || 'Acessar Conteúdo' }}</v-list-item-title>
          <v-list-item-action><v-icon>mdi-download</v-icon></v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    documents: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: null
    }
  }
}
</script>
