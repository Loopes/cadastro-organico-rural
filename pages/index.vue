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
      <l-map
        class="mb-8"
        :zoom="map.zoom"
        :center="map.center"
        :options="{ scrollWheelZoom: false }"
        style="height: 350px"
      >
        <l-tile-layer :url="map.url" :attribution="map.attribution" />
        <template v-for="production_unit in production_units">
          <l-marker
            v-if="productionUnitCoordinates(production_unit)"
            :key="production_unit._id"
            :lat-lng="productionUnitCoordinates(production_unit)"
            draggable
            @click="$router.push('/unidades-de-producao/' + production_unit._id)"
          >
            <l-tooltip class="pa-2">
              <v-chip class="mb-3">
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
            v-if="productionUnitCoordinates(certifying_entity)"
            :key="certifying_entity._id"
            :lat-lng="productionUnitCoordinates(certifying_entity)"
            draggable
            @click="$router.push('/entidades-certificadoras/' + certifying_entity._id)"
          >
            <l-icon
              class-name="someExtraClass"
              icon-url="data:image/jpeg;base64,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"
              icon-size="30"
            />
            <l-tooltip class="pa-2">
              <v-chip class="mb-3">
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
