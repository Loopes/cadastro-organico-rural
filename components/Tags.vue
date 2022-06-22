<template>
  <div>
    <v-chip v-for="tag in tags" :key="tag" text-color="primary" class="mr-1" @click="$emit('click', tag)"><strong>{{ tag }}</strong></v-chip>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
