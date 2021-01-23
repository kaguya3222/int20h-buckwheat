<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <Filters :filters="filters" @filtersChanged="onFiltersChanged" />
      </v-col>
      <v-col class="d-flex flex-column" md="4" lg="3" cols="12">
        <div class="mt-auto mb-6 mb-md-4">
          <PriceSorter @sortingChanged="onSortingChanged" />
        </div>
      </v-col>
    </v-row>
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

import Filters from '@/components/common/Filters'
import PriceSorter from '@/components/common/PriceSorter'
import ProductCard from '@/components/common/ProductCard'

export default {
  name: 'PageHome',
  components: {
    Filters,
    PriceSorter,
    ProductCard
  },
  data() {
    return {
      products: null,
      isLoading: false,
      selectedSorting: {},
      filters: [],
      selectedFilters: []
    }
  },
  computed: {
    filterIds() {
      return this.filters.map(filter => filter.id)
    },
    filterParams() {
      return this.filterIds.reduce((acc, filterId) => {
        const filterOptions = this.selectedFilters.filter(
          option => option.filterId === filterId
        )
        return {
          ...acc,
          [filterId]: filterOptions.map(filter => filter.filterOptionId)
        }
      }, {})
    },
    searchParams() {
      return {
        ...this.filterParams,
        ...this.selectedSorting
      }
    }
  },
  created() {
    this.loadProducts()
  },
  methods: {
    onFiltersChanged(selectedOptions) {
      this.selectedFilters = selectedOptions

      this.loadProducts({ params: this.searchParams })
    },
    onSortingChanged(sortingDetails) {
      this.selectedSorting = sortingDetails

      this.loadProducts({ params: this.searchParams })
    },
    async loadProducts(payload) {
      try {
        this.isLoading = true
        const { data } = await searchProducts({
          ...payload,
          paramsSerializer: params =>
            qs.stringify(params, { arrayFormat: 'repeat' })
        })
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
