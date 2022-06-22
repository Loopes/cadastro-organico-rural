<template>
  <div>
    <PointPreview :point="value" :label="label" />
    <v-dialog v-model="show_modal" title="Localização">
      <template #activator="{ on, attrs }">
        <v-btn v-bind="attrs" color="primary" class="mb-6 mt-n3 lighten-1" v-on="on">
          <v-icon dark left>{{ hasCoordinates ? 'mdi-map-marker-check' : 'mdi-map-marker-plus' }}</v-icon>
          {{ hasCoordinates ? 'Mudar' : 'Adicionar' }} localização
        </v-btn>
      </template>
      <v-card class="text-center">
        <v-toolbar
          color="primary"
          dark
        >
          {{ label }}
        </v-toolbar>
        <div class="pa-6">
          <p v-if="loading_gps" class="text-center">
            <v-spinner small /> Buscando dados do GPS...
          </p>
          <div v-else>
            <p class="text-center mt-3">
              <v-btn color="primary" @click="getLocation()">
                <v-icon>mdi-map-marker</v-icon>
                Buscar pelo GPS
              </v-btn>
            </p>
            <div v-if="form">
              <small v-if="hasCoordinates">
                Clique no mapa ou arraste o marcador para refinar sua localização
              </small>
              <small v-else>Clique no mapa para indicar sua localização</small>
              <l-map
                v-if="show_map"
                :zoom="zoom"
                :center="
                  hasCoordinates ? form.coordinates : [-15.7757264, -48.0773214]
                "
                :options="{ scrollWheelZoom: false }"
                style="height: 250px"
                @click="addMarker"
              >
                <l-tile-layer
                  :url="url"
                  :attribution="attribution"
                  :options="{ useCache: true, crossOrigin: true }"
                />
                <l-marker
                  v-if="hasCoordinates"
                  :lat-lng="form.coordinates"
                  draggable
                  @dragend="updateMarker"
                >
                  <l-tooltip>
                    Clique e arraste para refinar sua localização.
                  </l-tooltip>
                </l-marker>
              </l-map>
              <div v-if="hasCoordinates">
                <p>
                  <small>Coordenadas: {{ form.coordinates.join(',') }}</small>
                </p>
                <v-btn color="danger" size="lg" @click="clearCoordinates()">
                  Remover localização
                </v-btn>
                <v-btn color="success" size="lg" @click="save()">
                  Confirmar localização
                </v-btn>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import PointPreview from '@/components/PointPreview'
const emptyForm = {
  type: 'Point',
  coordinates: []
}

export default {
  components: {
    PointPreview
  },
  props: {
    value: {
      type: Object,
      default: null
    },
    label: {
      type: String,
      default: 'Localização'
    }
  },
  data() {
    return {
      loading_gps: false,
      show_modal: false,
      show_map: false,
      location: null,
      form: null,
      zoom: 3,
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  computed: {
    hasCoordinates() {
      return this.form && this.form.coordinates && this.form.coordinates.length > 0
    }
  },
  watch: {
    show_modal() {
      setTimeout(() => {
        this.show_map = this.show_modal
      }, 100)
    }
  },
  created() {
    this.form = { ...emptyForm }
    if (this.value) {
      Object.keys(this.form).forEach((k) => {
        this.form[k] = this.value[k]
      })
    }

    if (this.hasCoordinates) {
      this.zoom = 16
    }
  },
  methods: {
    open() {
      this.show_modal = true
    },
    getLocation() {
      if (navigator.geolocation) {
        this.loading_gps = true
        navigator.geolocation.getCurrentPosition((position) => {
          this.form.coordinates = [
            position.coords.latitude,
            position.coords.longitude
          ]
          this.zoom = 16
          this.loading_gps = false
        }, this.locationError)
      } else {
        this.locationError()
      }
    },
    addMarker(event) {
      this.form.coordinates = [event.latlng.lat, event.latlng.lng]
    },
    updateMarker(location) {
      this.form.coordinates = [
        location.target._latlng.lat,
        location.target._latlng.lng
      ]
    },
    locationError() {
      this.notify(
        'Não foi possível encontrar seu endereço automaticamente.',
        'error'
      )
      this.loading_gps = false
    },
    save() {
      this.show_modal = false
      this.$emit('input', { ...this.form })
    },
    clearCoordinates() {
      this.form.coordinates = []
      this.$emit('input', { ...this.form })
    }
  }
}
</script>
