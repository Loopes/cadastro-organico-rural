<template>
  <div>
    <div class="text-dark mb-3">
      <p>
        <span class="overline">{{ label }}:</span>
        <span v-if="validCoordinates">
          <br><strong>{{ point.coordinates.join(',') }}</strong>
          <v-btn color="secondary" small class="ml-1" @click="show_map = !show_map">
            {{ show_map ? 'Esconder mapa' : 'Ver mapa' }}
          </v-btn>
        </span>
      </p>
    </div>
    <l-map
      v-if="show_map"
      :zoom="16"
      :center="point.coordinates"
      :options="{ scrollWheelZoom: false }"
      style="height: 30vw"
      class="mb-4"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="point.coordinates" />
    </l-map>
  </div>
</template>

<script>
export default {
  props: {
    point: {
      type: Object,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Coordenadas'
    }
  },
  data() {
    return {
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution:
        'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
      show_map: false
    }
  },
  computed: {
    validCoordinates() {
      if (
        this.point &&
        this.point.coordinates &&
        this.point.coordinates.length > 1
      ) {
        if (this.point.coordinates[0] > -90 && this.point.coordinates[0] < 90) {
          if (
            this.point.coordinates[1] > -180 &&
            this.point.coordinates[1] < 180
          ) {
            return true
          }
        }
      }
      return false
    }
  },
  created() {
    if (this.show) {
      setTimeout(() => {
        this.show_map = true
      }, 100)
    }
  }
}
</script>
