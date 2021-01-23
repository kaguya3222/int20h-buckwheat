import qs from 'qs'

import { searchProducts } from '@/api/products'

const sortingByDefault = { sortBy: 'price', sortDir: 'asc' }

export default {
  namespaced: true,
  state: () => ({
    isLoading: false,
    filters: [],
    selectedFilters: [],
    selectedSorting: sortingByDefault,
    products: null
  }),
  getters: {
    filterIds: state => state.filters.map(filter => filter.id),
    filterParams(state, getters) {
      return getters.filterIds.reduce((acc, filterId) => {
        const filterOptions = state.selectedFilters.filter(
          option => option.filterId === filterId
        )
        return {
          ...acc,
          [filterId]: filterOptions.map(filter => filter.filterOptionId)
        }
      }, {})
    },
    searchParams: (state, getters) => ({
      ...getters.filterParams,
      ...state.selectedSorting
    })
  },
  mutations: {
    setIsLoading(state, v) {
      state.isLoading = v
    },
    setFilters(state, v) {
      state.filters = v
    },
    setSelectedFilters(state, v) {
      state.selectedFilters = v
    },
    setSelectedSorting(state, v) {
      state.selectedSorting = v
    },
    setProducts(state, v) {
      state.products = v
    }
  },
  actions: {
    updateSelectedFilters({ commit, dispatch }, v) {
      commit('setSelectedFilters', v)

      dispatch('loadProducts')
    },
    updateSelectedSorting({ commit, dispatch }, v) {
      commit('setSelectedSorting', v)

      dispatch('loadProducts')
    },
    async loadProducts({ commit, getters }) {
      try {
        commit('setIsLoading', true)
        const { data } = await searchProducts({
          params: getters.searchParams,
          paramsSerializer: params =>
            qs.stringify(params, { arrayFormat: 'repeat' })
        })

        commit('setProducts', data.items)
        commit('setFilters', data.filters)
      } catch (e) {
        console.log('failed doing request', e)
      } finally {
        commit('setIsLoading', false)
      }
    }
  }
}
