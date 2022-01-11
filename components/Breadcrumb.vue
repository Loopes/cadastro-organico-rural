<template>
  <v-toolbar v-if="active" elevation="0" class="pt-3 mb-8">
    <v-btn
      v-if="$route.path !== '/'"
      class="ml-n4 mr-4 lighten-2"
      fab
      small
      color="primary"
      @click="$router.replace(parent)"
    >
      <v-icon> mdi-chevron-left </v-icon>
    </v-btn>
    <v-toolbar-title>
      <strong class="overline">{{ active }}</strong>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    parent: {
      type: String,
      default: '/'
    },
    active: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  created() {
    // this.$store.commit('setPageTitle', this.pageTitle())
    // this.$store.commit('setPageDescription', this.pageDescription())
  },
  methods: {
    pageTitle() {
      const title = [(this.settings ? this.settings.title : process.env.APP_NAME), this.active]
      return title.reverse().filter(t => t).join(' | ')
    },
    pageDescription() {
      return this.description || process.env.npm_package_description
    }
  },
  head() {
    const meta = [
      // hid is used as unique identifier. Do not use `vmid` for it as it will not work
      {
        hid: 'description',
        name: 'description',
        content: this.pageDescription()
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: this.pageDescription()
      },
      {
        hid: 'og:title',
        name: 'og:title',
        content: this.pageTitle()
      },
      {
        hid: 'og:url',
        name: 'og:url',
        content: process.env.BASE_URL + this.$route.path
      }
    ]
    if (this.img) {
      meta.push({
        hid: 'og:image',
        name: 'og:image',
        content: this.img
      })
    }
    return {
      title: this.pageTitle(),
      meta
    }
  }
}
</script>
