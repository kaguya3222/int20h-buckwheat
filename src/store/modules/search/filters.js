export default {
  namespaced: true,
  state: () => ({
    filters: [],
    selectedFilters: []
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
    }
  },
  mutations: {
    setFilters(state, v) {
      state.filters = v
    },
    setSelectedFilters(state, v) {
      state.selectedFilters = v
    }
  },
  actions: {
    updateSelectedFilters({ commit, dispatch }, v) {
      commit('setSelectedFilters', v)

      dispatch('search/loadProducts', null, { root: true })
    }
  }
}
