<template>
  <div>
    <div class="mb-6">
      <div>
        <span class="overline">{{ label }}:</span>
        <div v-if="validCoordinates">
          <div v-if="address.description"><strong>{{ address.description }}</strong></div>
          <v-btn color="secondary" small class="ml-1" @click="show_map = !show_map">
            {{ show_map ? 'Esconder mapa' : 'Ver mapa' }}
          </v-btn>
        </div>
      </div>
    </div>
    <l-map
      v-if="show_map"
      :zoom="16"
      :center="address.location.coordinates"
      :options="{ scrollWheelZoom: false }"
      style="height: 30vw"
      class="mb-6"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="address.location.coordinates" />
    </l-map>
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: 'Endereço'
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
        this.address &&
        this.address.location &&
        this.address.location.coordinates &&
        this.address.location.coordinates.length > 1
      ) {
        if (
          this.address.location.coordinates[0] > -90 &&
          this.address.location.coordinates[0] < 90
        ) {
          if (
            this.address.location.coordinates[1] > -180 &&
            this.address.location.coordinates[1] < 180
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
