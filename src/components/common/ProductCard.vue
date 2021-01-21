<template>
  <v-card :href="product.href" target="_blank" hover>
    <v-img
      height="250"
      contain
      :src="product.img.src"
      :alt="product.img.alt"
    ></v-img>
    <v-card-title>
      <span class="one-line">{{ product.title }}</span>
    </v-card-title>
    <v-card-subtitle>Магазин: {{ product.store }}</v-card-subtitle>
    <v-card-text>{{ product.price }}₴</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.one-line {
  @include line-clamp(1);
}
</style>
