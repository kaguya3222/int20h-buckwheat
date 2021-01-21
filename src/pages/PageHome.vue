<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      sm="6"
      md="4"
      lg="3"
      cols="12"
    >
      <ProductCard :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import { searchProducts } from '@/api/products'

import ProductCard from '@/components/common/ProductCard'

export default {
  name: 'PageHome',
  components: {
    ProductCard
  },
  data() {
    return {
      products: null
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const { data } = await searchProducts()
        this.products = data.items
      } catch (e) {
        console.log('failed doing request', e)
      }
    }
  }
}
</script>
