<template>
  <div>
    <Filters :filters="filters" @filtersChanged="onFiltersChanged" />
    <transition name="fade" mode="out-in">
      <v-row v-if="isLoading" key="skeletons">
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
import qs from 'qs'

import { searchProducts } from '@/api/products'

import Filters from '@/components/containers/Filters'

import ProductCard from '@/components/common/ProductCard'

export default {
  name: 'PageHome',
  components: {
    Filters,
    ProductCard
  },
  data() {
    return {
      products: null,
      filters: [],
      isLoading: false
    }
  },
  created() {
    this.loadProducts()
  },
  methods: {
    onFiltersChanged(selectedOptions) {
      const filterParams = this.getFilterParams(selectedOptions)

      this.loadProducts({
        params: filterParams,
        paramsSerializer: params =>
          qs.stringify(params, { arrayFormat: 'repeat' })
      })
    },
    getFilterParams(selectedOptions) {
      const filterIds = this.filters.map(filter => filter.id)

      return filterIds.reduce((acc, filterId) => {
        const filterOptions = selectedOptions.filter(
          option => option.filterId === filterId
        )
        return {
          ...acc,
          [filterId]: filterOptions.map(filter => filter.filterOptionId)
        }
      }, {})
    },
    async loadProducts(payload) {
      try {
        this.isLoading = true
        const { data } = await searchProducts(payload)
        this.products = data.items
        this.filters = data.filters
      } catch (e) {
        console.log('failed doing request', e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
