const sortingByDefault = { sortBy: 'price', sortDir: 'asc' }

export default {
  namespaced: true,
  state: () => ({
    selectedSorting: sortingByDefault
  }),
  getters: {},
  mutations: {
    setSelectedSorting(state, v) {
      state.selectedSorting = v
    }
  },
  actions: {
    updateSelectedSorting({ commit, dispatch }, v) {
      commit('setSelectedSorting', v)

      dispatch('search/loadProducts', null, { root: true })
    }
  }
}
