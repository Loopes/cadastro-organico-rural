<template>
  <div>
    <div v-if="documents && documents.length > 0" class="documents my-10">
      <p v-if="label">{{ label }}:</p>
      <v-list color="grey" class="rounded lighten-3">
        <v-list-item v-for="doc in documents" :key="doc._id" :href="baseURL + '/' + doc.url" @click.prevent="downloadItem({url: baseURL + '/' + doc.url})" target="_blank" class="mr-1 mb-1 border-dark">
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
  },
  data() {
    return {
      baseURL: ''
    }
  },
  created() {
    this.baseURL = process.env.BASE_URL
  },
  methods: {
    async downloadItem({ url }) {
      const response = await this.$axios.get(url, { responseType: 'blob' })
      const blob = new Blob([response.data], { type: 'application/file' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>
