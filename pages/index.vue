<template>
  <div class="pt-6">
    <Breadcrumb />
    <div v-if="settings" class="home-page">
      <h5 class="text-h5 mb-8">A COR.agr.br vai mudar a forma como você desenvolve seu empreendimento rural orgânico!</h5>
      <Banners :items="settings.banners" />
      <div v-if="settings.description" class="text-center px-5">
        <!-- <img src="~/assets/img/logo-laranja.svg" alt="Sobre"> -->
        <div class="title mt-3">
          <h4>Sobre</h4>
          <hr>
        </div>
        <h5 class="text-center text-primary">{{ settings.description }}</h5>
        <v-btn to="/sobre" color="secondary" class="mt-3 btn-home">
          Saiba mais
        </v-btn>
      </div>
      <v-row v-if="metrics" class="mb-6">
        <v-col cols="12" md="3">
          <v-card color="primary lighten-1" dark class="text-center" to="/entidades-certificadoras">
            <v-card-title class="text-h4 justify-center">{{ certifying_entities.length }}</v-card-title>
            <v-card-text>
              <div class="text-primary">Entidades certificadoras</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="primary lighten-1" dark class="text-center" to="/unidades-de-producao">
            <v-card-title class="text-h4 justify-center">{{ production_units.length }}</v-card-title>
            <v-card-text>
              <div class="text-primary">Unidades de produção</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="primary lighten-1" dark class="text-center" to="/trilhas">
            <v-card-title class="text-h4 justify-center">{{ metrics.categories }}</v-card-title>
            <v-card-text>
              <div class="text-primary">Trilhas de conhecimento</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card color="primary lighten-1" dark class="text-center" to="/trilhas">
            <v-card-title class="text-h4 justify-center">{{ metrics.medias }}</v-card-title>
            <v-card-text>
              <div class="text-primary">Conteúdos publicados</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <div class="text-center mb-3">
        <v-btn class="mb-3" rounded :color="show_production_units ? '#0054A1' : 'grey'" dark @click="show_production_units = !show_production_units">
          <v-icon left>mdi-barn</v-icon>
          Unidades de produção
        </v-btn>
        <v-btn class="mb-3" rounded :color="show_certifying_entities ? '#962824' : 'grey'" dark @click="show_certifying_entities = !show_certifying_entities">
          <v-icon left>mdi-certificate</v-icon>
          Entidades certificadoras
        </v-btn>
      </div>
      <client-only>
        <l-map
          class="mb-8"
          :zoom="map.zoom"
          :center="map.center"
          :options="{ scrollWheelZoom: false }"
          style="height: 450px"
        >
          <l-tile-layer :url="map.url" :attribution="map.attribution" />
          <template v-for="production_unit in production_units">
            <l-marker
              v-if="show_production_units && productionUnitCoordinates(production_unit)"
              :key="production_unit._id"
              :lat-lng="productionUnitCoordinates(production_unit)"
              draggable
              @click="$router.push('/unidades-de-producao/' + production_unit._id)"
            >
              <l-icon
                :icon-url="require('~/assets/img/markers/marker_production_unit.png')"
              />
              <l-tooltip class="pa-2">
                <v-chip class="mb-3" color="#0054A1" dark>
                  <v-icon left>mdi-barn</v-icon>
                  Unidade de produção
                </v-chip>
                <br>
                <strong>
                  {{ production_unit.name }}
                </strong>
                <br>
                <span>
                  {{ production_unit.city }} - {{ production_unit.uf }}
                </span>
              </l-tooltip>
            </l-marker>
          </template>
          <template v-for="certifying_entity in certifying_entities">
            <l-marker
              v-if="show_certifying_entities && productionUnitCoordinates(certifying_entity)"
              :key="certifying_entity._id"
              :lat-lng="productionUnitCoordinates(certifying_entity)"
              draggable
              @click="$router.push('/entidades-certificadoras/' + certifying_entity._id)"
            >
              <l-icon
                :icon-url="require('~/assets/img/markers/marker_certifying_entity.png')"
              />
              <l-tooltip class="pa-2">
                <v-chip class="mb-3" color="#962824" dark>
                  <v-icon left>mdi-certificate</v-icon>
                  Entidade certificadora
                </v-chip>
                <br>
                <strong>
                  {{ certifying_entity.name }}
                </strong>
                <br>
                <span>
                  {{ certifying_entity.city }} - {{ certifying_entity.uf }}
                </span>
              </l-tooltip>
            </l-marker>
          </template>
        </l-map>
      </client-only>
      <v-row>
        <v-col cols="12" md="3">
          <v-card to="/match">
            <v-img :src="require('~/assets/img/trilhas_g.jpg')" alt="Desafie-se!" :aspect-ratio="16/9" />
            <v-card-title>Desafie-se!</v-card-title>
            <v-card-text>
              <div class="text-primary">Encontre um usuário para guiar ou para ser seu guia nesta jornada!</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card to="/trilhas">
            <v-img :src="require('~/assets/img/trilhas_f.jpg')" alt="Trilhe sua evolução" :aspect-ratio="16/9" />
            <v-card-title>Trilhe sua evolução</v-card-title>
            <v-card-text>
              <div class="text-primary">Os melhores conteúdos gratuitos da web para produtores orgânicos!</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card to="/jornada">
            <v-img :src="require('~/assets/img/trilhas_e.jpg')" alt="Desafie-se!" :aspect-ratio="16/9" />
            <v-card-title>Jornada!</v-card-title>
            <v-card-text>
              <div class="text-primary">Conheça nossa Jornada! Nossa origem é uma luta coletiva pela causa Orgânica!</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card to="/missao">
            <v-img :src="require('~/assets/img/produtor.jpg')" alt="Seja um Senior!" :aspect-ratio="16/9" />
            <v-card-title>Nossa missão</v-card-title>
            <v-card-text>
              <div class="text-primary">Entenda os desafios que o Cadastro Orgânico Rural procura solucionar</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      metrics: null,
      production_units: [],
      certifying_entities: [],
      show_production_units: true,
      show_certifying_entities: true,
      map: {
        zoom: 4,
        center: [-15.877504, -47.917389],
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  async created () {
    this.metrics = await this.$axios.$get('/api/metrics')
    this.production_units = await this.$axios.$get('/api/production_units')
    this.certifying_entities = await this.$axios.$get('/api/certifying_entities')
  },
  methods: {
    productionUnitCoordinates(productionUnit) {
      if (productionUnit) {
        if (productionUnit.farm_house_location && productionUnit.farm_house_location.coordinates && productionUnit.farm_house_location.coordinates.length === 2) {
          return productionUnit.farm_house_location.coordinates
        }
        if (productionUnit.farm_gate_location && productionUnit.farm_gate_location.coordinates && productionUnit.farm_gate_location.coordinates.length === 2) {
          return productionUnit.farm_gate_location.coordinates
        }
        if (productionUnit.farm_address && productionUnit.farm_address.location && productionUnit.farm_address.location.coordinates && productionUnit.farm_address.location.coordinates.length === 2) {
          return productionUnit.farm_address.location.coordinates
        }
        if (productionUnit.correspondence_address && productionUnit.correspondence_address.location && productionUnit.correspondence_address.location.coordinates && productionUnit.correspondence_address.location.coordinates.length === 2) {
          return productionUnit.correspondence_address.location.coordinates
        }
        if (productionUnit.address && productionUnit.address.location && productionUnit.address.location.coordinates && productionUnit.address.location.coordinates.length === 2) {
          return productionUnit.address.location.coordinates
        }
      }
      return null
    }

  }
}
</script>
