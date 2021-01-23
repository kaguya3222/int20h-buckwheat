<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <Filters />
      </v-col>
      <v-col class="d-flex flex-column" md="4" lg="3" cols="12">
        <div class="mt-auto mb-6 mb-md-4">
          <PriceSorter />
        </div>
      </v-col>
    </v-row>
    <transition name="fade" mode="out-in">
      <v-row v-if="isSearchLoading" key="skeletons">
        <v-col v-for="n in 20" :key="n" sm="6" md="4" lg="3" cols="12">
          <v-skeleton-loader width="451" max-width="100%" type="card" />
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
  </div>
</template>

<script>
import { mapState } from 'vuex'

import PriceSorter from '@/components/containers/PriceSorter'
import ProductCard from '@/components/containers/ProductCard'

import Filters from '@/components/common/Filters'

export default {
  name: 'PageHome',
  components: {
    Filters,
    PriceSorter,
    ProductCard
  },
  computed: {
    ...mapState('search', {
      products: 'products',
      isSearchLoading: 'isLoading'
    })
  },
  created() {
    this.$store.dispatch('search/loadProducts')
  }
}
</script>
