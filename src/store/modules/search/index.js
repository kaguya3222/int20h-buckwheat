import qs from 'qs'

import { searchProducts } from '@/api/products'
import filters from '@/store/modules/search/filters'
import pagination from '@/store/modules/search/pagination'
import sorting from '@/store/modules/search/sorting'

export default {
  namespaced: true,
  state: () => ({
    isLoading: false,
    products: null,
    totalCount: 0
  }),
  getters: {
    searchParams: (state, getters) => ({
      ...getters['filters/filterParams'],
      ...state.sorting.selectedSorting,
      offset: getters['pagination/offset']
    })
  },
  mutations: {
    setIsLoading(state, v) {
      state.isLoading = v
    },
    setProducts(state, v) {
      state.products = v
    },
    setTotalCount(state, v) {
      state.totalCount = v
    }
  },
  actions: {
    async loadProducts({ commit, getters }, payloadParams) {
      try {
        commit('setIsLoading', true)
        const { data } = await searchProducts({
          params: {
            ...getters.searchParams,
            ...payloadParams
          },
          paramsSerializer: params =>
            qs.stringify(params, { arrayFormat: 'repeat' })
        })

        commit('setProducts', data.items)
        commit('setTotalCount', data.totalCount)
        commit('filters/setFilters', data.filters)
      } catch (e) {
        console.log('failed doing request', e)
      } finally {
        commit('setIsLoading', false)
      }
    }
  },
  modules: { pagination, sorting, filters }
}
