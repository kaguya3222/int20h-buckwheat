<template>
  <transition name="fade" mode="out-in">
    <v-row v-if="isLoading" key="skeletons">
      <v-col v-for="n in 20" :key="n" sm="6" md="4" lg="3" cols="12">
        <v-skeleton-loader min-width="451" type="card" />
      </v-col>
    </v-row>
    <v-row v-else key="products">
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
  </transition>
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
      products: null,
      isLoading: false
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        this.isLoading = true
        const { data } = await searchProducts()
        this.products = data.items
      } catch (e) {
        console.log('failed doing request', e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
