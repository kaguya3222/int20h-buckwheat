<template>
  <v-card>
    <v-img height="250" contain :src="product.img" :alt="product.title" />
    <v-card-title>
      <a
        :href="product.href"
        target="_blank"
        rel="noreferrer noopener"
        class="link"
        >{{ product.title }}</a
      >
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
.link {
  text-decoration: none;
  color: black;
  @include line-clamp(1);

  &:hover {
    text-decoration: underline;
  }
}
</style>
