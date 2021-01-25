<template>
  <div>
    <v-row no-gutters>
      <v-col md="6" lg="5">
        <Filters />
      </v-col>
      <v-col class="d-flex flex-column ml-auto" md="4" lg="3" cols="12">
        <div class="mt-auto mb-4">
          <Sorter />
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="fallback">
      <div v-if="showFallback" class="text-h5">
        Whoops! We didn't find anything :(
      </div>
    </v-row>
    <transition name="fade" mode="out-in">
      <v-row v-if="isSearchLoading" key="skeleton">
        <v-col v-for="n in 20" :key="n" sm="6" md="4" lg="3" cols="12">
          <v-skeleton-loader width="451" max-width="100%" type="card" />
        </v-col>
      </v-row>
      <div v-else>
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

        <v-pagination
          v-if="showProducts"
          class="mx-auto mt-2"
          :value="currentPage"
          :length="pagesCount"
          @input="onPageUpdate"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import ProductCard from '@/components/containers/ProductCard'
import Sorter from '@/components/containers/Sorter'

import Filters from '@/components/common/Filters'

export default {
  name: 'PageHome',
  components: {
    Filters,
    Sorter,
    ProductCard
  },
  props: {
    page: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState('search', {
      currentPage: state => state.pagination.currentPage,
      products: 'products',
      isSearchLoading: 'isLoading'
    }),
    ...mapGetters('search/pagination', {
      pagesCount: 'pagesCount'
    }),
    showFallback() {
      return !this.showProducts && !this.isSearchLoading
    },
    showProducts() {
      return this.products?.length
    }
  },
  watch: {
    page: {
      handler(page) {
        this.updatePage(page)
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('search/pagination', {
      updatePage: 'updatePage'
    }),
    onPageUpdate(page) {
      this.$router.push({ ...this.$route, params: { page } })
    }
  }
}
</script>

<style lang="scss" scoped>
.fallback {
  min-height: 30px;
}
</style>
