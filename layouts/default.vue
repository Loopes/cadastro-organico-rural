<template>
  <v-app>
    <div v-show="settings">
      <v-navigation-drawer v-model="show_drawer" app color="primary" dark>
        <div class="pa-8 pt-10 pb-10">
          <n-link to="/">
            <v-img
              title="COR.agr.br"
              :src="require('~/assets/img/logo-3.png')"
              contain
            />
          </n-link>
        </div>
        <Menu />
      </v-navigation-drawer>
      <v-main>
        <v-app-bar dark hide-on-scroll color="primary" class="d-lg-none">
          <n-link to="/">
            <v-img
              title="COR.agr.br"
              :src="require('~/assets/img/logo-3.png')"
              contain
              max-width="180"
            />
          </n-link>
          <v-spacer />
          <n-link v-if="$auth.user" to="/conexoes">
            <v-badge
              :content="unreadMessages"
              :value="unreadMessages"
              :color="'red'"
              overlap
            >
              <v-icon>mdi-email</v-icon>
            </v-badge>
          </n-link>
          <v-app-bar-nav-icon @click="show_drawer = !show_drawer" />
        </v-app-bar>
        <div class="pt-2 pl-4 pr-4 pl-lg-6 pr-lg-6">
          <div class="content">
            <Nuxt />
          </div>
          <v-divider class="mt-10 mb-10" />
          <Footer />
        </div>
      </v-main>
      <Snackbar />
    </div>
    <div v-if="!settings" class="my-5">
      <v-container>
        <h4>Este site ainda não foi configurado.</h4>
        <h5 class="mb-5">Vamos configurá-lo?</h5>
        <SetupForm />
      </v-container>
    </div>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      show_drawer: null
    }
  },

  computed: {
    settings () {
      return this.$store.state.settings
    },
    unreadMessages() {
      return this.$store.state.unread_messages
    }
  },
  created () {
    this.checkUnreadMessages()
    setInterval(() => {
      this.checkUnreadMessages()
    }, 120000)
  },
  methods: {
    async checkUnreadMessages() {
      if (this.$auth.user) {
        this.$store.commit('setUnreadMessages', await this.$axios.$get('/api/conversations/unread'))
      }
    }
  },
  head () {
    const title = (this.settings ? this.settings.title : process.env.APP_NAME)
    const description = (this.settings ? this.settings.description : '')
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'og:site_name',
          name: 'og:site_name',
          content: title
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description
        },
        {
          hid: 'og:url',
          name: 'og:url',
          content: process.env.BASE_URL + this.$route.path
        }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (this.settings && this.settings.favicon ? this.settings.favicon.url : '/favicon.ico') }
      ]
    }
  }
}
</script>
